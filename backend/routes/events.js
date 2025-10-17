const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      date,
      total_seats,
      available_seats,
      price,
      img,
    } = req.body;

    const query = `
            INSERT INTO events (title, description, location, date, total_seats, available_seats, price, img) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
      title,
      description,
      location,
      date,
      total_seats,
      available_seats,
      price,
      img,
    ];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({
          success: false,
          message: "Error creating event",
          error: error.message,
        });
      }

      res.json({
        success: true,
        message: "Event created successfully",
        eventId: results.insertId,
      });
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
});

module.exports = router;

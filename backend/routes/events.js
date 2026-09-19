const express = require("express");
const router = express.Router();
const db = require("../db"); // Make sure db.js has correct MySQL connection

// ---------------- POST: Create new event ----------------
router.post("/", (req, res) => {
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
    INSERT INTO events 
    (title, description, location, date, total_seats, available_seats, price, img) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [title, description, location, date, total_seats, available_seats, price, img];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ success: false, message: "Error creating event", error: error.message });
    }
    res.json({ success: true, message: "Event created successfully", eventId: results.insertId });
  });
});

// ---------------- GET: Get all events ----------------
router.get("/", (req, res) => {
  const query = "SELECT * FROM events";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ success: false, message: "Error fetching events", error: error.message });
    }
    res.json({ success: true, events: results });
  });
});

// ---------------- GET: Get single event by ID ----------------
router.get("/:id", (req, res) => {
  const eventId = req.params.id;
  const query = "SELECT * FROM events WHERE id = ?";

  db.query(query, [eventId], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ success: false, message: "Error fetching event", error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, event: results[0] });
  });
});

// ---------------- PUT: Update event by ID ----------------
router.put("/:id", (req, res) => {
  const eventId = req.params.id;
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
    UPDATE events SET title=?, description=?, location=?, date=?, total_seats=?, available_seats=?, price=?, img=? 
    WHERE id=?
  `;

  const values = [title, description, location, date, total_seats, available_seats, price, img, eventId];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ success: false, message: "Error updating event", error: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, message: "Event updated successfully" });
  });
});

// ---------------- DELETE: Delete event by ID ----------------
router.delete("/:id", (req, res) => {
  const eventId = req.params.id;
  const query = "DELETE FROM events WHERE id=?";

  db.query(query, [eventId], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ success: false, message: "Error deleting event", error: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, message: "Event deleted successfully" });
  });
});

module.exports = router;

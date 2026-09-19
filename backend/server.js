const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./db");
const bookings = require("./routes/bookings");

dotenv.config();

const app = express();

// ---------------- MIDDLEWARE ----------------

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- EVENTS ----------------

// Get all events
app.get("/api/events", async (req, res) => {
  try {
    console.log("📨 GET /api/events");

    const [results] = await db.query(
      "SELECT * FROM events ORDER BY created_at DESC"
    );

    console.log("✅ Total events found:", results.length);

    res.json(results);
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get single event
app.get("/api/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    console.log("📨 GET /api/events/" + eventId);

    const [results] = await db.query(
      "SELECT * FROM events WHERE id = ?",
      [eventId]
    );

    if (results.length === 0) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create event
app.post("/api/events", async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      date,
      total_seats,
      price,
      img,
    } = req.body;

    console.log("📨 Creating event:", title);

    const query = `
      INSERT INTO events
      (title, description, location, date, total_seats, available_seats, price, img)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      description || "",
      location,
      date,
      total_seats,
      total_seats,
      price,
      img || "",
    ];

    const [result] = await db.query(query, values);

    console.log("✅ Event created:", result.insertId);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      eventId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error creating event:", error);

    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
});

// Update event
app.put("/api/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    const {
      title,
      description,
      location,
      date,
      total_seats,
      price,
      img,
    } = req.body;

    const query = `
      UPDATE events
      SET title = ?,
          description = ?,
          location = ?,
          date = ?,
          total_seats = ?,
          price = ?,
          img = ?
      WHERE id = ?
    `;

    const values = [
      title,
      description || "",
      location,
      date,
      total_seats,
      price,
      img || "",
      eventId,
    ];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating event:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete event
app.delete("/api/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    const [result] = await db.query(
      "DELETE FROM events WHERE id = ?",
      [eventId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting event:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// ---------------- BOOKINGS ----------------

// IMPORTANT:
// Booking logic is handled inside bookingController.js
app.use("/api/bookings", bookings);

// ---------------- HEALTH ----------------

app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running successfully!",
    timestamp: new Date().toISOString(),
  });
});

// ---------------- 404 ----------------

app.use("/api/", (req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log(`📍 Events: http://localhost:${PORT}/api/events`);
  console.log(`📍 Bookings: http://localhost:${PORT}/api/bookings`);
});
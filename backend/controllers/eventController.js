const db = require("../db");

exports.getAllEvents = (req, res) => {
  const query = "SELECT * FROM events ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching events:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log(`✅ Fetched ${results.length} events from database`);
    res.json(results);
  });
};

exports.getEventById = (req, res) => {
  const eventId = req.params.id;
  const query = "SELECT * FROM events WHERE id = ?";

  db.query(query, [eventId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching event:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(results[0]);
  });
};

exports.createEvent = (req, res) => {
  console.log("📥 Received data for new event:", req.body);

  const { title, description, location, date, total_seats, price, img } =
    req.body;

  if (!title || !location || !date || !total_seats || !price) {
    return res.status(400).json({
      error:
        "Missing required fields: title, location, date, total_seats, price",
    });
  }

  const totalSeatsNum = parseInt(total_seats);
  const priceNum = parseInt(price);

  if (isNaN(totalSeatsNum) || totalSeatsNum <= 0) {
    return res.status(400).json({
      error: "Total seats must be a positive number",
    });
  }

  if (isNaN(priceNum) || priceNum < 0) {
    return res.status(400).json({
      error: "Price must be a valid number",
    });
  }

  const available_seats = totalSeatsNum;

  const query =
    "INSERT INTO events (title, description, location, date, total_seats, available_seats, price, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    title,
    description || "",
    location,
    date,
    totalSeatsNum,
    available_seats,
    priceNum,
    img || "",
  ];

  console.log("🚀 Executing query with values:", values);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("❌ Error creating event:", err);
      return res.status(500).json({
        error: "Failed to create event",
        details: err.message,
      });
    }

    console.log("✅ Event created successfully, ID:", results.insertId);
    res.status(201).json({
      message: "Event created successfully",
      eventId: results.insertId,
    });
  });
};

exports.updateEvent = (req, res) => {
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

  console.log("📥 Updating event:", eventId, req.body);

  const totalSeatsNum = parseInt(total_seats);
  const availableSeatsNum = parseInt(available_seats);
  const priceNum = parseInt(price);

  if (isNaN(totalSeatsNum) || totalSeatsNum <= 0) {
    return res.status(400).json({
      error: "Total seats must be a positive number",
    });
  }

  if (isNaN(availableSeatsNum) || availableSeatsNum < 0) {
    return res.status(400).json({
      error: "Available seats must be a valid number",
    });
  }

  if (isNaN(priceNum) || priceNum < 0) {
    return res.status(400).json({
      error: "Price must be a valid number",
    });
  }

  const query = `
    UPDATE events 
    SET title=?, description=?, location=?, date=?, total_seats=?, available_seats=?, price=?, img=?
    WHERE id=?`;

  const values = [
    title,
    description || "",
    location,
    date,
    totalSeatsNum,
    availableSeatsNum,
    priceNum,
    img || "",
    parseInt(eventId),
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("❌ Error updating event:", err);
      return res.status(500).json({ error: "Failed to update event" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("✅ Event updated successfully");
    res.json({ message: "Event updated successfully" });
  });
};

exports.deleteEvent = (req, res) => {
  const eventId = req.params.id;

  console.log("🗑️ Deleting event:", eventId);

  const checkBookingsQuery =
    "SELECT COUNT(*) as bookingCount FROM bookings WHERE event_id = ?";

  db.query(checkBookingsQuery, [eventId], (err, bookingResults) => {
    if (err) {
      console.error("❌ Error checking bookings:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (bookingResults[0].bookingCount > 0) {
      return res.status(400).json({
        message: "Cannot delete event with existing bookings",
      });
    }

    const deleteQuery = "DELETE FROM events WHERE id=?";
    db.query(deleteQuery, [eventId], (err, results) => {
      if (err) {
        console.error("❌ Error deleting event:", err);
        return res.status(500).json({ error: "Failed to delete event" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Event not found" });
      }

      console.log("✅ Event deleted successfully");
      res.json({ message: "Event deleted successfully" });
    });
  });
};

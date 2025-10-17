const db = require("../db");

exports.getAllBookings = async (req, res) => {
  try {
    const query = `
      SELECT b.*, e.title as event_title, e.location as event_location 
      FROM bookings b 
      LEFT JOIN events e ON b.event_id = e.id
    `;
    const results = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const query = `
      SELECT b.*, e.title as event_title, e.location as event_location 
      FROM bookings b 
      LEFT JOIN events e ON b.event_id = e.id 
      WHERE b.id=?
    `;
    const results = await db.query(query, [bookingId]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(results[0]);
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { event_id, name, email, mobile, quantity } = req.body;

    if (!event_id || !name || !email || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const checkSeatsQuery =
      "SELECT available_seats, price, title FROM events WHERE id=?";
    const eventResults = await db.query(checkSeatsQuery, [event_id]);

    if (eventResults.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    const availableSeats = eventResults[0].available_seats;
    const pricePerTicket = eventResults[0].price;
    const eventTitle = eventResults[0].title;

    if (quantity > availableSeats) {
      return res.status(400).json({
        message: `Only ${availableSeats} seats available for "${eventTitle}"`,
      });
    }

    const totalAmount = quantity * pricePerTicket;

    const insertQuery = `
      INSERT INTO bookings (event_id, name, email, mobile, quantity, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?, 'confirmed')`;

    const result = await db.query(insertQuery, [
      event_id,
      name,
      email,
      mobile,
      quantity,
      totalAmount,
    ]);

    const updateSeatsQuery =
      "UPDATE events SET available_seats = available_seats - ? WHERE id=?";
    await db.query(updateSeatsQuery, [quantity, event_id]);

    res.status(201).json({
      message: "Booking successful",
      bookingId: result.insertId,
      totalAmount,
      eventTitle,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (status === "cancelled") {
      const getBookingQuery =
        "SELECT event_id, quantity FROM bookings WHERE id=?";
      const bookingResults = await db.query(getBookingQuery, [bookingId]);

      if (bookingResults.length === 0) {
        return res.status(404).json({ message: "Booking not found" });
      }

      const { event_id, quantity } = bookingResults[0];

      const updateBookingQuery = "UPDATE bookings SET status=? WHERE id=?";
      await db.query(updateBookingQuery, [status, bookingId]);

      const updateSeatsQuery =
        "UPDATE events SET available_seats = available_seats + ? WHERE id=?";
      await db.query(updateSeatsQuery, [quantity, event_id]);

      res.json({ message: "Booking cancelled and seats updated successfully" });
    } else {
      const query = "UPDATE bookings SET status=? WHERE id=?";
      await db.query(query, [status, bookingId]);
      res.json({ message: "Booking updated successfully" });
    }
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const getBookingQuery =
      "SELECT event_id, quantity, status FROM bookings WHERE id=?";
    const bookingResults = await db.query(getBookingQuery, [bookingId]);

    if (bookingResults.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const { event_id, quantity, status } = bookingResults[0];

    if (status === "confirmed") {
      const updateSeatsQuery =
        "UPDATE events SET available_seats = available_seats + ? WHERE id=?";
      await db.query(updateSeatsQuery, [quantity, event_id]);
    }

    const deleteQuery = "DELETE FROM bookings WHERE id=?";
    await db.query(deleteQuery, [bookingId]);

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

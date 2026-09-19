const db = require("../db");

// GET ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {
    const query = `
      SELECT 
        b.*, 
        e.title AS event_title, 
        e.location AS event_location
      FROM bookings b
      LEFT JOIN events e ON b.event_id = e.id
    `;

    const [results] = await db.query(query);

    res.json(results);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET BOOKING BY ID
exports.getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const query = `
      SELECT 
        b.*, 
        e.title AS event_title, 
        e.location AS event_location
      FROM bookings b
      LEFT JOIN events e ON b.event_id = e.id
      WHERE b.id = ?
    `;

    const [results] = await db.query(query, [bookingId]);

    if (results.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const {
      event_id,
      name,
      email,
      mobile,
      quantity,
    } = req.body;

    // Validate required fields
    if (!event_id || !name || !email || !quantity) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Convert numbers properly
    const eventIdNum = Number(event_id);
    const quantityNum = Number(quantity);

    if (Number.isNaN(eventIdNum) || Number.isNaN(quantityNum)) {
      return res.status(400).json({
        message: "Invalid event ID or quantity",
      });
    }

    // Get event details
    const checkSeatsQuery = `
      SELECT available_seats, price, title
      FROM events
      WHERE id = ?
    `;

    const [eventResults] = await db.query(
      checkSeatsQuery,
      [eventIdNum]
    );

    if (eventResults.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const availableSeats = Number(eventResults[0].available_seats);
    const pricePerTicket = Number(eventResults[0].price);
    const eventTitle = eventResults[0].title;

    // Check price
    if (Number.isNaN(pricePerTicket)) {
      return res.status(400).json({
        message: "Event price is invalid",
      });
    }

    // Check seats
    if (quantityNum > availableSeats) {
      return res.status(400).json({
        message: `Only ${availableSeats} seats available for "${eventTitle}"`,
      });
    }

    // Calculate total
    const totalAmount = quantityNum * pricePerTicket;

    // Insert booking
    const insertQuery = `
      INSERT INTO bookings
      (
        event_id,
        name,
        email,
        mobile,
        quantity,
        total_amount,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, 'confirmed')
    `;

    const [result] = await db.query(insertQuery, [
      eventIdNum,
      name,
      email,
      mobile,
      quantityNum,
      totalAmount,
    ]);

    // Reduce available seats
    const updateSeatsQuery = `
      UPDATE events
      SET available_seats = available_seats - ?
      WHERE id = ?
    `;

    await db.query(updateSeatsQuery, [
      quantityNum,
      eventIdNum,
    ]);

    res.status(201).json({
      message: "Booking successful",
      bookingId: result.insertId,
      totalAmount,
      eventTitle,
    });
  } catch (err) {
    console.error("Error creating booking:", err);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// UPDATE BOOKING
exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    // Cancel booking
    if (status === "cancelled") {
      const getBookingQuery = `
        SELECT event_id, quantity, status
        FROM bookings
        WHERE id = ?
      `;

      const [bookingResults] = await db.query(
        getBookingQuery,
        [bookingId]
      );

      if (bookingResults.length === 0) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      const {
        event_id,
        quantity,
        status: currentStatus,
      } = bookingResults[0];

      // Prevent adding seats twice
      if (currentStatus === "cancelled") {
        return res.status(400).json({
          message: "Booking is already cancelled",
        });
      }

      // Update booking status
      const updateBookingQuery = `
        UPDATE bookings
        SET status = ?
        WHERE id = ?
      `;

      await db.query(updateBookingQuery, [
        status,
        bookingId,
      ]);

      // Return seats
      const updateSeatsQuery = `
        UPDATE events
        SET available_seats = available_seats + ?
        WHERE id = ?
      `;

      await db.query(updateSeatsQuery, [
        quantity,
        event_id,
      ]);

      return res.json({
        message:
          "Booking cancelled and seats updated successfully",
      });
    }

    // Other status updates
    const query = `
      UPDATE bookings
      SET status = ?
      WHERE id = ?
    `;

    const [result] = await db.query(query, [
      status,
      bookingId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      message: "Booking updated successfully",
    });
  } catch (err) {
    console.error("Error updating booking:", err);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// DELETE BOOKING
exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const getBookingQuery = `
      SELECT event_id, quantity, status
      FROM bookings
      WHERE id = ?
    `;

    const [bookingResults] = await db.query(
      getBookingQuery,
      [bookingId]
    );

    if (bookingResults.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const {
      event_id,
      quantity,
      status,
    } = bookingResults[0];

    // Return seats if booking was confirmed
    if (status === "confirmed") {
      const updateSeatsQuery = `
        UPDATE events
        SET available_seats = available_seats + ?
        WHERE id = ?
      `;

      await db.query(updateSeatsQuery, [
        quantity,
        event_id,
      ]);
    }

    // Delete booking
    const deleteQuery = `
      DELETE FROM bookings
      WHERE id = ?
    `;

    await db.query(deleteQuery, [bookingId]);

    res.json({
      message: "Booking deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting booking:", err);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
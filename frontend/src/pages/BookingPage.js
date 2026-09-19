import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      const bookingData = {
        event_id: parseInt(id),
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        quantity: parseInt(formData.quantity),
      };

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );

      alert(
        `🎉 Booking Successful!\nBooking ID: ${response.data.bookingId}\nTotal Amount: ₹${response.data.totalAmount}`
      );

      navigate("/events");
    } catch (err) {
      console.error("Booking error:", err);
      alert(err.response?.data?.message || "Booking Failed"); 
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16 flex items-center justify-center">
        <div className="text-white text-xl">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16 flex items-center justify-center">
        <div className="text-white text-xl">Event not found</div>
        <Link to="/events" className="ml-4 text-blue-400 hover:text-blue-300">
          Back to Events
        </Link>
      </div>
    );
  }

  const totalAmount = formData.quantity * event.price;
  const isAvailable = event.available_seats > 0;
  const maxQuantity = Math.min(event.available_seats, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16">
      <div className="max-w-4xl mx-auto p-6">
        <Link
          to={`/event/${id}`}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          ← Back to Event Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Event Summary</h2>

            <img
              src={event.img}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-300 mb-4">{event.description}</p>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span>{event.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span>{new Date(event.date).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Available Seats:</span>
                <span
                  className={
                    event.available_seats > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {event.available_seats}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price per ticket:</span>
                <span className="text-blue-400 font-semibold">
                  ₹{event.price}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Book Your Tickets</h2>

            {!isAvailable ? (
              <div className="text-center py-8">
                <div className="text-red-400 text-lg mb-4">😔 Sold Out!</div>
                <p className="text-gray-300 mb-4">
                  This event is completely booked.
                </p>
                <Link
                  to="/events"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white"
                >
                  Browse Other Events
                </Link>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-blue-400 focus:outline-none text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-blue-400 focus:outline-none text-white"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-blue-400 focus:outline-none text-white"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Tickets (Max: {maxQuantity}) *
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-blue-400 focus:outline-none text-white"
                  >
                    {[...Array(maxQuantity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Ticket{i + 1 > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span>Price per ticket:</span>
                    <span>₹{event.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Quantity:</span>
                    <span>{formData.quantity}</span>
                  </div>
                  <hr className="border-white/20 my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-green-400">₹{totalAmount}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bookingLoading
                    ? "Processing..."
                    : `Confirm Booking - ₹${totalAmount}`}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By booking, you agree to our terms and conditions
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center text-white">
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center text-white">
        Event not found
      </div>
    );
  }

  const isAvailable = event.available_seats > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16">
      <motion.div
        className="max-w-6xl mx-auto p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link
          to="/events"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          ← Back to All Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-gray-300 text-lg mb-6">{event.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <span className="text-gray-400 w-32">📍 Location:</span>
                <span className="text-white">{event.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-32">📅 Date & Time:</span>
                <span className="text-white">
                  {new Date(event.date).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-32">💰 Price:</span>
                <span className="text-blue-400 font-bold text-xl">
                  ₹{event.price}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-32">🎫 Seats Available:</span>
                <span
                  className={`font-semibold ${
                    event.available_seats > 10
                      ? "text-green-400"
                      : event.available_seats > 0
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {event.available_seats} / {event.total_seats}
                </span>
              </div>
            </div>

            {isAvailable ? (
              <Link to={`/booking/${event.id}`}>
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎟️ Book Tickets Now
                </motion.button>
              </Link>
            ) : (
              <button
                disabled
                className="bg-gray-600 text-gray-400 px-8 py-4 rounded-xl font-bold text-lg cursor-not-allowed"
              >
                Sold Out
              </button>
            )}

            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <h3 className="font-semibold mb-2">📋 Event Highlights</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Instant confirmation</li>
                <li>• Easy cancellation</li>
                <li>• Best price guarantee</li>
                <li>• 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    total_seats: "",
    available_seats: "",
    price: "",
    img: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setMessage("Error loading events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        date: formData.date,
        total_seats: formData.total_seats ? parseInt(formData.total_seats) : 0,
        available_seats: formData.available_seats
          ? parseInt(formData.available_seats)
          : 0,
        price: formData.price ? parseInt(formData.price) : 0,
        img: formData.img.trim() || "",
      };

      console.log("📤 Sending data to backend:", submitData);

      if (editingId) {
        const originalEvent = events.find((event) => event.id === editingId);
        submitData.available_seats = originalEvent.available_seats;

        await axios.put(
          `http://localhost:5000/api/events/${editingId}`,
          submitData
        );
        setMessage("✅ Event updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/events", submitData);
        setMessage("✅ Event created successfully!");
      }

      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        total_seats: "",
        available_seats: "",
        price: "",
        img: "",
      });
      setEditingId(null);

      setTimeout(() => {
        fetchEvents();
      }, 1000);
    } catch (err) {
      console.error("❌ Error saving event:", err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Error saving event";
      setMessage(
        typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description || "",
      location: event.location,
      date: event.date.slice(0, 16),
      total_seats: event.total_seats.toString(),
      available_seats: event.available_seats.toString(),
      price: event.price.toString(),
      img: event.img || "",
    });
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setMessage("✅ Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      const errorMsg = err.response?.data?.message || "Error deleting event";
      setMessage(
        typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg)
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      date: "",
      total_seats: "",
      available_seats: "",
      price: "",
      img: "",
    });
    setMessage("");
  };

  const getMessageType = () => {
    if (!message) return "info";
    const msgString =
      typeof message === "string" ? message : JSON.stringify(message);
    return msgString.toLowerCase().includes("error") ? "error" : "success";
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16 p-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg text-white p-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h2>

        {message && (
          <div
            className={`p-4 mb-6 rounded-lg ${
              getMessageType() === "error"
                ? "bg-red-500/20 border border-red-500"
                : "bg-green-500/20 border border-green-500"
            }`}
          >
            {typeof message === "string" ? message : JSON.stringify(message)}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 bg-white/10 p-6 rounded-2xl shadow-inner"
        >
          <h3 className="text-2xl font-semibold mb-2">
            {editingId ? "✏️ Edit Event" : "➕ Create New Event"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Event Title *"
              className="w-full p-3 rounded bg-white/20 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300 border border-white/30"
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location *"
              className="w-full p-3 rounded bg-white/20 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300 border border-white/30"
              required
            />
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/20 focus:ring-2 focus:ring-blue-400 text-white border border-white/30"
              required
            />
            <input
              type="number"
              name="total_seats"
              value={formData.total_seats}
              onChange={handleChange}
              placeholder="Total Seats *"
              min="1"
              className="w-full p-3 rounded bg-white/20 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300 border border-white/30"
              required
            />
            <input
              type="number"
              name="available_seats"
              value={formData.available_seats}
              onChange={handleChange}
              placeholder="Available Seats *"
              min="1"
              className="w-full p-3 rounded bg-white/20 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300 border border-white/30"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (₹) *"
              min="0"
              className="w-full p-3 rounded bg-white/20 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300 border border-white/30"
              required
            />
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              className="w-full p-3 rounded bg-white/20 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300 border border-white/30"
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description *"
            rows="3"
            className="w-full p-3 rounded bg-white/20 focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300 border border-white/30"
            required
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white disabled:opacity-50 flex items-center gap-2"
            >
              {loading
                ? "⏳ Processing..."
                : editingId
                ? "📝 Update Event"
                : "✅ Create Event"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded text-white"
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </form>

        <div className="bg-white/5 rounded-lg overflow-hidden">
          <h3 className="text-2xl font-semibold p-4 bg-white/10">
            📋 Manage Events ({events.length})
          </h3>

          {events.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No events found. Create your first event above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/10">
                  <tr>
                    <th className="py-3 px-4">Event Title</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Total Seats</th>
                    <th className="py-3 px-4">Available Seats</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-gray-700 hover:bg-white/10 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold">{event.title}</td>
                      <td className="py-3 px-4">{event.location}</td>
                      <td className="py-3 px-4">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">₹{event.price}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            event.available_seats === 0
                              ? "bg-red-500/20 text-red-400"
                              : event.available_seats <= 10
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {event.available_seats}/{event.total_seats}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white text-sm"
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

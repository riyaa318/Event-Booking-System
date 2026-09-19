import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { motion } from "framer-motion";
import axios from "axios";

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [backendError, setBackendError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("🔄 Fetching events from backend...");
        const res = await axios.get("http://localhost:5000/api/events");
        console.log("✅ Events from backend:", res.data);
        setEvents(res.data);
        setBackendError(false);
      } catch (err) {
        console.error("❌ Error fetching events from backend:", err);
        setBackendError(true);
        setEvents([
          {
            id: 1,
            title: "Tech Conference 2025",
            date: "2025-11-20T09:00:00",
            location: "New York",
            img: "/assets/tech.png",
            description:
              "Join the biggest tech conference of the year with industry leaders sharing insights on AI, ML, and future technologies.",
            price: 2999,
            total_seats: 100,
            available_seats: 45,
          },
          {
            id: 2,
            title: "Art Exhibition",
            date: "2025-12-05T10:00:00",
            location: "San Francisco",
            img: "/assets/art.png",
            description:
              "Experience the world of colors, creativity, and imagination at our Art Exhibition!",
            price: 1999,
            total_seats: 50,
            available_seats: 15,
          },
          {
            id: 3,
            title: "Music Concert",
            date: "2025-12-15T18:00:00",
            location: "Online",
            img: "/assets/music.png",
            description:
              "Feel the rhythm, lose yourself in the beats, join us for an unforgettable Music Concert!",
            price: 1499,
            total_seats: 200,
            available_seats: 0,
          },
          {
            id: 4,
            title: "Dance Battle",
            date: "2025-11-25T14:00:00",
            location: "New York",
            img: "/assets/dance.png",
            description:
              "Clash of moves, fire of rhythm, witness the ultimate Dance Battle where every step tells a story!",
            price: 2499,
            total_seats: 80,
            available_seats: 5,
          },
          {
            id: 5,
            title: "Treasure Hunt",
            date: "2025-12-10T11:00:00",
            location: "San Francisco",
            img: "/assets/treasure.png",
            description:
              "Decode the clues, chase the thrill, embark on an adventurous Treasure Hunt where only the sharpest minds win!",
            price: 1799,
            total_seats: 60,
            available_seats: 25,
          },
          {
            id: 6,
            title: "Gaming Tournament",
            date: "2025-12-20T16:00:00",
            location: "Online",
            img: "/assets/gaming.png",
            description:
              "Gear up, level up, and battle it out — join the ultimate Gaming Tournament for glory and victory!",
            price: 1299,
            total_seats: 150,
            available_seats: 8,
          },
        ]);
      } finally {   
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      !locationFilter ||
      event.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesDate = !dateFilter || event.date.includes(dateFilter);

    return matchesSearch && matchesLocation && matchesDate;
  });

  const locations = [...new Set(events.map((event) => event.location))];
  const dates = [...new Set(events.map((event) => event.date.split("T")[0]))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16 flex items-center justify-center">
        <div className="text-white text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16">
      <motion.section
        className="section px-6 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-white text-center">
          Upcoming Events
        </h2>

        {backendError && (
          <div className="max-w-7xl mx-auto mb-4 p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg text-yellow-300">
            ⚠️ Using demo data. Backend connection failed. Make sure backend is
            running on port 5000.
          </div>
        )}

        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Find Your Perfect Event
            </h3>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search events by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">
                  Filter by Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">Filter by Date</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
                >
                  <option value="">All Dates</option>
                  {dates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(searchTerm || locationFilter || dateFilter) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setDateFilter("");
                }}
                className="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white text-sm"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="text-white mb-4">
            Showing {filteredEvents.length} of {events.length} events
            {backendError && " (Demo Data)"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center text-white text-xl mt-8">
            No events found matching your criteria. Try adjusting your filters.
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default EventListing;

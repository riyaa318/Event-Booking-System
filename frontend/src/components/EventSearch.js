import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EventCard from "../components/EventCard";
import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "2025-11-20",
    location: "New York",
    img: "/assets/tech.png",
    description:
      "Join the biggest tech conference of the year with industry leaders",
    price: 2999,
  },
  {
    id: 2,
    title: "Art Exhibition",
    date: "2025-12-05",
    location: "San Francisco",
    img: "/assets/art.png",
    description:
      "Experience the world of colors, creativity, and imagination at our Art Exhibition!",
    price: 1999,
  },
  {
    id: 3,
    title: "Music Concert",
    date: "2025-12-15",
    location: "Online",
    img: "/assets/music.png",
    description:
      "Feel the rhythm, lose yourself in the beats, join us for an unforgettable Music Concert!",
    price: 1499,
  },
  {
    id: 4,
    title: "Dance Battle",
    date: "2025-11-20",
    location: "New York",
    img: "/assets/dance.png",
    description:
      "Clash of moves, fire of rhythm, witness the ultimate Dance Battle where every step tells a story!",
    price: 2999,
  },
  {
    id: 5,
    title: "Treasure Hunt",
    date: "2025-12-05",
    location: "San Francisco",
    img: "/assets/treasure.png",
    description:
      "Decode the clues, chase the thrill, embark on an adventurous Treasure Hunt where only the sharpest minds win!",
    price: 1999,
  },
  {
    id: 6,
    title: "Gaming",
    date: "2025-12-15",
    location: "Online",
    img: "/assets/gaming.png",
    description:
      "Gear up, level up, and battle it out, join the ultimate Gaming Tournament for glory and victory!",
    price: 1499,
  },
];

const EventSearch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialLocation = queryParams.get("location") || "";

  const [filteredEvents, setFilteredEvents] = useState(events);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    let result = events;

    if (locationFilter) {
      result = result.filter((ev) =>
        ev.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      result = result.filter((ev) => ev.date === dateFilter);
    }

    setFilteredEvents(result);
  }, [locationFilter, dateFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16">
      <motion.section
        className="section px-6 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-white text-center">
          Search Events
        </h2>

        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-2 rounded bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 rounded bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((ev) => <EventCard key={ev.id} event={ev} />)
          ) : (
            <p className="text-white text-center col-span-3">
              No events found for this filter.
            </p>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default EventSearch;

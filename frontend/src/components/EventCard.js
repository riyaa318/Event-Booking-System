import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const isFewLeft = event.available_seats > 0 && event.available_seats <= 10;
  const isSoldOut = event.available_seats === 0;

  const getStatusColor = () => {
    if (isSoldOut) return "text-red-400 bg-red-400/20";
    if (isFewLeft) return "text-yellow-400 bg-yellow-400/20";
    return "text-green-400 bg-green-400/20";
  };

  const getStatusText = () => {
    if (isSoldOut) return "Sold Out";
    if (isFewLeft) return "Few Left";
    return "Available";
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/10 relative group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="overflow-hidden h-48 relative"
        variants={imageVariants}
      >
        <img
          src={event.img}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div
          className={`absolute top-3 right-3 ${getStatusColor()} px-3 py-1 rounded-full text-sm font-semibold`}
        >
          {getStatusText()}
        </div>

        <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
          {event.available_seats}/{event.total_seats} seats
        </div>
      </motion.div>

      <motion.div className="p-6 text-white" variants={contentVariants}>
        <h2 className="text-xl font-bold mb-3 line-clamp-2">{event.title}</h2>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-400">
            <span className="mr-2">📍</span>
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <span className="mr-2">📅</span>
            {new Date(event.date).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-blue-400 font-bold text-lg">
            ₹{event.price}
          </span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>
        </div>

        {isSoldOut ? (
          <button
            disabled
            className="w-full bg-gray-600 text-gray-400 py-3 rounded-xl font-semibold cursor-not-allowed"
          >
            Sold Out
          </button>
        ) : (
          <Link to={`/booking/${event.id}`}>
            <motion.button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {isFewLeft ? "Book Fast! Few Left" : "Book Now"}
            </motion.button>
          </Link>
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
}

export default EventCard;

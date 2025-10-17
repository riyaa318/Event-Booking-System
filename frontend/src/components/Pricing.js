import React from "react";
import { motion } from "framer-motion";

const tickets = [
  {
    type: "Standard",
    price: "$49",
    features: [
      "Access to all talks",
      "Networking opportunities",
      "Event goodies",
    ],
  },
  {
    type: "Premium",
    price: "$99",
    features: [
      "All Standard benefits",
      "VIP seating",
      "Exclusive workshop access",
    ],
  },
  {
    type: "VIP",
    price: "$199",
    features: [
      "All Premium benefits",
      "Meet & greet with speakers",
      "Special gift pack",
    ],
  },
];

const TicketSection = () => {
  return (
    <motion.section
      className="h-screen bg-gradient- #1c1b1c, #1a1a1b, #383738 flex flex-col justify-center items-center text-center px-6"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h2 className="text-5xl font-bold mb-12 text-white">Ticket Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        {tickets.map((ticket, idx) => (
          <motion.div
            key={idx}
            className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg cursor-pointer p-6 flex flex-col text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">
              {ticket.type}
            </h3>
            <p className="text-3xl font-bold mb-6 text-blue-400">
              {ticket.price}
            </p>
            <ul className="text-gray-200 mb-6 space-y-2">
              {ticket.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>
            <button className="btn bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mx-auto">
              Book Now
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TicketSection;

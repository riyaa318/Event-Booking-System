import React from "react";
import { motion } from "framer-motion";

const sponsors = [
  "/assets/sponsor1.png",
  "/assets/sponsor2.png",
  "/assets/sponsor3.png",
  "/assets/sponsor4.png",
  "/assets/sponsor5.png",
  "/assets/sponsor6.png",
];

const Sponsors = () => {
  return (
    <motion.section
      className="h-screen bg-gradient- #1c1b1c, #1a1a1b, #383738 flex flex-col justify-center items-center text-center px-6"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h2 className="text-5xl font-bold mb-12 text-white">Our Sponsors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-5xl items-center">
        {sponsors.map((sponsor, idx) => (
          <motion.div
            key={idx}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex justify-center items-center cursor-pointer shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={sponsor}
              alt={`Sponsor ${idx + 1}`}
              className="w-48 h-28 object-contain filter brightness-110"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Sponsors;

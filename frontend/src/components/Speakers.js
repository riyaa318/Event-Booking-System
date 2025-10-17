import React from "react";
import { motion } from "framer-motion";

const speakers = [
  { name: "Aarav Mehta", role: "AI Researcher", img: "/assets/speaker1.png" },
  {
    name: "Vansh Sharma",
    role: "Blockchain Expert",
    img: "/assets/speaker2.png",
  },
  {
    name: "Kabir Patel",
    role: "Product Designer",
    img: "/assets/speaker3.png",
  },
];

const SpeakersSection = () => {
  return (
    <motion.section
      className="h-screen bg-gradient- #1c1b1c, #1a1a1b, #383738 flex flex-col justify-center items-center text-center px-6"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h2 className="text-5xl font-bold mb-10">Meet Our Speakers</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {speakers.map((sp, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg w-64"
          >
            <img
              src={sp.img}
              alt={sp.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white/40"
            />
            <h3 className="text-xl font-semibold">{sp.name}</h3>
            <p className="text-gray-200">{sp.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SpeakersSection;

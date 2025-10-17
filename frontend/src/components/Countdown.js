import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-12-31T00:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <motion.section
      className="h-screen flex flex-col justify-center items-center bg- #1c1b1c, #1a1a1b, #383738 text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h2 className="text-5xl font-bold mb-10">Countdown to Event</h2>
      <div className="flex text-center">
        {Object.keys(timeLeft).map((interval, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1 }}
            className="bg-white/20 backdrop-blur-md p-6 rounded-2xl w-28"
          >
            <p className="text-4xl font-bold">{timeLeft[interval]}</p>
            <p className="text-lg">{interval}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Countdown;

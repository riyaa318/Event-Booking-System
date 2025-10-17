import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.section
      id="hero"
      style={{ scale, opacity }}
      className="h-screen flex flex-col justify-center items-center text-center text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 z-0"></div>
      <motion.img
        src="/assets/bg.png"
        alt="Event Background"
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      />
      <div className="relative z-10 max-w-3xl px-4">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
        >
          Transform Your Future
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-xl text-gray-100 mb-8"
        >
          Join the most inspiring tech event of the year. Learn, connect, and
          grow.
        </motion.p>
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(255,255,255,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-all"
        >
          Register Now
        </motion.button>
      </div>

      <motion.div
        className="absolute bottom-10 flex flex-col items-center text-sm text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span></span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-1.5 h-1.5 bg-white rounded-full mt-2"
        />
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;

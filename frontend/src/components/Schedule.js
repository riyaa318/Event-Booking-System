import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    time: "10:00 AM",
    title: "Opening Ceremony",
    desc: "Kick off the event with music, lights, and welcome speeches!",
    img: "/assets/event1.png",
  },
  {
    time: "11:00 AM",
    title: "Speaker Sessions",
    desc: "Learn from industry leaders about the latest in tech.",
    img: "/assets/event2.png",
  },
  {
    time: "02:00 PM",
    title: "Networking Lunch",
    desc: "Connect with other attendees over a delightful meal.",
    img: "/assets/event3.png",
  },
  {
    time: "04:00 PM",
    title: "Workshops & Challenges",
    desc: "Hands-on sessions and coding challenges for participants.",
    img: "/assets/event4.png",
  },
];

const ScheduleSection = () => {
  return (
    <motion.section
      className="section h-screen flex flex-col justify-center items-center px-6 bg- #1c1b1c, #1a1a1b, #383738 backdrop-blur-md rounded-3xl my-12"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h2 className="text-5xl font-bold mb-12 text-white">Event Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {events.map((event, idx) => {
          const isFirstTwo = idx < 2;

          return (
            <motion.div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg cursor-pointer flex flex-col"
              initial={{ opacity: 0, scale: 1, y: 20 }}
              whileInView={{
                opacity: 1,
                scale: isFirstTwo ? 0.95 : 1,
                y: 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="relative w-full h-64 md:h-72 lg:h-80">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-300 mb-2">{event.time}</p>
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-200 flex-grow">{event.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default ScheduleSection;

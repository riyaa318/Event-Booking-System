import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is the event about?",
    a: "The event focuses on technology, innovation, and networking with industry leaders.",
  },
  {
    q: "Where will it be held?",
    a: "It will be held at our virtual platform and physical venue in Mumbai.",
  },
  {
    q: "How do I book tickets?",
    a: "You can book tickets using the 'Book Now' button in the Ticket Section.",
  },
  {
    q: "Are there any group discounts?",
    a: "Yes, we offer group discounts for 5+ attendees.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <motion.section
      className="h-screen bg- #1c1b1c, #1a1a1b, #383738 flex flex-col justify-center items-center text-center px-6"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h2 className="text-5xl font-bold mb-12 text-white">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl w-full space-y-4 text-left">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            className="bg-white/10 backdrop-blur-md p-4 rounded-2xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => toggleIndex(idx)}
          >
            <h3 className="text-xl font-semibold">{faq.q}</h3>
            {activeIndex === idx && (
              <p className="mt-2 text-gray-200">{faq.a}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FAQ;

import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Eventify</h2>
          <p className="text-gray-300 text-sm">
            Smart Event Booking System. Browse events, book tickets, and enjoy
            seamless experiences.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>
              <a href="#hero" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#speakers" className="hover:text-blue-400 transition">
                Speakers
              </a>
            </li>
            <li>
              <a href="#schedule" className="hover:text-blue-400 transition">
                Schedule
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-blue-400 transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-blue-400 transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Contact</h2>
          <p className="text-gray-300 text-sm">Email: support@eventify.com</p>
          <p className="text-gray-300 text-sm">Phone: +91 98765 43210</p>
        </div>
      </div>
      <div className="bg-gray-900 text-gray-400 text-center py-4 mt-4">
        &copy; {new Date().getFullYear()} Eventify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#1c1b1c] shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
              Eventify
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-white hover:text-blue-600">
              Home
            </Link>
            <Link to="/events" className="text-white hover:text-blue-600">
              Events
            </Link>
            <Link to="/admin" className="text-white hover:text-blue-600">
              Admin
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#1c1b1c] px-4 pt-2 pb-4 space-y-2 shadow-md">
          <Link
            to="/"
            className="block text-white hover:text-blue-600 py-2"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/events"
            className="block text-white hover:text-blue-600 py-2"
            onClick={toggleMenu}
          >
            Events
          </Link>
          <a
            href="#speakers"
            className="block text-white hover:text-blue-600 py-2"
            onClick={toggleMenu}
          >
            Speakers
          </a>
          <a
            href="#schedule"
            className="block text-white hover:text-blue-600 py-2"
            onClick={toggleMenu}
          >
            Schedule
          </a>
          <a
            href="#pricing"
            className="block text-white hover:text-blue-600 py-2"
            onClick={toggleMenu}
          >
            Pricing
          </a>
          <a
            href="#sponsors"
            className="block text-white hover:text-blue-600 py-2"
            onClick={toggleMenu}
          >
            Sponsors
          </a>
          <Link
            to="/admin"
            className="block text-white hover:text-blue-600 py-2"
            onClick={toggleMenu}
          >
            Admin
          </Link>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

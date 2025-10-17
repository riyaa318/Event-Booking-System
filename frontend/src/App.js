import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Countdown from "./components/Countdown";
import Speakers from "./components/Speakers";
import Schedule from "./components/Schedule";
import Pricing from "./components/Pricing";
import Sponsors from "./components/Sponsors";
import FAQ from "./components/Faq";
import Footer from "./components/Footer";

import EventListing from "./pages/EventListing";
import EventDetails from "./pages/EventDetails";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="App scroll-smooth">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <main className="pt-16">
                <section id="home">
                  <HeroSection />
                </section>
                <section id="countdown">
                  <Countdown />
                </section>
                <section id="speakers">
                  <Speakers />
                </section>
                <section id="schedule">
                  <Schedule />
                </section>
                <section id="pricing">
                  <Pricing />
                </section>
                <section id="sponsors">
                  <Sponsors />
                </section>
                <section id="faq">
                  <FAQ />
                </section>
              </main>
            }
          />

          <Route path="/events" element={<EventListing />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import HeroSection from "./HeroSection";
import Countdown from "./Countdown";
import Speakers from "./Speakers";
import Schedule from "./Schedule";
import Pricing from "./Pricing";
import Sponsors from "./Sponsors";
import FAQ from "./Faq";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <Countdown />
      <Speakers />
      <Schedule />
      <Pricing />
      <Sponsors />
      <FAQ />
    </div>
  );
};

export default LandingPage;

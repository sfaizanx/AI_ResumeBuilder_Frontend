import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SvgGuides from "../components/SvgGuides";
import ATSScoreLanding from "../components/AtsScoreLanding";
import HeroSection from "../components/HeroSection";
import Feature from "../components/Feature";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import DisplayTemplates from "../components/DisplayTemplates";

const LandingPage = ({ setTokenId }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setTokenId(id);
    }
  }, [id]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 ">
      {/* Hero Section */}
      <HeroSection />

      {/* ATSLandingCTA */}
      <ATSScoreLanding />

      {/* Features Section*/}
      <Feature />

      {/* SVG Display */}
      <SvgGuides />

      {/* Display Templates */}
      <DisplayTemplates />

      {/* Testimonials Section and Start Template */}
      <Testimonial />

      {/* FAQ Section */}
      <FAQ />

    </div>
  );
};

export default LandingPage;
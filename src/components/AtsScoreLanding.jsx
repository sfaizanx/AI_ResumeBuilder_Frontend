import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AtsScore from "../assets/ScoreAnime.png";
import SpeedIcon from "@mui/icons-material/Speed";
import { useNavigate } from "react-router-dom";

const AtsScoreLanding = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Image / Illustration */}
        <div
          className="w-full md:w-1/2 flex justify-center item-center"
          data-aos="fade-right"
        >
          <SpeedIcon
            fontSize="large"
            color="primary"
            sx={{
              fontSize: {
                xs: 150, // on extra small screens
                sm: 200, // on small screens
                md: 300, // on medium and up
              },
            }}
          />
        </div>

        {/* Text Content */}
        <div
          className="w-full md:w-1/2 text-center md:text-left"
          data-aos="fade-left"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 leading-tight">
            Check Your Resume’s ATS Score
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-md">
            Optimize your resume and boost your chances of getting shortlisted.
            Analyze your resume against job descriptions and improve it with our
            ATS checker.
          </p>
          <Button
          onClick={()=>navigate(`/atstester`)}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            size="large"
            sx={{
              background: "linear-gradient(to right, #3b82f6, #2563eb)",
              paddingX: 3,
              paddingY: 1.5,
              borderRadius: "9999px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(to right, #2563eb, #1d4ed8)",
              },
            }}
          >
            Check ATS Score
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AtsScoreLanding;

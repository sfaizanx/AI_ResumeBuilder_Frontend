import React from 'react'
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import {
  AutoAwesome
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/StarRate";


const HeroSection = () => {
  return (
        <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="PC.jpg"
            alt="AI Resume Builder Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-800/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white" data-aos="fade-right">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight animate-bounce">
                Create a Winning Resume with AI
              </h1>
              <p className="text-base md:text-xl mb-8 text-indigo-100">
                Our AI-powered platform helps you build professional,
                ATS-optimized resumes that get you noticed by employers and land
                more interviews.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button
                  onClick={() => {
                    const section = document.querySelector("#resumes");
                    section?.scrollIntoView({ behaviour: "smooth" });
                  }}
                  className="bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 sm:px-6 sm:py-3 rounded-button shadow-md font-medium text-sm sm:text-lg flex items-center justify-center whitespace-nowrap"
                >
                  <AutoAwesome className="mr-2" fontSize="small" />
                  Build My Resume
                </button>

                <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-4 py-2 sm:px-6 sm:py-3 rounded-button font-medium text-sm sm:text-lg flex items-center justify-center whitespace-nowrap">
                  <PlayCircleFilledWhiteIcon
                    className="mr-2"
                    fontSize="small"
                  />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img
                    src="AV1.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="AV2.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="AV3.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
                <div>
                  <div className="flex items-center text-yellow-400 mb-1">
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarHalfIcon fontSize="small" />
                    <span className="ml-2 text-white text-sm">4.8/5</span>
                  </div>
                  <p className="text-indigo-100 text-sm">
                    Trusted by 100,000+ job seekers
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              {/* Reserved for future image/animation */}
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection
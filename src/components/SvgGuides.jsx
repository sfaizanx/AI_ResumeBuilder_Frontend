import React, { useState } from "react";
import img1 from "../assets/choose.svg";
import img2 from "../assets/add_info.svg";
import img3 from "../assets/interview.svg";
import img4 from "../assets/at-work.svg";
import img5 from "../assets/click-here.svg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import CasesIcon from "@mui/icons-material/Cases";
import SpeedIcon from "@mui/icons-material/Speed";

const svgDisplay = [
  {
    id: 1,
    title: "Choose Your Template",
    img: img1,
    description:
      "Start by selecting a resume template that reflects your unique style and professional goals.",
    icon: <AssignmentIcon />, // Lucide icon name (can customize later)
  },
  {
    id: 2,
    title: "Add Your Information",
    img: img2,
    description:
      "Fill in your personal details, experiences, and skills easily and beautifully.",
    icon: <PermContactCalendarIcon />,
  },
  {
    id: 3,
    title: "Get Interview Calls",
    img: img3,
    description:
      "Stand out with an optimized resume designed to get you noticed by top companies.",
    icon: <PermPhoneMsgIcon />,
  },
  {
    id: 4,
    title: "Land Your Dream Job",
    img: img4,
    description:
      "Present your best self and succeed in interviews with confidence.",
    icon: <CasesIcon />,
  },
  {
    id: 5,
    title: "Check Your ATS Score",
    img: img5,
    description:
      "Ensure your resume passes modern ATS filters and gets directly to hiring managers.",
    icon: <SpeedIcon />,
  },
];

const TemplateSelector = () => {
  const [selected, setSelected] = useState(svgDisplay[0]);

  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Craft Your Future, Step by Step
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From picking your perfect resume style to landing interviews, we
            guide you every step to a successful career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Preview Column */}
          <div className="relative group shadow-xl rounded-3xl overflow-hidden bg-white/30 backdrop-blur-lg border border-gray-200">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-3xl"></div>
            <img
              src={selected.img}
              alt={selected.title}
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-3xl font-bold text-white">
                {selected.title}
              </h3>
            </div>
          </div>

          {/* Accordion Column */}
          <div className="space-y-6">
            {svgDisplay.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl shadow-md overflow-hidden transition-all duration-500 transform ${
                  selected.id === item.id
                    ? "ring-4 ring-blue-500/50 scale-[1.02] bg-gradient-to-r from-white to-blue-50"
                    : "bg-white hover:scale-[1.01]"
                }`}
              >
                <button
                  onClick={() => handleSelect(item)}
                  className="w-full flex justify-between items-center px-6 py-5 focus:outline-none"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-300 shadow-inner">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 text-left">
                      {item.title}
                    </h3>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <svg
                      className={`h-5 w-5 transition-transform duration-300 ${
                        selected.id === item.id
                          ? "rotate-180 text-blue-600"
                          : "text-gray-400"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>

                {selected.id === item.id && (
                  <div className="px-6 pb-6 animate-fade-in text-gray-600">
                    <p>{item.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;

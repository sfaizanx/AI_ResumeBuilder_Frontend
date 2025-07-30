import React, { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PlaceHolderData } from "../Constant/SampleData";
import {
  Print,
  Email,
  Phone,
  LinkedIn,
  PinDrop,
  Language,
} from "@mui/icons-material";
import { Fab, Tooltip, Zoom } from "@mui/material";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { BASE_URL } from "../Constant/constant";

const mergeObjects = (sample, actual) => {
  const result = { ...sample };
  for (const key in actual) {
    if (
      actual[key] !== "" &&
      actual[key] !== null &&
      actual[key] !== undefined
    ) {
      result[key] = actual[key];
    }
  }
  return result;
};

const ResumeTemplateTwo = ({ formData, selectedColor }) => {
  
  const mergedData = {
    personalInfo: mergeObjects(
      PlaceHolderData.personalInfo,
      formData.personalInfo || {}
    ),
    education: formData.education?.length
      ? formData.education
      : PlaceHolderData.education,
    experience: formData.experience?.length ? formData.experience : [],
    skills: formData.skills?.length ? formData.skills : PlaceHolderData.skills,
    projects: formData.projects?.length ? formData.projects : [],
    languages: formData.languages?.length
      ? formData.languages
      : PlaceHolderData.languages,
  };
  const { personalInfo, education, experience, skills, projects, languages } =
    mergedData;
  const componentRef = useRef(null);
  const location = useLocation();
  const pathname = location.pathname;
  const { id } = useParams();
  const { tokenVal, handleOpen } = useAuth();

  const handlePrint = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/Validtoken`, {
        headers: {
          Authorization: `Bearer ${tokenVal}`,
        },
      });

      if (res.data?.success) {
        const node = componentRef.current;
        node.style.width = "800px";
        node.style.padding = "32px";
        node.style.background = "white";

        const dataUrl = await toPng(node, {
          quality: 1.0,
          pixelRatio: 2,
          cacheBust: true,
        });

        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${personalInfo.firstName || "resume"}.pdf`);

        // Reset styles after save
        node.style.width = "";
        node.style.padding = "";
        node.style.background = "";
      } else {
        toast.info("Please login to print your resume");
        handleOpen();
      }
    } catch (err) {
      toast.info(
        "Session Expired or Invalid, please login to print your resume"
      );
      handleOpen();
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center  font-sans">
      <div
        ref={componentRef}
        className="w-full max-w-5xl bg-white shadow-lg print:shadow-none"
      >
        <div className="flex flex-row min-h-[800px]">
          {/* Left Section */}
          <div className="w-1/3 bg-[#f4f0fc] p-4 md:p-6 text-gray-800 space-y-4 md:space-y-6">
            {/* Contact Section */}
            <div>
  <h2
    className="text-[10px] md:text-base font-bold mb-3 gap-1 md:gap-2"
    style={{ color: selectedColor }}
  >
    CONTACT
  </h2>
  <div className="space-y-2">
    {personalInfo?.phone && (
      <div className="flex flex-row items-start gap-0 md:gap-2 text-xs md:text-sm break-all">
        <Phone
        fontSize="1px"
          className="w-2 h-2"
          style={{ color: selectedColor }}
        />
        <span className="text-[8px] md:text-base">{personalInfo.phone}</span>
      </div>
    )}
    {personalInfo?.email && (
      <div className="flex flex-row items-start gap-0 md:gap-2 text-xs md:text-sm break-all">
        <Email
        fontSize="1px"
          className="w-4 h-4"
          style={{ color: selectedColor }}
        />
        <span className="text-[8px] md:text-base">{personalInfo.email}</span>
      </div>
    )}
    {personalInfo?.linkedIn?.trim() && (
      <div className="flex flex-row items-start gap-0 md:gap-2 text-xs md:text-sm break-all">
        <LinkedIn
        fontSize="1px"
          className="w-4 h-4"
          style={{ color: selectedColor }}
        />
        <span className="text-[8px] md:text-base">{personalInfo.linkedIn}</span>
      </div>
    )}
    {personalInfo?.portfolio && (
      <div className="flex flex-row items-start gap-0 md:gap-2 text-xs md:text-sm break-all">
        <Language
        fontSize="1px"
          className="w-4 h-4"
          style={{ color: selectedColor }}
        />
        <span className="text-[8px] md:text-base">{personalInfo.portfolio}</span>
      </div>
    )}
  </div>
</div>


            {/* Address Section */}
            {personalInfo?.address && (
  <div>
    <h2
      className="text-[10px] md:text-base font-bold mb-3 flex items-start md:items-center gap-1 md:gap-2"
      style={{ color: selectedColor }}
    >
      ADDRESS
    </h2>
    <div className="flex flex-row items-start gap-0 md:gap-2 text-xs md:text-sm break-all">
      <PinDrop
      fontSize="1px"
        className="w-4 h-4"
        style={{ color: selectedColor }}
      />
      <span className="text-[8px] md:text-base">{personalInfo.address}</span>
    </div>
  </div>
)}


            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div>
                <h2
                  className="text-[10px] md:text-base font-bold mb-3"
                  style={{ color: selectedColor }}
                >
                  SKILLS
                </h2>
                <div className="space-y-1">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs md:text-sm"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <span className="text-[8px] md:text-base">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages Section */}
            {languages && languages.length > 0 && (
  <div>
    <h2
      className="text-[10px] md:text-base font-bold mb-3 flex items-center gap-1 md:gap-2"
      style={{ color: selectedColor }}
    >
      LANGUAGES
    </h2>
    <div className="space-y-2">
      {languages.map((lang, idx) => (
        <div
          key={idx}
          className="flex flex-row items-start gap-0 md:gap-2 text-xs md:text-sm break-all"
        >
          <Language
          fontSize="1px"
            className="w-4 h-4"
            style={{ color: selectedColor }}
          />
          <span className="text-[8px] md:text-base">
            {lang.language?.charAt(0).toUpperCase() + lang.language?.slice(1)}{" "}
            – {lang.proficiency}
          </span>
        </div>
      ))}
    </div>
  </div>
)}

          </div>

          {/* Right Section */}
          <div className="w-2/3 p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Header */}
            <div
              className="border-b pb-4"
              style={{ borderColor: selectedColor }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <h1
                  className="text-lg md:text-4xl font-bold"
                  style={{ color: selectedColor }}
                >
                  {personalInfo?.firstName} {personalInfo?.lastName}
                </h1>
                <div
                  className="hidden md:block text-xl"
                  style={{ color: selectedColor }}
                >
                  ★★★
                </div>
              </div>
              {personalInfo?.jobTitle && (
                <div
                  className="text-xs md:text-lg font-semibold tracking-widest mt-2"
                  style={{ color: selectedColor }}
                >
                  {personalInfo.jobTitle}
                </div>
              )}
            </div>

            {/* Objective */}
            {personalInfo?.jobDesc && (
              <div>
                <h2
                  className="text-xs md:text-lg font-bold border-b pb-1 mb-3"
                  style={{ color: selectedColor, borderColor: selectedColor }}
                >
                  OBJECTIVE
                </h2>
                <p className="text-[10px] md:text-base leading-relaxed">
                  {personalInfo.jobDesc}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <div>
                <h2
                  className="text-xs md:text-lg font-bold border-b pb-1 mb-4"
                  style={{ color: selectedColor, borderColor: selectedColor }}
                >
                  EXPERIENCE
                </h2>
                <div className="space-y-4">
                  {experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 pl-4 pb-4"
                      style={{ borderColor: selectedColor + "40" }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                        <div className="text-[8px] md:text-base">
                          <div className="font-semibold text-gray-800">
                            {exp.company}
                          </div>
                          <div
                            className="font-medium"
                            style={{ color: selectedColor }}
                          >
                            {exp.position}
                          </div>
                        </div>
                        <div className="text-[8px] md:text-sm text-gray-600 font-medium">
                          {exp.startDate} – {exp.endDate}
                        </div>
                      </div>
                      {exp.description && (
                        <div className="mt-2 text-[8px] md:text-sm text-gray-700 leading-relaxed">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <h2
                  className="text-xs md:text-lg font-bold border-b pb-1 mb-4"
                  style={{ color: selectedColor, borderColor: selectedColor }}
                >
                  EDUCATION
                </h2>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 pl-4"
                      style={{ borderColor: selectedColor + "40" }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                        <div className="text-[8px] md:text-base">
                          <div className="font-semibold text-gray-800">
                            {edu.institution}
                          </div>
                          <div
                            className="font-medium text-[8px] md:text-base"
                            style={{ color: selectedColor }}
                          >
                            {edu.degree}, {edu.field}
                          </div>
                        </div>
                        <div className="text-[9px] md:text-sm text-gray-600 font-medium">
                          {edu.startDate} - {edu.endDate}
                        </div>
                      </div>
                      {edu.description && (
                        <div className="mt-2 text-[8px] md:text-sm text-gray-700 leading-relaxed">
                          {edu.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <h2
                  className="text-xs md:text-lg font-bold border-b pb-1 mb-4"
                  style={{ color: selectedColor, borderColor: selectedColor }}
                >
                  PROJECTS
                </h2>
                <div className="space-y-4">
                  {projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 pl-4 pb-4"
                      style={{ borderColor: selectedColor + "40" }}
                    >
                      <div className="text-[8px] md:text-base font-semibold text-gray-800 mb-2">
                        {proj.name}
                      </div>
                      {proj.description && (
                        <div className="text-[8px] md:text-sm text-gray-700 leading-relaxed mb-2">
                          {proj.description}
                        </div>
                      )}
                      {proj.technologies && (
                        <div className="text-[8px] md:text-sm mb-2">
                          <strong style={{ color: selectedColor }}>
                            Tech:
                          </strong>{" "}
                          <span className="text-gray-700">
                            {Array.isArray(proj.technologies)
                              ? proj.technologies.join(", ")
                              : proj.technologies}
                          </span>
                        </div>
                      )}
                      {proj.link && (
                        <div className="text-[8px] md:text-sm">
                          <strong style={{ color: selectedColor }}>
                            Link:
                          </strong>{" "}
                          <a
                            href={proj.link}
                            className="text-blue-500 hover:text-blue-700 underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {proj.link}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print Button */}
      {pathname === `/preview/${id}` && (
        <div className="fixed bottom-28 right-8 z-50 ">
          <Tooltip title="Download PDF" arrow TransitionComponent={Zoom}>
            <Fab color="primary" aria-label="print" onClick={handlePrint}>
              <Print />
            </Fab>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default ResumeTemplateTwo;

import React, { useRef, useState } from "react";
import { PlaceHolderData } from "../Constant/SampleData";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { Fab, Tooltip, Zoom } from "@mui/material";
import {
  Print,
  Email,
  Phone,
  LinkedIn,
  PinDrop,
  Language,
} from "@mui/icons-material";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../Constant/constant";
import { useAuth } from "../context/authContext";

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

const EnhancedTemplate1 = ({ formData, selectedColor = "#2563eb" }) => {
  const mergedData = {
    personalInfo: mergeObjects(
      PlaceHolderData.personalInfo,
      formData.personalInfo || {}
    ),
    education: formData.education?.length
      ? formData.education
      : PlaceHolderData.education,
    experience: formData.experience?.length
      ? formData.experience
      : PlaceHolderData.experience,
    skills: formData.skills?.length ? formData.skills : PlaceHolderData.skills,
    projects: formData.projects?.length
      ? formData.projects
      : PlaceHolderData.projects,
    languages: formData.languages?.length
      ? formData.languages
      : PlaceHolderData.languages,
  };

  const { personalInfo, education, experience, skills, projects, languages } =
    mergedData;
  const componentRef = useRef(null);
  const [isDemo] = useState(true); // For demo purposes
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

    if (!res.data?.success) {
      toast.info("Please login to print your resume");
      handleOpen();
      return;
    }

    const node = componentRef.current;
    if (!node) return;

    // Save original styles
    const originalWidth = node.style.width;
    const originalPadding = node.style.padding;

    // Dynamically set export width based on screen size
    const isMobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint
    node.style.width = isMobile ? "500px" : "800px";
    node.style.padding = "0px";

    // Export to image
    const dataUrl = await toPng(node, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      cacheBust: true,
    });

    // Generate PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${personalInfo.firstName || "resume"}_${personalInfo.lastName || "pdf"}.pdf`);

    // Restore original styles
    node.style.width = originalWidth;
    node.style.padding = originalPadding;
  } catch (err) {
    toast.info("Session Expired or Invalid, please login to print your resume");
    handleOpen();
  }
};


  const ContactItem = ({ icon, text, href, selectedColor = "#000" }) => (
    <div className="flex items-center gap-2 sm:gap-3 mb-2 group flex-wrap">
      <div
        className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-colors duration-200"
        style={{ color: selectedColor }}
      >
        {icon}
      </div>
      {href ? (
        <a
          href={href}
          className="text-gray-600 hover:text-gray-900 transition-colors text-[8px] sm:text-base font-medium hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <span className="text-gray-600 text-[7px] sm:text-base font-medium break-all">
          {text}
        </span>
      )}
    </div>
  );

  const SectionHeader = ({ title, withLine = true }) => (
    <div className="mb-6">
      <h3 className="font-bold text-[10px] md:text-xl uppercase tracking-wide text-gray-800 mb-2">
        {title}
      </h3>
      {withLine && (
        <div
          className="w-16 h-0.5 rounded-full mb-4"
          style={{ backgroundColor: selectedColor }}
        />
      )}
    </div>
  );

  const SkillItem = ({ skill }) => (
    <div className="inline-block bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-full px-2 md:px-4 py-0 md:py-2 m-1">
      <span className="text-[8px] md:text-sm font-medium text-gray-700">{skill}</span>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        <div
          ref={componentRef}
          className="bg-white text-gray-900 font-sans leading-relaxed"
        >
          {/* Enhanced Header */}
          <div
            className="relative bg-white border-b-4"
            style={{ borderColor: selectedColor }}
          >
            <div className="px-8 py-6 md:py-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-6 mb-6">
                  <div
                    className="w-10 h-10 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-xs md:text-2xl font-bold"
                    style={{ backgroundColor: selectedColor }}
                  >
                    {personalInfo.firstName?.charAt(0)}
                    {personalInfo.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-md md:text-5xl font-bold text-gray-900 mb-2">
                      {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <h2
                      className="text-xs md:text-2xl font-semibold mb-2"
                      style={{ color: selectedColor }}
                    >
                      {personalInfo.jobTitle}
                    </h2>
                  </div>
                </div>
                <div
                  className="bg-gray-50 rounded-lg p-3 md:p-6 border-l-4"
                  style={{ borderColor: selectedColor }}
                >
                  <p className="text-gray-700 text-[8px] md:text-base leading-relaxed">
                    {personalInfo.jobDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-4 md:py-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 gap-2 md:gap-12">
                {/* Left Column */}
                <div className="space-y-4 md:space-y-8">
                  {/* Contact Section */}
                  <section>
                    <SectionHeader title="Contact" />
                    <div className="space-y-3">
                      {personalInfo.email && (
                        <ContactItem
                          icon={<Email fontSize="1px"/>}
                          text={personalInfo.email}
                          href={`mailto:${personalInfo.email}`}
                        />
                      )}
                      {personalInfo.phone && (
                        <ContactItem
                          icon={<Phone fontSize="1px"/>}
                          text={personalInfo.phone}
                          href={`tel:${personalInfo.phone}`}
                        />
                      )}
                      {personalInfo.address && (
                        <ContactItem
                          icon={<PinDrop fontSize="1px"/>}
                          text={personalInfo.address}
                        />
                      )}
                      {personalInfo.linkedIn && (
                        <ContactItem
                          icon={<LinkedIn fontSize="1px"/>}
                          text={personalInfo.linkedIn}
                          href={personalInfo.linkedIn}
                        />
                      )}
                      {personalInfo.portfolio && (
                        <ContactItem
                          icon={<Language fontSize="1px"/>}
                          text={personalInfo.portfolio}
                          href={personalInfo.portfolio}
                        />
                      )}
                    </div>
                  </section>

                  {/* Skills Section */}
                  <section>
                    <SectionHeader title="Skills" />
                    <div className="flex flex-wrap -m-1">
                      {skills.map((skill, i) => (
                        <SkillItem key={i} skill={skill} />
                      ))}
                    </div>
                  </section>

                  {/* Languages Section */}
                  {languages.length > 0 && (
                    <section>
                      <SectionHeader title="Languages" />
                      <div className="space-y-3">
                        {languages.map((lang, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 rounded-lg p-3 gap-2 sm:gap-0"
                          >
                            <span className="text-[8px] md:text-lg text-gray-800 text-base sm:text-lg">
                              {lang.language?.charAt(0).toUpperCase() +
                                lang.language?.slice(1)}
                            </span>
                            <span
                              className="text-[8px] md:text-base font-semibold px-3 py-1 rounded-full text-white text-center"
                              style={{ backgroundColor: selectedColor }}
                            >
                              {lang.proficiency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-2">
                  {/* Experience Section */}
                  {experience.length > 0 && (
                    <section>
                      <SectionHeader title="Experience" />
                      <div className="space-y-1">
                        {experience.map((exp, idx) => (
                          <div
                            key={idx}
                            className="relative pl-8 sm:pl-8 border-l-2 border-gray-200 pb-6"
                          >
                            {/* Timeline circle */}
                            <div
                              className="absolute -left-3 sm:-left-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 border-white shadow-md"
                              style={{ backgroundColor: selectedColor }}
                            />

                            {/* Card */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                                <div>
                                  <h4 className="font-bold text-[8px] sm:text-lg text-gray-900 mb-1">
                                    {exp.position}
                                  </h4>
                                  <p
                                    className="font-semibold text-[8px] sm:text-base"
                                    style={{ color: selectedColor }}
                                  >
                                    {exp.company}
                                  </p>
                                </div>
                                <div className="text-[6px] sm:text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full mt-1 md:mt-0 w-max">
                                  {exp.startDate} - {exp.endDate}
                                </div>
                              </div>
                              <p className="text-gray-700 text-[8px] sm:text-base leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Education Section */}
                  <section>
                    <SectionHeader title="Education" />
                    <div className="space-y-1">
                      {education.map((edu, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-lg p-2 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                            <div>
                              <h4 className="font-bold text-[8px] md:text-lg text-gray-900 mb-1">
                                {edu.degree}
                              </h4>
                              <p
                                className="font-semibold text-[8px] md:text-base"
                                style={{ color: selectedColor }}
                              >
                                {edu.institution}
                              </p>
                              {edu.field && (
                                <p className="text-gray-600 text-[8px] md:text-sm">
                                  {edu.field}
                                </p>
                              )}
                            </div>
                            <div className="text-[8px] md:text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full mt-1 md:mt-0 w-max">
                              {edu.startDate} - {edu.endDate}
                            </div>
                          </div>
                          {edu.description && (
                            <p className="text-gray-700 text-[8px] md:text-sm leading-relaxed">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Projects Section */}
                  {projects.length > 0 && (
                    <section>
                      <SectionHeader title="Projects" />
                      <div className="space-y-6">
                        {projects.map((proj, idx) => (
                          <div
                            key={idx}
                            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            <h4
                              className="font-bold text-[8px] md:text-lg mb-2 sm:mb-3"
                              style={{ color: selectedColor }}
                            >
                              {proj.name}
                            </h4>
                            <p className="text-gray-700 text-[8px] md:text-sm leading-relaxed mb-2 sm:mb-3">
                              {proj.description}
                            </p>
                            <div className="mb-2 sm:mb-3">
                              <span className="text-gray-600 font-medium text-[8px] md:text-sm">
                                Technologies:
                              </span>
                              <span className="text-gray-500 text-[8px] md:text-sm ml-1">
                                {proj.technologies}
                              </span>
                            </div>
                            {proj.link && (
                              <a
                                href={proj.link}
                                className="inline-flex items-center gap-1 sm:gap-2 text-[8px] md:text-sm font-medium hover:underline transition-colors"
                                style={{ color: selectedColor }}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Language className="w-4 h-4 sm:w-5 sm:h-5" />
                                View Project
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
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

export default EnhancedTemplate1;

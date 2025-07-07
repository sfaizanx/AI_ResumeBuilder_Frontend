import React, { useRef, useState } from "react";
import { PlaceHolderData } from "../Constant/SampleData";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { Fab, Tooltip, Zoom } from "@mui/material";
import { Print, Email, Phone,  LinkedIn, PinDrop, Language } from "@mui/icons-material";
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
    education: formData.education?.length ? formData.education : PlaceHolderData.education,
    experience: formData.experience?.length ? formData.experience : PlaceHolderData.experience,
    skills: formData.skills?.length ? formData.skills : PlaceHolderData.skills,
    projects: formData.projects?.length ? formData.projects : PlaceHolderData.projects,
    languages: formData.languages?.length ? formData.languages : PlaceHolderData.languages,
  };

  const { personalInfo, education, experience, skills, projects, languages } = mergedData;
  const componentRef = useRef(null);
  const [isDemo] = useState(true); // For demo purposes
  const location = useLocation();
  const pathname = location.pathname;
  const { id } = useParams();
  const {tokenVal, handleOpen} = useAuth();



  const handlePrint = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/Validtoken`, {
        headers: {
          Authorization: `Bearer ${tokenVal}`,
        },
      });

      if (res.data?.success) {
        const dataUrl = await toPng(componentRef.current, { 
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#ffffff'
        });

        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${personalInfo.firstName || "resume"}_${personalInfo.lastName || "professional"}.pdf`);
      } else {
        toast.info("Please login to print your resume");
        handleOpen();
      }
    } catch (err) {
      handleOpen();
      toast.info("Session Expired or Invalid please login to print your resume");
    }
  };

  const ContactItem = ({ icon, text, href }) => (
    <div className="flex items-center gap-3 mb-2 group">
      <div className="w-5 h-5 flex items-center justify-center transition-colors duration-200" style={{ color: selectedColor }}>
        {icon}
      </div>
      {href ? (
        <a 
          href={href} 
          className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <span className="text-gray-600 text-sm font-medium">{text}</span>
      )}
    </div>
  );

  const SectionHeader = ({ title, withLine = true }) => (
    <div className="mb-6">
      <h3 className="font-bold text-xl uppercase tracking-wide text-gray-800 mb-2">
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
    <div className="inline-block bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-full px-4 py-2 m-1">
      <span className="text-sm font-medium text-gray-700">{skill}</span>
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
          <div className="relative bg-white border-b-4" style={{ borderColor: selectedColor }}>
            <div className="px-8 py-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-6 mb-6">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                    style={{ backgroundColor: selectedColor }}
                  >
                    {personalInfo.firstName?.charAt(0)}{personalInfo.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <h2 
                      className="text-xl md:text-2xl font-semibold mb-4"
                      style={{ color: selectedColor }}
                    >
                      {personalInfo.jobTitle}
                    </h2>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border-l-4" style={{ borderColor: selectedColor }}>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {personalInfo.jobDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Contact Section */}
                  <section>
                    <SectionHeader title="Contact" />
                    <div className="space-y-3">
                      {personalInfo.email && (
                        <ContactItem 
                          icon={<Email />}
                          text={personalInfo.email}
                          href={`mailto:${personalInfo.email}`}
                        />
                      )}
                      {personalInfo.phone && (
                        <ContactItem 
                          icon={<Phone />}
                          text={personalInfo.phone}
                          href={`tel:${personalInfo.phone}`}
                        />
                      )}
                      {personalInfo.address && (
                        <ContactItem 
                          icon={<PinDrop />}
                          text={personalInfo.address}
                        />
                      )}
                      {personalInfo.linkedIn && (
                        <ContactItem 
                          icon={<LinkedIn />}
                          text="LinkedIn Profile"
                          href={personalInfo.linkedIn}
                        />
                      )}
                      {personalInfo.portfolio && (
                        <ContactItem 
                          icon={<Language />}
                          text="Portfolio Website"
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
                          <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                            <span className="font-medium text-gray-800">
                              {lang.language?.charAt(0).toUpperCase() + lang.language?.slice(1)}
                            </span>
                            <span 
                              className="text-sm font-semibold px-3 py-1 rounded-full text-white"
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
                <div className="space-y-8">
                  {/* Experience Section */}
                  {experience.length > 0 && (
                    <section>
                      <SectionHeader title="Experience" />
                      <div className="space-y-6">
                        {experience.map((exp, idx) => (
                          <div key={idx} className="relative pl-8 border-l-2 border-gray-200 pb-6">
                            <div 
                              className="absolute -left-3 w-6 h-6 rounded-full border-4 border-white shadow-md"
                              style={{ backgroundColor: selectedColor }}
                            />
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                                <div>
                                  <h4 className="font-bold text-lg text-gray-900 mb-1">
                                    {exp.position}
                                  </h4>
                                  <p 
                                    className="font-semibold text-base"
                                    style={{ color: selectedColor }}
                                  >
                                    {exp.company}
                                  </p>
                                </div>
                                <div className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full mt-2 md:mt-0">
                                  {exp.startDate} - {exp.endDate}
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">
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
                    <div className="space-y-6">
                      {education.map((edu, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                            <div>
                              <h4 className="font-bold text-lg text-gray-900 mb-1">
                                {edu.degree}
                              </h4>
                              <p 
                                className="font-semibold text-base"
                                style={{ color: selectedColor }}
                              >
                                {edu.institution}
                              </p>
                              {edu.field && (
                                <p className="text-gray-600 text-sm">
                                  {edu.field}
                                </p>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full mt-2 md:mt-0">
                              {edu.startDate} - {edu.endDate}
                            </div>
                          </div>
                          {edu.description && (
                            <p className="text-gray-700 text-sm leading-relaxed">
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
                          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <h4 
                              className="font-bold text-lg mb-3"
                              style={{ color: selectedColor }}
                            >
                              {proj.name}
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {proj.description}
                            </p>
                            <div className="mb-3">
                              <span className="text-gray-600 font-medium text-sm">
                                Technologies: 
                              </span>
                              <span className="text-gray-500 text-sm ml-1">
                                {proj.technologies}
                              </span>
                            </div>
                            {proj.link && (
                              <a
                                href={proj.link}
                                className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition-colors"
                                style={{ color: selectedColor }}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Language />
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
import React, { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import axios from "axios";
import { toast } from "react-toastify";
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

const ResumeTemplateThree = ({ formData, selectedColor }) => {
  const mergedData = {
    personalInfo: mergeObjects(
      PlaceHolderData.personalInfo,
      formData.personalInfo || {}
    ),
    education: formData.education?.length
      ? formData.education
      : PlaceHolderData.education,
    experience: formData.experience?.length ? formData.experience : {},
    skills: formData.skills?.length ? formData.skills : PlaceHolderData.skills,
    projects: formData.projects?.length ? formData.projects : {},
    languages: formData.languages?.length
      ? formData.languages
      : PlaceHolderData.languages,
  };

  const { personalInfo, education, experience, skills, projects, languages } = mergedData;
  const {id} = useParams();
  const componentRef = useRef(null);
  const location = useLocation();
  const pathname = location.pathname;
    const {tokenVal, handleOpen} = useAuth();

   const handlePrint = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/Validtoken`, {
      headers: {
        Authorization: `Bearer ${tokenVal}`, 
      },
    });

    // If the request is successful, proceed to generate PDF
    if (res.data?.success) {
      const dataUrl = await toPng(componentRef.current, { quality: 1.0 });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${personalInfo.firstName || "resume"}.pdf`);
    } else {
      toast.info("Please login to print your resume");
      handleOpen();
    }
  } catch (err) {
    // Handle token invalid or expired
    handleOpen();
    toast.info("Session Expired or Invalid please login to print your resume");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <div className="max-w-xs md:max-w-5xl mx-auto">
        <div
          ref={componentRef}
          className="bg-white shadow-2xl rounded-2xl overflow-hidden relative"
          style={{
            boxShadow: '0 25px 60px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.05)'
          }}
        >
          {/* Elegant Header with Gradient */}
          <div 
            className="relative h-40 md:h-64 md:h-80 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, 15 0%, 25 50%, 15 100%)`
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-32 -translate-x-32"></div>
            
            {/* Header Content */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-1 rounded-full"
                      style={{ backgroundColor: selectedColor }}
                    ></div>
                    <div className="w-6 h-1 rounded-full bg-white opacity-30"></div>
                    <div className="w-3 h-1 rounded-full bg-white opacity-20"></div>
                  </div>
                  
                  <h1 
                    className="text-xl md:text-6xl font-bold text-white leading-tight tracking-tight"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                  >
                    {personalInfo?.firstName}
                    <br />
                    <span className="font-light opacity-95">{personalInfo?.lastName}</span>
                  </h1>
                  
                  <div 
                    className="text-base md:text-xl font-medium text-white opacity-90 tracking-wide"
                    style={{ color: selectedColor }}
                  >
                    {personalInfo?.jobTitle}
                  </div>
                </div>
                
                {/* Decorative Logo/Icon */}
                <div className="hidden md:flex items-center justify-center">
                  <div 
                    className="w-20 h-20 rounded-full border-4 border-white border-opacity-30 flex items-center justify-center"
                    style={{ backgroundColor: selectedColor + '20' }}
                  >
                    <div className="w-8 h-8 bg-white rounded-full opacity-90"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-row">
            {/* Left Sidebar - Premium Dark Theme */}
            <div className="w-2/5 bg-gray-900 text-white p-3 md:p-10 space-y-3">
              {/* Contact Information */}
              <section className="space-y-6">
                <h3 className="text-[10px] md:text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: selectedColor }}
                  >
                   <Email className="text-white" fontSize="inherit" />
                  </div>
                  CONTACT
                </h3>
                
                <div className="space-y-3">
                  {personalInfo?.address && (
                    <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <PinDrop fontSize="inherit" style={{ color: selectedColor }} className="text-lg" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[8px] md:text-sm text-gray-300 leading-relaxed">{personalInfo.address}</p>
                      </div>
                    </div>
                  )}
                  
                  {personalInfo?.phone && (
                    <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <Phone fontSize="inherit" style={{ color: selectedColor }} className="text-lg" />
                      </div>
                      <p className="text-[8px] md:text-sm text-gray-300">{personalInfo.phone}</p>
                    </div>
                  )}
                  
                  {personalInfo?.portfolio && (
                    <div className="flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <Language fontSize="inherit" style={{ color: selectedColor }} className="text-lg" />
                      </div>
                      <p className="text-[8px] md:text-sm text-gray-300">{personalInfo.portfolio}</p>
                    </div>
                  )}

                  {personalInfo?.email && (
                    <div className="flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <Email fontSize="inherit" style={{ color: selectedColor }} className="text-lg" />
                      </div>
                      <p className="text-[6px] md:text-sm text-gray-300">{personalInfo.email}</p>
                    </div>
                  )}
                  
                  {personalInfo?.linkedIn && (
                    <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <LinkedIn fontSize="inherit" style={{ color: selectedColor }} className="text-lg" />
                      </div>
                      <p className="text-[6px] md:text-sm text-gray-300">{personalInfo.linkedIn}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Objective */}
              {personalInfo?.jobDesc && (
                <section className="space-y-4">
                  <h3 className="text-[10px] md:text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: selectedColor }}
                    >
                      <div className="w-1 md:w-3 h-1 md:h-3 bg-white rounded-full"></div>
                    </div>
                    OBJECTIVE
                  </h3>
                  <div className="pl-11">
                    <p className="text-[8px] md:text-sm text-gray-300 leading-relaxed italic">
                      "{personalInfo.jobDesc}"
                    </p>
                  </div>
                </section>
              )}

              {/* Skills */}
              {skills && skills.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-[10px] md:text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: selectedColor }}
                    >
                      <div className="w-2 md:w-4 h-2 md:h-4 bg-white rounded-sm"></div>
                    </div>
                    SKILLS
                  </h3>
                  <div className="grid grid-cols-1 gap-3 pl-11">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 group">
                        <div 
                          className="w-2 h-2 rounded-full group-hover:w-4 transition-all duration-300"
                          style={{ backgroundColor: selectedColor }}
                        ></div>
                        <span className="text-[8px] md:text-sm text-gray-300 group-hover:text-white transition-colors">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {languages && languages.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-[10px] md:text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: selectedColor }}
                    >
                      <Language fontSize="inherit" className="text-white text-lg" />
                    </div>
                    LANGUAGES
                  </h3>
                  <div className="space-y-3 pl-11">
                    {languages.map((lang, idx) => (
                      <div key={idx} className="flex justify-between items-center group">
                        <span className="text-[8px] md:text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 group-hover:bg-gray-700 transition-colors">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Content - Clean White Space */}
            <div className="w-3/5 p-8 md:p-12 space-y-6">
              {/* Experience */}
              {experience && experience.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: selectedColor + '15' }}
                    >
                      <div 
                        className="w-6 h-6 rounded-lg"
                        style={{ backgroundColor: selectedColor }}
                      ></div>
                    </div>
                    <h3 className="text-[10px] md:text-2xl font-bold text-gray-800">EXPERIENCE</h3>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  
                  <div className="space-y-8">
                    {experience.map((exp, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute left-0 top-0 w-1 h-full bg-gray-100 group-hover:bg-gray-300 transition-colors"></div>
                        <div 
                          className="absolute left-0 top-0 w-1 h-0 group-hover:h-full transition-all duration-500"
                          style={{ backgroundColor: selectedColor }}
                        ></div>
                        
                        <div className="pl-8 space-y-3">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                            <div>
                              <h4 className="text-[8px] md:text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                                {exp.position}
                              </h4>
                              <p className="text-[8px] md:text-base font-medium" style={{ color: selectedColor }}>
                                {exp.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: selectedColor }}
                              ></div>
                              <span className="text-[5px] md:text-sm text-gray-500 font-medium">
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                          </div>
                          <p className="text-[8px] md:text-sm text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-100">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <section className="space-y-2">
                  <div className="flex items-center gap-4 mb-8">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: selectedColor + '15' }}
                    >
                      <div 
                        className="w-3 md:w-6 h-3 md:h-6 rounded-full border-2"
                        style={{ borderColor: selectedColor }}
                      ></div>
                    </div>
                    <h3 className="text-[10px] md:text-2xl font-bold text-gray-800">EDUCATION</h3>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  
                  <div className="space-y-6">
                    {education.map((edu, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute left-0 top-0 w-1 h-full bg-gray-100 group-hover:bg-gray-300 transition-colors"></div>
                        <div 
                          className="absolute left-0 top-0 w-1 h-0 group-hover:h-full transition-all duration-500"
                          style={{ backgroundColor: selectedColor }}
                        ></div>
                        
                        <div className="pl-8 space-y-2">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                            <div>
                              <h4 className="text-[8px] md:text-lg font-bold text-gray-800">
                                {edu.degree}
                              </h4>
                              <p className="text-[8px] md:text-base font-medium" style={{ color: selectedColor }}>
                                {edu.institution}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: selectedColor }}
                              ></div>
                              <span className="text-[8px] md:text-sm text-gray-500 font-medium">
                                {edu.startDate} - {edu.endDate}
                              </span>
                            </div>
                          </div>
                          {edu.description && (
                            <p className="text-[8px] md:text-sm text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-100">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {projects && projects.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: selectedColor + '15' }}
                    >
                      <div 
                        className="w-6 h-6 rounded-lg rotate-45"
                        style={{ backgroundColor: selectedColor }}
                      ></div>
                    </div>
                    <h3 className="text-[10px] md:text-2xl font-bold text-gray-800">PROJECTS</h3>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  
                  <div className="grid gap-8">
                    {projects.map((proj, idx) => (
                      <div key={idx} className="group">
                        <div className="relative p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                              <h4 className="text-[8px] md:text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                                {proj.name}
                              </h4>
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300"
                                style={{ backgroundColor: selectedColor + '20' }}
                              >
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: selectedColor }}
                                ></div>
                              </div>
                            </div>
                            
                            <p className="text-[8px] md:text-sm text-gray-600 leading-relaxed">
                              {proj.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                              {(Array.isArray(proj.technologies) ? proj.technologies : [proj.technologies]).map((tech, techIdx) => (
                                <span 
                                  key={techIdx}
                                  className="px-3 py-1 text-[8px] md:text-xs font-medium rounded-full bg-white text-gray-700 border border-gray-200"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            
                            {proj.link && (
                              <div className="pt-2">
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 text-[8px] md:text-sm font-medium hover:underline transition-colors"
                                  style={{ color: selectedColor }}
                                >
                                  View Project
                                  <div className="w-4 h-4 rounded-full bg-current opacity-20"></div>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
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
    </div>
  );
};

export default ResumeTemplateThree;

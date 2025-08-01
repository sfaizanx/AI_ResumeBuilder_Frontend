import React, { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PlaceHolderData } from "../Constant/SampleData";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { Fab, GlobalStyles, Tooltip, Zoom } from "@mui/material";
import { Print, Email, Phone,  LinkedIn, PinDrop, Language } from "@mui/icons-material";
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

const ResumeTemplateFour = ({ formData, selectedColor = "#2563eb" }) => {
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
    certifications: formData.certifications?.length ? formData.certifications : [],
  };

  const { personalInfo, education, experience, skills, projects, languages, certifications } = mergedData;
  const { id } = useParams();
  const componentRef = useRef(null);
  const location = useLocation();
  const pathname = location.pathname;
  const { tokenVal, handleOpen } = useAuth();

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
    <div className="flex items-center gap-3 group">
      <div className="w-5 h-5 flex items-center justify-center" style={{ color: selectedColor }}>
        {icon}
      </div>
      {href ? (
        <a 
          href={href} 
          className="text-gray-600 hover:text-gray-900 transition-colors text-[6px] md:text-sm font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <span className="text-gray-600 text-[6px] md:text-sm font-medium">{text}</span>
      )}
    </div>
  );

  const SectionHeader = ({ title, accent = false }) => (
    <div className="mb-6">
      <h2 
        className={`text-[10px] md:text-lg font-bold uppercase tracking-wide ${accent ? 'text-white' : 'text-gray-900'}`}
        style={accent ? { color: selectedColor } : {}}
      >
        {title}
      </h2>
      <div 
        className="w-6 md:w-12 h-0.5 mt-2 rounded-full"
        style={{ backgroundColor: selectedColor }}
      />
    </div>
  );

  const SkillBadge = ({ skill, level }) => (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[8px] md:text-sm font-medium text-gray-700">{skill}</span>
        {level && <span className="text-[8px] md:text-xs text-gray-500">{level}</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-0.5 md:h-1.5">
        <div 
          className="h-0.5 md:h-1.5 rounded-full transition-all duration-300"
          style={{ 
            backgroundColor: selectedColor,
            width: level ? `${level}%` : '85%'
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="w-full max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div
          ref={componentRef}
          className="bg-white text-gray-900 font-sans leading-relaxed"
        >
          {/* Header Section */}
          <div 
            className="relative px-8 py-6 md:py-12 text-white"
            style={{ 
              background: `linear-gradient(135deg, ${selectedColor} 0%, ${selectedColor}dd 100%)` 
            }}
          >
            <div className="relative z-10">
              <h1 className="text-[10px] md:text-4xl md:text-5xl font-bold mb-2">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="text-[10px] md:text-xl md:text-2xl font-light opacity-90 mb-4">
                {personalInfo.jobTitle}
              </p>
              <div className="w-10 md:w-20 h-0.5 md:h-1 bg-white bg-opacity-60 rounded-full" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-10" />
          </div>

          <div className="flex">
            {/* Left Sidebar */}
            <div className="w-2/5 p-8 text-white"
              style={{ backgroundColor: `${selectedColor}15` }}
            >
              {/* Contact Information */}
              <div className="mb-8">
                <SectionHeader title="Contact" />
                <div className="space-y-4">
                  {personalInfo.email && (
                    <ContactItem 
                      icon={<Email fontSize="inherit" className="w-4 h-4" />}
                      text={personalInfo.email}
                      href={`mailto:${personalInfo.email}`}
                    />
                  )}
                  {personalInfo.phone && (
                    <ContactItem 
                      icon={<Phone fontSize="inherit" className="w-4 h-4" />}
                      text={personalInfo.phone}
                      href={`tel:${personalInfo.phone}`}
                    />
                  )}
                  {personalInfo.address && (
                    <ContactItem 
                      icon={<PinDrop fontSize="inherit" className="w-4 h-4" />}
                      text={personalInfo.address}
                    />
                  )}
                  {personalInfo.linkedIn && (
                    <ContactItem 
                      icon={<LinkedIn fontSize="inherit" className="w-4 h-4" />}
                      text={personalInfo.linkedIn}
                      href={personalInfo.linkedIn}
                    />
                  )}
                  {personalInfo.portfolio && (
                    <ContactItem 
                      icon={<Language fontSize="inherit" className="w-4 h-4" />}
                      text="Portfolio Website"
                      href={personalInfo.portfolio}
                    />
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              {personalInfo.jobDesc && (
                <div className="mb-8">
                  <SectionHeader title="Professional Summary" />
                  <p className="text-gray-700 text-[8px] md:text-sm leading-relaxed">
                    {personalInfo.jobDesc}
                  </p>
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div className="mb-8">
                  <SectionHeader title="Core Skills" />
                  <div className="space-y-2">
                    {skills.map((skill, i) => (
                      <SkillBadge key={i} skill={skill} />
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <div className="mb-8">
                  <SectionHeader title="Languages" />
                  <div className="space-y-3">
                    {languages.map((lang, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-[8px] md:text-sm">
                          {lang.language?.charAt(0).toUpperCase() + lang.language?.slice(1)}
                        </span>
                        <span className="text-[8px] md:text-xs text-gray-500 font-medium">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content */}
            <div className="w-3/5 p-8">
              {/* Experience */}
              {experience.length > 0 && (
                <div className="mb-10">
                  <SectionHeader title="Professional Experience" />
                  <div className="space-y-6">
                    {experience.map((exp, idx) => (
                      <div key={idx} className="relative pl-6 border-l-2 border-gray-200">
                        <div 
                          className="absolute -left-2 w-4 h-4 rounded-full border-2 border-white"
                          style={{ backgroundColor: selectedColor }}
                        />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
                            <h3 className="font-bold text-[8px] md:text-lg text-gray-900">
                              {exp.position}
                            </h3>
                            <p className="text-gray-600 font-medium text-[8px] md:text-sm">
                              {exp.company}
                            </p>
                          </div>
                          <div className="text-[8px] md:text-sm text-gray-500 font-medium mt-1 md:mt-0">
                            {exp.startDate} - {exp.endDate}
                          </div>
                        </div>
                        <p className="text-gray-700 text-[8px] md:text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div className="mb-10">
                  <SectionHeader title="Education" />
                  <div className="space-y-6">
                    {education.map((edu, idx) => (
                      <div key={idx} className="relative pl-6 border-l-2 border-gray-200">
                        <div 
                          className="absolute -left-2 w-4 h-4 rounded-full border-2 border-white"
                          style={{ backgroundColor: selectedColor }}
                        />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
                            <h3 className="font-bold text-[8px] md:text-lg text-gray-900">
                              {edu.degree}
                            </h3>
                            <p className="text-gray-600 font-medium text-[8px] md:text-sm">
                              {edu.institution}
                            </p>
                          </div>
                          <div className="text-[8px] md:text-sm text-gray-500 font-medium mt-1 md:mt-0">
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
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div className="mb-10">
                  <SectionHeader title="Key Projects" />
                  <div className="space-y-6">
                    {projects.map((proj, idx) => (
                      <div key={idx} className="border-l-2 border-gray-200 pl-6 relative">
                        <div 
                          className="absolute -left-2 w-4 h-4 rounded-full border-2 border-white"
                          style={{ backgroundColor: selectedColor }}
                        />
                        <h3 className="font-bold text-[8px] md:text-lg text-gray-900 mb-2">
                          {proj.name}
                        </h3>
                        <p className="text-gray-700 text-[8px] md:text-sm leading-relaxed mb-3">
                          {proj.description}
                        </p>
                        {proj.technologies && (
                          <div className="mb-2">
                            <span className="text-gray-600 font-medium text-[8px] md:text-sm">
                              Technologies: 
                            </span>
                            <span className="text-gray-500 text-[8px] md:text-sm ml-1">
                              {proj.technologies}
                            </span>
                          </div>
                        )}
                        {proj.link && (
                          <a
                            href={proj.link}
                            className="inline-flex items-center gap-1 text-[8px] md:text-sm font-medium hover:underline transition-colors"
                            style={{ color: selectedColor }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Language className="w-3 h-3" />
                            View Project
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

export default ResumeTemplateFour;
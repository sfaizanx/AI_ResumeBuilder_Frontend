import React from "react";
import { PlaceHolderData } from "../Constant/SampleData";
import { Email, Phone, LinkedIn, LocationOn, Language } from "@mui/icons-material";

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

const Template4 = ({ formData }) => {
  const mergedData = {
    personalInfo: mergeObjects(
      PlaceHolderData.personalInfo,
      formData?.personalInfo || {}
    ),
    education: formData?.education?.length
      ? formData.education
      : PlaceHolderData.education,
    experience: formData?.experience?.length
      ? formData.experience
      : PlaceHolderData.experience,
    skills: formData?.skills?.length ? formData.skills : PlaceHolderData.skills,
    projects: formData?.projects?.length
      ? formData.projects
      : PlaceHolderData.projects,
    languages: formData?.languages?.length
      ? formData.languages
      : PlaceHolderData.languages,
  };

  const { personalInfo, education, experience, skills, projects, languages } =
    mergedData;

  const SidebarIcon = ({ children }) => (
    <span className="bg-white/20 p-1.5 rounded-md text-white mr-3 flex items-center justify-center">
      {children}
    </span>
  );

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-gray-800 font-sans flex flex-row">
      
      {/* LEFT SIDEBAR */}
      <div className="w-[35%] bg-indigo-900 text-indigo-50 min-h-[297mm] py-10 px-8 flex flex-col">
        
        {/* Name & Title */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-white leading-tight uppercase tracking-wide">
            {personalInfo?.firstName || "First"} <br/> {personalInfo?.lastName || "Last"}
          </h1>
          {personalInfo?.jobTitle && (
            <h2 className="text-sm font-medium text-indigo-200 mt-2 uppercase tracking-widest bg-white/10 py-1.5 px-3 rounded-full inline-block">
              {personalInfo.jobTitle}
            </h2>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest border-b border-indigo-400/30 pb-2 mb-4">
            Contact Me
          </h3>
          <div className="flex flex-col gap-4 text-[13px] font-medium">
            {personalInfo?.email && (
              <div className="flex items-center">
                <SidebarIcon><Email fontSize="small" /></SidebarIcon>
                <span className="truncate break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <SidebarIcon><Phone fontSize="small" /></SidebarIcon>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.city && (
              <div className="flex items-center">
                <SidebarIcon><LocationOn fontSize="small" /></SidebarIcon>
                <span>
                  {personalInfo.city}{personalInfo?.state && `, ${personalInfo.state}`}
                </span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center">
                <SidebarIcon><LinkedIn fontSize="small" /></SidebarIcon>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white truncate">
                  LinkedIn
                </a>
              </div>
            )}
            {personalInfo?.portfolio && (
              <div className="flex items-center">
                <SidebarIcon><Language fontSize="small" /></SidebarIcon>
                <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-white truncate">
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mb-10 block">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest border-b border-indigo-400/30 pb-2 mb-4">
              Expertise
            </h3>
            <div className="flex flex-wrap gap-2 text-[12px] font-semibold">
               {skills.map((skill, index) => (
                  <span key={index} className="bg-white/10 px-3 py-1 rounded-full text-indigo-100">
                    {skill}
                  </span>
               ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div className="text-left font-sans text-[13px]">
             <h3 className="text-sm font-bold text-white uppercase tracking-widest border-b border-indigo-400/30 pb-2 mb-4">
              Languages
            </h3>
            <div className="flex flex-col gap-3">
              {languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center bg-indigo-800/50 p-2 rounded-lg">
                  <span className="font-bold text-indigo-50">{lang.language}</span>
                  <span className="text-indigo-200 text-xs py-0.5 px-2 bg-indigo-900 rounded-full">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="w-[65%] bg-gray-50/50 p-12 flex flex-col gap-10">
        
        {/* Profile Summary */}
        {personalInfo?.summary && (
          <div>
            <h3 className="flex items-center text-lg font-bold text-gray-800 uppercase tracking-widest mb-4">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex justify-center items-center mr-3 text-sm">
                01
              </span>
              Profile
            </h3>
            <p className="text-[13px] text-gray-600 leading-relaxed text-justify bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <div>
            <h3 className="flex items-center text-lg font-bold text-gray-800 uppercase tracking-widest mb-5">
               <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex justify-center items-center mr-3 text-sm">
                02
              </span>
              Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-5">
                   {/* Left Border Accent */}
                   <div className="absolute left-0 top-4 bottom-4 w-1 bg-indigo-600 rounded-r-md"></div>
                   
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-[15px] font-bold text-gray-900">
                      {exp.position}
                    </h4>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md shrink-0 ml-4 uppercase tracking-wider">
                      {exp.startDate} {exp.startDate && exp.endDate ? "-" : ""} {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[13px] font-semibold text-gray-700 mb-2">
                     {exp.company}{exp.location && ` | ${exp.location}`}
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed text-left">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <div>
             <h3 className="flex items-center text-lg font-bold text-gray-800 uppercase tracking-widest mb-5">
               <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex justify-center items-center mr-3 text-sm">
                03
              </span>
              Education
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-[14px] font-bold text-gray-900">
                       {edu.degree} {edu.field && `in ${edu.field}`}
                    </h4>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md shrink-0 ml-4 uppercase tracking-wider">
                      {edu.startDate} {edu.startDate && edu.endDate ? "-" : ""} {edu.endDate}
                    </span>
                  </div>
                  <div className="text-[13px] font-medium text-gray-700 mb-1">
                     {edu.institution} {edu.location && `— ${edu.location}`}
                  </div>
                  {edu.description && (
                      <p className="text-[12px] text-gray-500 leading-relaxed mt-2 p-2 bg-gray-50 rounded-lg">
                        {edu.description}
                      </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <div>
             <h3 className="flex items-center text-lg font-bold text-gray-800 uppercase tracking-widest mb-5">
               <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex justify-center items-center mr-3 text-sm">
                04
              </span>
              Projects
            </h3>
            <div className="space-y-6">
               {projects.map((proj, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-indigo-700 text-[14px]">{proj.name}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200 uppercase tracking-wider font-bold transition">View Live</a>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[11px] text-gray-500 font-medium mb-2 uppercase tracking-wide">
                      TECH: <span className="text-gray-700">{proj.technologies}</span>
                    </div>
                  )}
                  <p className="mt-1 leading-relaxed text-gray-600 text-[13px]">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default Template4;

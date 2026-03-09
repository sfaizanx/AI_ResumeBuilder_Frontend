import React from "react";
import { PlaceHolderData } from "../Constant/SampleData";
import {
  Email,
  Phone,
  LinkedIn,
  Language,
  LocationOn,
} from "@mui/icons-material";

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

const Template3 = ({ formData }) => {
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

  const IconWrapper = ({ children }) => (
    <span className="text-gray-500 mr-2 flex items-center justify-center -mt-0.5">
      {children}
    </span>
  );

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-gray-800 font-sans leading-relaxed">
      <div className="px-10 py-12 max-w-[210mm] mx-auto min-h-[297mm]">
        {/* Header section - ATS Friendly Grid */}
        <div className="border-b-2 border-gray-800 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wide mb-2">
            {personalInfo?.firstName || "First"} {personalInfo?.lastName || "Last"}
          </h1>
          {personalInfo?.jobTitle && (
            <h2 className="text-lg text-gray-600 font-medium mb-4">
              {personalInfo.jobTitle}
            </h2>
          )}

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600">
            {personalInfo?.email && (
              <div className="flex items-center">
                <IconWrapper><Email fontSize="small" /></IconWrapper>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-600 truncate">
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <IconWrapper><Phone fontSize="small" /></IconWrapper>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.city && (
              <div className="flex items-center">
                <IconWrapper><LocationOn fontSize="small" /></IconWrapper>
                <span className="truncate">
                  {personalInfo.city}{personalInfo?.state && `, ${personalInfo.state}`}
                </span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center">
                <IconWrapper><LinkedIn fontSize="small" /></IconWrapper>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 truncate">
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            {personalInfo?.portfolio && (
              <div className="flex items-center">
                <IconWrapper><Language fontSize="small" /></IconWrapper>
                <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 truncate">
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {personalInfo?.summary && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
              Professional Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-md font-bold text-gray-800">
                      {exp.position}
                    </h4>
                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap ml-4">
                      {exp.startDate} {exp.startDate && exp.endDate ? "–" : ""} {exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium text-blue-700">
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span className="text-sm text-gray-500 italic">
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed text-justify">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
              Key Projects
            </h3>
            <div className="space-y-4">
              {projects.map((proj, index) => (
                <div key={index}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h4 className="text-md font-bold text-gray-800">
                      {proj.name}
                    </h4>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium">
                        (View Project)
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-sm text-gray-600 italic mb-2">
                      <span className="font-semibold text-gray-700 not-italic">Tech Stack:</span> {proj.technologies}
                    </div>
                  )}
                  <p className="text-sm text-gray-700 leading-relaxed text-justify">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-gray-800">
              {skills.map((skill, index) => (
                <React.Fragment key={index}>
                  <span className="font-medium">{skill}</span>
                  {index < skills.length - 1 && <span className="text-gray-400 font-bold">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
              Education
            </h3>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-bold text-gray-800">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h4>
                    <div className="text-sm text-gray-700 mt-1">
                      {edu.institution} {edu.location && `— ${edu.location}`}
                    </div>
                    {edu.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-600 whitespace-nowrap ml-4 text-right">
                    {edu.startDate} {edu.startDate && edu.endDate ? "–" : ""} {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {languages?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
              Languages
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {languages.map((lang, index) => (
                <div key={index} className="text-sm text-gray-800">
                  <span className="font-semibold">{lang.language}</span> — <span className="text-gray-600 italic">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Template3;

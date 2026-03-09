import React, { useRef, useState } from "react";
import { PlaceHolderData } from "../Constant/SampleData";
import { useLocation, useParams } from "react-router-dom";

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

const SimpleTemplate1 = ({ formData, selectedColor = "#000000" }) => {
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
  const componentRef = useRef(null);

  // Utility to filter empty strings from an array and join them
  const joinWithDot = (items) => {
    return items.filter((item) => item && item.trim() !== "").join(" • ");
  };

  return (
    <div className="bg-white w-full h-full min-h-[297mm] text-gray-900 font-serif leading-relaxed relative flex flex-col">
      <div ref={componentRef} className="px-10 py-16 max-w-4xl mx-auto bg-white min-h-[297mm] flex-1 w-full">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="text-sm font-medium mb-2 text-gray-700">
            {personalInfo.jobTitle}
          </div>
          <div className="text-xs text-gray-600 flex flex-wrap justify-center gap-x-2">
            {joinWithDot([
              personalInfo.email,
              personalInfo.phone,
              personalInfo.address,
              personalInfo.linkedIn,
              personalInfo.portfolio,
            ])}
          </div>
        </div>

        {/* Objective / Summary */}
        {personalInfo.jobDesc && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs text-gray-800 leading-relaxed text-justify">
              {personalInfo.jobDesc}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-4">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold">
                    <span className="text-[13px]">{exp.position}</span>
                    <span className="text-gray-600 font-normal">
                      {exp.startDate && `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-800 italic mb-1">
                    {exp.company}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-4">
              Education
            </h2>
            <div className="space-y-5">
              {education.map((edu, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold">
                    <span className="text-[13px]">{edu.degree} {edu.field && `in ${edu.field}`}</span>
                    <span className="text-gray-600 font-normal">
                      {edu.startDate && `${edu.startDate} - ${edu.endDate}`}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-800 italic mb-1">
                    {edu.institution}
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">
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
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-4">
              Projects
            </h2>
            <div className="space-y-5">
              {projects.map((proj, idx) => (
                <div key={idx} className="text-xs">
                  <div className="font-bold flex gap-2 items-baseline">
                    <span className="text-[13px]">{proj.name}</span>
                    {proj.link && (
                      <a href={proj.link} className="text-blue-600 hover:underline font-normal text-[10px]" target="_blank" rel="noopener noreferrer">
                        [Link]
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-gray-600 italic mb-1">
                      Technologies: {proj.technologies}
                    </div>
                  )}
                  <p className="text-gray-700 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-3">
              Skills
            </h2>
            <div className="text-xs text-gray-800">
              {skills.join(", ")}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {languages?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-3">
              Languages
            </h2>
            <div className="text-xs text-gray-800 flex flex-wrap gap-4">
              {languages.map((lang, idx) => (
                <div key={idx}>
                  <span className="font-semibold">{lang.language}</span> ({lang.proficiency})
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SimpleTemplate1;

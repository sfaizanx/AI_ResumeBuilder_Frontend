import React, { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PlaceHolderData } from "../Constant/SampleData";
import { useResumeData } from "../common/formdata";

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

const ResumeTemplateTwo = ({ formData, selectedColor = "#f0eef5" }) => {
  const data = formData || useResumeData().formData;

  const mergedData = {
    personalInfo: mergeObjects(
      PlaceHolderData.personalInfo,
      data?.personalInfo || {}
    ),
    education: data?.education?.length
      ? data.education
      : PlaceHolderData.education,
    experience: data?.experience?.length ? data.experience : PlaceHolderData.experience,
    skills: data?.skills?.length ? data.skills : PlaceHolderData.skills,
    projects: data?.projects?.length ? data.projects : PlaceHolderData.projects,
    languages: data?.languages?.length
      ? data.languages
      : PlaceHolderData.languages,
  };

  const { personalInfo, education, experience, skills, projects, languages } =
    mergedData;
  const componentRef = useRef(null);

  const joinWithDot = (items) => {
    return items.filter((item) => item && item.trim() !== "").join(" • ");
  };

  return (
    <div className="bg-white w-full h-full text-gray-800 font-sans leading-relaxed">
      <div ref={componentRef} className="px-10 md:px-14 py-12 max-w-4xl mx-auto bg-white">
        
        {/* Name Header */}
        <div className="w-full py-4 md:py-6 mb-3 text-center" style={{ backgroundColor: selectedColor }}>
          <h1 className="text-3xl md:text-5xl font-light tracking-[0.2em] text-gray-900 uppercase">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
        </div>

        {/* Contact info */}
        <div className="text-center text-[10px] md:text-xs text-gray-600 mb-8 font-medium">
          {joinWithDot([
            personalInfo.address,
            personalInfo.phone,
            personalInfo.email,
            personalInfo.linkedIn,
            personalInfo.portfolio
          ])}
        </div>

        {/* Summary */}
        {personalInfo.jobDesc && (
          <div className="mb-8 text-[10px] md:text-xs text-gray-600 text-justify leading-loose">
            <span className="font-bold text-gray-800 mr-2">{personalInfo.jobTitle}</span> 
            {personalInfo.jobDesc}
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div className="mb-8">
            <h2 
              className="inline-block px-3 py-1 mb-4 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-gray-800"
              style={{ backgroundColor: selectedColor }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="text-[10px] md:text-xs">
                  <div className="uppercase text-gray-500 mb-1 tracking-wider text-[9px] md:text-[10px]">
                    {exp.startDate && `${exp.startDate} – ${exp.current ? "PRESENT" : exp.endDate}`}
                  </div>
                  <div className="font-bold text-gray-700 mb-2 mt-1">
                    {joinWithDot([
                      exp.position,
                      exp.company,
                      exp.location || ""
                    ])}
                  </div>
                  <div className="text-gray-500 leading-loose text-justify">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mb-8">
            <h2 
              className="inline-block px-3 py-1 mb-4 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-gray-800"
              style={{ backgroundColor: selectedColor }}
            >
              Skills
            </h2>
            <div className="text-[10px] md:text-xs text-gray-500 leading-loose">
              {joinWithDot(skills)}
            </div>
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div className="mb-8">
            <h2 
              className="inline-block px-3 py-1 mb-4 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-gray-800"
              style={{ backgroundColor: selectedColor }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="text-[10px] md:text-xs">
                  <div className="uppercase text-gray-500 mb-1 tracking-wider text-[9px] md:text-[10px]">
                    {edu.startDate && `${edu.startDate} – ${edu.endDate}`}
                  </div>
                  <div className="font-bold text-gray-700 mb-1 mt-1">
                    {joinWithDot([
                      edu.degree + (edu.field ? ` ${edu.field}` : ""),
                      edu.institution,
                      edu.location || ""
                    ])}
                  </div>
                  {edu.description && (
                    <div className="text-gray-500 leading-loose">
                      {edu.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div className="mb-8">
            <h2 
              className="inline-block px-3 py-1 mb-4 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-gray-800"
              style={{ backgroundColor: selectedColor }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="text-[10px] md:text-xs">
                  <div className="font-bold text-gray-700 mb-1 flex items-baseline gap-2">
                    {proj.name}
                    {proj.link && (
                      <a href={proj.link} className="text-blue-500 font-normal text-[9px] md:text-[10px] hover:underline" target="_blank" rel="noopener noreferrer">
                        {proj.link}
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-gray-500 mb-1 italic">
                      Tech: {proj.technologies}
                    </div>
                  )}
                  <div className="text-gray-500 leading-loose text-justify">
                    {proj.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div className="mb-8">
            <h2 
              className="inline-block px-3 py-1 mb-4 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-gray-800"
              style={{ backgroundColor: selectedColor }}
            >
              Languages
            </h2>
            <div className="text-[10px] md:text-xs text-gray-500 leading-loose flex flex-wrap gap-x-2">
              {joinWithDot(languages.map(l => `${l.language} (${l.proficiency})`))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResumeTemplateTwo;

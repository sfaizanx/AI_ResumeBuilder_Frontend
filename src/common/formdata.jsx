import React, { createContext, useContext, useMemo, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      linkedIn: "",
      portfolio: "",
      jobTitle: "",
      jobDesc: ""
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    languages: []
  });

  const value = useMemo(() => ({
    formData,
    setFormData
  }), [formData]);

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeData = () => {
  return useContext(ResumeContext);
};

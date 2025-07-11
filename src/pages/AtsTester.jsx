import React, { useState } from "react";
import { Alert, Button, CircularProgress, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IT from "../assets/IT.png";
import Finance from "../assets/Finance.png";
import Marketing from "../assets/Marketing.png";
import Sales from "../assets/Sales.png";
import Healthcare from "../assets/Healthcare.png";
import Hr from "../assets/HR.png";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../Constant/constant";
import AtsScoreCard from "../components/AtsCardScore";
import { useAuth } from "../context/authContext";

const AtsTester = () => {
  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [files, setFiles] = useState(null);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const {tokenVal, handleOpen} = useAuth();

  const departments = [
    {
      id: "IT",
      label: "IT",
      description: "Tech and software roles",
      icons: IT,
    },
    {
      id: "Finance",
      label: "Finance",
      description: "Finance & accounting roles",
      icons: Finance,
    },
    {
      id: "Marketing",
      label: "Marketing",
      description: "Marketing & branding",
      icons: Marketing,
    },
    {
      id: "Sales",
      label: "Sales",
      description: "Sales & business development",
      icons: Sales,
    },
    {
      id: "healthcare",
      label: "Healthcare",
      description: "Clinical & healthcare",
      icons: Healthcare,
    },
    {
      id: "Hr",
      label: "HR",
      description: "Human resources & recruitment",
      icons: Hr,
    },
  ];

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSelect = (id) => {
    setSelected(id);
    handleNext();
  };

  const handleUpload = async (event) => {
    setLoader(true);
    const files = event.target.files;

    if (!files && files.length === 0) {
      toast.error("Please select files to upload.");
      setLoader(false);
      return;
    }

    setFiles(files);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("domain", selected);
    try {
      const res = await axios.post(`${BASE_URL}/ats/pdfToText`, formData, {
        headers: {
          Authorization: `Bearer ${tokenVal}`, 
          "Content-Type": "multipart/form-data",
        },
      });
      const { success, error, message } = res.data;

      if (success) {
        setScore(res.data.atsScore);
        setSuggestions(res.data.suggestions || []);
        toast.success(message);
        setLoader(false)
        handleNext();
      } else {
        toast.error(error || "Error processing files. Please try again.");
        setLoader(false)
      }
    } catch (err) {
      const errorData = err.response?.data;
    if (errorData && errorData.message) {
      handleOpen();
      toast.error(errorData.message);
      setLoader(false);
    } else {
      toast.error("An error occurred while uploading the file.");
      setLoader(false);
    }
  }
  };

  return (
    <div className="min-h-screen mt-0 flex flex-col items-center justify-center mx-7 bg-gray-50" data-aos="fade-up">
      {step !== 3 ? (
        <div>
          <div className="flex items-center justify-center">
            <h1 className="text-lg md:text-3xl  font-bold">ATS Tester</h1>
            {step > 1 ? (
              <span
                className="text-blue-600 cursor-pointer flex items-center"
                onClick={() => handleBack()}
              >
                <ArrowLeftIcon className="inline-block ml-10" />
                Back
              </span>
            ) : null}
          </div>
          <div className="mt-4 text-gray-700">
            <p className="text-sm md:text-lg">
              Upload your resume files to test ATS compatibility.
            </p>
            <p className="text-xs md:text-sm text-red-800">Supported formats: PDF, DOCX</p>
            <Alert className="mt-3 " severity="warning">Use Read-able/Text-Selectable Files Only. Avoid Kind of Image PDF's
              Non-text/Selectable files show's null %
            </Alert>
          </div>
        </div>
      ) : (
        null
      )}

      {step === 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 step-1">
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => handleSelect(dept.id)}
              className={`cursor-pointer rounded-xl p-5 bg-white shadow-md transition-all duration-300 hover:shadow-lg
            ${selected === dept.id ? "ring-3 ring-blue-500" : ""}
          `}
            >
              <h2 className="text-base md:text-xl font-bold mb-2">
                {dept.icons && (
                  <img
                    src={dept.icons}
                    alt={dept.label}
                    className="w-6 h-6 inline-block mr-2"
                  />
                )}
                {dept.label}
              </h2>
              <p className="text-xs md:text-base text-gray-600 italic">{dept.description}</p>
            </div>
          ))}
        </div>
      )}
      {step === 2 && (
        <div className="mt-6 step-2">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={loader ? <CircularProgress size="18px" color="inherit" /> : <CloudUploadIcon />}
          >
            {loader ? 'Analysing...' : 'Upload Resume' }
            <VisuallyHiddenInput
              type="file"
              onChange={handleUpload}
              accept=".pdf,.docx,.doc"
              name="resumeFiles"
              disabled={loader}
            />
          </Button>
        </div>
      )}
      {step === 3 && <AtsScoreCard score={score} suggestions={suggestions} />}
    </div>
  );
};

export default AtsTester;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

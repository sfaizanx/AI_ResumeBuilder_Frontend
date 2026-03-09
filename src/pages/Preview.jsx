import React, { useEffect, useState } from "react";
import ResumeTemplateOne from "../templates/Template1";
import ResumeTemplateTwo from "../templates/Template2";
import ResumeTemplateThree from "../templates/Template3";
import ResumeTemplateFour from "../templates/Template4";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowBack,
  Description,
  AutoAwesome,
  Download,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  Typography,
  Box,
  Tooltip,
  Zoom,
  Fab,
} from "@mui/material";
import { useResumeData } from "../common/formdata";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../Constant/constant";
import { useAuth } from "../context/authContext";
import { useRef } from "react";

const Preview = () => {
  const { formData, setFormData } = useResumeData();

  const templates = [
    { id: 1, Component: ResumeTemplateOne, name: "Professional" },
    { id: 2, Component: ResumeTemplateTwo, name: "Modern" },
    { id: 3, Component: ResumeTemplateThree, name: "Minimal" },
    { id: 4, Component: ResumeTemplateFour, name: "Elegant" },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const resumeRef = useRef(null);
  const { tokenVal, handleOpen } = useAuth();

  useEffect(() => {
    if (id) {
      const template = templates.find((t) => t.id.toString() === id);
      if (template) setSelectedTemplate(template);
    }
  }, [id]);

  const handleBack = () => navigate(`/builder/${id}`);

  const reactToPrintFn = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "Resume",
  });

  const handlePrint = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/Validtoken`, {
        headers: {
          Authorization: `Bearer ${tokenVal}`,
        },
      });

      if (res.data?.success) {
        reactToPrintFn();
      } else {
        toast.info("Please login to print or download your resume");
        handleOpen();
      }
    } catch (err) {
      toast.info("Session Expired or Invalid, please login to print your resume");
      handleOpen();
    }
  };

  return (
    <Container sx={{ py: 4, mx: { xs: 0, md: "auto" }, maxWidth: "none" }}>
      {selectedTemplate ? (
        <Box className="flex flex-col items-center justify-center gap-4">
          <style>
            {`
              @media print {
                @page { margin: 0; size: A4; }
                body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
            `}
          </style>

          {/* Resume Preview Section */}
          <Box className="flex justify-center w-full px-2" sx={{ overflow: "auto", pb: 10 }}>
            <Card
              sx={{
                p: 0,
                boxShadow: 8,
                borderRadius: 0,
                position: "relative",
                width: "210mm",
                minHeight: "297mm",
                backgroundColor: "white",
                transformOrigin: "top center",
                // scale it down slightly on smaller screens if necessary, though typical previews just let it scroll
                "@media (max-width: 800px)": {
                   transform: "scale(0.8)",
                   marginBottom: "-60mm"
                },
                "@media (max-width: 600px)": {
                   transform: "scale(0.55)",
                   marginBottom: "-120mm"
                }
              }}
            >
              <div ref={resumeRef} className="w-[210mm] min-h-[297mm] bg-white">
                <selectedTemplate.Component
                  formData={formData}
                  isPreview={true}
                />
              </div>
            </Card>
          </Box>

          {/* Floating Action Buttons */}
          <Box
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              display: "flex",
              gap: 2,
              zIndex: 1000,
            }}
          >
            <Tooltip title="Back to editor" arrow TransitionComponent={Zoom}>
              <Fab color="default" aria-label="back" onClick={handleBack}>
                <ArrowBack />
              </Fab>
            </Tooltip>
            
            <Tooltip title="Download PDF or Print" arrow TransitionComponent={Zoom}>
              <Fab color="primary" aria-label="print" onClick={handlePrint} variant="extended" sx={{ px: 3 }}>
                <Download sx={{ mr: 1 }} />
                Save PDF
              </Fab>
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <Box textAlign="center" sx={{ maxWidth: 800, mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <AutoAwesome
              sx={{
                fontSize: 40,
                color: "primary.main",
                mr: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                background: "linear-gradient(45deg, #1976d2, #4dabf5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Select Your Resume Design
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "text.secondary",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Choose from our professionally designed templates to make the
            perfect first impression
          </Typography>

          <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                onClick={() => navigate(`/preview/${template.id}`)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                    borderColor: "primary.main",
                  },
                }}
              >
                {/* Template Preview Container */}
                <Box
                  sx={{
                    height: 300,
                    overflow: "hidden",
                    borderRadius: 2,
                    mb: 2,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    bgcolor: "background.paper",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "30%",
                      background:
                        "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
                    },
                  }}
                >
                  {/* Scaled Template Preview */}
                  <Box
                    sx={{
                      transform: "scale(0.5)",
                      transformOrigin: "top center",
                      width: "100%",
                      position: "absolute",
                      top: 0,
                    }}
                  >
                    <template.Component
                      formData={formData}
                      isPreview={true} // Add this prop to templates to handle preview mode
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Description
                      sx={{
                        color: "primary.main",
                        mr: 1,
                      }}
                    />
                    {template.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowBack sx={{ transform: "rotate(180deg)" }} />}
                  >
                    Preview
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Preview;

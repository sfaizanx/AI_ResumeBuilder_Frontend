import React, { useEffect, useState } from "react";
import ResumeTemplateOne from "../templates/Template1";
import ResumeTemplateTwo from "../templates/Template2";
import ResumeTemplateThree from "../templates/Template3";
import ResumeTemplateFour from "../templates/Template4";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowBack,
  Print,
  Palette,
  CheckCircle,
  Description,
  AutoAwesome,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Zoom,
  Fab,
} from "@mui/material";
import { colorOptions } from "../Constant/Color";

const Preview = ({ formData, selectedColor, setSelectedColor }) => {
  

  const templates = [
    { id: 1, Component: ResumeTemplateOne, name: "Professional" },
    { id: 2, Component: ResumeTemplateTwo, name: "Modern" },
    { id: 3, Component: ResumeTemplateThree, name: "Creative" },
    { id: 4, Component: ResumeTemplateFour, name: "Creative" },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredColor, setHoveredColor] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const template = templates.find((t) => t.id.toString() === id);
      if (template) setSelectedTemplate(template);
    }
  }, [id]);

  const handleBack = () => navigate(`/builder/${id}`);

  return (
    <Container sx={{ py: 4 , mx: {xs:0, md: 'auto'}}}>
      {selectedTemplate ? (
        <Box className="flex flex-row lg:flex-row gap-1">
          {/* Resume Preview Section */}
          <Box className="flex-1">
              <Card
                id="resume-content"
                sx={{
                  p: 4,
                  boxShadow: 3,
                  borderRadius: 4,
                  position: "relative",
                  overflow: "visible",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: -8,
                    left: -8,
                    right: -8,
                    bottom: -8,
                    zIndex: -1,
                    background: `linear-gradient(45deg, ${selectedColor}20, #ffffff)`,
                    borderRadius: 8,
                  },
                }}
              >
                <selectedTemplate.Component
                  formData={formData}
                  selectedColor={selectedColor}
                />
              </Card>

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
            </Box>

            {/* Color Palette Floating Button */}
            <Box
              sx={{
                position: "fixed",
                bottom: 24,
                left: 24,
                zIndex: 1000,
              }}
            >
              <Tooltip title="Color palette" arrow TransitionComponent={Zoom}>
                <IconButton
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    "&:hover": {
                      bgcolor: "background.default",
                    },
                  }}
                  size="large"
                >
                  <Palette />
                </IconButton>
              </Tooltip>

              {/* Color Picker Dropdown */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 56,
                  left: 0,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 3,
                  p: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  width: 160,
                }}
              >
                {colorOptions.map((color, idx) => (
                  <Tooltip title={color.name} key={idx} arrow>
                    <Box
                      onClick={() => setSelectedColor(color.value)}
                      onMouseEnter={() => setHoveredColor(color.value)}
                      onMouseLeave={() => setHoveredColor(null)}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        cursor: "pointer",
                        border:
                          selectedColor === color.value
                            ? "2px solid #1976d2"
                            : hoveredColor === color.value
                            ? "2px solid #90caf9"
                            : "1px solid #e0e0e0",
                        bgcolor: color.value,
                        transition: "all 0.2s",
                        transform:
                          selectedColor === color.value
                            ? "scale(1.2)"
                            : hoveredColor === color.value
                            ? "scale(1.1)"
                            : "scale(1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {selectedColor === color.value && (
                        <CheckCircle
                          sx={{
                            color: "white",
                            fontSize: 16,
                            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
                          }}
                        />
                      )}
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            </Box>
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
                      selectedColor={selectedColor}
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

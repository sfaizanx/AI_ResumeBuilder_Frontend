import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Autocomplete,
  IconButton,
  Card,
  CardContent,
  Divider,
  Switch,
  FormControlLabel,
  Container,
  Box,
  Tooltip,
  Fab,
  Zoom,
} from "@mui/material";
import {
  Person,
  School,
  Work,
  Code,
  Star,
  Add,
  Edit,
  Delete,
  AutoAwesome,
  ArrowBack,
  ArrowForward,
  CloudUpload,
  Visibility,
  Download,
  Description,
  Language,
  Palette,
  CheckCircle,
  Computer,
  Preview,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import BuildIcon from "@mui/icons-material/Build";
import FolderIcon from "@mui/icons-material/Folder";
import LanguageIcon from "@mui/icons-material/Language";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { BASE_URL } from "../Constant/constant";
import { useNavigate, useParams } from "react-router-dom";
import ResumeTemplateOne from "../templates/Template1";
import ResumeTemplateTwo from "../templates/Template2";
import ResumeTemplateThree from "../templates/Template3";
import ResumeTemplateFour from "../templates/Template4";

const ResumeBuilder = ({
  formData,
  setFormData,
  atsAI,
  skillsAI,
  workExperienceAI,
  resumeScore,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [editingIndex, setEditingIndex] = useState({
    section: null,
    index: null,
  });
  const [tempData, setTempData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [aiPanelCollapsed, setAiPanelCollapsed] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [AiTitle, setAiTitle] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const templates = [
    { id: 1, Component: ResumeTemplateOne, name: "Professional" },
    { id: 2, Component: ResumeTemplateTwo, name: "Modern" },
    { id: 3, Component: ResumeTemplateThree, name: "Creative" },
    { id: 4, Component: ResumeTemplateFour, name: "Creative" },
  ];

  useEffect(() => {
    if (id) {
      const template = templates.find((t) => t.id.toString() === id);
      if (template) setSelectedTemplate(template);
    }
  }, [id]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleAiPanel = () => {
    setAiPanelCollapsed(!aiPanelCollapsed);
  };

  const steps = [
    {
      id: "personal",
      name: "Personal Info",
      icon: <PersonIcon fontSize="small" />,
    },
    {
      id: "education",
      name: "Education",
      icon: <SchoolIcon fontSize="small" />,
    },
    {
      id: "experience",
      name: "Experience",
      icon: <WorkIcon fontSize="small" />,
    },
    { id: "skills", name: "Skills", icon: <BuildIcon fontSize="small" /> },
    { id: "projects", name: "Projects", icon: <FolderIcon fontSize="small" /> },
    {
      id: "languages",
      name: "Languages",
      icon: <LanguageIcon fontSize="small" />,
    },
  ];

  // Navigation handlers
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
    setCompleted((prev) => ({ ...prev, [activeStep]: true }));
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    navigate(`/preview/${id}`);
  };

  // Form data handlers
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayInputChange = (section, index, field, value) => {
    const updatedArray = [...formData[section]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setFormData((prev) => ({ ...prev, [section]: updatedArray }));
  };

  // Add new entries
  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
    setEditingIndex({ section: "education", index: formData.education.length });
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          current: false,
        },
      ],
    }));
    setEditingIndex({
      section: "experience",
      index: formData.experience.length,
    });
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    }));
    setEditingIndex({ section: "projects", index: formData.projects.length });
  };

  const handleAddLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          language: "",
          proficiency: "Intermediate",
        },
      ],
    }));
    setEditingIndex({ section: "languages", index: formData.languages.length });
  };

  // Edit/Delete operations
  const handleEdit = (section, index) => {
    setEditingIndex({ section, index });
  };

  const handleDelete = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSaveEdit = (section) => {
    setEditingIndex({ section: null, index: null });
  };

  const handleCancelEdit = (section, index) => {
    if (tempData) {
      const updatedArray = [...formData[section]];
      updatedArray[index] = tempData;
      setFormData((prev) => ({ ...prev, [section]: updatedArray }));
    }
    setEditingIndex({ section: null, index: null });
    setTempData(null);
  };

  const proficiencyLevels = ["Basic", "Intermediate", "Advanced", "Native"];

  // Step content renderer
  const getStepContent = (step) => {
    switch (step) {
      case 0: // Personal Info
        return (
          <div className="space-y-5">
            <Typography variant="h6" className="mb-4 font-bold">
              Basic Information
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-2 my-5 gap-5">
              <TextField
                label="First Name *"
                name="firstName"
                value={formData?.personalInfo?.firstName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "firstName", e.target.value)
                }
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Last Name *"
                name="lastName"
                value={formData?.personalInfo?.lastName}
                onChange={(e) =>
                  handleInputChange("personalInfo", "lastName", e.target.value)
                }
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Email *"
                type="email"
                value={formData?.personalInfo?.email}
                onChange={(e) =>
                  handleInputChange("personalInfo", "email", e.target.value)
                }
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Phone *"
                value={formData?.personalInfo?.phone}
                onChange={(e) =>
                  handleInputChange("personalInfo", "phone", e.target.value)
                }
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Address"
                value={formData?.personalInfo?.address}
                onChange={(e) =>
                  handleInputChange("personalInfo", "address", e.target.value)
                }
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="LinkedIn"
                value={formData?.personalInfo?.linkedIn}
                onChange={(e) =>
                  handleInputChange("personalInfo", "linkedIn", e.target.value)
                }
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Portfolio Website"
                value={formData?.personalInfo?.portfolio}
                onChange={(e) =>
                  handleInputChange("personalInfo", "portfolio", e.target.value)
                }
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Job Title"
                name="jobTitle"
                value={formData?.personalInfo?.jobTitle}
                onChange={(e) => {
                  handleInputChange("personalInfo", "jobTitle", e.target.value);
                }}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" type="button">
                      <IconButton onClick={handlegetTitle}>
                      <AutoAwesome style={{ color: "blue" }} fontSize= 'small' />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <span className="col-span-1"></span>
              <span className="col-span-1 bg-indigo-200 text-indigo-900 py-1 px-3 rounded-full text-xs">
                AI Suggestions: try "{AiTitle}"
              </span>

              <TextField
                className="col-span-2"
                placeholder="Objective based on Job-Role"
                multiline
                rows={3}
                value={formData?.personalInfo?.jobDesc}
                onChange={(e) =>
                  handleInputChange("personalInfo", "jobDesc", e.target.value)
                }
                fullWidth
                variant="outlined"
              />
            </div>
          </div>
        );

      case 1: // Education
        return (
          <div className="my-6">
            <div className="flex justify-between items-center my-6">
              <Typography variant="h6" className="text-gray-700">
                Education History
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddEducation}
              >
                Add Education
              </Button>
            </div>

            {formData?.education?.length === 0 ? (
              <Card variant="outlined" className="p-4 text-center">
                <Typography color="textSecondary">
                  No education entries added yet
                </Typography>
              </Card>
            ) : (
              formData?.education.map((edu, index) => (
                <Card key={index} className="mb-4">
                  <CardContent>
                    {editingIndex.section === "education" &&
                    editingIndex.index === index ? (
                      <div className="grid mb-2 gap-4">
                        <TextField
                          label="Institution *"
                          value={edu.institution}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "education",
                              index,
                              "institution",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <TextField
                            label="Degree *"
                            name="degree"
                            value={edu.degree}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "education",
                                index,
                                "degree",
                                e.target.value
                              )
                            }
                            fullWidth
                          />
                          <TextField
                            label="Field of Study *"
                            value={edu.field}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "education",
                                index,
                                "field",
                                e.target.value
                              )
                            }
                            fullWidth
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <TextField
                            label="Start Date *"
                            type="date"
                            value={edu.startDate}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "education",
                                index,
                                "startDate",
                                e.target.value
                              )
                            }
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                          <TextField
                            label="End Date *"
                            type="date"
                            value={edu.endDate}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "education",
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                        </div>
                        <TextField
                          label="Description"
                          multiline
                          rows={3}
                          value={edu.description}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "education",
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outlined"
                            onClick={() => handleCancelEdit("education", index)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSaveEdit("education")}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <div>
                            <Typography variant="h6">
                              {edu.institution || "New Education"}
                            </Typography>
                            <Typography color="textSecondary">
                              {edu.degree} {edu.field && `in ${edu.field}`}
                            </Typography>
                            <Typography variant="body2" className="mt-2">
                              {edu.startDate} - {edu.endDate || "Present"}
                            </Typography>
                          </div>
                          <div>
                            <IconButton
                              onClick={() => {
                                setTempData({ ...edu });
                                handleEdit("education", index);
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete("education", index)}
                            >
                              <Delete fontSize="small" color="error" />
                            </IconButton>
                          </div>
                        </div>
                        {edu.description && (
                          <>
                            <Divider className="my-2" />
                            <Typography variant="body2">
                              {edu.description}
                            </Typography>
                          </>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );

      case 2: // Experience
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="text-gray-700">
                Work Experience
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddExperience}
              >
                Add Experience
              </Button>
            </div>

            {formData.experience.length === 0 ? (
              <Card variant="outlined" className="p-4 text-center">
                <Typography color="textSecondary">
                  No work experience added yet
                </Typography>
              </Card>
            ) : (
              formData.experience.map((exp, index) => (
                <Card key={index} className="mb-4">
                  <CardContent>
                    {editingIndex.section === "experience" &&
                    editingIndex.index === index ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <TextField
                            label="Company"
                            value={exp.company}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "experience",
                                index,
                                "company",
                                e.target.value
                              )
                            }
                            fullWidth
                          />
                          <TextField
                            label="Position"
                            value={exp.position}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "experience",
                                index,
                                "position",
                                e.target.value
                              )
                            }
                            fullWidth
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <TextField
                            label="Start Date"
                            type="date"
                            value={exp.startDate}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "experience",
                                index,
                                "startDate",
                                e.target.value
                              )
                            }
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                          <TextField
                            label="End Date"
                            type="date"
                            value={exp.endDate}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "experience",
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                            InputLabelProps={{ shrink: true }}
                            disabled={exp.current}
                            fullWidth
                          />
                        </div>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={exp.current}
                              onChange={(e) =>
                                handleArrayInputChange(
                                  "experience",
                                  index,
                                  "current",
                                  e.target.checked
                                )
                              }
                            />
                          }
                          label="Currently working here"
                        />
                        <TextField
                          label="Description"
                          multiline
                          rows={4}
                          value={exp.description}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "experience",
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                        <div className="flex justify-end gap-4 mt-4">
                          <Button
                            variant="outlined"
                            onClick={() =>
                              handleCancelEdit("experience", index)
                            }
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSaveEdit("experience")}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <div>
                            <Typography variant="h6">
                              {exp.company || "New Experience"}
                            </Typography>
                            <Typography color="textSecondary">
                              {exp.position}
                            </Typography>
                            <Typography variant="body2" className="mt-2">
                              {exp.startDate} -{" "}
                              {exp.current ? "Present" : exp.endDate}
                            </Typography>
                          </div>
                          <div>
                            <IconButton
                              onClick={() => {
                                setTempData({ ...exp });
                                handleEdit("experience", index);
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete("experience", index)}
                            >
                              <Delete fontSize="small" color="error" />
                            </IconButton>
                          </div>
                        </div>
                        {exp.description && (
                          <>
                            <Divider className="my-2" />
                            <Typography variant="body2">
                              {exp.description}
                            </Typography>
                          </>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );

      case 3: // Skills
        return (
          <div className="space-y-6">
            <Typography variant="h6" className="text-gray-700">
              Skills & Expertise
            </Typography>

            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={formData.skills}
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  skills: newValue,
                }));
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    key={index}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Add your skills"
                  placeholder="Type and press enter"
                />
              )}
            />

            <div className="mt-4">
              <Typography variant="subtitle2" className="mb-2">
                AI Skill Suggestions (based on your experience)
              </Typography>
              <div className="flex flex-wrap gap-2">
                {[
                  "React.js",
                  "Node.js",
                  "MongoDB",
                  "REST APIs",
                  "Git",
                  "Agile Methodologies",
                ].map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    variant="outlined"
                    onClick={() => {
                      if (!formData.skills.includes(skill)) {
                        setFormData((prev) => ({
                          ...prev,
                          skills: [...prev.skills, skill],
                        }));
                      }
                    }}
                    icon={<Star fontSize="small" color="primary" />}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Projects
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="text-gray-700">
                Projects & Achievements
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddProject}
              >
                Add Project
              </Button>
            </div>

            {formData.projects.length === 0 ? (
              <Card variant="outlined" className="p-4 text-center">
                <Typography color="textSecondary">
                  No projects added yet
                </Typography>
              </Card>
            ) : (
              formData.projects.map((project, index) => (
                <Card key={index} className="mb-4">
                  <CardContent>
                    {editingIndex.section === "projects" &&
                    editingIndex.index === index ? (
                      <div className="my-4 grid grid-cols-1 md:grid-cols-1 gap-4">
                        <TextField
                          label="Project Name"
                          value={project.name}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "projects",
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                        <TextField
                          label="Technology's"
                          value={project.technologies || ""}
                          onChange={(e) => {
                            handleArrayInputChange(
                              "projects",
                              index,
                              "technologies",
                              e.target.value
                            );
                          }}
                        />
                        <TextField
                          label="Project Link"
                          value={project.link}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "projects",
                              index,
                              "link",
                              e.target.value
                            )
                          }
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                https://
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          label="Description"
                          multiline
                          rows={4}
                          value={project.description}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "projects",
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            variant="outlined"
                            onClick={() => handleCancelEdit("projects", index)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSaveEdit("projects")}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <div>
                            <Typography variant="h6">
                              {project.name || "New Project"}
                            </Typography>
                          </div>
                          <div>
                            <IconButton
                              onClick={() => {
                                setTempData({ ...project });
                                handleEdit("projects", index);
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete("projects", index)}
                            >
                              <Delete fontSize="small" color="error" />
                            </IconButton>
                          </div>
                        </div>
                        {project.description && (
                          <>
                            <Divider className="my-2" />
                            <Typography variant="body2">
                              {project.description}
                            </Typography>
                          </>
                        )}
                        {project.link && (
                          <Typography variant="body2" className="mt-2">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500"
                            >
                              View Project
                            </a>
                          </Typography>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );

      case 5: // Languages
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="text-gray-700">
                Languages
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddLanguage}
              >
                Add Language
              </Button>
            </div>

            {formData.languages.length === 0 ? (
              <Card variant="outlined" className="p-4 text-center">
                <Typography color="textSecondary">
                  No languages added yet
                </Typography>
              </Card>
            ) : (
              formData.languages.map((lang, index) => (
                <Card key={index} className="mb-4">
                  <CardContent>
                    {editingIndex.section === "languages" &&
                    editingIndex.index === index ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                          label="Language"
                          value={lang.language}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "languages",
                              index,
                              "language",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                        <Autocomplete
                          options={proficiencyLevels}
                          value={lang.proficiency}
                          onChange={(event, newValue) => {
                            handleArrayInputChange(
                              "languages",
                              index,
                              "proficiency",
                              newValue
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Proficiency Level"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                        <div className="flex justify-end gap-2 col-span-2">
                          <Button
                            variant="outlined"
                            onClick={() => handleCancelEdit("languages", index)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSaveEdit("languages")}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <Typography variant="h6">
                            {lang.language || "New Language"}
                          </Typography>
                          <Typography color="textSecondary">
                            {lang.proficiency}
                          </Typography>
                        </div>
                        <div>
                          <IconButton
                            onClick={() => {
                              setTempData({ ...lang });
                              handleEdit("languages", index);
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete("languages", index)}
                          >
                            <Delete fontSize="small" color="error" />
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );

      default:
        return "Unknown step";
    }
  };

  const handleAI = () => {
    if (!formData.personalInfo.jobTitle) {
      alert("Please enter a job title first");
      return;
    }
    axios
      .post(`${BASE_URL}/ai/Aidesc`, { jobDesc: formData.personalInfo.jobTitle })
      .then((res) => {
        if (res.data && res.data.description) {
          setFormData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              jobDesc: res.data.description,
            },
          }));
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handlegetTitle = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/ai/suggest-title`, {
        jobTitle: formData.personalInfo.jobTitle,
      })
      .then((res) => {
        if (res.data && res.data.suggestedTitle) {
          setLoading(false);
          setAiTitle(res.data.suggestedTitle);
          handleAI();
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });

  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Component */}
      <div
        className={`bg-white border-r border-gray-200 transition-all ${
          sidebarCollapsed ? "w-16" : "w-44"
        } hidden sm:block shrink-0`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          {!sidebarCollapsed && (
            <h3 className="font-medium text-gray-800">Components</h3>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>

        <div className="p-4">
          <ul className="space-y-2 text-sm">
            {steps.map((section, index) => (
              <li
                key={section.id}
                className={`p-2 rounded-lg cursor-pointer transition-colors`}
              >
                <div
                  className={`flex items-center ${
                    activeStep === index
                      ? "text-indigo-700 py-2 rounded-full font-semibold"
                      : "text-gray-800"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="text-lg md:block">{section.icon}</span>
                  {!sidebarCollapsed && (
                    <span className="ml-3">{section.name}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-4 w-full md:flex-row px-4 py-4 bg-gray-50">
        {/* Form */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm w-full md:w-2/5">
          {getStepContent(activeStep)}

          <div className="flex justify-between mt-8">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                endIcon={<CloudUpload />}
                onClick={handleSubmit}
              >
                Save & Finish
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForward />}
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-lg w-full md:w-3/5">

         <Card className="shadow-sm py-3 px-5 mb-5 flex item-center justify-between">
            <h3 className="font-semibold">
              <Computer /> Live Preview
            </h3>

            <h2
              onClick={() => navigate(`/preview/${id}`)}
              className="cursor-pointer flex flex-row "
            >
              <Tooltip title="Preview" arrow>
                <VisibilityIcon color="info" />
              </Tooltip>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ height: "15px", marginX: "10px" }}
              />
              <Tooltip title="Download" arrow>
                <DownloadForOfflineIcon color="info" />
              </Tooltip>
            </h2>
         </Card>

         <Card
            sx={{
              position: "relative",
              width: "100%",
              maxHeight: {
                xs: "200vh",
                sm: "300vh",
              } // Prevent modal from being too tall
            }}
          >
            {selectedTemplate && (
              <Box
                sx={{
                  transformOrigin: "center top",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <selectedTemplate.Component formData={formData} />
              </Box>
            )}
         </Card>
        </div>
        
      </div>

      {/* AI component Sidebar */}
      <div
        className={`bg-white border-l border-gray-200 transition-all ${
          aiPanelCollapsed ? "w-12" : "w-60"
        } shrink-0`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          {!aiPanelCollapsed && (
            <h3 className="font-medium text-gray-800 flex items-center">
              <SmartToyIcon className="text-indigo-600 mr-2" fontSize="small" />
              AI Assistant
            </h3>
          )}
          <button
            onClick={toggleAiPanel}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {aiPanelCollapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </button>
        </div>

        {/* Collapsible Panel */}
        {!aiPanelCollapsed && (
          <div>
            {/* Resume Score */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Resume Score
                </h4>
                <span className="text-sm text-gray-600">{resumeScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${resumeScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            {/* Suggestions */}
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Suggestions
              </h4>

              <div className="space-y-3">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <h5 className="text-xs font-medium text-indigo-800 mb-1">
                    Work Experience
                  </h5>
                  <p className="text-xs text-gray-700">{workExperienceAI}</p>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <h5 className="text-xs font-medium text-amber-800 mb-1">
                    Skills
                  </h5>
                  <p className="text-xs text-gray-700">{skillsAI}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="text-xs font-medium text-green-800 mb-1">
                    ATS Compatibility
                  </h5>
                  <p className="text-xs text-gray-700">{atsAI}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;

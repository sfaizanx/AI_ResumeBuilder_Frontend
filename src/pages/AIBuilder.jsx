import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";
import { BASE_URL } from "../Constant/constant";
import { useNavigate, useParams } from "react-router-dom";

const AIBuilder = ({setFormData, setatsAI, setskillsAI, setWorkExperienceAI, setResumeScore}) => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const [suggestions, setSuggestions] = useState([
    "Experienced software engineer with 5+ years in web development",
    "Marketing professional specializing in digital campaigns and analytics",
    "Recent graduate with honors seeking entry-level finance position",
  ]);

  const handleGenerate = async () => {
  if (!input.trim()) return;

  setIsGenerating(true);

  try {
    const res = await axios.post(`${BASE_URL}/ai/AIResume`, {
      jobdetails: input,
    });

    setFormData(res.data.jobdet)
    setResumeScore(res.data.jobdet.resumeScore)
    setWorkExperienceAI(res.data.jobdet.workExperienceAI)
    setskillsAI(res.data.jobdet.skillsAI)
    setResumeScore(res.data.jobdet.resumeScore)
    setatsAI(res.data.jobdet.atsAI)

    navigate(
      `/builder/${id}`
    );
  } catch (err) {
    console.error("Generating failed", err);
  } finally {
    setIsGenerating(false);
  }
};


  const handleClear = () => {
    // setInput("");
    setInput("");
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <Box className="min-h-screen bg-gray-50 py-8">
      <Container maxWidth="md">
        <Card elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <AutoAwesomeIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
              <Typography variant="h5" component="h1" color="primary">
                AI Resume Builder
              </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" mb={3}>
              Describe your professional background and let our AI create a
              polished resume for you
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: 'I am XYZ, Education..., Profession is Full-stack developer with 3 years experience in React and Node.js, looking for senior positions in tech startups..., done projects in years using xyz techniques '"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={handleClear}
                  disabled={!input}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={
                    isGenerating ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SendIcon />
                    )
                  }
                  onClick={handleGenerate}
                  disabled={!input.trim() || isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Resume"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
          Need inspiration? Try these:
        </Typography>

        <Grid container spacing={2} mb={4}>
          {suggestions.map((suggestion, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "action.hover",
                  },
                }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <CardContent sx={{ py: 2, px: 2 }}>
                  <Box display="flex" alignItems="center">
                    <ContentPasteGoIcon
                      color="action"
                      sx={{ mr: 1, fontSize: 18 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {suggestion}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="caption" color="text.secondary">
            Our AI analyzes thousands of successful resumes to create the
            perfect template for your needs
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AIBuilder;

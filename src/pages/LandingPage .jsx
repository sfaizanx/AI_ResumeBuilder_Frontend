import React, { useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import {
  ArrowRightAlt,
  AutoAwesome,
  FormatPaint,
  CloudDownload,
  Close,
  ArrowLeft,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/StarRate";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import ResumeTemplateOne from "../templates/Template1";
import ResumeTemplateTwo from "../templates/Template2";
import ResumeTemplateThree from "../templates/Template3";
import { sampleDataOne } from "../Constant/SampleData";
import SvgGuides from "../components/SvgGuides";
import ATSScoreLanding from "../components/AtsScoreLanding";
import ResumeTemplateFour from "../templates/Template4";



const LandingPage = ({ setTokenId }) => {
  const [previewId, setPreviewId] = useState(null);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  

  useEffect(() => {
    if (id) {
      setTokenId(id);
    }
  }, [id]);

  const templates = [
    {
      id: 1,
      Component: ResumeTemplateOne,
      data: sampleDataOne,
      name: "Modern Professional",
    },
    {
      id: 2,
      Component: ResumeTemplateTwo,
      data: sampleDataOne,
      name: "Modern Professional",
    },
    {
      id: 3,
      Component: ResumeTemplateThree,
      data: sampleDataOne,
      name: "Modern Professional",
    },
    {
      id: 4,
      Component: ResumeTemplateFour,
      data: sampleDataOne,
      name: "Modern Professional",
    },
  ];

  // Features data
  const features = [
    {
      id: 1,
      title: "AI-Powered Resume Builder",
      description:
        "Our advanced AI analyzes thousands of successful resumes to provide personalized suggestions tailored to your industry and experience level.",
      icon: <SmartToyIcon fontSize="large" className="text-indigo-600" />,
      color: "indigo",
    },
    {
      id: 2,
      title: "ATS-Optimized Templates",
      description:
        "Every template is tested against leading Applicant Tracking Systems to ensure your resume gets past automated screenings and into human hands.",
      icon: <CheckCircleIcon fontSize="large" className="text-green-600" />,
      color: "green",
    },
    {
      id: 3,
      title: "Real-Time Feedback",
      description:
        "Get instant suggestions to improve your content, formatting, and overall impact as you build your resume.",
      icon: (
        <ChatBubbleOutlineIcon fontSize="large" className="text-blue-600" />
      ),
      color: "indigo",
    },
    {
      id: 4,
      title: "Industry-Specific Keywords",
      description:
        "Our AI automatically suggests relevant keywords for your industry to help you match job descriptions and stand out to recruiters.",
      icon: <VpnKeyIcon fontSize="large" className="text-yellow-600" />,
      color: "yellow",
    },
  ];
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "Global Brands Inc.",
      quote:
        "I landed three interviews within a week of using this AI resume builder. The suggestions were spot-on for my industry!",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20confident%20female%20marketing%20executive%20with%20shoulder%20length%20brown%20hair%2C%20warm%20smile%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20lighting&width=80&height=80&seq=7&orientation=squarish",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Software Engineer",
      company: "TechNova",
      quote:
        "The AI suggestions helped me highlight achievements I wouldn't have thought to include. Received an offer from my dream tech company!",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20asian%20male%20software%20engineer%20with%20glasses%2C%20friendly%20smile%2C%20casual%20professional%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20lighting&width=80&height=80&seq=8&orientation=squarish",
    },
    {
      id: 3,
      name: "Priya Patel",
      position: "Healthcare Administrator",
      company: "Memorial Health Systems",
      quote:
        "As someone switching careers, this tool was invaluable in translating my skills to a new industry. The templates are beautiful and professional.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20indian%20female%20healthcare%20professional%20with%20long%20black%20hair%2C%20confident%20smile%2C%20professional%20medical%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20lighting&width=80&height=80&seq=9&orientation=squarish",
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "How does the AI resume builder work?",
      answer:
        "Our AI analyzes thousands of successful resumes across different industries to provide personalized suggestions for content, formatting, and keywords. It helps you highlight your strengths and achievements in a way that appeals to both human recruiters and ATS systems.",
    },
    {
      question: "Are the templates ATS-friendly?",
      answer:
        "Yes, all our templates are thoroughly tested against major Applicant Tracking Systems to ensure they're properly parsed. We avoid complex formatting, graphics, or headers/footers that might confuse ATS software.",
    },
    {
      question: "Can I download my resume in different formats?",
      answer:
        "Absolutely! You can download your completed resume as a PDF, Word document, or plain text file. The PDF version is recommended for most applications as it preserves your formatting exactly as designed.",
    },
    {
      question: "Is my data secure?",
      answer:
        "We take data security seriously. Your information is encrypted and never shared with third parties. You can delete your account and all associated data at any time from your account settings.",
    },
  ];

  const handleOpenPreview = (id) => {
    setPreviewId(id);
  };

  const handleClosePreview = () => {
    setPreviewId(null);
  };

  const handleOpenAllTemplates = () => setShowAllTemplates(true);
  const handleCloseAllTemplates = () => setShowAllTemplates(false);

  const templatesToShow = showAllTemplates ? templates : templates.slice(0, 3);



  const Cards = () => {
    return (
      <main className="flex-grow flex-col bg-gray-50">
        <div className="max-w-7xl mx-auto w-full px-6 py-8">
          {/* AI Suggested Templates */}
          <section className="mb-12">
            {/* Heading + Subtext */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                AI-Suggested Templates for You
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI analyzes your industry and experience level to recommend
                the most effective templates for your job search.
              </p>
            </div>

            {/* View All / Go Back Button */}
            <div className="flex justify-center md:justify-end mb-6">
              {showAllTemplates ? (
                <button
                  onClick={handleCloseAllTemplates}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center cursor-pointer whitespace-nowrap"
                >
                  <ArrowLeft className="mr-1" />
                  Go Back
                </button>
              ) : (
                <button
                  onClick={handleOpenAllTemplates}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center cursor-pointer whitespace-nowrap"
                >
                  View All <ArrowRightIcon className="ml-1" />
                </button>
              )}
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {templatesToShow?.map((template) => (
                <Card sx={{ maxWidth: 340 }} key={template.id}>
                  <div className="relative overflow-hidden">
                    {/* Template Preview */}
                    <div className="cursor-pointer md:transform scale-[0.36] origin-top-left w-227 h-75 mx-auto pt-4">
                      <template.Component formData={template.data} />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <button
                        onClick={() => navigate(`/aibuilder/${template.id}`)}
                        className="bg-white text-indigo-600 font-medium py-2 px-4 rounded mb-2 hover:bg-indigo-50 transition-colors"
                      >
                        Use Template
                      </button>
                      <button
                        className="bg-transparent text-white border border-white py-2 px-4 rounded hover:bg-white/10 transition-colors hidden md:block"
                        onClick={() => handleOpenPreview(template.id)}
                      >
                        Preview
                      </button>
                    </div>
                  </div>

                  <CardActions sx={{ p: 2 }}>
                    <div style={{ width: "100%" }}>
                      <h6 className="font-bold text-sm text-gray-800 mb-2">
                        {template.name}
                      </h6>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                          AI Recommended
                        </span>
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
                        </div>
                      </div>
                    </div>
                  </CardActions>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 ">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="PC.jpg"
            alt="AI Resume Builder Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-800/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white" data-aos="fade-right">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight animate-bounce">
                Create a Winning Resume with AI
              </h1>
              <p className="text-base md:text-xl mb-8 text-indigo-100">
                Our AI-powered platform helps you build professional,
                ATS-optimized resumes that get you noticed by employers and land
                more interviews.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button onClick={() => { 
                  const section = document.querySelector('#resumes');
                  section?.scrollIntoView({behaviour: "smooth"})
                }} 
                className="bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 sm:px-6 sm:py-3 rounded-button shadow-md font-medium text-sm sm:text-lg flex items-center justify-center whitespace-nowrap">
                  <AutoAwesome className="mr-2" fontSize="small" />
                  Build My Resume
                </button>

                <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-4 py-2 sm:px-6 sm:py-3 rounded-button font-medium text-sm sm:text-lg flex items-center justify-center whitespace-nowrap">
                  <PlayCircleFilledWhiteIcon
                    className="mr-2"
                    fontSize="small"
                  />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img
                    src="AV1.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="AV2.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="AV3.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
                <div>
                  <div className="flex items-center text-yellow-400 mb-1">
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarHalfIcon fontSize="small" />
                    <span className="ml-2 text-white text-sm">4.8/5</span>
                  </div>
                  <p className="text-indigo-100 text-sm">
                    Trusted by 100,000+ job seekers
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              {/* Reserved for future image/animation */}
            </div>
          </div>
        </div>
      </section>

        {/* ATSLandingCTA */}
      <section className="py-10 bg-white">
      <ATSScoreLanding />
      </section>

      {/* Features Section*/}
      <section className="py-20 bg-white" id="features" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent resume builder combines the latest in AI with
              proven resume strategies to help you create the perfect resume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-full bg-${feature.color}-100 flex items-center justify-center mb-6`}
                >
                  {/* MUI Icon passed directly */}
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  How Our AI Improves Your Resume
                </h3>
                <p className="text-gray-700 mb-6">
                  Our AI analyzes your resume against thousands of successful
                  examples in your industry to provide personalized
                  recommendations.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <i className="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Suggests powerful action verbs and industry-specific
                      keywords
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <i className="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Identifies missing skills and experiences relevant to your
                      target role
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <i className="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Optimizes formatting for both human recruiters and ATS
                      systems
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <i className="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Provides real-time feedback to strengthen your content
                    </p>
                  </li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center transform rotate-12 z-0">
                  <span className="text-yellow-800 font-bold text-lg">
                    NEW!
                  </span>
                </div>
                <div className="bg-white rounded-xl shadow-xl p-6 relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <SmartToyIcon />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">
                        AI Assistant
                      </h4>
                      <p className="text-sm text-gray-500">
                        Suggestion for your experience
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 text-sm italic">
                      Your current bullet point:
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
                      "Managed a team and improved website performance."
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4">
                    <p className="text-indigo-700 text-sm font-medium mb-2">
                      AI Suggestion:
                    </p>
                    <p className="text-gray-800">
                      "Led a cross-functional team of 8 developers to redesign
                      the company website, resulting in a 45% increase in page
                      load speed and 32% improvement in conversion rates."
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col md:flex-row space-y-2 space-x-2">
                    <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-button text-sm cursor-not-allowed whitespace-nowrap">
                      Apply Suggestion
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-button text-sm cursor-not-allowed whitespace-nowrap">
                      Edit Suggestion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Display */}
      <section className="py-10 bg-gray-50" data-aos="fade-up">
        <SvgGuides />
      </section>

      {/* Display Templates */}
      <section id="resumes" data-aos="zoom-in-up">{Cards(templates)}</section>

      {/* Testimonials Section and Start Template */}
      <section className="py-20 bg-white" id="testimonials" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Real Users
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of job seekers have used our AI Resume Builder to land
              their dream jobs.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 transition-shadow hover:shadow-xl"
              >
                {/* Avatar + Info */}
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {testimonial.position}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Rating */}
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} fontSize="small" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-indigo-600 rounded-2xl p-8 md:p-12 text-center" data-aos="fade-up"
     data-aos-anchor-placement="top-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ready to Create Your Professional Resume?
            </h3>
            <p className="text-indigo-100 text-lg mb-8 max-w-3xl mx-auto">
              Join thousands of job seekers who have successfully landed
              interviews with our AI-powered resume builder.
            </p>
            <button
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-full shadow-lg font-bold text-lg cursor-pointer whitespace-nowrap"
              onClick={() => { 
                  const section = document.querySelector('#resumes');
                  section?.scrollIntoView({behaviour: "smooth"})
                }} 
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50" id="faq">
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our AI Resume Builder
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 font-clash" data-aos="fade-up"
     data-aos-anchor-placement="top-center">
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                disableGutters
                elevation={2}
                className="rounded-xl border border-gray-100 py-3"
                sx={{
                  backgroundColor: "white",
                  "&:before": { display: "none" }, // Remove default divider line
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="text-indigo-600" />}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                  className="px-6 py-4"
                >
                  <p className="text-gray-900">
                    {faq.question}
                  </p>
                </AccordionSummary>
                <AccordionDetails className="px-6 pb-4 pt-0 text-gray-700">
                  <p>{faq.answer}</p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>

          {/* Contact Support CTA */}
          <div className="mt-12 text-center" data-aos="fade-up"
     data-aos-anchor-placement="top-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-6 py-3 rounded-full font-medium transition-all duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <Modal
        open={Boolean(previewId)}
        onClose={handleClosePreview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          p: 2, // Padding around modal
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: {
              xs: "100%",
              sm: "90%",
              md: "80%",
              lg: "70%",
            },
            maxWidth: "1200px", // Maximum width limit
            maxHeight: "90vh", // Prevent modal from being too tall
          }}
          data-aos="zoom-in-up"
        >
          <IconButton
            onClick={handleClosePreview}
            sx={{
              position: "fixed", // Fixed position so it stays visible when scrolling
              right: { xs: 16, sm: 24 },
              top: { xs: 16, sm: 24 },
              zIndex: 1,
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "grey.200",
              },
            }}
          >
            <Close />
          </IconButton>

          {previewId &&
            templates &&
            (() => {
              const template = templates.find((t) => t.id === previewId);
              if (!template) {
                return (
                  <Card sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
                    <Typography>Template not found</Typography>
                  </Card>
                );
              }
              return (
                  <Box
                    sx={{
                      transform: {
                        xs: "scale(0.7)", // Slightly reduced on mobile
                        sm: "scale(0.7)", // Full size on tablet+
                      },
                      transformOrigin: "center top",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <template.Component formData={template.data} />
                  </Box>
              );
            })()}
        </Box>
      </Modal>

      {/* Modals II All templates */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showAllTemplates}
        onClose={handleCloseAllTemplates}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showAllTemplates}>
          <Box sx={style}>{Cards()}</Box>
        </Fade>
      </Modal>
      
    </div>
  );
};

export default LandingPage;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: "90%", lg: "90%" },
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  overflow: "auto",
  p: 4,
  boxShadow: 24,
};

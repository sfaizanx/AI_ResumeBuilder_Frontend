import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage '
import ResumeBuilder from './pages/ResumeBuilder';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preview from './pages/Preview';
import AIBuilder from './pages/AIBuilder';
import { colorOptions }  from './Constant/Color';
import ScrollToTop from './components/Scroll';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/authContext';
import AtsTester from './pages/AtsTester';
import AOS from 'aos';
import "aos/dist/aos.css";



function App() {

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      portfolio: '',
      jobTitle: '',
      jobDesc:''
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    languages: []
  });
  const [resumeScore, setResumeScore] = useState(0);
  const [workExperienceAI, setWorkExperienceAI] = useState("")
  const [skillsAI, setskillsAI] = useState("");
  const [atsAI, setatsAI] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  const [tokenId, setTokenId] = useState(null);

   useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // whether animation should happen only once
    });
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    <Router>
      <AuthProvider>
        <Navbar tokenId={tokenId} />
        <ScrollToTop/>
      <Routes>
        <Route path="/:id?" element={<LandingPage setTokenId={setTokenId} />} />
        <Route path="/builder/:id?" element={<ResumeBuilder formData={formData} setFormData={setFormData} resumeScore={resumeScore} workExperienceAI={workExperienceAI} skillsAI={skillsAI}  atsAI={atsAI} />} />
        <Route path="/preview/:id?" element={<Preview formData={formData} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />} />
        <Route path="/aibuilder/:id?" element={<AIBuilder formData={formData} setFormData={setFormData} setResumeScore={setResumeScore}  setWorkExperienceAI={setWorkExperienceAI} setskillsAI={setskillsAI} setatsAI={setatsAI} />} />
        <Route path='/atstester' element={<AtsTester />} />
      </Routes>
        <Footer/>
        <ToastContainer theme='colored' />
        </AuthProvider>
    </Router>
    </div>
  );
}

export default App;

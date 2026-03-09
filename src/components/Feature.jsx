import React from 'react'
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const Feature = () => {

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

  return (
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
    
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                data-aos="fade-up"
              >
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
                        <button className="bg-indigo-600  text-white px-3 py-1.5 text-sm cursor-not-allowed whitespace-nowrap">
                          Apply Suggestion
                        </button>
                        <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 text-sm cursor-not-allowed whitespace-nowrap">
                          Edit Suggestion
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  )
}

export default Feature
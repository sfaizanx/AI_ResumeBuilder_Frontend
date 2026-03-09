import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {

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
    
  return (
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
          <div
            className="space-y-4 font-clash"
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
          >
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
                  <p className="text-gray-900">{faq.question}</p>
                </AccordionSummary>
                <AccordionDetails className="px-6 pb-4 pt-0 text-gray-700">
                  <p>{faq.answer}</p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>

          {/* Contact Support CTA */}
          <div
            className="mt-12 text-center"
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
          >
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-6 py-3 rounded-full font-medium transition-all duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </section>
  )
}

export default FAQ
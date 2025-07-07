import { Description } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <>
    {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-10 md:mb-0">
              <div className="flex items-center mb-4">
                <Description
                  className="text-indigo-400 mr-2"
                  fontSize="large"
                />
                <span className="text-2xl font-bold">SmartResume</span>
              </div>
              <Typography className="text-gray-400 max-w-md">
                The AI-powered resume builder that helps you create professional
                resumes that get you interviews.
              </Typography>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "Templates"],
                },
                {
                  title: "Resources",
                  links: ["Blog", "Resume Tips", "Help Center"],
                },
                {
                  title: "Company",
                  links: ["About Us", "Contact", "Privacy Policy"],
                },
              ].map((section, idx) => (
                <div key={idx}>
                  <Typography
                    variant="h6"
                    className="text-lg font-semibold mb-4"
                  >
                    {section.title}
                  </Typography>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a href="#" className="text-gray-400 hover:text-white">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
            © {new Date().getFullYear()} SmartResume. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
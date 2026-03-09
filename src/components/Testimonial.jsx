import React from 'react'
import StarIcon from "@mui/icons-material/StarRate";


const Testimonial = () => {
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

  return (
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
          <div
            className="mt-16 bg-indigo-600 rounded-2xl p-8 md:p-12 text-center"
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
          >
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
                const section = document.querySelector("#resumes");
                section?.scrollIntoView({ behaviour: "smooth" });
              }}
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>
  )
}

export default Testimonial
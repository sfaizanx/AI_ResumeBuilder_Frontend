import React, { useState } from "react";
import { templates } from "../common/template";
import TemplateCard from "./TemplateCard";
import TemplatePreviewModal from "./TemplatePreviewModal";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

const DisplayTemplates = () => {
  const [showAll, setShowAll] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const navigate = useNavigate();

  const templatesToShow = showAll ? templates : templates.slice(0, 3);

  return (
    <section className="py-20 bg-white" id="resumes">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">
            AI-Suggested Templates for You
          </h2>
          <p className="text-gray-600 mt-2">
            Choose a template and start building your resume instantly.
          </p>
        </div>

        {/* View All */}
        <div className="flex justify-end mb-6 text-indigo-600 font-medium cursor-pointer" onClick={() => setShowAll(!showAll)}>
          <button className="cursor-pointer">
            {showAll ? "Show Less" : "Show More"}
          </button>
          <ChevronRight />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {templatesToShow.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={(t) => setPreviewTemplate(t)}
              onUse={(t) => navigate(`/aibuilder/${t.id}`)}
            />
          ))}
        </div>

      </div>

      {/* Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
    </section>
  );
};

export default DisplayTemplates;

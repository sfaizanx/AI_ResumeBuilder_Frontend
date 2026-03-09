import React from "react";

const TemplateCard = ({ template, onPreview, onUse }) => {
  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group border border-gray-100 flex flex-col h-[450px]">
  
      {/* Live Component Thumbnail */}
      <div className="w-full flex-1 overflow-hidden relative bg-gray-50 flex justify-center items-start">
        {/* Render the actual component scaled down. 
            We use pointer-events-none so it's strictly a visual preview. */}
        <div 
          className="w-[210mm] absolute top-4 pointer-events-none" 
          style={{ transform: "scale(0.40)", transformOrigin: "top center" }}
        >
          <template.Component isPreview={true} />
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-x-0 inset-y-0 bottom-[60px] bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center p-4 z-10 backdrop-blur-[2px]">
        <button
          onClick={() => onUse(template)}
          className="bg-white text-indigo-600 px-6 py-2.5 rounded-full mb-3 font-bold transition hover:scale-105 shadow-lg"
        >
          Use Template
        </button>

        <button
          onClick={() => onPreview(template)}
          className="border-2 border-white text-white px-6 py-2 rounded-full font-bold transition hover:bg-white/20"
        >
          Preview
        </button>
      </div>

      {/* Footer */}
      <div className="h-[60px] px-5 bg-white border-t border-gray-100 flex justify-between items-center z-20 absolute bottom-0 w-full">
        <h4 className="font-bold text-gray-800">{template.name}</h4>
        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-bold border border-indigo-100 uppercase tracking-wider">
          AI Suggested
        </span>
      </div>
    </div>
  );
};

export default TemplateCard;

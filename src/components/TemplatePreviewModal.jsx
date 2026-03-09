import React from "react";
import { Close } from "@mui/icons-material";

const TemplatePreviewModal = ({ template, onClose }) => {
  if (!template) return null;

  return (
    <div className="fixed overlay inset-0 bg-black/80 z-50 flex justify-center items-center p-4 md:p-8 backdrop-blur-sm shadow-2xl">
      <div className="relative w-full">
        
        <button
          onClick={onClose}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md"
        >
          <Close />
        </button>

        {/* Live Preview Container */}
        <div className="flex-1 overflow-auto no-scrollbar p-0 flex justify-center items-center w-full relative h-full">
          <div className="w-full h-full flex justify-center items-center pt-8 pb-8">
            <div 
              className="bg-white shadow-2xl pointer-events-none origin-center w-[210mm] min-h-[297mm]"
              style={{
                transform: window.innerWidth < 768 ? "scale(0.5)" : "scale(0.6)",
              }}
            >
               <template.Component isPreview={true} />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TemplatePreviewModal;

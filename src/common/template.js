import ResumeTemplateOne from "../templates/Template1";
import ResumeTemplateTwo from "../templates/Template2";
import ResumeTemplateThree from "../templates/Template3";
import ResumeTemplateFour from "../templates/Template4";

import thumb1 from "../assets/template1.png";
import thumb2 from "../assets/template2.png";

export const templates = [
  {
    id: 1,
    name: "Modern Professional",
    thumbnail: thumb1,
    Component: ResumeTemplateOne
  },
  {
    id: 2,
    name: "Classic Elegant",
    thumbnail: thumb2,
    Component: ResumeTemplateTwo
  },
  {
    id: 3,
    name: "Clean Minimum",
    thumbnail: thumb1, // Using thumb1 placeholder until thumbnail available
    Component: ResumeTemplateThree
  },
  {
    id: 4,
    name: "Elegant Serif",
    thumbnail: thumb2, // Using thumb2 placeholder until thumbnail available
    Component: ResumeTemplateFour
  }
];

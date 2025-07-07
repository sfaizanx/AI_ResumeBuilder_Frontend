/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        general: ['General Sans', 'sans-serif'],
        clash: ['Clash Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

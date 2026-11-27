/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#090C12",
        secondary: "#8E98AA",
        tertiary: "#121822",
        "black-100": "#0E131B",
        "black-200": "#07090E",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #1F1208",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        display: ["Anton", "Impact", "sans-serif"],
        mono: ['"Fira Code"', "ui-monospace", "Menlo", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};


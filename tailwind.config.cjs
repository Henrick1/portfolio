/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#94A3B8",
        tertiary: "#0F172A",
        "black-100": "#0B1224",
        "black-200": "#060B1A",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #0F2A5A",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};


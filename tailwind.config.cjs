/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // "Schematic" palette: drafting-blue board, copper traces, LED teal
        primary: "#0F1B2D", // board
        tertiary: "#16263C", // panel
        "black-100": "#132236", // raised panel
        line: "#26405F", // hairlines / grid
        copper: "#E3A857",
        led: "#5FD4C4",
        secondary: "#93A6BF", // muted text
        "white-100": "#E8EEF6", // body text
      },
      fontFamily: {
        sans: ['"Archivo"', "system-ui", "sans-serif"],
      },
      fontStretch: {
        expanded: "125%",
      },
      boxShadow: {
        card: "0 24px 60px -30px rgba(3, 9, 18, 0.9)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};


const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.{js,jsx,ts,tsx}",
    "./build/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      primary: "#152A36",
      border_primary: "#101C26",
      border_second: "#18313D",
      blue: "#00D8FF",
      black: "#000",
    },
    extend: {},
  },
  plugins: [],
}
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      black: colors.black,
      blue: colors.blue,
      gray: colors.gray,
      green: colors.green,
      indigo: colors.indigo,
      red: colors.red,
      stone: colors.stone,
      white: colors.white,
    },
  },
  plugins: [],
}

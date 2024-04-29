/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["playfair display", "serif"],
      },
      colors: {
        black1: "#131313",
        black2: "#181818",
      },
    },
  },
  plugins: [],
};

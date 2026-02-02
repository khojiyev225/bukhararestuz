/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef6f0",
          500: "#e85d04",
          700: "#b33d03"
        }
      }
    }
  },
  plugins: []
};

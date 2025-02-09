/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark-green": "#00C558",
        "custom-light-gray": "#FAFAFA",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{html,js,jsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "custom-dark-green": "#00C558",
        "custom-light-gray": "#FAFAFA",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

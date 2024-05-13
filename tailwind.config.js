const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#23182F",
        secondary: "#FAFA00",
        third: "#F80E0F",
        current: "currentColor",
      },
      animation: {
        "pulse-fast": "pulse 1s linear infinite",
      },
      gridTemplateColumns: {
        'flex-grid' : 'repeat(auto-fill, minmax(250px, 1fr))'
      },
    },
  },
  plugins: [flowbite.plugin()],
};

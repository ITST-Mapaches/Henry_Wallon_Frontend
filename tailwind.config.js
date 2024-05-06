const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#0B0E14",
        secondary: "#F1E62A",
        current: "currentColor",
      },
      animation: {
        "pulse-fast": "pulse 1s linear infinite",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

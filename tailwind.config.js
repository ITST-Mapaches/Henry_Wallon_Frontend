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
      keyframes: {
        traslate_x: {
          '100%': {transform: 'translateX(0)', opacity: '1'}
        }
      },
      animation: {
        traslate_x: 'traslate_x .5s ease-in-out forwards'
      }
    },
  },
  plugins: [flowbite.plugin()],
};

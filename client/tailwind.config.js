/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customDarkGreen: "rgb(0, 104, 74)",
        customNormGreen: "rgb(0, 169, 124)",
        customBorderGreen: "rgba(0, 104, 74, 0.4)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

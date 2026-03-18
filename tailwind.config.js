/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dashboardPrimary: "#9A7B4F",
        dashboardAccent: "#d4af37",
        dashboardBorder: "#E8DED0",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

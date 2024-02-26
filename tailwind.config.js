/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fuush: "fuush 5s linear infinite",
      },
      keyframes: {
        fuush: {
          "0%,100%": { borderRadius: "55% 60% 75% 50%" },
          "25%": { borderRadius: "55% 65% 60% 60%" },
          "75%": { borderRadius: "70% 70% 55% 65%" },
        },
      },
    },
  },
  plugins: [],
};

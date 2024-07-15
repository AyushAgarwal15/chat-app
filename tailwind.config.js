/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#0088cc",
          text: "#000000",
          primary: "#ffffff",
          secondary: "#0088cc",
        },
        dark: {
          background: "#1C2733",
          text: "#ffffff",
          primary: "#ffffff",
          secondary: "#2A3A4B",
        },
      },
    },
  },
  plugins: [],
};

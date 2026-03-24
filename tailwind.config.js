/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // optional if you have pages directory
  ],
  theme: {
    extend: {
      colors: {
        brand: "#1abc9c", // custom brand color
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // add more if you want
    darkTheme: "dark", // default dark mode theme
    base: true,
    styled: true,
    utils: true,
    logs: true, // helpful during dev
  },
};
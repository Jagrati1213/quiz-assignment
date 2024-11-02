/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        upraisedBlack: "#222222",
        upraisedOrange: "#FF3B3C",
        upraisedGreen: "#44B77B",
        upraisedGray: "#F3F4FA",
        upraisedDarkRed: "#FF3B3F",
        upraisedLavender: "#AF9CF3",
      },
      backgroundImage: {
        upraisedLinear: "linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)",
        upraisedLinearOrange: "linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #FF3B3C 86.48%)",
        upraisedGameImage: "url('/backImage.svg')"
      },
    },
  },
  plugins: [],
};

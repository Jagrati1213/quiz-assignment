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
        upraisedGameImage: "url('/backImage.svg')",
        upraisedScoreContainerLinear: 'linear-gradient(to bottom, #EBEDF5 70%, white 50%)',
        upraisedScoreLinear: 'linear-gradient(to bottom, #FF3B3F 0%, #FFA500 13%, #FFD033 16%, #44B77B 50%, white 50%)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mobile-nav": "rgba(4, 0, 28, 1)",
        "main-p": "#B129D3",
        "main-r": "#FF3767",
        "main-b": "#5B1FDB",
        "main-b-h": "#5b1fdbc9",
        "input-bg": "#0b0914dc",
        "border-tours": "#ffffff1f",
        "modal-bg": "rgba(0, 0, 0, 0.95)",
        "slider-bg": "#000000c0;",
        "albums-bg-hover": "hsla(0, 0%, 85%, 0.09)",
      },
      fontFamily: {
        "encode-sans": ["Encode Sans", "sans-serif"],
        "bruno-ace": ["Bruno Ace SC", "sans-serif"],
      },
      keyframes: {
        scrollDown: {
          "0%": { top: "0.5rem", opacity: "1" },
          "100%": { top: "1.35rem", opacity: "0" },
        },
      },
      animation: {
        scrollDown: "scrollDown 1s ease-in-out alternate infinite",
      },
    },
  },
  plugins: [],
};

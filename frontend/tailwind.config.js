/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'small-height': { 'raw': '(max-height: 800px) and (min-width:640px)' },
        'max-sm': { 'raw': '(max-width: 639px)' },
        'max-md': { 'raw': '(max-width: 767px)' },
        'max-lg': { 'raw': '(max-width: 1023px)' },
        'max-xl': { 'raw': '(max-width: 1279px)' }
      }
    },

    colors: {
      background: "#0F1C2E",
      primary: "#1F3A5F",
      accent_color: "#3D5A80",
      background_200: "#1f2b3e",
      background_300: "#374357",
      primary_200: "#4d648d",
      primary_300: "#acc2ef",
      accent_color_200: "#cee8ff",
      text_color: "#ffffff",
      text_200: "#fff7f7",
      green: "#00ff00",
      bubble_start_color: "#656fdb",
      bubble_end_color: "#2e394f"

    },

  },
  plugins: [require("daisyui")],
}

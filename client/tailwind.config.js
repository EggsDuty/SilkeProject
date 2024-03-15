/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkBlue': '#0a092b'
      },
      backgroundImage: {
        'test': 'url(background_9.jpg)'
      }
    },
  },
  plugins: [],
}
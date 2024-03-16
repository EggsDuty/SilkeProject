/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': '#312e81',
        'secondaryColor': '#6366f1',
        'extraColor1': '#0a092b',
        'extraColor2': '#100524'
      },
      backgroundImage: {
        'test': 'url(background_9.jpg)'
      }
    },
  },
  plugins: [],
}
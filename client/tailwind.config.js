/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
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
      },
      animation:{
        anvil: "anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards"
      },
      keyframes:{
        anvil: {
          '0%': {
            transform: "scale(1) translateY(0px)",
            opacity: "0",
            "box-shadow": "0 0 0 rgba(241, 241, 241, 0)"
          },
          '1%': {
            transform: "scale(0.96) translateY(10px)",
            opacity: "0",
            "box-shadow": "0 0 0 rgba(241, 241, 241, 0)"
          },
          '100%': {
            transform: "scale(1) translateY(0px)",
            opacity: "1",
            "box-shadow": "0 0 500px rgba(241, 241, 241, 0)"
          }
        }
      }
    },
  },
  plugins: [
  ],
}
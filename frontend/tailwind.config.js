/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        medical: {
          red: '#E53935',
          darkred: '#C62828',
          navy: '#0F2744',
          darknavy: '#0A1A2D',
          light: '#F8FAFC',
          darkbg: '#0B1120',
          darkcard: '#1E293B',
          darkborder: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

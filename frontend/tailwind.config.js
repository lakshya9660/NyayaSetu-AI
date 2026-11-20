/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosegold: {
          50: '#FDF7F8',
          100: '#FCEEF0',
          200: '#F8D8DC',
          300: '#F0BAC3',
          400: '#E294A2',
          500: '#CF6D80',
          600: '#B75265', // Primary rich metallic rose gold
          700: '#963E4F',
          800: '#7A2F3E',
          900: '#481822',
        },
        navy: {
          900: '#2E1922', // warm rose-slate charcoal
          800: '#422431',
          700: '#5C3345',
        },
        teal: {
          50: '#FDF7F8',
          100: '#FCEEF0',
          200: '#F8D8DC',
          300: '#F0BAC3',
          400: '#E294A2',
          500: '#CF6D80',
          600: '#B75265', // Remapped to Rose Gold
          700: '#963E4F',
          800: '#7A2F3E',
          900: '#481822',
        },
        gold: {
          500: '#C5838D',
          600: '#B75265',
        }
      }
    },
  },
  plugins: [],
}

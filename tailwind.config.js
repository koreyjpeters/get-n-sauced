/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.tsx",
    "./pages/**/*.tsx",
    "./constants.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'sauce-orange': {
          50: '#fff7ed',
          100: '#ffeed7',
          200: '#ffd9af',
          300: '#ffb070',
          400: '#ff8c30',
          500: '#ff6600',
          600: '#e64900',
          700: '#cc3700',
          800: '#9a2a00',
          900: '#7c2200',
        },
        'island-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          900: '#134e4a',
        },
        'vegan-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          900: '#14532d',
        },
        'burnt-orange': {
          50: '#fff7ed',
          100: '#ffeed7',
          500: '#f97316',
          600: '#ea580c',
        },
        cream: '#FFFDF5',
        sand: '#f5f5f4',
        charcoal: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        script: ['Kaushan Script', 'cursive'],
      },
      backgroundImage: {
        'festive-pattern': "url('https://www.transparenttextures.com/patterns/cubes.png')",
      },
    },
  },
  plugins: [],
};

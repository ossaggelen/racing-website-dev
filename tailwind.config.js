/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#06080b',
        bg2: '#0b1014',
        accent: '#2dd4dc',
        accent2: '#14b3bd',
        muted: '#b8c2cc',
        pinkNeon: '#ff3aa8',
      },
      fontFamily: {
        display: ['"Montserrat"', 'system-ui', 'sans-serif'],
        body: ['"Montserrat"', 'system-ui', 'sans-serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at 50% 38%, rgba(45,212,220,.12), transparent 55%), radial-gradient(circle at 80% 60%, rgba(255,58,168,.08), transparent 60%)',
      },
    },
  },
  plugins: [],
}

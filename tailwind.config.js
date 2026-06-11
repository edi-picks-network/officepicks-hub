/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: '#d4a574',
          50: '#faf6f0',
          100: '#f5efe6',
          200: '#ede3d4',
          300: '#e0d0bc',
          400: '#d4a574',
          500: '#c4956a',
          600: '#b8895a',
          700: '#a0784e',
          800: '#8a6742',
          900: '#6b5c4e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

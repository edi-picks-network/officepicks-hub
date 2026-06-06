/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: '#0A140A',
          100: '#1A2A1A',
          200: '#2A4A2A',
          300: '#3A5A2A',
          400: '#4A6A3A',
          500: '#22C55E',
        },
        muted: {
          DEFAULT: '#6D5FA0',
          light: '#A99BD6',
        },
        surface: '#EDE9FE',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

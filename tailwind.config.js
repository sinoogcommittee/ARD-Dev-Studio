/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          dark: '#0c0d0e',
          card: '#141618',
          border: '#222529',
        },
        accent: {
          DEFAULT: '#d4af37',
          hover: '#e5be48',
        }
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#101114',
          surface: '#17191E',
          elevated: '#1E2127',
          border: '#292C32',
        },
        gold: {
          DEFAULT: '#D6AD63',
          hover: '#E5BE75',
          muted: 'rgba(214, 173, 99, 0.15)',
          border: 'rgba(214, 173, 99, 0.3)',
        },
        ink: {
          primary: '#F2F0EB',
          secondary: '#A1A1AA',
          muted: '#71717A',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2A5C82',
        'surface': '#f7f9fb',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f4f6',
        'on-surface': '#1a1c1e',
        'on-surface-variant': '#43474e',
        'outline-variant': '#c3c7cf',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

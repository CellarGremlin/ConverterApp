/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "Cantaloupe": "#fda172",
        "Tangerine": "fa8128",
        "Merigold": "fcae1e"
      }
    },
  },
  plugins: [],
}


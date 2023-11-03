/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing-bg': "url('assets/landing-page-bg.svg')"
      }
    },
  },
  plugins: [],
}


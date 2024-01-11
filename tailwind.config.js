/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        colors: {
            white: '#FFFFFF',
            black: '#001011',

            lighterSky: '#e0f2fe', // sky-100
            lightSky: '#bae6fd', // sky-200
            mediumSky: '#0284c7', // sky-600
            darkSky: '#075985', // sky-800
            darkerSky: '#0c4a6e', // sky-900

            lightGray: '#d1d5db', // gray-300
            mediumGray: '#9ca3af', // gray-400
            gray: '#6b7280', // gray-500
            heavyGray: '#4b5563', // gray-600
            heavierGray: '#3f3f46', // gray-700

            redLight: '#f87171', // red-400
            redMedium: '#dc2626', // red-600
            redHeavy: '#450a0a', // red-950

            green: '#16a34a',
            greenMedium: '#047857',
            greenHeavy: '#064e3b',

            lightYellow: '#facc15'
        },
        extend: {
            backgroundImage: {
                'landing-bg': "url('assets/landing-page-bg.webp')",
                'landing-bg-dark': "url('assets/landing-page-dark.webp')"
            }
        },
    },
    plugins: [],
}


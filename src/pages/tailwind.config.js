/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#22c55e', // Vert principal
                secondary: '#3b82f6', // Bleu
                accent: '#f97316', // Orange
                neutral: '#1f2937', // Gris foncé
                background: '#f8fafc', // Blanc cassé
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
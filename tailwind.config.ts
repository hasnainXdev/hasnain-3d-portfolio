/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#111827",
                secondary: "#7738E0",
            },
            backgroundClip: {
                text: "text",
            },
            textColor: {
                transparent: "transparent",
            },
            fontFamily: {
                poppins: ["var(--font-poppins)", "sans-serif"],
                handwriting: ["var(--font-handwriting)", "cursive"],
            },
        },
    },
    plugins: [],
};

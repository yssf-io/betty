/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#13ec5b",
                "background-light": "#FFFFFF",
                "background-dark": "#102216",
                "surface-light": "#F9FAFB",
                "card-light": "#ffffff",
                "text-primary": "#000000",
                "text-secondary": "#3C3C43",
                "text-tertiary": "#8E8E93"
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}

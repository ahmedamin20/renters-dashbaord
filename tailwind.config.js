/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryBg: "#031d54",
                primaryNt: "#0644c6",
                secondaryBg: "#ffff",
            },
        },

        container: {
            center: true,
            padding: "1rem",
        },
    },
};

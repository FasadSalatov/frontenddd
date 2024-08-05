// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "custom-gradient": "linear-gradient(to right, #ACFF79 0%, #358B00 100%)",
            },
        },
    },
    plugins: [],
};

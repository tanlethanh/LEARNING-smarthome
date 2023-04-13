// tailwind.config.js
module.exports = {
    content: [
        "./src/App.{js,jsx,ts,tsx}",
        "./src/<custom directory>/**/*.{js,jsx,ts,tsx}",
        "./src/screens/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/layouts/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "main-white": "#EFF1F5",
            },
        },
    },
    plugins: [],
};

// tailwind.config.js
module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './<custom directory>/**/*.{js,jsx,ts,tsx}',
        './screens/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './layouts/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'main-white': '#EFF1F5'
            }
        }
    },
    plugins: []
}

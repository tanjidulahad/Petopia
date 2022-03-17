module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    theme: {
      borderWidth: {
        '3': '3px',
      }
    }
  },
  plugins: [],
  reactStrictMode: false,
}
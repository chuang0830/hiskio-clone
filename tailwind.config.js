module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#42A4BC",
        gray: "#595959",
        "gray-light": "#8C8C8C",
      },
      backgroundPosition: {
        "left-center": "left center",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

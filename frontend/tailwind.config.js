module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "indigo-dark": "#161525",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

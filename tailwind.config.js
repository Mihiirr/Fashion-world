const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Josefin Slab", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

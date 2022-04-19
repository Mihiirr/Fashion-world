const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Josefin Slab", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

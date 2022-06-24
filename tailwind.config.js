const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Lora' 'Smooch' cursive", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

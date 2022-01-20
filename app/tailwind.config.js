const defaultTheme = require("tailwindcss/defaultTheme");

//Px to REM function (static base of 16)
const pxToRem = (dest) => 1 / (16 / dest);

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        50: `${pxToRem(50)}rem`,
        40: `${pxToRem(40)}rem`,
        25: `${pxToRem(25)}rem`,
      },
      colors: {
        gray: {
          50: "#F9F9F9",
          100: "#F2F2F2",
          200: "#EAEAEA",
          300: "#DDDBDB",
          400: "#3D3D3D",
        },
      },
      fontFamily: {
        geo: ["Geomanist", "Futura", "Verdana", "Arial", "sans-serif"],
        codec: ['"Codec Pro"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        12: `${pxToRem(12)}rem`,
        14: `${pxToRem(14)}rem`,
        16: `${pxToRem(16)}rem`,
        20: `${pxToRem(20)}rem`,
        24: `${pxToRem(24)}rem`,
        26: `${pxToRem(26)}rem`,
        30: `${pxToRem(30)}rem`,
        38: `${pxToRem(38)}rem`,
        40: `${pxToRem(40)}rem`,
        45: `${pxToRem(45)}rem`,
      },
    },
  },
  plugins: [],
};

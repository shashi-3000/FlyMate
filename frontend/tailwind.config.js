/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.html"],

  theme: {
    extend: {
      fontFamily: {
          mullish: ["Mulish", "sans-serif"],
          poppins: ["Poppins", "sans-serif"], // additional modern font
      },
      colors: {
        deepBlue: "#02042a",
        deepBlueHead: "#162f56",
        lightBlue: "#2b84ea",
        lightBlue300: "#4b94ed",
        lightBlue500: "#0b72e7",
        skyBlue: "#a0d7f9",         // softer addition
        greenLight: "#61cea6",
        grayText: "#818597",
        lightGray: "#e2e2e2",
        grayBlue: "#344a6c",
        gray2: "#525a76",
        whitePure: "#ffffff",
        softGrayBg: "#f5f7fa",     // good for backgrounds
        accentYellow: "#ffc107",   // subtle highlight color
        accentRed: "#e63946",      // for alerts / errors
      },
      backgroundImage: {
        'dots-pattern': "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2302042a' fill-opacity='0.29'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      },
    },
  },
  plugins: [],
}



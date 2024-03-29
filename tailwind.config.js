/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark": {
          DEFAULT: '#18181A'
        }
      },
    },
  },
  plugins: [nextui()],
  safelist: [
    "bg-green-500",
    "bg-yellow-500",
    "bg-black",
    "hover:bg-black",
    "bg-white",
    "hover:bg-white",
    "bg-gray-100",
    "hover:bg-gray-100",
  ]
}

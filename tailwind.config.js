/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["integralcf", "sans-serif"],
      },
      screens: {
        xsm: { max: "500px" },
      },
    },
  },
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#EDC400",
          secondary: "#AF55E1",
          accent: "#90B7E1",
          neutral: "#42232d",
          "base-100": "#ffffff",
          info: "#66DDC1",
          success: "#1AD326",
          warning: "#D44040",
          error: "#ff0046",
          body: {
            "background-color": "#FAFDFD",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}


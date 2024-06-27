/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/ *.{ js, ts, jsx, tsx }",
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
          primary: "#FFDB00",
          secondary: "#AF55E1",
          accent: "#90B7E1",
          neutral: "#42232d",
          "base-100": "#FAFDFD",
          info: "#66DDC1",
          success: "#1AD326",
          warning: "#D44040",
          error: "#ff0046",
          body: {
            "background-color": "#ffffff",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}


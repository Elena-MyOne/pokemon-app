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
          primary: "#151616",
          secondary: "#fb7185",
          accent: "#EDE9E6",
          neutral: "#111309",
          "base-100": "#FAFDFD",
          info: "#777777",
          success: "#34d399",
          warning: "#f59e0b",
          error: "#dc2626",
          body: {
            "background-color": "#ffffff",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}


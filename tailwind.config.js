module.exports = {
  prefix: "",
  important: false,
  separator: ":",
  theme: {
    extend: {
      screens: {
        xxl: "1600px",
      },
      colors: {
        transparent: "transparent",

        black: "#343434",
        "black-trans": "#343434cc",
        white: "#fff",
        grey: {
          1: "#EFEFEF",
          2: "#D1D1D1",
          3: "#6C6C6C",
          4: "#4E4E4E",
        },
        "breathe-blue": {
          1: "#9ED0E1",
          2: "#699AAA",
          3: "#4A7C8B",
        },
        salmon: {
          1: "#FF8882",
          2: "#E3706B",
          3: "#C0514F",
        },
      },
      fontFamily: {
        sans: [
          "Montserrat",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ["didot", '"Times New Roman"', "Times", "serif"],
        serifAlt: ["ZefaniStencil"],
        accent: ["SilverSouth"],
      },
      spacing: {
        104: "26rem",
      },
      boxShadow: {
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
      },
    },

    placeholderColor: (theme) => theme("colors"),

    zIndex: {
      auto: "auto",
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
      100: "100",
    },
    transform: {
      // defaults to this value
      none: "none",
    },
    transformOrigin: {
      // defaults to these values
      t: "top",
      tr: "top right",
      r: "right",
      br: "bottom right",
      b: "bottom",
      bl: "bottom left",
      l: "left",
      tl: "top left",
    },
    translate: {
      // defaults to {}
      "1/2": "50%",
      full: "100%",
      "right-up": ["100%", "-100%"],
      "3d": ["40px", "-60px", "-130px"],
    },
    scale: {
      // defaults to {}
      90: "0.9",
      100: "1",
      110: "1.1",
      "-100": "-1",
      "stretched-x": ["2", "0.5"],
      "stretched-y": ["0.5", "2"],
      "3d": ["0.5", "1", "2"],
    },
    rotate: {
      // defaults to {}
      90: "90deg",
      180: "180deg",
      270: "270deg",
      "3d": ["0", "1", "0.5", "45deg"],
    },
    skew: {
      // defaults to {}
      "-5": "-5deg",
      5: "5deg",
    },
    perspective: {
      // defaults to {}
      none: "none",
      250: "250px",
      500: "500px",
      750: "750px",
      1000: "1000px",
    },
    perspectiveOrigin: {
      // defaults to these values
      t: "top",
      tr: "top right",
      r: "right",
      br: "bottom right",
      b: "bottom",
      bl: "bottom left",
      l: "left",
      tl: "top left",
    },
  },
  plugins: [],
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "grid-cols-1",
    "grid-rows-1",
    "grid-cols-2",
    "grid-rows-2",
    "grid-cols-3",
    "grid-rows-3",
    "grid-cols-4",
    "grid-rows-4",
    "grid-cols-5",
    "grid-rows-5",
    "grid-cols-6",
    "grid-rows-6",
    "w-100",
  ],
}

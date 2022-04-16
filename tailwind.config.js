/** @format */

module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        highlight: "#E0DA48",
        primary: {
          light: "#A8B8A5",
          DEFAULT: "#7F977B",
        },
        secondary: {
          DEFAULT: "#FF725E",
        },
        tertiary: {
          DEFAULT: "#BEA363",
        },
      },
      spacing: {
        7.5: "1.875rem",  // 30px
        12.5: "3.125rem", // 50px
        15: "3.75rem",    // 60px
        18: "4.5rem",     // 72px
        22: "5.5rem",     // 88px
        30: "7.5rem",     // 120px
      },
      width: {
        22: "5.5rem",
      },
      height: {
        46: "11.5rem",
        50: "12.5rem",
        100: "25rem",
      },
      backgroundImage: {
        "no-image-s": "url('/src/assets/img/noImage/NoImage-160x160.png')",
        "no-image-m": "url('/src/assets/img/noImage/NoImage-255x200.png')",
        "no-image-l": "url('/src/assets/img/noImage/NoImage-345x160.png')",
        "no-image-xl": "url('/src/assets/img/noImage/NoImage-1100x400.png')",
      },
      zIndex: {
        '-10': '-10'
      },
      screens: {
        'xl': '1280px',
        '2xl': '1280px',
      },
      flex: {
        '2': '2 1 0%'
      }
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "28px",
      "4xl": "36px",
      "5xl": "48px",
    },
    container: {
      center: true,
      // padding: '2.75rem'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};

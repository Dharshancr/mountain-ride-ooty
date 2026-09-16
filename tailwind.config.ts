import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1F3A2E",
          light: "#2C5240",
          dark: "#122A20",
        },
        cream: {
          DEFAULT: "#F4ECDD",
          dark: "#E8DBC0",
        },
        brown: {
          DEFAULT: "#6B4A31",
          light: "#8B6A4A",
        },
        mustard: {
          DEFAULT: "#D3A02C",
          light: "#E6BC5C",
        },
        charcoal: {
          DEFAULT: "#282420",
        },
        rust: {
          DEFAULT: "#B24A2B",
          light: "#D06239",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        serifTravel: ["var(--font-serif-travel)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        vintage: "0 6px 0 rgba(31,58,46,0.15), 0 10px 20px rgba(40,36,32,0.15)",
        stamp: "0 0 0 2px rgba(107,74,49,0.25), 0 4px 10px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        vintage: "10px",
      },
    },
  },
  plugins: [],
};
export default config;

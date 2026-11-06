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
        gold: {
          DEFAULT: "#C6A15B",
          50: "#F9F5ED",
          100: "#F2EAD9",
          200: "#E5D5B3",
          300: "#D8C08D",
          400: "#CBAB67",
          500: "#C6A15B",
          600: "#A8844A",
          700: "#8A6A3B",
          800: "#6C512D",
          900: "#4E3A20",
        },
        charcoal: {
          DEFAULT: "#242424",
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#999999",
          400: "#666666",
          500: "#444444",
          600: "#333333",
          700: "#292929",
          800: "#242424",
          900: "#1A1A1A",
        },
        ivory: {
          DEFAULT: "#F5F1E8",
          50: "#FDFCFA",
          100: "#F9F6F0",
          200: "#F5F1E8",
          300: "#EBE5D6",
          400: "#E0D9C4",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";
import { CustomLayoutTheme, DarkColorTheme } from "./config/theme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: DarkColorTheme,
      animation: {
        "pulse-brightness": "pulse-brightness 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-brightness": {
          "0%, 100%": { filter: "brightness(0.1)" },
          "50%": { filter: "brightness(0.3)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "cynxhost",
      defaultTheme: "dark",
      themes: {
        dark: {
          layout: CustomLayoutTheme,
          colors: DarkColorTheme,
        },
      },
    }),
  ],
} satisfies Config;

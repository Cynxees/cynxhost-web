import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";
import { CustomLayoutTheme, LightColorTheme } from "./config/theme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: LightColorTheme,
      animation: {
        "pulse-brightness": "pulse-brightness 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-brightness": {
          "0%, 100%": { filter: "brightness(0.1)" },
          "50%": { filter: "brightness(0.3)" },
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        nats: ["var(--font-nats)", "sans-serif"],
      },
      dropShadow: {
        heavy: "0 5px 5px rgba(0, 0, 0, 0.55)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
      prefix: "cynxhost",
      defaultTheme: "dark",
      themes: {
        dark: {
          layout: CustomLayoutTheme,
          colors: LightColorTheme,
        },
      },
    }),
  ],
} satisfies Config;

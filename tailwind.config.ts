import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
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

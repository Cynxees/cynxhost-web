// config/theme.ts

import { ColorScale, LayoutTheme, ThemeColors } from "@heroui/react";

const LightPrimary: ColorScale = {
  DEFAULT: "#D30000",
  "50": "#FF2C2C",
  "100": "#D30000",
  "200": "#B50000",
  "300": "#9A0202",

  "500": "#6D0000",
};

export const LightColorTheme: Partial<ThemeColors> = {
  primary: LightPrimary,
  secondary: "#FF9090",

  content1: "#383838", // black
  content2: "#FFFFFF", // white
  content3: "#666666", // grey

  divider: "#525252",

  background: "#E2E3E3", // Background for every page
  foreground: "#FFFFFF", // Like second bg, for cards etca

  overlay: "#d81159",

  default: "#F6F6F6",

  // not set yet
  success: "#d81159",
  warning: "#d81159",
  content4: "#d81159",
  danger: "#d81159",
  focus: "#d81159",
};

export const CustomLayoutTheme: Partial<LayoutTheme> = {};

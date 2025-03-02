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

const LightContent3: ColorScale = {
  DEFAULT: "#666666",
  "50": "#999999",
  "100": "#666666",
  "200": "#4D4D4D",
  "300": "#333333",
  "400": "#1A1A1A",
  "500": "#000000",
};

export const LightColorTheme: Partial<ThemeColors> = {
  primary: LightPrimary,
  secondary: "#FF9090",

  content1: "#383838", // black
  content2: "#FFFFFF", // white
  content3: LightContent3, // grey
  content4: "#050505", // Dashboard Sidebar

  divider: "#525252",

  background: "#EFF0F0", // Background for every page
  foreground: "#FFFFFF", // Like second bg, for cards etca

  overlay: "#d81159",

  default: "#F6F6F6",

  // not set yet
  // success: {
  //   DEFAULT: "17C964",
  //   foreground: "#DDFFEC",
  // },

  // warning: "#d81159",
  // danger: "#d81159",
  // focus: "#d81159",
};

export const CustomLayoutTheme: Partial<LayoutTheme> = {};

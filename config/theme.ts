// config/theme.ts

import { LayoutTheme, ThemeColors } from "@heroui/react";

export const LightColorTheme: Partial<ThemeColors> = {
  primary: "#D30000",
  secondary: "#FF9090",

  content1: "#383838",
  content2: "#FFFFFF",

  divider: "#525252",

  background: "#E2E3E3", // Background for every page
  foreground: "#F6F6F6", // Like second bg, for cards etc

  default: "#F6F6F6",

  // not set yet
  overlay: "#d81159",
  success: "#d81159",
  warning: "#d81159",
  content3: "#d81159",
  content4: "#d81159",
  danger: "#d81159",
  focus: "#d81159",
};

export const CustomLayoutTheme: Partial<LayoutTheme> = {};

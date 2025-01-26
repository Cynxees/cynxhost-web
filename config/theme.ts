// config/theme.ts

import { LayoutTheme, ThemeColors } from "@heroui/react";

export const DarkColorTheme: Partial<ThemeColors> = {
  primary: "#a6e1fa",
  secondary: "#0e6ba8",

  content1: "#383838",
  content2: "#FFFFFF",

  divider: "#525252",

  background: "#0a0908", // Background for every page
  foreground: "#0c1821", // Like second bg, for cards etc
  overlay: "#1b2a41", // things on top of foreground

  // not set yet
  success: "#d81159",
  warning: "#d81159",
  content3: "#d81159",
  content4: "#d81159",
  danger: "#d81159",
  default: "#d81159",
  focus: "#d81159",
};

export const CustomLayoutTheme: Partial<LayoutTheme> = {};

export const COLORS = {
  primary: "#191970",
  primaryLight: "#FFDBBB",
  background: "#FFFFFF",
  surface: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textSecondary: "#4D4D4D",
  border: "#D9D9D9",
  success: "#16A34A",
  warning: "#F59E0B",
  error: "#DC2626",
  shadow: "rgba(25, 25, 112, 0.08)",
  transparent: "transparent",
  white: "#FFFFFF",
  black: "#000000",
  gray100: "#F5F5F5",
  gray300: "#D9D9D9",
  gray500: "#808080",
  gray700: "#4D4D4D",
  gray900: "#1A1A1A",
} as const;

export type ColorToken = keyof typeof COLORS;

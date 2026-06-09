import type { TextStyle } from "react-native";

export const FONT_FAMILY = {
  regular: "Inter-Regular",
  semiBold: "Inter-SemiBold",
  bold: "Inter-Bold",
} as const;

export const TYPOGRAPHY = {
  heading: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  },
  subHeading: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  innerHeading: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  body: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  caption: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof TYPOGRAPHY;

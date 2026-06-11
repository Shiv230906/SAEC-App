import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { COLORS, FONT_FAMILY, SPACING } from "@/src/theme";

type HeroCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function HeroCard({ children, style }: HeroCardProps) {
  return <View style={[styles.heroCard, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: COLORS.navy,
    borderRadius: 20,
    boxShadow: `0 4px 12px ${COLORS.shadow}`,
    gap: SPACING.sm,
    padding: 20,
  },
  heroTitle: {
    color: COLORS.white,
    fontFamily: FONT_FAMILY.bold,
    fontSize: 24,
    lineHeight: 32,
  },
});

export const heroCardStyles = styles;

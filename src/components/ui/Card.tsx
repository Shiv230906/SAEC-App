import {
  StyleSheet,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
  View,
} from "react-native";

import { COLORS, RADIUS, SPACING } from "@/src/theme";

export type CardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, style, ...props }: CardProps) {
  return (
    <View {...props} style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    boxShadow: `0 2px 8px ${COLORS.shadow}`,
    padding: SPACING.md,
  },
});

export default Card;

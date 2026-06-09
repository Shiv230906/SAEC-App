import type { PropsWithChildren } from "react";
import {
  Text as NativeText,
  StyleSheet,
  type ColorValue,
  type StyleProp,
  type TextProps as NativeTextProps,
  type TextStyle,
} from "react-native";

import { COLORS, TYPOGRAPHY, type TypographyVariant } from "@/src/theme";

export type TextProps = PropsWithChildren<
  NativeTextProps & {
    color?: ColorValue;
    style?: StyleProp<TextStyle>;
    variant?: TypographyVariant;
  }
>;

export function Text({
  children,
  color,
  style,
  variant = "body",
  ...props
}: TextProps) {
  return (
    <NativeText
      {...props}
      style={[
        styles.base,
        TYPOGRAPHY[variant],
        color ? { color } : undefined,
        style,
      ]}
    >
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: COLORS.textPrimary,
  },
});

export default Text;

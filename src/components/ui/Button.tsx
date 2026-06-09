import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "@/src/theme";

import { Text } from "./Text";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title: string;
  variant?: ButtonVariant;
};

const buttonVariants = StyleSheet.create<
  Record<ButtonVariant, ViewStyle>
>({
  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  outline: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.primary,
  },
  danger: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error,
  },
});

const textVariants = StyleSheet.create<Record<ButtonVariant, TextStyle>>({
  primary: {
    color: COLORS.white,
  },
  secondary: {
    color: COLORS.primary,
  },
  outline: {
    color: COLORS.primary,
  },
  danger: {
    color: COLORS.white,
  },
});

export function Button({
  disabled = false,
  loading = false,
  style,
  textStyle,
  title,
  variant = "primary",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const activityColor =
    variant === "secondary" || variant === "outline"
      ? COLORS.primary
      : COLORS.white;

  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        buttonVariants[variant],
        isDisabled ? styles.disabled : undefined,
        pressed && !isDisabled ? styles.pressed : undefined,
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={activityColor} size="small" /> : null}
      <Text
        variant="body"
        style={[styles.title, textVariants[variant], textStyle]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: RADIUS.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: SPACING.sm,
    justifyContent: "center",
    minHeight: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  disabled: {
    opacity: 0.56,
  },
  pressed: {
    opacity: 0.84,
  },
  title: {
    fontFamily: TYPOGRAPHY.innerHeading.fontFamily,
    fontSize: TYPOGRAPHY.body.fontSize,
    fontWeight: TYPOGRAPHY.innerHeading.fontWeight,
  },
});

export default Button;

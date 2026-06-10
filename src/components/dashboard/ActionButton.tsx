import type { ReactNode } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";

import { Text } from "@/src/components/ui";
import { COLORS } from "@/src/theme";

import { dashboardStyles } from "./dashboardStyles";

type ActionButtonVariant = "link" | "navy" | "peach" | "blue";

type ActionButtonProps = {
  children: ReactNode;
  labelColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: ActionButtonVariant;
};

const variantStyles: Record<
  ActionButtonVariant,
  StyleProp<ViewStyle> | undefined
> = {
  blue: dashboardStyles.blueButton,
  link: undefined,
  navy: dashboardStyles.navyButton,
  peach: dashboardStyles.peachButton,
};

const defaultLabelColors: Record<ActionButtonVariant, string> = {
  blue: COLORS.navy,
  link: COLORS.linkAccent,
  navy: COLORS.white,
  peach: COLORS.linkAccent,
};

export function ActionButton({
  children,
  labelColor,
  onPress,
  style,
  variant = "peach",
}: ActionButtonProps) {
  const isLink = variant === "link";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        variantStyles[variant],
        style,
        pressed ? dashboardStyles.pressed : undefined,
      ]}
    >
      <Text
        color={labelColor ?? defaultLabelColors[variant]}
        style={
          isLink
            ? dashboardStyles.linkLabel
            : dashboardStyles.buttonLabel
        }
        variant={isLink ? "body" : undefined}
      >
        {children}
      </Text>
    </Pressable>
  );
}

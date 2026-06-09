import { StyleSheet, View } from "react-native";

import { Text } from "@/src/components/ui";
import { COLORS, RADIUS, TYPOGRAPHY } from "@/src/theme";

export type AvatarProps = {
  fullName?: string | null;
  size?: number;
};

function getInitials(fullName?: string | null) {
  const words = fullName?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (words.length === 0) {
    return "U";
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function Avatar({ fullName, size = 40 }: AvatarProps) {
  return (
    <View
      accessibilityLabel={`${getInitials(fullName)} avatar`}
      style={[
        styles.avatar,
        {
          borderRadius: size / 2,
          height: size,
          width: size,
        },
      ]}
    >
      <Text
        color={COLORS.white}
        style={[
          styles.initials,
          {
            fontSize: Math.max(12, size * 0.36),
            lineHeight: Math.max(16, size * 0.44),
          },
        ]}
      >
        {getInitials(fullName)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
  },
  initials: {
    fontFamily: TYPOGRAPHY.innerHeading.fontFamily,
    fontWeight: TYPOGRAPHY.innerHeading.fontWeight,
  },
});

export default Avatar;

import { StyleSheet, View } from "react-native";

import { Text } from "@/src/components/ui";
import { COLORS, FONT_FAMILY, SPACING } from "@/src/theme";

type AvatarBadgeProps = {
  initials: string;
  size?: number;
};

export function AvatarBadge({ initials, size = 56 }: AvatarBadgeProps) {
  const radius = size / 2;

  return (
    <View
      style={[
        styles.avatar,
        { borderRadius: radius, height: size, width: size },
      ]}
    >
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.navy,
    fontFamily: FONT_FAMILY.bold,
    fontSize: 18,
  },
});

import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { Text } from "@/src/components/ui";
import { useAuth, type UserRole } from "@/src/context/AuthContext";
import { COLORS, SPACING } from "@/src/theme";

import { Avatar } from "./Avatar";
import {
  getDisplayName,
  getProfileRoute,
  getRoleLabel,
  getStudentSubtitle,
} from "./profileUtils";

export type ProfileHeaderProps = {
  disabled?: boolean;
  role?: UserRole;
  showSubtitle?: boolean;
  variant?: "default" | "light";
};

export function ProfileHeader({
  disabled = false,
  role: roleOverride,
  showSubtitle = true,
  variant = "default",
}: ProfileHeaderProps) {
  const { profile, role, user } = useAuth();
  const resolvedRole = roleOverride ?? role ?? "student";
  const fullName = getDisplayName(profile, user);
  const roleLabel = getRoleLabel(resolvedRole);
  const subtitle =
    resolvedRole === "student"
      ? getStudentSubtitle(profile)
      : roleLabel;
  const isLight = variant === "light";

  function handlePress() {
    if (!disabled) {
      router.push(getProfileRoute(resolvedRole));
    }
  }

  return (
    <Pressable
      accessibilityLabel="Open profile"
      accessibilityRole="button"
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        pressed && !disabled ? styles.pressed : undefined,
      ]}
    >
      <Avatar fullName={fullName} />

      <View style={styles.copy}>
        <Text
          color={isLight ? COLORS.white : COLORS.textPrimary}
          numberOfLines={1}
          variant="body"
        >
          {fullName ?? "User"}
        </Text>
        {showSubtitle && subtitle ? (
          <Text
            color={isLight ? COLORS.accentBlueMuted : COLORS.textSecondary}
            numberOfLines={1}
            variant="caption"
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
    minWidth: 0,
  },
  copy: {
    flexShrink: 1,
    minWidth: 0,
  },
  pressed: {
    opacity: 0.72,
  },
});

export default ProfileHeader;

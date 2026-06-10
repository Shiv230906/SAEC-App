import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { Text } from "@/src/components/ui";
import { useAuth, type UserRole } from "@/src/context/AuthContext";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const resolvedRole = roleOverride ?? role ?? "student";
  const fullName = getDisplayName(profile, user);
  const roleLabel = getRoleLabel(resolvedRole);
  const subtitle =
    resolvedRole === "student" ? getStudentSubtitle(profile) : roleLabel;
  const isLight = variant === "light";

  function handlePress() {
    if (!disabled) {
      setMenuOpen((prev) => !prev);
    }
  }

  function navigateTo(route: string) {
    setMenuOpen(false);
    router.push(route as any);
  }

  const profileRoute = getProfileRoute(resolvedRole);
  const settingsRoute = `/(${resolvedRole})/settings` as const;

  return (
    <>
      <Pressable
        accessibilityLabel="Open profile menu"
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

        <MaterialIcons
          color={isLight ? COLORS.white : COLORS.textSecondary}
          name={menuOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={20}
        />
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={menuOpen}
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)}>
          <View style={styles.dropdown}>
            <Pressable
              style={styles.menuItem}
              onPress={() => navigateTo(profileRoute)}
            >
              <MaterialIcons color={COLORS.primary} name="person" size={20} />
              <Text variant="body">My Profile</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigateTo(settingsRoute)}
            >
              <MaterialIcons color={COLORS.primary} name="settings" size={20} />
              <Text variant="body">Settings</Text>
            </Pressable>

            <View style={styles.divider} />

            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setMenuOpen(false);
                router.push(profileRoute);
              }}
            >
              <MaterialIcons color={COLORS.error} name="logout" size={20} />
              <Text color={COLORS.error} variant="body">
                Sign Out
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
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
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  divider: {
    backgroundColor: COLORS.border,
    height: 1,
    marginVertical: SPACING.xs,
  },
  dropdown: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    elevation: 8,
    marginTop: 80,
    marginHorizontal: SPACING.md,
    padding: SPACING.sm,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  menuItem: {
    alignItems: "center",
    borderRadius: RADIUS.md,
    flexDirection: "row",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
  },
  overlay: {
    flex: 1,
  },
  pressed: {
    opacity: 0.72,
  },
});

export default ProfileHeader;

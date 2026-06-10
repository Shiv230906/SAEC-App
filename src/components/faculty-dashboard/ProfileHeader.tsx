import { StyleSheet, View } from "react-native";

import { AvatarBadge, DashboardCard } from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { useAuth } from "@/src/context/AuthContext";
import { getDisplayName } from "@/src/components/profile/profileUtils";
import { COLORS, SPACING } from "@/src/theme";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning ☀️";
  if (hour < 17) return "Good Afternoon 🌤️";
  return "Good Evening 🌙";
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function ProfileHeader() {
  const { profile, user } = useAuth();
  const fullName = getDisplayName(profile, user) ?? "Faculty";
  const department =
    (profile?.department as string) ??
    (profile?.branch as string) ??
    "Department";
  const greeting = getGreeting();

  return (
    <DashboardCard>
      <View style={styles.profileRow}>
        <AvatarBadge initials={getInitials(fullName)} />

        <View style={styles.copy}>
          <Text variant="innerHeading">{fullName}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            {department}
          </Text>
          <Text style={styles.greeting} variant="body">
            {greeting}
          </Text>
        </View>
      </View>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  copy: {
    flex: 1,
    gap: SPACING.xs,
  },
  greeting: {
    marginTop: SPACING.xs,
  },
  profileRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.md,
  },
});

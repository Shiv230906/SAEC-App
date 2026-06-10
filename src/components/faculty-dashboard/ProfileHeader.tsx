import { StyleSheet, View } from "react-native";

import { AvatarBadge, DashboardCard } from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyProfile } from "@/src/data/facultyMockData";
import { COLORS, SPACING } from "@/src/theme";

export default function ProfileHeader() {
  return (
    <DashboardCard>
      <View style={styles.profileRow}>
        <AvatarBadge initials={facultyProfile.avatarInitials} />

        <View style={styles.copy}>
          <Text variant="innerHeading">{facultyProfile.name}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            {facultyProfile.department}
          </Text>
          <Text style={styles.greeting} variant="body">
            {facultyProfile.greeting}
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

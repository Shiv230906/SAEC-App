import { StyleSheet, View } from "react-native";

import { AvatarBadge, DashboardCard } from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { adminProfile } from "@/src/data/adminMockData";
import { COLORS, SPACING } from "@/src/theme";

export default function AdminHeader() {
  return (
    <DashboardCard>
      <View style={styles.row}>
        <AvatarBadge initials={adminProfile.avatarInitials} />

        <View style={styles.copy}>
          <Text variant="innerHeading">{adminProfile.name}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            College Administrator
          </Text>
          <Text style={styles.greeting} variant="body">
            {adminProfile.greeting}
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
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.md,
  },
});

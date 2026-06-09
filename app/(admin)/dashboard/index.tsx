import { StyleSheet, View } from "react-native";

import { ProfileHeader } from "@/src/components/profile/ProfileHeader";
import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, SPACING } from "@/src/theme";

export default function AdminDashboard() {
  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.header}>
          <ProfileHeader role="admin" />
          <Text variant="subHeading">Welcome back</Text>
          <Text color={COLORS.textSecondary} variant="body">
            Manage users, departments, payments, and reports.
          </Text>
        </View>

        <View style={styles.widgets}>
          <Card style={styles.highlightCard}>
            <Text variant="innerHeading">Users</Text>
            <Text color={COLORS.textSecondary} variant="caption">
              Review student and faculty records.
            </Text>
          </Card>

          <Card>
            <Text variant="innerHeading">Reports</Text>
            <Text color={COLORS.textSecondary} variant="caption">
              Track institution-wide activity.
            </Text>
          </Card>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: SPACING.lg,
  },
  header: {
    gap: SPACING.sm,
  },
  highlightCard: {
    backgroundColor: COLORS.primaryLight,
  },
  widgets: {
    gap: SPACING.md,
  },
});

import { StyleSheet, View } from "react-native";

import { ProfileHeader } from "@/src/components/profile/ProfileHeader";
import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, SPACING } from "@/src/theme";

export default function StudentDashboard() {
  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.header}>
          <ProfileHeader role="student" />
          <Text variant="subHeading">Welcome back</Text>
          <Text color={COLORS.textSecondary} variant="body">
            Review your attendance, assignments, and study materials.
          </Text>
        </View>

        <View style={styles.widgets}>
          <Card style={styles.highlightCard}>
            <Text variant="innerHeading">Attendance</Text>
            <Text color={COLORS.textSecondary} variant="caption">
              View daily attendance status and history.
            </Text>
          </Card>

          <Card>
            <Text variant="innerHeading">Assignments</Text>
            <Text color={COLORS.textSecondary} variant="caption">
              Track upcoming work and submissions.
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

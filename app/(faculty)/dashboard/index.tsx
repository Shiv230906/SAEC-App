import { StyleSheet, View } from "react-native";

import { ProfileHeader } from "@/src/components/profile/ProfileHeader";
import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, SPACING } from "@/src/theme";

export default function FacultyDashboard() {
  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.header}>
          <ProfileHeader role="faculty" />
          <Text variant="subHeading">Welcome back</Text>
          <Text color={COLORS.textSecondary} variant="body">
            Manage attendance, assignments, and class notes.
          </Text>
        </View>

        <View style={styles.widgets}>
          <Card style={styles.highlightCard}>
            <Text variant="innerHeading">Attendance</Text>
            <Text color={COLORS.textSecondary} variant="caption">
              Mark and review class attendance.
            </Text>
          </Card>

          <Card>
            <Text variant="innerHeading">Assignments</Text>
            <Text color={COLORS.textSecondary} variant="caption">
              Create work and track submissions.
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

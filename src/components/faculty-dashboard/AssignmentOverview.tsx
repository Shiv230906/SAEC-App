import { router } from "expo-router";
import { View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyAssignmentSummary } from "@/src/data/facultyMockData";
import { COLORS } from "@/src/theme";

export default function AssignmentOverview() {
  const { newSubmissions, pendingReviews } = facultyAssignmentSummary;

  return (
    <DashboardCard>
      <SectionHeader icon="assignment" title="Assignment Overview" />

      <View style={dashboardStyles.statsRow}>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{pendingReviews}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Pending Reviews
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{newSubmissions}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            New Submissions
          </Text>
        </View>
      </View>

      <ActionButton
        onPress={() => router.push("/(faculty)/assignments")}
        variant="navy"
      >
        Review Assignments
      </ActionButton>
    </DashboardCard>
  );
}

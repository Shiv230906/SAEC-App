import { View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyTaskMonitoring } from "@/src/data/adminMockData";
import { COLORS } from "@/src/theme";

export default function FacultyTaskMonitoring() {
  const { assignedToday, completed, pending } = facultyTaskMonitoring;
  const completionRate = Math.round((completed / assignedToday) * 100);

  return (
    <DashboardCard>
      <SectionHeader icon="assignment-turned-in" title="Faculty Task Monitoring" />

      <View style={dashboardStyles.progressTrack}>
        <View
          style={[
            dashboardStyles.progressFill,
            { width: `${completionRate}%` },
          ]}
        />
      </View>

      <View style={dashboardStyles.statsRow}>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{assignedToday}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Assigned Today
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{completed}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Completed
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{pending}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Pending
          </Text>
        </View>
      </View>

      <ActionButton variant="peach">View Tasks</ActionButton>
    </DashboardCard>
  );
}

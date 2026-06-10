import { router } from "expo-router";
import { View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyAttendanceSummary } from "@/src/data/facultyMockData";
import { COLORS } from "@/src/theme";

export default function AttendanceStatus() {
  const { classesToday, completed, pending } = facultyAttendanceSummary;
  const completionRate = Math.round((completed / classesToday) * 100);

  return (
    <DashboardCard>
      <SectionHeader icon="how-to-reg" title="Attendance Status" />

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
          <Text variant="innerHeading">{classesToday}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Classes Today
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{completed}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Attendance Taken
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{pending}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Pending
          </Text>
        </View>
      </View>

      <ActionButton
        onPress={() => router.push("/(faculty)/attendance")}
        variant="navy"
      >
        Take Attendance
      </ActionButton>
    </DashboardCard>
  );
}

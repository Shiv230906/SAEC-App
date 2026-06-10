import { router } from "expo-router";
import { View } from "react-native";

import { AttendanceProgressBar } from "@/src/components/attendance";
import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import {
  adminAttendanceOverview,
  adminLowAttendanceClasses,
} from "@/src/data/attendanceMockData";
import { COLORS } from "@/src/theme";

export default function AttendanceOverview() {
  const { overallPercentage } = adminAttendanceOverview;
  const lowestClass = adminLowAttendanceClasses[0];

  return (
    <DashboardCard>
      <SectionHeader icon="how-to-reg" title="Attendance Overview" />

      <View style={dashboardStyles.statItem}>
        <Text color={COLORS.navy} variant="heading">
          {overallPercentage}%
        </Text>
        <Text color={COLORS.textSecondary} variant="caption">
          Overall College Attendance
        </Text>
      </View>

      <AttendanceProgressBar percentage={overallPercentage} />

      {lowestClass ? (
        <Text color={COLORS.textSecondary} variant="caption">
          Lowest: {lowestClass.section} at {lowestClass.percentage}%
        </Text>
      ) : null}

      <ActionButton
        onPress={() => router.push("/(admin)/attendance")}
        variant="peach"
      >
        View Full Report
      </ActionButton>
    </DashboardCard>
  );
}

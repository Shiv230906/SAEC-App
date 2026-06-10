import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { AttendanceProgressBar } from "@/src/components/attendance";
import {
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Screen, Text } from "@/src/components/ui";
import {
  ATTENDANCE_THRESHOLD,
  adminAttendanceOverview,
  adminClassWiseAttendance,
  adminDefaulterStudents,
  adminLowAttendanceClasses,
} from "@/src/data/attendanceMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

export function AdminAttendanceScreen() {
  const { overallPercentage } = adminAttendanceOverview;

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Attendance Overview</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Monitor college-wide attendance and identify classes that need
          attention.
        </Text>
      </View>

      <DashboardCard>
        <SectionHeader icon="school" title="Overall College Attendance" />
        <View style={styles.overallRow}>
          <Text color={COLORS.navy} style={styles.overallValue}>
            {overallPercentage}%
          </Text>
        </View>
        <AttendanceProgressBar percentage={overallPercentage} />
      </DashboardCard>

      <DashboardCard>
        <SectionHeader icon="class" title="Class Wise Attendance" />
        <View style={dashboardStyles.overviewGrid}>
          {adminClassWiseAttendance.map((item) => (
            <View key={item.section} style={dashboardStyles.overviewItem}>
              <Text color={COLORS.textSecondary} variant="caption">
                {item.section}
              </Text>
              <Text
                color={
                  item.percentage < ATTENDANCE_THRESHOLD
                    ? COLORS.error
                    : COLORS.navy
                }
                variant="subHeading"
              >
                {item.percentage}%
              </Text>
            </View>
          ))}
        </View>
      </DashboardCard>

      <DashboardCard style={styles.alertCard}>
        <SectionHeader icon="warning" title="Attention Required" />
        <Text color={COLORS.textSecondary} variant="body">
          Classes below {ATTENDANCE_THRESHOLD}% attendance threshold
        </Text>

        <View style={styles.list}>
          {adminLowAttendanceClasses.map((item) => (
            <View key={item.section} style={styles.alertRow}>
              <MaterialIcons color={COLORS.error} name="error" size={20} />
              <Text style={styles.alertLabel} variant="body">
                {item.section}
              </Text>
              <Text color={COLORS.error} variant="body">
                {item.percentage}%
              </Text>
            </View>
          ))}
        </View>
      </DashboardCard>

      <DashboardCard>
        <SectionHeader icon="person-off" title="Defaulter Students" />
        <View style={styles.list}>
          {adminDefaulterStudents.map((student) => (
            <View key={student.name} style={styles.defaulterRow}>
              <View style={styles.defaulterCopy}>
                <Text variant="body">{student.name}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {student.section}
                </Text>
              </View>
              <Text color={COLORS.error} style={styles.defaulterPercent}>
                {student.percentage}%
              </Text>
            </View>
          ))}
        </View>
      </DashboardCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  alertCard: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  alertLabel: {
    flex: 1,
  },
  alertRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  defaulterCopy: {
    flex: 1,
    gap: 2,
  },
  defaulterPercent: {
    fontFamily: FONT_FAMILY.semiBold,
  },
  defaulterRow: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    padding: SPACING.md,
  },
  header: {
    gap: SPACING.xs,
  },
  list: {
    gap: SPACING.sm,
  },
  overallRow: {
    alignItems: "center",
  },
  overallValue: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 40,
    lineHeight: 48,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
});

export default AdminAttendanceScreen;

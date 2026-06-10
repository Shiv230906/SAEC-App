import { StyleSheet, View } from "react-native";

import { AttendanceProgressBar } from "@/src/components/attendance";
import {
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Screen, Text } from "@/src/components/ui";
import {
  adminDepartmentPerformance,
  adminStudentsNeedingSupport,
  adminTopPerformingClasses,
} from "@/src/data/marksMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

export function AdminInternalMarksScreen() {
  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Internal Marks Analytics</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Monitor department performance and identify students who need support.
        </Text>
      </View>

      <DashboardCard>
        <SectionHeader icon="domain" title="Department Average" />
        <View style={styles.list}>
          {adminDepartmentPerformance.map((department) => (
            <View key={department.department} style={styles.metricCard}>
              <View style={dashboardStyles.noticeHeader}>
                <Text variant="body">{department.department}</Text>
                <Text color={COLORS.navy} variant="body">
                  {department.average}%
                </Text>
              </View>
              <AttendanceProgressBar percentage={department.average} />
            </View>
          ))}
        </View>
      </DashboardCard>

      <DashboardCard>
        <SectionHeader icon="leaderboard" title="Top Performing Classes" />
        <View style={dashboardStyles.overviewGrid}>
          {adminTopPerformingClasses.map((classItem) => (
            <View key={classItem.section} style={dashboardStyles.overviewItem}>
              <Text color={COLORS.textSecondary} variant="caption">
                {classItem.department}
              </Text>
              <Text variant="innerHeading">{classItem.section}</Text>
              <Text color={COLORS.primary} variant="body">
                {classItem.average}%
              </Text>
            </View>
          ))}
        </View>
      </DashboardCard>

      <DashboardCard>
        <SectionHeader icon="support-agent" title="Students Needing Support" />
        <View style={styles.list}>
          {adminStudentsNeedingSupport.map((student) => (
            <View key={`${student.name}-${student.section}`} style={styles.supportRow}>
              <View style={styles.supportCopy}>
                <Text variant="body">{student.name}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {student.section}
                </Text>
              </View>
              <Text color={COLORS.error} variant="body">
                {student.average}%
              </Text>
            </View>
          ))}
        </View>
      </DashboardCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
  },
  list: {
    gap: SPACING.sm,
  },
  metricCard: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
    padding: SPACING.md,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  supportCopy: {
    flex: 1,
    gap: 2,
  },
  supportRow: {
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    gap: SPACING.sm,
    padding: SPACING.md,
  },
});

export default AdminInternalMarksScreen;

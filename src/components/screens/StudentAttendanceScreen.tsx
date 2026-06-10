import { StyleSheet, View } from "react-native";

import {
  AttendanceProgressBar,
  DefaulterWarningCard,
  MonthlyAttendanceCalendar,
} from "@/src/components/attendance";
import { Card, Screen, Text } from "@/src/components/ui";
import {
  studentMonthlyAttendance,
  studentOverallAttendance,
  studentSubjectAttendance,
} from "@/src/data/attendanceMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

function SummaryCard() {
  const { absent, percentage, present, total } = studentOverallAttendance;

  return (
    <Card style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text variant="innerHeading">Overall Attendance</Text>
        <View style={styles.percentPill}>
          <Text color={COLORS.white} style={styles.percentText}>
            {percentage}%
          </Text>
        </View>
      </View>

      <AttendanceProgressBar percentage={percentage} />

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text variant="innerHeading">{present}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Present
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="innerHeading">{absent}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Absent
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="innerHeading">{total}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Total
          </Text>
        </View>
      </View>
    </Card>
  );
}

export function StudentAttendanceScreen() {
  const { percentage } = studentOverallAttendance;

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Attendance</Text>
        <Text color={COLORS.textSecondary} variant="body">
          View subject-wise attendance and weekly class history.
        </Text>
      </View>

      <SummaryCard />

      <DefaulterWarningCard percentage={percentage} />

      <View style={styles.section}>
        <Text variant="innerHeading">Subject Wise</Text>

        {studentSubjectAttendance.map((item) => (
          <Card key={item.subject} style={styles.subjectCard}>
            <View style={styles.subjectHeader}>
              <Text variant="body">{item.subject}</Text>
              <Text color={COLORS.primary} variant="body">
                {item.percentage}%
              </Text>
            </View>

            <AttendanceProgressBar percentage={item.percentage} />

            <Text color={COLORS.textSecondary} variant="caption">
              Subject attendance summary
            </Text>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Monthly Attendance</Text>
        <MonthlyAttendanceCalendar days={studentMonthlyAttendance} />
      </View>
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
  percentPill: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
  },
  percentText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 12,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.xs,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subjectCard: {
    gap: SPACING.sm,
  },
  subjectHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryCard: {
    gap: SPACING.md,
  },
  summaryHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default StudentAttendanceScreen;

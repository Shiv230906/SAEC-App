import { StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import {
  studentAttendanceBySubject,
  studentAttendanceSummary,
  studentRecentAttendance,
} from "@/src/data/studentMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

function SummaryCard() {
  const { absent, percentage, present, total } = studentAttendanceSummary;

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

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>

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

function statusColor(status: "present" | "absent" | "holiday") {
  if (status === "present") {
    return COLORS.success;
  }

  if (status === "absent") {
    return COLORS.error;
  }

  return COLORS.gray500;
}

export function StudentAttendanceScreen() {
  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Attendance</Text>
        <Text color={COLORS.textSecondary} variant="body">
          View subject-wise attendance and recent class history.
        </Text>
      </View>

      <SummaryCard />

      <View style={styles.section}>
        <Text variant="innerHeading">Subject Wise</Text>

        {studentAttendanceBySubject.map((item) => (
          <Card key={item.subject} style={styles.subjectCard}>
            <View style={styles.subjectHeader}>
              <Text variant="body">{item.subject}</Text>
              <Text color={COLORS.primary} variant="body">
                {item.percentage}%
              </Text>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${item.percentage}%` }]}
              />
            </View>

            <Text color={COLORS.textSecondary} variant="caption">
              {item.attended} of {item.total} classes attended
            </Text>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Recent History</Text>

        {studentRecentAttendance.map((record) => (
          <Card key={`${record.date}-${record.subject}`} style={styles.historyCard}>
            <View style={styles.historyRow}>
              <View style={styles.historyCopy}>
                <Text variant="body">{record.subject}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {record.date}
                </Text>
              </View>
              <Text
                color={statusColor(record.status)}
                style={styles.statusLabel}
                variant="caption"
              >
                {record.status.toUpperCase()}
              </Text>
            </View>
          </Card>
        ))}
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
  historyCard: {
    gap: SPACING.xs,
  },
  historyCopy: {
    flex: 1,
    gap: SPACING.xs,
  },
  historyRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  progressFill: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    height: "100%",
  },
  progressTrack: {
    backgroundColor: COLORS.accentBlueMuted,
    borderRadius: RADIUS.pill,
    height: 8,
    overflow: "hidden",
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
  statusLabel: {
    fontFamily: FONT_FAMILY.semiBold,
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

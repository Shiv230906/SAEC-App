import { StyleSheet, View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyTaskMonitoring } from "@/src/data/adminMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

type FacultyTaskRecord = {
  id: string;
  name: string;
  task: string;
  completion: number;
};

const FACULTY_TASKS: FacultyTaskRecord[] = [
  { id: "ft1", name: "Dr. John Doe", task: "Upload Internal Marks", completion: 100 },
  { id: "ft2", name: "Dr. Meera Iyer", task: "Verify Attendance Records", completion: 75 },
  { id: "ft3", name: "Prof. Suresh Babu", task: "Submit Lab Assessment", completion: 50 },
  { id: "ft4", name: "Dr. Anita Rao", task: "Review Project Reports", completion: 30 },
  { id: "ft5", name: "Prof. Ravi Kumar", task: "Grade Assignments", completion: 90 },
];

function getProgressColor(pct: number) {
  if (pct >= 80) return COLORS.success;
  if (pct >= 50) return COLORS.warning;
  return COLORS.error;
}

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

      <View style={styles.grid}>
        {FACULTY_TASKS.map((ft) => {
          const color = getProgressColor(ft.completion);
          return (
            <View key={ft.id} style={styles.gridRow}>
              <View style={styles.gridInfo}>
                <Text variant="body">{ft.name}</Text>
                <Text color={COLORS.textSecondary} variant="caption">{ft.task}</Text>
              </View>
              <View style={styles.progressWrap}>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${ft.completion}%`, backgroundColor: color }]} />
                </View>
                <Text color={color} variant="caption">{ft.completion}%</Text>
              </View>
            </View>
          );
        })}
      </View>

      <ActionButton variant="peach">View Tasks</ActionButton>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  grid: { gap: SPACING.sm },
  gridRow: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  gridInfo: { gap: 2 },
  progressWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.pill,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    borderRadius: RADIUS.pill,
  },
});

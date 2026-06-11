import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyTaskChecklist } from "@/src/data/adminTasksMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

export default function FacultyTaskMonitoring() {
  const completed = facultyTaskChecklist.filter(
    (task) => task.status === "completed",
  ).length;
  const pending = facultyTaskChecklist.length - completed;

  return (
    <DashboardCard>
      <SectionHeader icon="assignment-turned-in" title="Faculty Task Monitoring" />

      <View style={styles.checklist}>
        {facultyTaskChecklist.map((task) => {
          const isCompleted = task.status === "completed";
          const color = isCompleted ? COLORS.success : COLORS.linkAccent;

          return (
            <View key={task.id} style={styles.taskRow}>
              <MaterialIcons
                color={color}
                name={isCompleted ? "check-box" : "check-box-outline-blank"}
                size={24}
              />
              <View style={styles.taskCopy}>
                <Text variant="body">{task.facultyName}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {task.taskTitle}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={dashboardStyles.statsRow}>
        <View style={dashboardStyles.statItem}>
          <Text color={COLORS.success} variant="innerHeading">
            {completed}
          </Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Completed
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text color={COLORS.linkAccent} variant="innerHeading">
            {pending}
          </Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Pending
          </Text>
        </View>
      </View>

      <ActionButton onPress={() => router.push("/(admin)/reports")} variant="peach">
        Manage Tasks
      </ActionButton>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  checklist: {
    gap: SPACING.sm,
  },
  taskCopy: {
    flex: 1,
    gap: 2,
  },
  taskRow: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    gap: SPACING.sm,
    padding: SPACING.md,
  },
});

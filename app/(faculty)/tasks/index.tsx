import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import type { FacultyTaskListRecord } from "@/src/data/facultyMockData";
import { facultyTaskList } from "@/src/data/facultyMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

type FilterStatus = "all" | "in_progress" | "completed";

const FILTER_OPTIONS: { key: FilterStatus; label: string }[] = [
  { key: "all", label: "All Tasks" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

const INITIAL_TASKS: FacultyTaskListRecord[] = facultyTaskList;

function getProgressColor(pct: number) {
  if (pct >= 90) return COLORS.success;
  if (pct >= 50) return COLORS.warning;
  if (pct <= 30) return COLORS.error;
  return COLORS.warning;
}

function filterTasks(tasks: FacultyTaskListRecord[], filterStatus: FilterStatus) {
  switch (filterStatus) {
    case "in_progress":
      return tasks.filter((task) => task.completion < 100);
    case "completed":
      return tasks.filter((task) => task.completion === 100);
    default:
      return tasks;
  }
}

export default function FacultyTasks() {
  const [tasks] = useState<FacultyTaskListRecord[]>(INITIAL_TASKS);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const filteredTasks = filterTasks(tasks, filterStatus);
  const inProgressCount = tasks.filter((task) => task.completion < 100).length;
  const completedCount = tasks.filter((task) => task.completion === 100).length;

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.darkText} variant="subHeading">
          Faculty Tasks
        </Text>
        <Text color={COLORS.textSecondary} variant="body">
          Track task completion progress across all assigned faculty.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text variant="innerHeading">{tasks.length}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Total
          </Text>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: "#FFEDD5" }]}>
          <Text color="#EA580C" variant="innerHeading">
            {inProgressCount}
          </Text>
          <Text color="#EA580C" variant="caption">
            In Progress
          </Text>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: "#DCFCE7" }]}>
          <Text color="#16A34A" variant="innerHeading">
            {completedCount}
          </Text>
          <Text color="#16A34A" variant="caption">
            Completed
          </Text>
        </Card>
      </View>

      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map((filter) => {
          const isActive = filterStatus === filter.key;
          return (
            <Pressable
              key={filter.key}
              onPress={() => setFilterStatus(filter.key)}
              style={({ pressed }) => [
                styles.filterChip,
                isActive ? styles.filterChipActive : undefined,
                pressed ? styles.pressed : undefined,
              ]}
            >
              <Text
                color={isActive ? COLORS.white : COLORS.textSecondary}
                variant="caption"
                style={isActive ? styles.activeFilterLabel : undefined}
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.taskList}>
        {filteredTasks.map((task) => {
          const color = getProgressColor(task.completion);

          return (
            <Card key={task.id} style={styles.taskCard}>
              <View style={styles.taskInfo}>
                <Text variant="body">{task.name}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {task.task}
                </Text>
              </View>

              <View style={styles.progressWrap}>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${task.completion}%`,
                        backgroundColor: color,
                      },
                    ]}
                  />
                </View>
                <Text color={color} variant="caption">
                  {task.completion}%
                </Text>
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  activeFilterLabel: {
    fontFamily: FONT_FAMILY.bold,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  darkText: {
    color: "#0F172A",
  },
  filterChip: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.pill,
    flex: 1,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  filterChipActive: {
    backgroundColor: COLORS.navy,
  },
  filterRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  header: {
    gap: SPACING.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  progressFill: {
    borderRadius: RADIUS.pill,
    height: 6,
  },
  progressTrack: {
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.pill,
    flex: 1,
    height: 6,
    overflow: "hidden",
  },
  progressWrap: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },
  statCard: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.xs,
    paddingVertical: SPACING.md,
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  taskCard: {
    backgroundColor: COLORS.accentBlue,
    gap: SPACING.sm,
  },
  taskInfo: {
    gap: 2,
  },
  taskList: {
    gap: SPACING.md,
  },
});

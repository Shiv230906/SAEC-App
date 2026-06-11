import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

type TaskStatus = "pending" | "ongoing" | "completed";

type TaskRecord = {
  id: string;
  title: string;
  description: string;
  assignedBy: string;
  dueDate: string;
  status: TaskStatus;
};

const INITIAL_TASKS: TaskRecord[] = [
  {
    id: "t1",
    title: "Upload Internal Marks",
    description: "Upload DBMS internal test 1 marks for CSE A, B, C sections",
    assignedBy: "Admin Office",
    dueDate: "Jun 15, 2026",
    status: "ongoing",
  },
  {
    id: "t2",
    title: "Verify Attendance Records",
    description: "Cross-check attendance data for May 2026 semester records",
    assignedBy: "HOD - CSE",
    dueDate: "Jun 12, 2026",
    status: "ongoing",
  },
  {
    id: "t3",
    title: "Submit Course Plan",
    description: "Finalize and submit the semester course plan for DBMS",
    assignedBy: "Admin Office",
    dueDate: "Jun 10, 2026",
    status: "completed",
  },
  {
    id: "t4",
    title: "Review Lab Reports",
    description: "Review and grade OS lab reports for batch CSE B",
    assignedBy: "HOD - CSE",
    dueDate: "Jun 18, 2026",
    status: "pending",
  },
  {
    id: "t5",
    title: "Approve Project Topics",
    description: "Review and approve final year project proposals",
    assignedBy: "Project Coordinator",
    dueDate: "Jun 20, 2026",
    status: "pending",
  },
  {
    id: "t6",
    title: "Grade Assignments",
    description: "Grade CN Unit 3 assignments for all sections",
    assignedBy: "Admin Office",
    dueDate: "Jun 8, 2026",
    status: "completed",
  },
];

const STATUS_CONFIG: Record<TaskStatus, { label: string; icon: keyof typeof MaterialIcons.glyphMap; bg: string; text: string }> = {
  pending: { label: "Pending", icon: "schedule", bg: "#FEF9C3", text: "#CA8A04" },
  ongoing: { label: "On Going", icon: "autorenew", bg: "#FFEDD5", text: "#EA580C" },
  completed: { label: "Completed", icon: "check-circle", bg: "#DCFCE7", text: "#16A34A" },
};

function getNextStatus(current: TaskStatus): TaskStatus {
  if (current === "pending") return "ongoing";
  if (current === "ongoing") return "completed";
  return "completed";
}

export default function FacultyTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const updateStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: getNextStatus(t.status) } : t
      )
    );
  };

  const ongoing = tasks.filter((t) => t.status === "ongoing");
  const pending = tasks.filter((t) => t.status === "pending");
  const completed = tasks.filter((t) => t.status === "completed");
  const sections = [
    { title: "On Going", data: ongoing },
    { title: "Pending", data: pending },
    { title: "Completed", data: completed },
  ];

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.darkText} variant="subHeading">My Tasks</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Track and update your assigned tasks.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <Card style={[styles.statCard, { backgroundColor: "#FFEDD5" }]}>
          <Text color="#EA580C" variant="innerHeading">{ongoing.length}</Text>
          <Text color="#EA580C" variant="caption">On Going</Text>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: "#FEF9C3" }]}>
          <Text color="#CA8A04" variant="innerHeading">{pending.length}</Text>
          <Text color="#CA8A04" variant="caption">Pending</Text>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: "#DCFCE7" }]}>
          <Text color="#16A34A" variant="innerHeading">{completed.length}</Text>
          <Text color="#16A34A" variant="caption">Done</Text>
        </Card>
      </View>

      {sections.map((section) =>
        section.data.length > 0 ? (
          <View key={section.title} style={styles.section}>
            <Text variant="innerHeading">{section.title}</Text>
            {section.data.map((task) => {
              const cfg = STATUS_CONFIG[task.status];
              return (
                <Card
                  key={task.id}
                  style={[
                    styles.taskCard,
                    task.status === "ongoing"
                      ? styles.taskOngoing
                      : task.status === "completed"
                        ? styles.taskCompleted
                        : undefined,
                  ]}
                >
                  <View style={styles.taskTop}>
                    <View style={styles.taskInfo}>
                      <Text variant="body">{task.title}</Text>
                      <Text color={COLORS.textSecondary} variant="caption">
                        {task.description}
                      </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
                      <MaterialIcons color={cfg.text} name={cfg.icon} size={14} />
                      <Text color={cfg.text} variant="caption">{cfg.label}</Text>
                    </View>
                  </View>

                  <View style={styles.taskMeta}>
                    <Text color={COLORS.textSecondary} variant="caption">
                      Assigned by: {task.assignedBy}
                    </Text>
                    <Text color={COLORS.textSecondary} variant="caption">
                      Due: {task.dueDate}
                    </Text>
                  </View>

                  {task.status !== "completed" ? (
                    <Pressable
                      style={({ pressed }) => [
                        styles.actionBtn,
                        { backgroundColor: task.status === "pending" ? "#FFEDD5" : "#DCFCE7" },
                        pressed ? styles.pressed : undefined,
                      ]}
                      onPress={() => updateStatus(task.id)}
                    >
                      <Text
                        color={task.status === "pending" ? "#EA580C" : "#16A34A"}
                        variant="caption"
                        style={styles.actionLabel}
                      >
                        {task.status === "pending" ? "Start Task" : "Mark Complete"}
                      </Text>
                    </Pressable>
                  ) : null}
                </Card>
              );
            })}
          </View>
        ) : null
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: SPACING.lg, paddingBottom: SPACING.xl },
  header: { gap: SPACING.sm },
  darkText: { color: "#0F172A" },
  statsRow: { flexDirection: "row", gap: SPACING.sm },
  statCard: { flex: 1, alignItems: "center", gap: SPACING.xs, paddingVertical: SPACING.md },
  section: { gap: SPACING.sm },
  taskCard: { gap: SPACING.sm },
  taskOngoing: { borderLeftWidth: 3, borderLeftColor: "#F97316" },
  taskCompleted: { borderLeftWidth: 3, borderLeftColor: "#16A34A" },
  taskTop: { flexDirection: "row", gap: SPACING.sm },
  taskInfo: { flex: 1, gap: 2 },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  taskMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionBtn: {
    alignItems: "center",
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
  },
  actionLabel: { fontFamily: FONT_FAMILY.semiBold },
  pressed: { opacity: 0.7 },
});

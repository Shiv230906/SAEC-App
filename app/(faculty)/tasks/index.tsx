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

const STATUS_OPTIONS: { key: TaskStatus; label: string; bg: string; activeBg: string; text: string; icon: keyof typeof MaterialIcons.glyphMap }[] = [
  { key: "pending", label: "Pending", bg: "#FFF9E6", activeBg: "#FEF9C3", text: "#CA8A04", icon: "schedule" },
  { key: "ongoing", label: "Ongoing", bg: "#FFF5EB", activeBg: "#FFEDD5", text: "#EA580C", icon: "autorenew" },
  { key: "completed", label: "Done", bg: "#F0FDF4", activeBg: "#DCFCE7", text: "#16A34A", icon: "check-circle" },
];

export default function FacultyTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const setStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const ongoing = tasks.filter((t) => t.status === "ongoing");
  const pending = tasks.filter((t) => t.status === "pending");
  const completed = tasks.filter((t) => t.status === "completed");

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.darkText} variant="subHeading">My Tasks</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Tasks assigned by the admin. Update status as you progress.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <Card style={[styles.statCard, { backgroundColor: "#FFEDD5" }]}>  
          <Text color="#EA580C" variant="innerHeading">{ongoing.length}</Text>
          <Text color="#EA580C" variant="caption">Ongoing</Text>
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

      <View style={styles.taskList}>
        {tasks.map((task) => {
          const currentCfg = STATUS_OPTIONS.find((s) => s.key === task.status)!;

          return (
            <Card key={task.id} style={styles.taskCard}>
              <View style={styles.taskTop}>
                <View style={styles.taskInfo}>
                  <Text variant="body">{task.title}</Text>
                  <Text color={COLORS.textSecondary} variant="caption">
                    {task.description}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: currentCfg.activeBg }]}>
                  <MaterialIcons color={currentCfg.text} name={currentCfg.icon} size={14} />
                  <Text color={currentCfg.text} variant="caption">{currentCfg.label}</Text>
                </View>
              </View>

              <View style={styles.taskMeta}>
                <Text color={COLORS.textSecondary} variant="caption">
                  By: {task.assignedBy}
                </Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  Due: {task.dueDate}
                </Text>
              </View>

              <View style={styles.buttonRow}>
                {STATUS_OPTIONS.map((opt) => {
                  const isActive = task.status === opt.key;
                  return (
                    <Pressable
                      key={opt.key}
                      onPress={() => setStatus(task.id, opt.key)}
                      style={({ pressed }) => [
                        styles.statusBtn,
                        { backgroundColor: isActive ? opt.activeBg : opt.bg },
                        isActive ? { borderColor: opt.text, borderWidth: 1.5 } : undefined,
                        pressed ? styles.pressed : undefined,
                      ]}
                    >
                      <MaterialIcons
                        color={opt.text}
                        name={opt.icon}
                        size={16}
                      />
                      <Text
                        color={opt.text}
                        variant="caption"
                        style={isActive ? styles.activeBtnLabel : styles.btnLabel}
                      >
                        {opt.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  activeBtnLabel: {
    fontFamily: FONT_FAMILY.bold,
  },
  btnLabel: {
    fontFamily: FONT_FAMILY.regular,
  },
  buttonRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  darkText: {
    color: "#0F172A",
  },
  header: {
    gap: SPACING.sm,
  },
  pressed: {
    opacity: 0.7,
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
  statusBadge: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: RADIUS.pill,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  statusBtn: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    flex: 1,
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  taskCard: {
    gap: SPACING.sm,
  },
  taskInfo: {
    flex: 1,
    gap: 2,
  },
  taskList: {
    gap: SPACING.md,
  },
  taskMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskTop: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
});

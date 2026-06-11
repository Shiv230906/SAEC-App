import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ActionButton, dashboardStyles } from "@/src/components/dashboard";
import { Card, Input, Screen, Text } from "@/src/components/ui";
import {
  recentlyAssignedTasks,
  type AdminAssignedTask,
  type TaskPriority,
} from "@/src/data/adminTasksMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

const PRIORITIES: TaskPriority[] = ["high", "medium", "low"];

export default function AdminAssignTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<AdminAssignedTask[]>(recentlyAssignedTasks);
  const [message, setMessage] = useState("");

  const assignTask = () => {
    if (!taskTitle.trim() || !assignee.trim()) {
      setMessage("Task title and assignee are required.");
      return;
    }

    const newTask: AdminAssignedTask = {
      assignedFaculty: assignee.trim(),
      dueDate: dueDate || "No due date",
      id: `task-local-${Date.now()}`,
      priority,
      status: "pending",
      title: taskTitle.trim(),
    };

    setTasks((current) => [newTask, ...current]);
    setMessage(`Task assigned to ${assignee.trim()}.`);
    setTaskTitle("");
    setAssignee("");
    setDueDate("");
    setDescription("");
  };

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Assign Task</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Assign tasks to faculty members and track recently assigned work.
        </Text>
      </View>

      <Card style={styles.formCard}>
        <Text variant="innerHeading">New Task</Text>

        <Input
          label="Task Title"
          onChangeText={setTaskTitle}
          placeholder="Upload Internal Marks"
          value={taskTitle}
        />

        <Input
          label="Assign To"
          onChangeText={setAssignee}
          placeholder="Mr. Bala"
          value={assignee}
        />

        <Input
          inputStyle={styles.descriptionInput}
          label="Description"
          multiline
          onChangeText={setDescription}
          placeholder="Task details..."
          textAlignVertical="top"
          value={description}
        />

        <Input
          keyboardType="numeric"
          label="Due Date (DD-MM-YYYY)"
          maxLength={10}
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9]/g, "");
            let formatted = cleaned;
            if (cleaned.length > 2) {
              formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
            }
            if (cleaned.length > 4) {
              formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}`;
            }
            setDueDate(formatted);
          }}
          placeholder="20-06-2026"
          value={dueDate}
        />

        <View style={styles.prioritySection}>
          <Text color={COLORS.textSecondary} variant="caption">
            Priority
          </Text>
          <View style={styles.priorityRow}>
            {PRIORITIES.map((item) => {
              const isActive = item === priority;

              return (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  onPress={() => setPriority(item)}
                  style={({ pressed }) => [
                    dashboardStyles.chip,
                    isActive ? dashboardStyles.chipActive : undefined,
                    pressed ? dashboardStyles.pressed : undefined,
                  ]}
                >
                  <Text
                    color={isActive ? COLORS.white : COLORS.textSecondary}
                    variant="caption"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <ActionButton onPress={assignTask} variant="peach">
          Assign Task
        </ActionButton>
      </Card>

      {message ? (
        <Card style={styles.messageCard}>
          <Text
            color={message.includes("required") ? COLORS.error : COLORS.success}
            variant="body"
          >
            {message}
          </Text>
        </Card>
      ) : null}

      <View style={styles.section}>
        <Text variant="innerHeading">Recently Assigned Tasks</Text>

        {tasks.map((task) => (
          <Card key={task.id} style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <View style={styles.taskCopy}>
                <Text variant="body">{task.title}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  Assigned to {task.assignedFaculty}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  task.status === "completed"
                    ? styles.completedBadge
                    : styles.pendingBadge,
                ]}
              >
                <Text
                  color={
                    task.status === "completed"
                      ? COLORS.success
                      : COLORS.linkAccent
                  }
                  variant="caption"
                >
                  {task.status === "completed" ? "Completed" : "Pending"}
                </Text>
              </View>
            </View>
            <Text color={COLORS.textSecondary} variant="caption">
              Due {task.dueDate} · {task.priority.toUpperCase()}
            </Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  completedBadge: {
    backgroundColor: "#DCFCE7",
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  descriptionInput: {
    minHeight: 100,
  },
  formCard: {
    gap: SPACING.md,
  },
  header: {
    gap: SPACING.sm,
  },
  messageCard: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
  pendingBadge: {
    backgroundColor: COLORS.primaryLight,
  },
  priorityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  prioritySection: {
    gap: SPACING.sm,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
  statusBadge: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  taskCard: {
    gap: SPACING.sm,
  },
  taskCopy: {
    flex: 1,
    gap: 2,
  },
  taskHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },
});

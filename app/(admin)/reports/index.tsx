import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { supabase } from "@/src/services/supabase";
import { Button, Card, Input, Screen, Text } from "@/src/components/ui";
import { COLORS, SPACING } from "@/src/theme";

const PRIORITIES = ["high", "medium", "low"] as const;

export default function AdminAssignTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<(typeof PRIORITIES)[number]>("medium");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const assignTask = async () => {
    if (!taskTitle.trim() || !assignee.trim()) {
      Alert.alert("Validation", "Task title and assignee are required.");
      return;
    }

    setSubmitting(true);

    try {
      let isoDate: string | null = null;
      if (dueDate) {
        const parts = dueDate.split("-");
        if (parts.length === 3) {
          const day = parts[0].padStart(2, "0");
          const month = parts[1].padStart(2, "0");
          const year = parts[2];
          isoDate = `${year}-${month}-${day}`;
        }
      }

      const payload: Record<string, unknown> = {
        title: taskTitle.trim(),
        assignee: assignee.trim(),
        priority,
        description: description.trim() || null,
        status: "pending",
      };
      if (isoDate) {
        payload.due_date = isoDate;
      }

      const { error } = await supabase.from("tasks").insert([payload]);

      if (error) throw error;

      Alert.alert("Success", `Task assigned to ${assignee}.`);
      setTaskTitle("");
      setAssignee("");
      setDueDate("");
      setDescription("");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        error?.message ??
        (typeof error === "string" ? error : JSON.stringify(error));
      Alert.alert("Error", msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="subHeading">Assign Task</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Assign tasks to faculty members and track progress.
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
          label="Assign To (Faculty Name/Email)"
          onChangeText={setAssignee}
          placeholder="Dr. John Doe"
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
          label="Due Date (DD-MM-YYYY)"
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9]/g, "");
            let formatted = cleaned;
            if (cleaned.length > 2) formatted = cleaned.slice(0, 2) + "-" + cleaned.slice(2);
            if (cleaned.length > 4) formatted = cleaned.slice(0, 2) + "-" + cleaned.slice(2, 4) + "-" + cleaned.slice(4, 8);
            setDueDate(formatted);
          }}
          placeholder="20-06-2026"
          value={dueDate}
          keyboardType="numeric"
          maxLength={10}
        />

        <View style={styles.prioritySection}>
          <Text color={COLORS.textSecondary} variant="caption">
            Priority
          </Text>
          <View style={styles.priorityRow}>
            {PRIORITIES.map((p) => (
              <Button
                key={p}
                onPress={() => setPriority(p)}
                title={p.charAt(0).toUpperCase() + p.slice(1)}
                variant={priority === p ? "primary" : "secondary"}
              />
            ))}
          </View>
        </View>

        <Button
          loading={submitting}
          onPress={assignTask}
          title="Assign Task"
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
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
  priorityRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  prioritySection: {
    gap: SPACING.sm,
  },
});

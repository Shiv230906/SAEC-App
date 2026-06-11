import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { ActionButton } from "@/src/components/dashboard";
import { Card, Input, Screen, Text } from "@/src/components/ui";
import {
  recentlyUploadedAssignments,
  type FacultyUploadedAssignment,
} from "@/src/data/facultyAssignmentsMockData";
import { COLORS, SPACING } from "@/src/theme";

export default function FacultyAssignments() {
  const [title, setTitle] = useState("DBMS Assignment 3");
  const [description, setDescription] = useState(
    "Normalize the given schema to 3NF and submit relational diagrams.",
  );
  const [subject, setSubject] = useState("DBMS");
  const [className, setClassName] = useState("CSE C");
  const [dueDate, setDueDate] = useState("20-06-2026");
  const [mockFile, setMockFile] = useState("dbms-assignment-3.pdf");
  const [assignments, setAssignments] = useState<FacultyUploadedAssignment[]>(
    recentlyUploadedAssignments,
  );
  const [message, setMessage] = useState("");

  const createAssignment = () => {
    if (!title.trim()) {
      setMessage("Please enter an assignment title.");
      return;
    }

    const newAssignment: FacultyUploadedAssignment = {
      className,
      id: `assignment-local-${Date.now()}`,
      subject,
      title: title.trim(),
      uploadDate: "Uploaded just now",
    };

    setAssignments((current) => [newAssignment, ...current]);
    setMessage(`Assignment "${title.trim()}" uploaded locally.`);
    setTitle("");
    setDescription("");
    setDueDate("");
    setMockFile("assignment.pdf");
  };

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Assignments</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Create coursework with mock file details and review recent uploads.
        </Text>
      </View>

      <Card style={styles.formCard}>
        <Text variant="innerHeading">Create Assignment</Text>

        <Input
          label="Title"
          onChangeText={setTitle}
          placeholder="Assignment Title"
          value={title}
        />

        <Input
          inputStyle={styles.descriptionInput}
          label="Description"
          multiline
          onChangeText={setDescription}
          placeholder="Description"
          textAlignVertical="top"
          value={description}
        />

        <Input
          label="Subject"
          onChangeText={setSubject}
          placeholder="DBMS"
          value={subject}
        />

        <Input
          label="Class"
          onChangeText={setClassName}
          placeholder="CSE C"
          value={className}
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

        <Input
          label="Mock File"
          onChangeText={setMockFile}
          placeholder="assignment.pdf"
          value={mockFile}
        />

        <ActionButton onPress={createAssignment} variant="navy">
          Create Assignment
        </ActionButton>
      </Card>

      {message ? (
        <Card style={styles.messageCard}>
          <Text
            color={message.includes("Please") ? COLORS.error : COLORS.success}
            variant="body"
          >
            {message}
          </Text>
        </Card>
      ) : null}

      <View style={styles.section}>
        <Text variant="innerHeading">Recently Uploaded Assignments</Text>

        {assignments.map((assignment) => (
          <Card key={assignment.id} style={styles.assignmentCard}>
            <View style={styles.assignmentHeader}>
              <View style={styles.assignmentCopy}>
                <Text variant="body">{assignment.title}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {assignment.subject} · {assignment.className}
                </Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {assignment.uploadDate}
                </Text>
              </View>
            </View>
            <View style={styles.actionRow}>
              <ActionButton variant="peach">View</ActionButton>
              <ActionButton variant="peach">Edit</ActionButton>
              <ActionButton
                labelColor={COLORS.error}
                onPress={() =>
                  setAssignments((current) =>
                    current.filter((item) => item.id !== assignment.id),
                  )
                }
                variant="link"
              >
                Delete
              </ActionButton>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  assignmentCard: {
    gap: SPACING.md,
  },
  assignmentCopy: {
    flex: 1,
    gap: SPACING.xs,
  },
  assignmentHeader: {
    flexDirection: "row",
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  descriptionInput: {
    minHeight: 112,
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
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
});

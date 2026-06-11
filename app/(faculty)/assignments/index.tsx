import { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import { ActionButton } from "@/src/components/dashboard";
import { Card, Input, Screen, Text } from "@/src/components/ui";
import {
  recentlyUploadedAssignments,
  type FacultyUploadedAssignment,
} from "@/src/data/facultyAssignmentsMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

export default function FacultyAssignments() {
  const [title, setTitle] = useState("DBMS Assignment 3");
  const [description, setDescription] = useState(
    "Normalize the given schema to 3NF and submit relational diagrams.",
  );
  const [subject, setSubject] = useState("DBMS");
  const [className, setClassName] = useState("CSE C");
  const [dueDate, setDueDate] = useState("20-06-2026");
  const [pickedFile, setPickedFile] = useState<{ name: string; uri: string } | null>(null);
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
    setMessage(`Assignment "${title.trim()}" uploaded.`);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPickedFile(null);
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets?.[0]) {
      setPickedFile({ name: result.assets[0].name, uri: result.assets[0].uri });
    }
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

        <View style={styles.fileSection}>
          <Text color={COLORS.textSecondary} variant="caption">
            Attachment
          </Text>
          <Pressable onPress={pickDocument} style={styles.filePicker}>
            <MaterialIcons
              color={pickedFile ? COLORS.success : COLORS.primary}
              name={pickedFile ? "check-circle" : "upload-file"}
              size={22}
            />
            <Text
              color={pickedFile ? COLORS.textPrimary : COLORS.textSecondary}
              variant="body"
              numberOfLines={1}
            >
              {pickedFile ? pickedFile.name : "Upload PDF or Document"}
            </Text>
          </Pressable>
        </View>

        <ActionButton onPress={createAssignment} variant="peach">
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
          <View key={assignment.id} style={styles.assignmentCard}>
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
                labelColor={COLORS.white}
                style={styles.deleteButton}
                onPress={() =>
                  Alert.alert(
                    "Delete Assignment",
                    "Are you sure you want to delete this assignment? This action cannot be undone.",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () =>
                          setAssignments((current) =>
                            current.filter((item) => item.id !== assignment.id),
                          ),
                      },
                    ],
                  )
                }
                variant="peach"
              >
                Delete
              </ActionButton>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },
  assignmentCard: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    gap: SPACING.md,
    padding: SPACING.md,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
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
  filePicker: {
    alignItems: "center",
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderStyle: "dashed",
    borderWidth: 1.5,
    flexDirection: "row",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  fileSection: {
    gap: SPACING.xs,
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

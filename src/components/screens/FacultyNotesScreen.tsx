import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Input, Screen, Text } from "@/src/components/ui";
import {
  facultyNotesInitial,
  noteClasses,
  noteFileTypes,
  noteSubjects,
  type FacultyNoteMaterial,
  type NoteFileType,
} from "@/src/data/notesMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

const mockFiles: Record<NoteFileType, string> = {
  DOC: "unit-notes.docx",
  PDF: "normalization.pdf",
  PPT: "lecture-slides.ppt",
  Video: "lab-demo.mp4",
};

export function FacultyNotesScreen() {
  const [subject, setSubject] = useState(noteSubjects[0]);
  const [className, setClassName] = useState("CSE C");
  const [fileType, setFileType] = useState<NoteFileType>("PDF");
  const [title, setTitle] = useState("Normalization Notes");
  const [description, setDescription] = useState("Unit 2 Notes");
  const [notes, setNotes] =
    useState<FacultyNoteMaterial[]>(facultyNotesInitial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setEditingId(null);
    setTitle("Normalization Notes");
    setDescription("Unit 2 Notes");
    setFileType("PDF");
  };

  const saveNote = () => {
    if (!title.trim()) {
      return;
    }

    const nextNote: FacultyNoteMaterial = {
      className,
      description,
      facultyName: "Dr. John Doe",
      fileName: mockFiles[fileType],
      fileType,
      id: editingId ?? `note-local-${Date.now()}`,
      subject,
      title: title.trim(),
      uploadDate: editingId ? "Updated just now" : "Uploaded just now",
    };

    setNotes((current) =>
      editingId
        ? current.map((note) => (note.id === editingId ? nextNote : note))
        : [nextNote, ...current],
    );
    setSuccessMessage(
      editingId ? "Notes updated locally" : "Notes uploaded locally",
    );
    resetForm();
  };

  const editNote = (note: FacultyNoteMaterial) => {
    setEditingId(note.id);
    setSubject(note.subject);
    setClassName(note.className);
    setTitle(note.title);
    setDescription(note.description);
    setFileType(note.fileType);
    setSuccessMessage("");
  };

  const deleteNote = (noteId: string) => {
    setNotes((current) => current.filter((note) => note.id !== noteId));
    setSuccessMessage("Notes deleted locally");
    if (editingId === noteId) {
      resetForm();
    }
  };

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Notes Hub</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Upload and manage mock course materials for your classes.
        </Text>
      </View>

      <DashboardCard>
        <SectionHeader icon="upload-file" title="Upload Material" />

        <View>
          <Text color={COLORS.textSecondary} variant="caption">
            Subject
          </Text>
          <View style={dashboardStyles.chipRow}>
            {noteSubjects.map((item) => (
              <Chip
                key={item}
                active={item === subject}
                label={item}
                onPress={() => setSubject(item)}
              />
            ))}
          </View>
        </View>

        <View>
          <Text color={COLORS.textSecondary} variant="caption">
            Class
          </Text>
          <View style={dashboardStyles.chipRow}>
            {noteClasses.map((item) => (
              <Chip
                key={item}
                active={item === className}
                label={item}
                onPress={() => setClassName(item)}
              />
            ))}
          </View>
        </View>

        <Input label="Title" onChangeText={setTitle} value={title} />
        <Input
          label="Description"
          multiline
          onChangeText={setDescription}
          value={description}
        />

        <View>
          <Text color={COLORS.textSecondary} variant="caption">
            File Type
          </Text>
          <View style={dashboardStyles.chipRow}>
            {noteFileTypes.map((item) => (
              <Chip
                key={item}
                active={item === fileType}
                label={item}
                onPress={() => setFileType(item)}
              />
            ))}
          </View>
        </View>

        <View style={styles.mockFile}>
          <MaterialIcons color={COLORS.navy} name="attach-file" size={20} />
          <Text variant="body">{mockFiles[fileType]}</Text>
        </View>

        <ActionButton onPress={saveNote} variant="navy">
          {editingId ? "Save Changes" : "Upload Notes"}
        </ActionButton>
        {editingId ? (
          <ActionButton onPress={resetForm} variant="peach">
            Cancel Edit
          </ActionButton>
        ) : null}
      </DashboardCard>

      {successMessage ? (
        <DashboardCard style={styles.successCard}>
          <Text color={COLORS.success} variant="body">
            {successMessage}
          </Text>
        </DashboardCard>
      ) : null}

      <DashboardCard>
        <SectionHeader icon="folder" title="Uploaded Notes" />
        <View style={styles.noteList}>
          {notes.map((note) => (
            <View key={note.id} style={styles.noteCard}>
              <View style={styles.noteHeader}>
                <View style={styles.noteCopy}>
                  <Text variant="body">{note.title}</Text>
                  <Text color={COLORS.textSecondary} variant="caption">
                    {note.subject} · {note.className} · {note.fileType}
                  </Text>
                  <Text color={COLORS.textSecondary} variant="caption">
                    {note.uploadDate}
                  </Text>
                </View>
              </View>
              <Text color={COLORS.textSecondary} variant="caption">
                {note.description}
              </Text>
              <View style={styles.actionRow}>
                <ActionButton
                  onPress={() => setSuccessMessage(`Preview opened: ${note.fileName}`)}
                  variant="peach"
                >
                  View
                </ActionButton>
                <ActionButton onPress={() => editNote(note)} variant="peach">
                  Edit
                </ActionButton>
                <ActionButton
                  onPress={() => deleteNote(note.id)}
                  style={styles.deleteButton}
                  labelColor={COLORS.white}
                  variant="peach"
                >
                  Delete
                </ActionButton>
              </View>
            </View>
          ))}
        </View>
      </DashboardCard>
    </Screen>
  );
}

function Chip({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        dashboardStyles.chip,
        active ? dashboardStyles.chipActive : undefined,
        pressed ? dashboardStyles.pressed : undefined,
      ]}
    >
      <Text color={active ? COLORS.white : COLORS.textSecondary} variant="caption">
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
  },
  mockFile: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    gap: SPACING.sm,
    padding: SPACING.md,
  },
  noteCard: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
    padding: SPACING.md,
  },
  noteCopy: {
    flex: 1,
    gap: SPACING.xs,
  },
  noteHeader: {
    flexDirection: "row",
  },
  noteList: {
    gap: SPACING.sm,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  successCard: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
});

export default FacultyNotesScreen;

import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { ActionButton } from "@/src/components/dashboard";
import { Card, Screen, Text } from "@/src/components/ui";
import {
  mockPreviewNote,
  noteSubjects,
  studentNotesHub,
  type FacultyNoteMaterial,
} from "@/src/data/notesMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

export function StudentNotesScreen() {
  const [previewNote, setPreviewNote] = useState<FacultyNoteMaterial | null>(
    null,
  );
  const [downloadMessage, setDownloadMessage] = useState("");

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Notes Hub</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Access notes, PPTs, and study materials shared by faculty.
        </Text>
      </View>

      {previewNote ? (
        <Card style={styles.previewCard}>
          <View style={styles.noticeHeader}>
            <View style={styles.noticeCopy}>
              <Text variant="innerHeading">{mockPreviewNote.title}</Text>
              <Text color={COLORS.textSecondary} variant="caption">
                {previewNote.title}
              </Text>
            </View>
          </View>
          <Text color={COLORS.textSecondary} variant="body">
            {mockPreviewNote.body}
          </Text>
          <ActionButton onPress={() => setPreviewNote(null)} variant="peach">
            Close Preview
          </ActionButton>
        </Card>
      ) : null}

      {downloadMessage ? (
        <Card style={styles.successCard}>
          <Text color={COLORS.success} variant="body">
            {downloadMessage}
          </Text>
        </Card>
      ) : null}

      <View style={styles.section}>
        <Text variant="innerHeading">Subject Notes</Text>

        {noteSubjects.map((subject) => {
          const subjectNotes = studentNotesHub.filter(
            (note) => note.subject === subject,
          );

          return (
            <Card key={subject} style={styles.subjectGroup}>
              <Text variant="innerHeading">{subject}</Text>

              {subjectNotes.map((note) => (
                <View key={note.id} style={styles.noteCard}>
                  <View style={styles.noteHeader}>
                    <View style={styles.noteCopy}>
                      <Text variant="body">{note.title}</Text>
                      <Text color={COLORS.textSecondary} variant="caption">
                        {note.facultyName} · {note.uploadDate}
                      </Text>
                    </View>
                    <View style={styles.pagesPill}>
                      <Text color={COLORS.navy} style={styles.pagesText} variant="caption">
                        {note.fileType}
                      </Text>
                    </View>
                  </View>
                  <Text color={COLORS.textSecondary} variant="caption">
                    {note.description}
                  </Text>
                  <View style={styles.actionRow}>
                    <ActionButton
                      onPress={() => setPreviewNote(note)}
                      variant="peach"
                    >
                      View
                    </ActionButton>
                    <ActionButton
                      onPress={() =>
                        setDownloadMessage(`${note.fileName} ready to download`)
                      }
                      variant="peach"
                    >
                      Download
                    </ActionButton>
                  </View>
                </View>
              ))}
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
  },
  noteCard: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    gap: SPACING.xs,
    padding: SPACING.md,
  },
  noteCopy: {
    flex: 1,
    gap: SPACING.xs,
  },
  noteHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noticeCard: {
    backgroundColor: COLORS.accentBlue,
    gap: SPACING.sm,
  },
  noticeCopy: {
    flex: 1,
    gap: SPACING.xs,
  },
  noticeHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: SPACING.sm,
    justifyContent: "space-between",
  },
  pagesPill: {
    backgroundColor: COLORS.accentBlueMuted,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  pagesText: {
    fontFamily: FONT_FAMILY.semiBold,
  },
  previewCard: {
    backgroundColor: COLORS.primaryLight,
    gap: SPACING.md,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
  subjectGroup: {
    gap: SPACING.md,
  },
  successCard: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
});

export default StudentNotesScreen;

import { StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import { studentNotices, studentStudyNotes } from "@/src/data/studentMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

export function StudentNotesScreen() {
  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Notes</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Campus notices and subject-wise study materials.
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Notice Board</Text>

        {studentNotices.map((notice) => (
          <Card key={notice.title} style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <View style={styles.noticeCopy}>
                <Text variant="body">{notice.title}</Text>
                <Text color={COLORS.primary} variant="caption">
                  {notice.category}
                </Text>
              </View>
              <Text color={COLORS.textSecondary} variant="caption">
                {notice.time}
              </Text>
            </View>
            <Text color={COLORS.textSecondary} variant="body">
              {notice.body}
            </Text>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Study Notes</Text>

        {studentStudyNotes.map((note) => (
          <Card key={note.id} style={styles.noteCard}>
            <View style={styles.noteHeader}>
              <View style={styles.noteCopy}>
                <Text variant="body">{note.title}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {note.subject}
                </Text>
              </View>
              <View style={styles.pagesPill}>
                <Text color={COLORS.navy} style={styles.pagesText} variant="caption">
                  {note.pages} pg
                </Text>
              </View>
            </View>
            <Text color={COLORS.textSecondary} variant="caption">
              Updated {note.updated}
            </Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
  },
  noteCard: {
    gap: SPACING.xs,
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
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
});

export default StudentNotesScreen;

import { StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import {
  studentInternalMarks,
  studentPerformanceHighlights,
} from "@/src/data/studentMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

function gradeColor(grade: string) {
  if (grade === "A") {
    return COLORS.success;
  }

  if (grade === "B") {
    return COLORS.primary;
  }

  return COLORS.warning;
}

export function StudentInternalMarksScreen() {
  const { needsAttention, strongest } = studentPerformanceHighlights;

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Internal Marks</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Track internal assessments, assignments, and subject performance.
        </Text>
      </View>

      <View style={styles.highlightRow}>
        <Card style={[styles.highlightCard, styles.strongCard]}>
          <Text color={COLORS.textSecondary} variant="caption">
            Strongest Subject
          </Text>
          <Text variant="body">{strongest.subject}</Text>
          <Text color={COLORS.primary} variant="innerHeading">
            {strongest.score}
          </Text>
        </Card>

        <Card style={styles.highlightCard}>
          <Text color={COLORS.textSecondary} variant="caption">
            Needs Attention
          </Text>
          <Text variant="body">{needsAttention.subject}</Text>
          <Text color={COLORS.warning} variant="innerHeading">
            {needsAttention.score}
          </Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Subject Breakdown</Text>

        {studentInternalMarks.map((mark) => (
          <Card key={mark.subject} style={styles.markCard}>
            <View style={styles.markHeader}>
              <Text variant="body">{mark.subject}</Text>
              <View
                style={[
                  styles.gradePill,
                  { backgroundColor: `${gradeColor(mark.grade)}22` },
                ]}
              >
                <Text
                  color={gradeColor(mark.grade)}
                  style={styles.gradeText}
                  variant="caption"
                >
                  {mark.grade}
                </Text>
              </View>
            </View>

            <View style={styles.scoreGrid}>
              <View style={styles.scoreItem}>
                <Text color={COLORS.textSecondary} variant="caption">
                  IA 1
                </Text>
                <Text variant="body">{mark.ia1}</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text color={COLORS.textSecondary} variant="caption">
                  IA 2
                </Text>
                <Text variant="body">{mark.ia2}</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text color={COLORS.textSecondary} variant="caption">
                  Assignment
                </Text>
                <Text variant="body">{mark.assignment}</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text color={COLORS.textSecondary} variant="caption">
                  Total
                </Text>
                <Text color={COLORS.primary} variant="body">
                  {mark.total}
                </Text>
              </View>
            </View>
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
  gradePill: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  gradeText: {
    fontFamily: FONT_FAMILY.semiBold,
  },
  header: {
    gap: SPACING.xs,
  },
  highlightCard: {
    backgroundColor: COLORS.accentBlue,
    flex: 1,
    gap: SPACING.xs,
    minWidth: 140,
  },
  highlightRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  markCard: {
    gap: SPACING.md,
  },
  markHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreItem: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
  strongCard: {
    backgroundColor: COLORS.primaryLight,
  },
});

export default StudentInternalMarksScreen;

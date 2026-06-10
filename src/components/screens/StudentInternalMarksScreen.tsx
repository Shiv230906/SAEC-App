import { StyleSheet, View } from "react-native";

import { AttendanceProgressBar } from "@/src/components/attendance";
import { DashboardCard, SectionHeader } from "@/src/components/dashboard";
import { Card, Screen, Text } from "@/src/components/ui";
import {
  studentMarksSummary,
  studentMarksTimeline,
  studentSubjectMarks,
} from "@/src/data/marksMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

export function StudentInternalMarksScreen() {
  const { averageInternalScore, needsAttention, strongest } = studentMarksSummary;

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Internal Marks</Text>
        <Text color={COLORS.textSecondary} variant="body">
          View published internal marks, assessment history, and performance
          trends.
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

      <DashboardCard>
        <SectionHeader icon="analytics" title="Performance Summary" />
        <View style={styles.averageRow}>
          <Text color={COLORS.navy} style={styles.averageValue}>
            {averageInternalScore}%
          </Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Average Internal Score
          </Text>
        </View>
        <AttendanceProgressBar percentage={averageInternalScore} />
      </DashboardCard>

      <View style={styles.section}>
        <Text variant="innerHeading">Subject Cards</Text>

        {studentSubjectMarks.map((mark) => (
          <Card key={mark.subject} style={styles.markCard}>
            <View style={styles.markHeader}>
              <Text variant="body">{mark.subject}</Text>
              <View style={styles.gradePill}>
                <Text
                  color={COLORS.navy}
                  style={styles.gradeText}
                  variant="caption"
                >
                  Average {mark.average}/20
                </Text>
              </View>
            </View>

            <View style={styles.scoreGrid}>
              {mark.assessments.slice(0, 2).map((assessment) => (
                <View key={assessment.label} style={styles.scoreItem}>
                  <Text color={COLORS.textSecondary} variant="caption">
                    {assessment.label.replace("Internal Test ", "Internal ")}
                  </Text>
                  <Text variant="body">
                    {assessment.score}/{assessment.maxMark}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Marks Timeline</Text>
        {studentMarksTimeline.map((item) => (
          <Card key={item.id} style={styles.timelineCard}>
            <View style={styles.markHeader}>
              <View style={styles.timelineCopy}>
                <Text variant="body">{item.subject}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {item.label}
                </Text>
              </View>
              <Text color={COLORS.primary} variant="body">
                {item.score}/{item.maxMark}
              </Text>
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
  averageRow: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  averageValue: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 40,
    lineHeight: 48,
  },
  gradePill: {
    backgroundColor: COLORS.accentBlueMuted,
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
    gap: SPACING.md,
  },
  scoreItem: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flex: 1,
    gap: SPACING.xs,
    padding: SPACING.md,
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
  timelineCard: {
    gap: SPACING.xs,
  },
  timelineCopy: {
    flex: 1,
    gap: SPACING.xs,
  },
});

export default StudentInternalMarksScreen;

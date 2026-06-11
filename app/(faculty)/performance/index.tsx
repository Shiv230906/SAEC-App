import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

type StudentRecord = {
  id: string;
  name: string;
  scores: Record<string, number>;
  average: number;
};

type Subject = {
  code: string;
  name: string;
};

const SUBJECTS: Subject[] = [
  { code: "DBMS", name: "Database Management Systems" },
  { code: "OS", name: "Operating Systems" },
  { code: "CN", name: "Computer Networks" },
];

const STUDENTS: StudentRecord[] = [
  { id: "s1", name: "Rahul Sharma", scores: { DBMS: 96, OS: 88, CN: 82 }, average: 89 },
  { id: "s2", name: "Priya Nair", scores: { DBMS: 91, OS: 94, CN: 87 }, average: 91 },
  { id: "s3", name: "Meera Joshi", scores: { DBMS: 85, OS: 79, CN: 92 }, average: 85 },
  { id: "s4", name: "Arjun Patel", scores: { DBMS: 78, OS: 82, CN: 80 }, average: 80 },
  { id: "s5", name: "Sneha Reddy", scores: { DBMS: 88, OS: 76, CN: 84 }, average: 83 },
  { id: "s6", name: "Vikram Singh", scores: { DBMS: 62, OS: 58, CN: 45 }, average: 55 },
  { id: "s7", name: "Anita Rao", scores: { DBMS: 55, OS: 38, CN: 60 }, average: 51 },
  { id: "s8", name: "Kiran Kumar", scores: { DBMS: 42, OS: 50, CN: 55 }, average: 49 },
  { id: "s9", name: "Deepak Menon", scores: { DBMS: 74, OS: 70, CN: 68 }, average: 71 },
  { id: "s10", name: "Lakshmi Pillai", scores: { DBMS: 82, OS: 85, CN: 78 }, average: 82 },
];

function getScoreColor(score: number) {
  if (score >= 85) return COLORS.success;
  if (score >= 60) return COLORS.warning;
  return COLORS.error;
}

function getRankIcon(rank: number): string {
  if (rank === 1) return "emoji-events";
  if (rank <= 3) return "star";
  return "person";
}

export default function FacultyPerformance() {
  const [selectedSubject, setSelectedSubject] = useState<string>("DBMS");

  const sorted = [...STUDENTS].sort(
    (a, b) => (b.scores[selectedSubject] ?? 0) - (a.scores[selectedSubject] ?? 0),
  );

  const topFive = sorted.slice(0, 5);
  const bottomFive = sorted.slice(-5).reverse();
  const classAvg = Math.round(
    STUDENTS.reduce((sum, s) => sum + (s.scores[selectedSubject] ?? 0), 0) / STUDENTS.length,
  );

  return (
    <Screen scrollable contentContainerStyle={styles.container} style={styles.screen}>
      <View style={styles.header}>
        <Text variant="subHeading">Student Performance</Text>
        <Text color={COLORS.textSecondary} variant="body">
          View top and bottom performers by subject.
        </Text>
      </View>

      <View style={styles.chipRow}>
        {SUBJECTS.map((subj) => {
          const isActive = subj.code === selectedSubject;
          return (
            <Pressable
              key={subj.code}
              onPress={() => setSelectedSubject(subj.code)}
              style={[styles.chip, isActive ? styles.chipActive : undefined]}
            >
              <Text
                color={isActive ? COLORS.white : COLORS.textSecondary}
                style={isActive ? styles.chipTextActive : undefined}
                variant="caption"
              >
                {subj.code}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.avgRow}>
        <Card style={styles.avgCard}>
          <Text color={COLORS.textSecondary} variant="caption">
            Class Average
          </Text>
          <Text color={getScoreColor(classAvg)} variant="subHeading">
            {classAvg}%
          </Text>
        </Card>
        <Card style={styles.avgCard}>
          <Text color={COLORS.textSecondary} variant="caption">
            Highest Score
          </Text>
          <Text color={COLORS.success} variant="subHeading">
            {topFive[0]?.scores[selectedSubject]}%
          </Text>
        </Card>
        <Card style={styles.avgCard}>
          <Text color={COLORS.textSecondary} variant="caption">
            Lowest Score
          </Text>
          <Text color={COLORS.error} variant="subHeading">
            {bottomFive[0]?.scores[selectedSubject]}%
          </Text>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons color={COLORS.success} name="trending-up" size={20} />
          <Text variant="innerHeading">Top 5 Performers</Text>
        </View>
        {topFive.map((student, idx) => (
          <View key={student.id} style={styles.studentCard}>
            <View style={styles.rankBadge}>
              <MaterialIcons
                color={idx === 0 ? COLORS.warning : COLORS.primary}
                name={getRankIcon(idx + 1) as any}
                size={18}
              />
            </View>
            <View style={styles.studentInfo}>
              <Text variant="body">{student.name}</Text>
              <Text color={COLORS.textSecondary} variant="caption">
                Rank #{idx + 1}
              </Text>
            </View>
            <Text color={getScoreColor(student.scores[selectedSubject] ?? 0)} style={styles.scoreText}>
              {student.scores[selectedSubject]}%
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons color={COLORS.error} name="trending-down" size={20} />
          <Text variant="innerHeading">Bottom 5 — Needs Attention</Text>
        </View>
        {bottomFive.map((student, idx) => (
          <View key={student.id} style={styles.studentCard}>
            <View style={[styles.rankBadge, styles.rankBadgeWarn]}>
              <MaterialIcons color={COLORS.error} name="warning" size={18} />
            </View>
            <View style={styles.studentInfo}>
              <Text variant="body">{student.name}</Text>
              <Text color={COLORS.textSecondary} variant="caption">
                Rank #{sorted.indexOf(student) + 1}
              </Text>
            </View>
            <Text color={getScoreColor(student.scores[selectedSubject] ?? 0)} style={styles.scoreText}>
              {student.scores[selectedSubject]}%
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avgCard: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.xs,
    paddingVertical: SPACING.md,
  },
  avgRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  chip: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  chipRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  chipTextActive: {
    fontFamily: FONT_FAMILY.bold,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
  },
  rankBadge: {
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.pill,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  rankBadgeWarn: {
    backgroundColor: "#FEE2E2",
  },
  scoreText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 16,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  studentCard: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    gap: SPACING.md,
    padding: SPACING.md,
  },
  studentInfo: {
    flex: 1,
    gap: 2,
  },
});

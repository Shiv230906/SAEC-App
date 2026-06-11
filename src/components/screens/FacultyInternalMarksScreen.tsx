import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Screen, Text } from "@/src/components/ui";
import { getStudentsForSection } from "@/src/data/attendanceMockData";
import {
  assessmentTypes,
  buildMarksMap,
  calculateMarksAnalytics,
  facultyMarksSubjects,
  getRankedPerformers,
  type AssessmentType,
  type StudentMarkEntry,
} from "@/src/data/marksMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

type Step = "class" | "marks" | "subject";

function buildEntries(section: string, marks: Record<string, number>): StudentMarkEntry[] {
  return getStudentsForSection(section).map((student) => ({
    mark: marks[student.id] ?? 0,
    maxMark: 20,
    studentId: student.id,
    studentName: student.name,
  }));
}

export function FacultyInternalMarksScreen() {
  const [selectedSubject, setSelectedSubject] = useState(facultyMarksSubjects[0]);
  const [selectedClass, setSelectedClass] = useState(
    () => facultyMarksSubjects[0].classes[0],
  );
  const [selectedAssessment, setSelectedAssessment] =
    useState<AssessmentType>("Internal Test 1");
  const [step, setStep] = useState<Step>("subject");

  const students = useMemo(
    () => getStudentsForSection(selectedClass),
    [selectedClass],
  );

  const [marks, setMarks] = useState<Record<string, number>>(() =>
    buildMarksMap(getStudentsForSection(selectedClass)),
  );
  const [published, setPublished] = useState(false);

  const entries = useMemo(
    () => buildEntries(selectedClass, marks),
    [marks, selectedClass],
  );
  const analytics = calculateMarksAnalytics(entries);
  const performers = getRankedPerformers(entries);

  const selectSubject = (subject: typeof facultyMarksSubjects[number]) => {
    setSelectedSubject(subject);
    const firstClass = subject.classes[0];
    setSelectedClass(firstClass);
    setMarks(buildMarksMap(getStudentsForSection(firstClass)));
    setPublished(false);
    setStep("marks");
  };

  const selectClass = (className: string) => {
    setSelectedClass(className);
    setMarks(buildMarksMap(getStudentsForSection(className)));
    setPublished(false);
    setStep("marks");
  };

  const updateMark = (studentId: string, value: string) => {
    const numericValue = Number(value.replace(/[^0-9]/g, ""));
    const nextMark = Math.min(20, Math.max(0, Number.isNaN(numericValue) ? 0 : numericValue));

    setMarks((current) => ({
      ...current,
      [studentId]: nextMark,
    }));
    setPublished(false);
  };

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Internal Marks</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Select a subject, choose a class, enter corrected marks, and publish
          them locally.
        </Text>
      </View>

      <DashboardCard>
        <SectionHeader icon="menu-book" title="Subjects Handled" />
        <View style={dashboardStyles.chipRow}>
          {facultyMarksSubjects.map((subject) => {
            const isActive = subject.subject === selectedSubject.subject;

            return (
              <Pressable
                key={subject.subject}
                accessibilityRole="button"
                onPress={() => selectSubject(subject)}
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
                  {subject.subject}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </DashboardCard>

      <DashboardCard>
        <SectionHeader icon="groups" title={`${selectedSubject.subject} Classes`} />
        <View style={dashboardStyles.chipRow}>
          {selectedSubject.classes.map((className) => {
            const isActive = className === selectedClass;

            return (
              <Pressable
                key={className}
                accessibilityRole="button"
                onPress={() => selectClass(className)}
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
                  {className}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </DashboardCard>

      {step !== "subject" ? (
        <>
          <DashboardCard>
            <SectionHeader icon="fact-check" title="Assessment" />
            <View style={dashboardStyles.chipRow}>
              {assessmentTypes.map((assessment) => {
                const isActive = assessment === selectedAssessment;

                return (
                  <Pressable
                    key={assessment}
                    accessibilityRole="button"
                    onPress={() => setSelectedAssessment(assessment)}
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
                      {assessment}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </DashboardCard>

          <DashboardCard>
            <SectionHeader
              icon="edit-note"
              title={`${selectedSubject.subject} - ${selectedClass}`}
            />
            <Text color={COLORS.textSecondary} variant="caption">
              {selectedAssessment} · Max 20 marks
            </Text>

            <View style={styles.markList}>
              {students.map((student) => (
                <View key={student.id} style={styles.markRow}>
                  <View style={styles.studentCopy}>
                    <Text variant="body">{student.name}</Text>
                    <Text color={COLORS.textSecondary} variant="caption">
                      {student.rollNo}
                    </Text>
                  </View>
                  <TextInput
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={(value) => updateMark(student.id, value)}
                    style={styles.markInput}
                    value={String(marks[student.id] ?? 0)}
                  />
                </View>
              ))}
            </View>

            <ActionButton onPress={() => setPublished(true)} variant="navy">
              Save Marks
            </ActionButton>
          </DashboardCard>

          {published ? (
            <>
              <DashboardCard style={styles.successCard}>
                <View style={styles.successHeader}>
                  <MaterialIcons
                    color={COLORS.success}
                    name="check-circle"
                    size={24}
                  />
                  <Text variant="innerHeading">
                    Marks Published Successfully
                  </Text>
                </View>
              </DashboardCard>

              <DashboardCard>
                <SectionHeader icon="analytics" title="Marks Analytics" />
                <View style={dashboardStyles.statsRow}>
                  <View style={dashboardStyles.statItem}>
                    <Text color={COLORS.success} variant="innerHeading">
                      {analytics.highest}
                    </Text>
                    <Text color={COLORS.textSecondary} variant="caption">
                      Highest
                    </Text>
                  </View>
                  <View style={dashboardStyles.statItem}>
                    <Text color={COLORS.primary} variant="innerHeading">
                      {analytics.average}
                    </Text>
                    <Text color={COLORS.textSecondary} variant="caption">
                      Average
                    </Text>
                  </View>
                  <View style={dashboardStyles.statItem}>
                    <Text color={COLORS.error} variant="innerHeading">
                      {analytics.lowest}
                    </Text>
                    <Text color={COLORS.textSecondary} variant="caption">
                      Lowest
                    </Text>
                  </View>
                </View>
              </DashboardCard>

              <DashboardCard>
                <SectionHeader icon="leaderboard" title="Top Performers" />
                {performers.top.map((student) => (
                  <View key={student.studentId} style={styles.performerRow}>
                    <Text style={styles.performerName} variant="body">
                      {student.studentName}
                    </Text>
                    <Text color={COLORS.success} variant="body">
                      {student.mark}/20
                    </Text>
                  </View>
                ))}
              </DashboardCard>

              <DashboardCard>
                <SectionHeader icon="priority-high" title="Needs Attention" />
                {performers.bottom.map((student) => (
                  <View key={student.studentId} style={styles.performerRow}>
                    <Text style={styles.performerName} variant="body">
                      {student.studentName}
                    </Text>
                    <Text color={COLORS.error} variant="body">
                      {student.mark}/20
                    </Text>
                  </View>
                ))}
              </DashboardCard>
            </>
          ) : null}
        </>
      ) : null}
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
  markInput: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.semiBold,
    minHeight: 44,
    paddingHorizontal: SPACING.md,
    textAlign: "center",
    width: 72,
  },
  markList: {
    gap: SPACING.sm,
  },
  markRow: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    gap: SPACING.md,
    padding: SPACING.md,
  },
  performerName: {
    flex: 1,
  },
  performerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  studentCopy: {
    flex: 1,
    gap: 2,
  },
  successCard: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
  successHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },
});

export default FacultyInternalMarksScreen;

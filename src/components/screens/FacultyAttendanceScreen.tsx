import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { StudentAttendanceRow } from "@/src/components/attendance";
import {
  ActionButton,
  DashboardCard,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Screen, Text } from "@/src/components/ui";
import {
  facultyCurrentClass,
  formatAttendanceDate,
  getStudentsForSection,
  type AttendanceStatus,
  type SectionStudent,
} from "@/src/data/attendanceMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

type AttendanceMap = Record<string, AttendanceStatus>;

function buildInitialAttendance(students: SectionStudent[]): AttendanceMap {
  return Object.fromEntries(
    students.map((student) => [student.id, "present" as AttendanceStatus]),
  );
}

function AttendanceSummary({
  absent,
  percentage,
  present,
}: {
  absent: number;
  percentage: number;
  present: number;
}) {
  return (
    <DashboardCard>
      <View style={styles.successHeader}>
        <MaterialIcons color={COLORS.success} name="check-circle" size={32} />
        <Text variant="innerHeading">Attendance Submitted Successfully</Text>
      </View>

      <View style={dashboardStyles.statsRow}>
        <View style={dashboardStyles.statItem}>
          <Text color={COLORS.success} variant="innerHeading">
            {present}
          </Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Present
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text color={COLORS.error} variant="innerHeading">
            {absent}
          </Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Absent
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text color={COLORS.primary} variant="innerHeading">
            {percentage}%
          </Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Attendance
          </Text>
        </View>
      </View>
    </DashboardCard>
  );
}

export function FacultyAttendanceScreen() {
  const currentClass = facultyCurrentClass;
  const students = useMemo(
    () => getStudentsForSection(currentClass.section),
    [currentClass.section],
  );

  const [attendance, setAttendance] = useState<AttendanceMap>(() =>
    buildInitialAttendance(students),
  );
  const [submitted, setSubmitted] = useState(false);

  const presentCount = Object.values(attendance).filter(
    (status) => status === "present",
  ).length;
  const absentCount = students.length - presentCount;
  const percentage = Math.round((presentCount / students.length) * 100);

  const toggleStudent = (studentId: string) => {
    setAttendance((current) => ({
      ...current,
      [studentId]:
        current[studentId] === "present" ? "absent" : "present",
    }));
  };

  const handleSave = () => {
    setSubmitted(true);
  };

  const handleMarkAnother = () => {
    setAttendance(buildInitialAttendance(students));
    setSubmitted(false);
  };

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Take Attendance</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Mark absentees only. All students default to present.
        </Text>
      </View>

      <View style={styles.classCard}>
        <View style={styles.classTop}>
          <View style={styles.subjectBadge}>
            <MaterialIcons color={COLORS.white} name="class" size={22} />
          </View>
          <View style={styles.classInfo}>
            <Text color={COLORS.white} style={styles.classSubject}>
              {currentClass.subject}
            </Text>
            <Text color={COLORS.accentBlueMuted} style={styles.sectionText}>
              {currentClass.section}
            </Text>
          </View>
        </View>

        <View style={styles.metaDivider} />

        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <MaterialIcons color={COLORS.primary} name="event" size={18} />
            <Text color={COLORS.white} variant="caption">
              {formatAttendanceDate()}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons color={COLORS.primary} name="schedule" size={18} />
            <Text color={COLORS.white} variant="caption">
              {currentClass.startTime} – {currentClass.endTime}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons color={COLORS.primary} name="meeting-room" size={18} />
            <Text color={COLORS.white} variant="caption">
              Room {currentClass.room}
            </Text>
          </View>
        </View>
      </View>

      {submitted ? (
        <>
          <AttendanceSummary
            absent={absentCount}
            percentage={percentage}
            present={presentCount}
          />
          <ActionButton onPress={handleMarkAnother} variant="peach">
            Mark Another Class
          </ActionButton>
        </>
      ) : (
        <>
          <View style={styles.listHeader}>
            <Text variant="innerHeading">Students</Text>
            <Text color={COLORS.textSecondary} variant="caption">
              {students.length} enrolled
            </Text>
          </View>

          <View style={styles.studentList}>
            {students.map((student) => (
              <StudentAttendanceRow
                key={student.id}
                name={student.name}
                onToggle={() => toggleStudent(student.id)}
                rollNo={student.rollNo}
                status={attendance[student.id] ?? "present"}
              />
            ))}
          </View>

          <View style={styles.summaryBar}>
            <Text color={COLORS.textSecondary} variant="caption">
              Present: {presentCount} · Absent: {absentCount}
            </Text>
          </View>

          <ActionButton onPress={handleSave} variant="navy">
            Save Attendance
          </ActionButton>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  classCard: {
    backgroundColor: COLORS.navyDark,
    borderColor: COLORS.navy,
    borderRadius: 20,
    borderWidth: 1,
    gap: SPACING.md,
    padding: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  classInfo: {
    flex: 1,
    gap: SPACING.xs,
  },
  classSubject: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 22,
    letterSpacing: 0.3,
    lineHeight: 28,
  },
  classTop: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.md,
  },
  metaDivider: {
    backgroundColor: "rgba(255,255,255,0.12)",
    height: 1,
  },
  metaGrid: {
    gap: SPACING.sm,
  },
  metaItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },
  sectionText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 14,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  subjectBadge: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
  },
  listHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  studentList: {
    gap: SPACING.sm,
  },
  successHeader: {
    alignItems: "center",
    gap: SPACING.sm,
  },
  summaryBar: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
  },
});

export default FacultyAttendanceScreen;

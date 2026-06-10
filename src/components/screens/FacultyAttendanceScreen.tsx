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
        <Text color={COLORS.white} style={styles.classSubject}>
          {currentClass.subject}
        </Text>
        <Text color={COLORS.white} variant="body">
          {currentClass.section}
        </Text>
        <View style={styles.metaRow}>
          <MaterialIcons color={COLORS.white} name="event" size={16} />
          <Text color={COLORS.white} variant="caption">
            {formatAttendanceDate()}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <MaterialIcons color={COLORS.white} name="schedule" size={16} />
          <Text color={COLORS.white} variant="caption">
            {currentClass.startTime} - {currentClass.endTime}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <MaterialIcons color={COLORS.white} name="meeting-room" size={16} />
          <Text color={COLORS.white} variant="caption">
            Room {currentClass.room}
          </Text>
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
    borderRadius: 20,
    boxShadow: `0 4px 12px ${COLORS.shadow}`,
    gap: SPACING.xs,
    padding: SPACING.lg,
  },
  classSubject: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 22,
    lineHeight: 30,
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
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.xs,
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

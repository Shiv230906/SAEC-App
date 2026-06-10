import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import { studentTodayClassAttendance } from "@/src/data/attendanceMockData";
import { studentMarksSummary } from "@/src/data/marksMockData";
import { recentlyUploadedNotes } from "@/src/data/notesMockData";
import {
  getAssignmentDotColor,
  studentAssignments,
  studentAttendanceSummary,
  studentEvents,
  studentNotices,
  studentTimetableToday,
} from "@/src/data/studentMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

type SectionHeaderProps = {
  action?: ReactNode;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
};

function SectionHeader({ action, icon, title }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text variant="innerHeading">{title}</Text>
      {action ?? (
        <MaterialIcons color={COLORS.primary} name={icon} size={22} />
      )}
    </View>
  );
}

type DashboardCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

function DashboardCard({ children, style }: DashboardCardProps) {
  return <Card style={[styles.dashboardCard, style]}>{children}</Card>;
}

function CurrentClassCard() {
  const currentClass = studentTodayClassAttendance;
  const timeRange = `${currentClass.startTime} - ${currentClass.endTime}`;
  const isPresent = currentClass.status === "present";

  return (
    <View style={styles.currentClassCard}>
      <View style={styles.currentClassTop}>
        <View style={styles.onAirBadge}>
          <Text color={COLORS.white} style={styles.onAirText}>
            ON AIR NOW
          </Text>
        </View>

        <View style={styles.roomBadge}>
          <MaterialIcons color={COLORS.white} name="meeting-room" size={14} />
          <Text color={COLORS.white} style={styles.roomText}>
            {currentClass.room}
          </Text>
        </View>
      </View>

      <Text color={COLORS.white} style={styles.currentClassTitle}>
        {currentClass.subject}
      </Text>

      <View style={styles.currentClassFooter}>
        <View style={styles.metaRow}>
          <MaterialIcons color={COLORS.white} name="schedule" size={16} />
          <Text color={COLORS.white} style={styles.timeText}>
            {timeRange}
          </Text>
        </View>

        <View style={styles.presentStatus}>
          <View
            style={[
              styles.presentIcon,
              !isPresent ? styles.absentIcon : undefined,
            ]}
          >
            <MaterialIcons
              color={COLORS.white}
              name={isPresent ? "check" : "close"}
              size={12}
            />
          </View>
          <Text
            color={isPresent ? COLORS.success : COLORS.error}
            style={styles.presentLabel}
          >
            Attendance: {isPresent ? "Present" : "Absent"}
          </Text>
        </View>
      </View>
    </View>
  );
}

function TimetableSection() {
  return (
    <DashboardCard>
      <SectionHeader icon="calendar-today" title="Timetable" />

      <View style={styles.list}>
        {studentTimetableToday.map((entry) => (
          <View key={entry.label} style={styles.listRow}>
            <Text
              style={entry.italic ? styles.italicLabel : undefined}
              variant="body"
            >
              {entry.label}
            </Text>
            <Text color={COLORS.textSecondary} variant="body">
              {entry.time}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/(student)/timetable")}
        style={({ pressed }) => [
          styles.peachButton,
          pressed ? styles.pressed : undefined,
        ]}
      >
        <Text color={COLORS.linkAccent} style={styles.buttonLabel}>
          View Full Timetable
        </Text>
      </Pressable>
    </DashboardCard>
  );
}

const performanceMetrics = [
  {
    accent: COLORS.primary,
    label: "Strongest Subject",
    score: studentMarksSummary.strongest.score,
    subject: studentMarksSummary.strongest.subject,
  },
  {
    accent: COLORS.gray300,
    label: "Needs Attention",
    score: studentMarksSummary.needsAttention.score,
    subject: studentMarksSummary.needsAttention.subject,
  },
];

function PerformanceSection() {
  return (
    <DashboardCard>
      <SectionHeader icon="show-chart" title="Performance" />

      <View style={styles.metricList}>
        {performanceMetrics.map((metric) => (
          <View key={metric.label} style={styles.metricCard}>
            <View
              style={[styles.metricAccent, { backgroundColor: metric.accent }]}
            />
            <View style={styles.metricCopy}>
              <Text color={COLORS.textSecondary} variant="caption">
                {metric.label}
              </Text>
              <View style={styles.metricRow}>
                <Text variant="body">{metric.subject}</Text>
                <Text color={COLORS.primary} variant="body">
                  {metric.score}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/(student)/internal-marks")}
        style={({ pressed }) => [
          styles.blueButton,
          pressed ? styles.pressed : undefined,
        ]}
      >
        <Text color={COLORS.navy} style={styles.buttonLabel}>
          Detailed Analysis
        </Text>
      </Pressable>
    </DashboardCard>
  );
}

function AttendanceSection() {
  const { absent, percentage, present, total } = studentAttendanceSummary;

  return (
    <DashboardCard>
      <View style={styles.sectionHeader}>
        <Text variant="innerHeading">Attendance Overview</Text>
        <View style={styles.percentPill}>
          <Text color={COLORS.white} style={styles.percentText}>
            {percentage}%
          </Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[styles.progressFill, { width: `${percentage}%` }]}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text variant="innerHeading">{present}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Present
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="innerHeading">{absent}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Absent
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="innerHeading">{total}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Total
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/(student)/attendance")}
        style={({ pressed }) => [
          styles.peachButton,
          pressed ? styles.pressed : undefined,
        ]}
      >
        <Text color={COLORS.linkAccent} style={styles.buttonLabel}>
          View Subject Wise
        </Text>
      </Pressable>
    </DashboardCard>
  );
}

function RecentMarksSection() {
  const recentMark = studentMarksSummary.recentPublished;

  return (
    <DashboardCard>
      <SectionHeader icon="grade" title="New Marks Published" />

      <View style={styles.noticeItem}>
        <View style={styles.noticeHeader}>
          <Text variant="body">
            {recentMark.subject} {recentMark.assessment}
          </Text>
          <Text color={COLORS.primary} variant="body">
            {recentMark.score}
          </Text>
        </View>
        <Text color={COLORS.textSecondary} variant="caption">
          Published by faculty
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/(student)/internal-marks")}
        style={({ pressed }) => [
          styles.peachButton,
          pressed ? styles.pressed : undefined,
        ]}
      >
        <Text color={COLORS.linkAccent} style={styles.buttonLabel}>
          View Marks
        </Text>
      </Pressable>
    </DashboardCard>
  );
}

function NewNotesSection() {
  return (
    <DashboardCard>
      <SectionHeader icon="description" title="New Notes Available" />

      <View style={styles.noticeList}>
        {recentlyUploadedNotes.map((note) => (
          <View key={note.id} style={styles.noticeItem}>
            <View style={styles.noticeHeader}>
              <Text variant="body">{note.title}</Text>
              <Text color={COLORS.textSecondary} variant="caption">
                {note.uploaded}
              </Text>
            </View>
            <Text color={COLORS.textSecondary} variant="caption">
              {note.subject}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/(student)/notes")}
        style={({ pressed }) => [
          styles.peachButton,
          pressed ? styles.pressed : undefined,
        ]}
      >
        <Text color={COLORS.linkAccent} style={styles.buttonLabel}>
          Open Notes Hub
        </Text>
      </Pressable>
    </DashboardCard>
  );
}

function AssignmentsSection() {
  const assignments = studentAssignments
    .filter((item) => item.status === "pending")
    .slice(0, 2);

  return (
    <DashboardCard>
      <SectionHeader icon="assignment" title="Assignments" />

      <View style={styles.list}>
        {assignments.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            onPress={() => router.push("/(student)/assignments")}
            style={({ pressed }) => [
              styles.assignmentRow,
              pressed ? styles.pressed : undefined,
            ]}
          >
            <View style={styles.assignmentCopy}>
              <Text variant="body">{item.title}</Text>
              <View style={styles.dueRow}>
                <View
                  style={[
                    styles.dueDot,
                    { backgroundColor: getAssignmentDotColor(item.priority) },
                  ]}
                />
                <Text color={COLORS.textSecondary} variant="caption">
                  {item.dueLabel}
                </Text>
              </View>
            </View>
            <MaterialIcons
              color={COLORS.gray500}
              name="chevron-right"
              size={22}
            />
          </Pressable>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/(student)/assignments")}
        style={({ pressed }) => [pressed ? styles.pressed : undefined]}
      >
        <Text
          color={COLORS.linkAccent}
          style={styles.linkLabel}
          variant="body"
        >
          View All Assignments
        </Text>
      </Pressable>
    </DashboardCard>
  );
}

function NoticeBoardSection() {
  const notices = studentNotices.slice(0, 2);

  return (
    <DashboardCard>
      <SectionHeader icon="campaign" title="Notice Board" />

      <View style={styles.noticeList}>
        {notices.map((notice) => (
          <View key={notice.title} style={styles.noticeItem}>
            <View style={styles.noticeHeader}>
              <Text variant="body">{notice.title}</Text>
              <Text color={COLORS.textSecondary} variant="caption">
                {notice.time}
              </Text>
            </View>
            <Text color={COLORS.textSecondary} variant="caption">
              {notice.body}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/(student)/notes")}
        style={({ pressed }) => [pressed ? styles.pressed : undefined]}
      >
        <Text color={COLORS.linkAccent} style={styles.linkLabel} variant="body">
          View All Notices
        </Text>
      </Pressable>
    </DashboardCard>
  );
}

const dashboardEventIcons = ["rocket-launch", "lightbulb"] as const;
const dashboardEventBackgrounds = [COLORS.primaryLight, COLORS.accentBlue];

function UpcomingEventsSection() {
  const upcomingEvents = studentEvents
    .filter((event) => event.shortDate)
    .slice(0, 2);

  return (
    <View style={styles.eventsSection}>
      <Text variant="innerHeading">Upcoming Events</Text>

      <ScrollView
        contentContainerStyle={styles.eventsScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {upcomingEvents.map((event, index) => (
          <Pressable
            key={event.title}
            accessibilityRole="button"
            onPress={() => router.push("/(student)/events")}
            style={({ pressed }) => [
              styles.eventCard,
              {
                backgroundColor:
                  dashboardEventBackgrounds[index] ?? COLORS.primaryLight,
              },
              pressed ? styles.pressed : undefined,
            ]}
          >
            <MaterialIcons
              color={COLORS.primary}
              name={dashboardEventIcons[index] ?? "event"}
              size={24}
            />
            <Text variant="body">{event.title}</Text>
            <Text color={COLORS.textSecondary} variant="caption">
              {event.shortDate}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

export function StudentDashboardScreen() {
  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <CurrentClassCard />
      <TimetableSection />
      <PerformanceSection />
      <AttendanceSection />
      <RecentMarksSection />
      <NewNotesSection />
      <AssignmentsSection />
      <NoticeBoardSection />
      <UpcomingEventsSection />
    </Screen>
  );
}

const styles = StyleSheet.create({
  assignmentCopy: {
    flex: 1,
    gap: SPACING.xs,
  },
  assignmentRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  blueButton: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm + 2,
  },
  buttonLabel: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 14,
  },
  container: {
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  currentClassCard: {
    backgroundColor: COLORS.navyDark,
    borderRadius: 20,
    boxShadow: `0 4px 12px ${COLORS.shadow}`,
    gap: SPACING.md,
    padding: 20,
  },
  currentClassFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currentClassTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 22,
    lineHeight: 30,
  },
  currentClassTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  onAirBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs + 2,
  },
  onAirText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 11,
    letterSpacing: 0.6,
  },
  absentIcon: {
    backgroundColor: COLORS.error,
  },
  presentIcon: {
    alignItems: "center",
    backgroundColor: COLORS.success,
    borderRadius: RADIUS.pill,
    height: 18,
    justifyContent: "center",
    width: 18,
  },
  presentLabel: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 13,
  },
  presentStatus: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.xs,
  },
  roomBadge: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderRadius: RADIUS.pill,
    flexDirection: "row",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs + 2,
  },
  roomText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 12,
  },
  timeText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 13,
  },
  dashboardCard: {
    gap: SPACING.md,
  },
  dueDot: {
    borderRadius: RADIUS.pill,
    height: 8,
    width: 8,
  },
  dueRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.xs,
  },
  eventCard: {
    borderRadius: RADIUS.lg,
    gap: SPACING.xs,
    minWidth: 140,
    padding: SPACING.md,
  },
  eventsScroll: {
    gap: SPACING.sm,
    paddingRight: SPACING.md,
  },
  eventsSection: {
    gap: SPACING.md,
  },
  italicLabel: {
    fontStyle: "italic",
  },
  linkLabel: {
    fontFamily: FONT_FAMILY.semiBold,
    textAlign: "center",
  },
  list: {
    gap: SPACING.sm,
  },
  listRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.xs,
  },
  metricAccent: {
    borderRadius: RADIUS.pill,
    width: 4,
  },
  metricCard: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    overflow: "hidden",
  },
  metricCopy: {
    flex: 1,
    gap: SPACING.xs,
    padding: SPACING.md,
  },
  metricList: {
    gap: SPACING.sm,
  },
  metricRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noticeHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noticeItem: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    gap: SPACING.xs,
    padding: SPACING.md,
  },
  noticeList: {
    gap: SPACING.sm,
  },
  peachButton: {
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm + 2,
  },
  percentPill: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
  },
  percentText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 12,
  },
  pressed: {
    opacity: 0.76,
  },
  progressFill: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    height: "100%",
  },
  progressTrack: {
    backgroundColor: COLORS.accentBlueMuted,
    borderRadius: RADIUS.pill,
    height: 10,
    overflow: "hidden",
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.xs,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default StudentDashboardScreen;

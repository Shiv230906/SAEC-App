import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

type Notice = {
  id: string;
  title: string;
  body: string;
  date: string;
  category: "academic" | "exam" | "general" | "event";
  important: boolean;
};

const NOTICES: Notice[] = [
  {
    id: "n1",
    title: "Mid-Semester Exam Schedule Released",
    body: "The mid-semester examination schedule for all departments has been published. Please check the exam portal for your respective timetable.",
    date: "10 Jun 2026",
    category: "exam",
    important: true,
  },
  {
    id: "n2",
    title: "Library Timing Change",
    body: "Effective from 15th June, the central library will remain open from 8:00 AM to 9:00 PM on all working days.",
    date: "09 Jun 2026",
    category: "general",
    important: false,
  },
  {
    id: "n3",
    title: "Workshop on Cloud Computing",
    body: "A two-day workshop on AWS and Cloud Architecture will be held on 20-21 June in the CSE seminar hall. Register via the events portal.",
    date: "08 Jun 2026",
    category: "event",
    important: false,
  },
  {
    id: "n4",
    title: "Assignment Submission Deadline Extended",
    body: "The deadline for DBMS Assignment 3 has been extended to 18th June. Late submissions will not be accepted after this date.",
    date: "07 Jun 2026",
    category: "academic",
    important: true,
  },
  {
    id: "n5",
    title: "Sports Day Registration Open",
    body: "Annual Sports Day is scheduled for 25th June. Students can register for events at the Physical Education department.",
    date: "06 Jun 2026",
    category: "event",
    important: false,
  },
  {
    id: "n6",
    title: "Placement Drive – Infosys",
    body: "Infosys campus placement drive for CSE and IT students on 28th June. Eligible students must register on the placement portal by 20th June.",
    date: "05 Jun 2026",
    category: "academic",
    important: true,
  },
];

const CATEGORY_CONFIG: Record<Notice["category"], { icon: string; color: string; label: string }> = {
  academic: { icon: "school", color: COLORS.primary, label: "Academic" },
  exam: { icon: "assignment", color: COLORS.error, label: "Exam" },
  general: { icon: "info", color: COLORS.navy, label: "General" },
  event: { icon: "event", color: COLORS.success, label: "Event" },
};

export default function StudentNotices() {
  return (
    <Screen scrollable contentContainerStyle={styles.container} style={styles.screen}>
      <View style={styles.header}>
        <Text variant="subHeading">Notice Board</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Important announcements and updates from the college.
        </Text>
      </View>

      <View style={styles.list}>
        {NOTICES.map((notice) => {
          const config = CATEGORY_CONFIG[notice.category];

          return (
            <Card key={notice.id} style={styles.noticeCard}>
              <View style={styles.noticeTop}>
                <View style={[styles.categoryBadge, { backgroundColor: config.color + "18" }]}>
                  <MaterialIcons color={config.color} name={config.icon as any} size={16} />
                  <Text color={config.color} variant="caption">
                    {config.label}
                  </Text>
                </View>
                {notice.important ? (
                  <View style={styles.importantBadge}>
                    <MaterialIcons color={COLORS.error} name="priority-high" size={14} />
                    <Text color={COLORS.error} variant="caption">
                      Important
                    </Text>
                  </View>
                ) : null}
              </View>

              <Text variant="body" style={styles.noticeTitle}>
                {notice.title}
              </Text>

              <Text color={COLORS.textSecondary} variant="caption">
                {notice.body}
              </Text>

              <Text color={COLORS.footerText} variant="caption" style={styles.dateText}>
                {notice.date}
              </Text>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  categoryBadge: {
    alignItems: "center",
    borderRadius: RADIUS.pill,
    flexDirection: "row",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  dateText: {
    fontFamily: FONT_FAMILY.regular,
  },
  header: {
    gap: SPACING.xs,
  },
  importantBadge: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
  list: {
    gap: SPACING.md,
  },
  noticeCard: {
    gap: SPACING.sm,
  },
  noticeTitle: {
    fontFamily: FONT_FAMILY.semiBold,
  },
  noticeTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
});

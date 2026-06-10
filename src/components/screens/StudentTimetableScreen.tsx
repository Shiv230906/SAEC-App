import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import {
  studentTimetableToday,
  studentWeeklyTimetable,
} from "@/src/data/studentMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

const todayLabel = "Wednesday";

export function StudentTimetableScreen() {
  const [selectedDay, setSelectedDay] = useState(todayLabel);

  const selectedSchedule =
    studentWeeklyTimetable.find((day) => day.day === selectedDay) ??
    studentWeeklyTimetable[0];

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Timetable</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Your weekly class schedule and today&apos;s sessions.
        </Text>
      </View>

      <Card style={styles.todayCard}>
        <Text color={COLORS.primary} variant="caption">
          TODAY
        </Text>
        <Text variant="innerHeading">{todayLabel}</Text>

        <View style={styles.list}>
          {studentTimetableToday.map((entry) => (
            <View key={`${entry.label}-${entry.time}`} style={styles.listRow}>
              <View style={styles.entryCopy}>
                <Text
                  style={entry.italic ? styles.italicLabel : undefined}
                  variant="body"
                >
                  {entry.label}
                </Text>
                {entry.room ? (
                  <Text color={COLORS.textSecondary} variant="caption">
                    {entry.room}
                  </Text>
                ) : null}
              </View>
              <Text color={COLORS.textSecondary} variant="body">
                {entry.time}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={styles.section}>
        <Text variant="innerHeading">Weekly Schedule</Text>

        <View style={styles.dayTabs}>
          {studentWeeklyTimetable.map((day) => {
            const isActive = day.day === selectedDay;

            return (
              <Pressable
                key={day.day}
                accessibilityRole="button"
                onPress={() => setSelectedDay(day.day)}
                style={[
                  styles.dayTab,
                  isActive ? styles.dayTabActive : undefined,
                ]}
              >
                <Text
                  color={isActive ? COLORS.white : COLORS.textSecondary}
                  style={styles.dayTabLabel}
                  variant="caption"
                >
                  {day.day.slice(0, 3)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Card style={styles.scheduleCard}>
          <Text variant="body">{selectedDay}</Text>

          <View style={styles.list}>
            {selectedSchedule.entries.map((entry) => (
              <View
                key={`${entry.label}-${entry.time}`}
                style={styles.listRow}
              >
                <View style={styles.entryCopy}>
                  <Text
                    style={entry.italic ? styles.italicLabel : undefined}
                    variant="body"
                  >
                    {entry.label}
                  </Text>
                  {entry.room ? (
                    <Text color={COLORS.textSecondary} variant="caption">
                      {entry.room}
                    </Text>
                  ) : null}
                </View>
                <Text color={COLORS.textSecondary} variant="body">
                  {entry.time}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  dayTab: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.pill,
    minWidth: 52,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  dayTabActive: {
    backgroundColor: COLORS.primary,
  },
  dayTabLabel: {
    fontFamily: FONT_FAMILY.semiBold,
  },
  dayTabs: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  entryCopy: {
    flex: 1,
    gap: 2,
  },
  header: {
    gap: SPACING.xs,
  },
  italicLabel: {
    fontStyle: "italic",
  },
  list: {
    gap: SPACING.sm,
  },
  listRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scheduleCard: {
    gap: SPACING.md,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
  todayCard: {
    backgroundColor: COLORS.primaryLight,
    gap: SPACING.md,
  },
});

export default StudentTimetableScreen;

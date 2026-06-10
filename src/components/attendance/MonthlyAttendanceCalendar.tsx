import { StyleSheet, View } from "react-native";

import { DashboardCard } from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import {
  getAttendanceStatusColor,
  type MonthlyAttendanceDay,
} from "@/src/data/attendanceMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

type MonthlyAttendanceCalendarProps = {
  days: MonthlyAttendanceDay[];
  month?: string;
  year?: number;
  monthIndex?: number;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TOTAL_COLS = 7;

export function MonthlyAttendanceCalendar({
  days,
  month = "June 2026",
  year = 2026,
  monthIndex = 5,
}: MonthlyAttendanceCalendarProps) {
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const presentCount = days.filter((d) => d.status === "present").length;
  const absentCount = days.filter((d) => d.status === "absent").length;
  const holidayCount = days.filter((d) => d.status === "holiday").length;

  const calendarCells: (MonthlyAttendanceDay | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const found = days.find((item) => item.date === d);
    calendarCells.push(found ?? { date: d, status: null });
  }

  const remainder = calendarCells.length % TOTAL_COLS;
  if (remainder > 0) {
    for (let i = 0; i < TOTAL_COLS - remainder; i++) {
      calendarCells.push(null);
    }
  }

  return (
    <DashboardCard style={styles.card}>
      <Text variant="innerHeading">{month}</Text>

      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((wd) => (
          <View key={wd} style={styles.weekdayCell}>
            <Text color={COLORS.textSecondary} style={styles.weekdayText} variant="caption">
              {wd}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {calendarCells.map((cell, index) => {
          if (!cell) {
            return <View key={`empty-${index}`} style={styles.dayCell} />;
          }

          const bgColor = cell.status
            ? getAttendanceStatusColor(cell.status)
            : COLORS.accentBlue;
          const textColor = cell.status ? COLORS.white : COLORS.textSecondary;

          return (
            <View key={`day-${cell.date}`} style={styles.dayCell}>
              <View style={[styles.dayCircle, { backgroundColor: bgColor }]}>
                <Text color={textColor} style={styles.dayText} variant="caption">
                  {cell.date}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: getAttendanceStatusColor("present") }]} />
          <Text variant="caption">Present ({presentCount})</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: getAttendanceStatusColor("absent") }]} />
          <Text variant="caption">Absent ({absentCount})</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: getAttendanceStatusColor("holiday") }]} />
          <Text variant="caption">Holiday ({holidayCount})</Text>
        </View>
      </View>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: SPACING.md,
  },
  dayCell: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    width: `${100 / TOTAL_COLS}%` as any,
  },
  dayCircle: {
    alignItems: "center",
    borderRadius: RADIUS.pill,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  dayText: {
    fontSize: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  legendDot: {
    borderRadius: RADIUS.pill,
    height: 10,
    width: 10,
  },
  legendItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.xs,
  },
  legendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    justifyContent: "center",
  },
  weekdayCell: {
    alignItems: "center",
    width: `${100 / TOTAL_COLS}%` as any,
  },
  weekdayRow: {
    flexDirection: "row",
    width: "100%",
  },
  weekdayText: {
    fontSize: 11,
  },
});

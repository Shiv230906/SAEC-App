import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { DashboardCard } from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import {
  getAttendanceStatusColor,
  type WeeklyAttendanceDay,
} from "@/src/data/attendanceMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

type WeeklyAttendanceTimelineProps = {
  days: WeeklyAttendanceDay[];
};

export function WeeklyAttendanceTimeline({
  days,
}: WeeklyAttendanceTimelineProps) {
  return (
    <View style={styles.container}>
      {days.map((day, index) => {
        const statusLabel =
          day.status === "holiday"
            ? "Holiday"
            : day.status === "present"
              ? "Present"
              : "Absent";

        const statusIcon =
          day.status === "present"
            ? "check-circle"
            : day.status === "holiday"
              ? "event-busy"
              : "cancel";

        return (
          <View key={day.day} style={styles.row}>
            <View style={styles.timeline}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: getAttendanceStatusColor(day.status) },
                ]}
              />
              {index < days.length - 1 ? <View style={styles.line} /> : null}
            </View>

            <DashboardCard style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <Text variant="body">{day.day}</Text>
                <View style={styles.statusRow}>
                  <MaterialIcons
                    color={getAttendanceStatusColor(day.status)}
                    name={statusIcon}
                    size={18}
                  />
                  <Text
                    color={getAttendanceStatusColor(day.status)}
                    style={styles.statusLabel}
                    variant="caption"
                  >
                    {statusLabel}
                  </Text>
                </View>
              </View>
            </DashboardCard>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  dayCard: {
    flex: 1,
  },
  dayHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dot: {
    borderRadius: RADIUS.pill,
    height: 12,
    width: 12,
  },
  line: {
    backgroundColor: COLORS.border,
    flex: 1,
    marginVertical: SPACING.xs,
    width: 2,
  },
  row: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  statusLabel: {
    fontWeight: "600",
  },
  statusRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.xs,
  },
  timeline: {
    alignItems: "center",
    paddingTop: SPACING.md,
    width: 20,
  },
});

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyAttendanceReminder } from "@/src/data/attendanceMockData";
import { COLORS, SPACING } from "@/src/theme";

export default function AttendanceReminder() {
  const { minutesUntilStart, section, subject } = facultyAttendanceReminder;

  return (
    <DashboardCard style={styles.card}>
      <SectionHeader icon="notifications-active" title="Attendance Reminder" />
      <View style={styles.messageRow}>
        <MaterialIcons color={COLORS.primary} name="access-time" size={22} />
        <Text style={styles.message} variant="body">
          Your {subject} class ({section}) starts in {minutesUntilStart}{" "}
          minutes.
        </Text>
      </View>
      <ActionButton
        labelColor={COLORS.white}
        onPress={() => router.push("/(faculty)/attendance")}
        style={styles.button}
        variant="peach"
      >
        Take Attendance
      </ActionButton>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  message: {
    flex: 1,
  },
  messageRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: SPACING.sm,
  },
});

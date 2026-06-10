import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { DashboardCard } from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { ATTENDANCE_THRESHOLD } from "@/src/data/attendanceMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

type DefaulterWarningCardProps = {
  percentage: number;
};

export function DefaulterWarningCard({ percentage }: DefaulterWarningCardProps) {
  if (percentage >= ATTENDANCE_THRESHOLD) {
    return null;
  }

  return (
    <DashboardCard style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons color={COLORS.error} name="warning" size={22} />
        <Text color={COLORS.error} variant="innerHeading">
          Warning
        </Text>
      </View>
      <Text color={COLORS.textSecondary} variant="body">
        Your attendance is below college requirements.
      </Text>
      <Text variant="body">
        Current Attendance:{" "}
        <Text color={COLORS.error} variant="body">
          {percentage}%
        </Text>
      </Text>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },
});

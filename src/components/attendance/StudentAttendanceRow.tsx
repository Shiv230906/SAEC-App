import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/src/components/ui";
import type { AttendanceStatus } from "@/src/data/attendanceMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

type StudentAttendanceRowProps = {
  name: string;
  onToggle: () => void;
  rollNo: string;
  status: AttendanceStatus;
};

export function StudentAttendanceRow({
  name,
  onToggle,
  rollNo,
  status,
}: StudentAttendanceRowProps) {
  const isPresent = status === "present";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ checked: isPresent }}
      onPress={onToggle}
      style={({ pressed }) => [
        styles.row,
        pressed ? styles.pressed : undefined,
        !isPresent ? styles.absentRow : undefined,
      ]}
    >
      <View
        style={[
          styles.toggle,
          isPresent ? styles.togglePresent : styles.toggleAbsent,
        ]}
      >
        <MaterialIcons
          color={COLORS.white}
          name={isPresent ? "check" : "close"}
          size={16}
        />
      </View>

      <View style={styles.copy}>
        <Text variant="body">{name}</Text>
        <Text color={COLORS.textSecondary} variant="caption">
          {rollNo}
        </Text>
      </View>

      <Text
        color={isPresent ? COLORS.success : COLORS.error}
        style={styles.statusText}
        variant="caption"
      >
        {isPresent ? "Present" : "Absent"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  absentRow: {
    backgroundColor: "#FEF2F2",
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  pressed: {
    opacity: 0.76,
  },
  row: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    gap: SPACING.md,
    padding: SPACING.md,
  },
  statusText: {
    fontWeight: "600",
  },
  toggle: {
    alignItems: "center",
    borderRadius: RADIUS.pill,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  toggleAbsent: {
    backgroundColor: COLORS.error,
  },
  togglePresent: {
    backgroundColor: COLORS.success,
  },
});

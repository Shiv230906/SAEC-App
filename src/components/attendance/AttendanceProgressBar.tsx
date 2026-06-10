import { StyleSheet, View } from "react-native";

import { COLORS, RADIUS } from "@/src/theme";

type AttendanceProgressBarProps = {
  percentage: number;
};

export function AttendanceProgressBar({
  percentage,
}: AttendanceProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    height: "100%",
  },
  track: {
    backgroundColor: COLORS.accentBlueMuted,
    borderRadius: RADIUS.pill,
    height: 8,
    overflow: "hidden",
  },
});

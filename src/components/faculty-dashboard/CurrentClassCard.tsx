import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import {
  ActionButton,
  HeroCard,
  heroCardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyCurrentClass } from "@/src/data/attendanceMockData";
import { COLORS, SPACING } from "@/src/theme";

export default function CurrentClassCard() {
  const timeRange = `${facultyCurrentClass.startTime} - ${facultyCurrentClass.endTime}`;

  return (
    <HeroCard>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text color={COLORS.white} style={styles.badgeText}>
            CURRENT CLASS
          </Text>
        </View>
        <View style={styles.roomBadge}>
          <MaterialIcons color={COLORS.white} name="meeting-room" size={14} />
          <Text color={COLORS.white} style={styles.roomText}>
            Room {facultyCurrentClass.room}
          </Text>
        </View>
      </View>

      <Text color={COLORS.white} style={heroCardStyles.heroTitle}>
        {facultyCurrentClass.subject}
      </Text>

      <Text color={COLORS.white} variant="body">
        {facultyCurrentClass.section}
      </Text>

      <View style={styles.metaRow}>
        <MaterialIcons color={COLORS.white} name="schedule" size={16} />
        <Text color={COLORS.white} variant="body">
          {timeRange}
        </Text>
      </View>

      <ActionButton
        onPress={() => router.push("/(faculty)/attendance")}
        style={styles.button}
        variant="navy"
      >
        Take Attendance
      </ActionButton>
    </HeroCard>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs + 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  button: {
    marginTop: SPACING.sm,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.xs,
  },
  roomBadge: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderRadius: 999,
    flexDirection: "row",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs + 2,
  },
  roomText: {
    fontSize: 12,
    fontWeight: "600",
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import {
  ActionButton,
  HeroCard,
  heroCardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyNextClass } from "@/src/data/facultyMockData";
import { COLORS, SPACING } from "@/src/theme";

export default function NextClassCard() {
  const timeRange = `${facultyNextClass.startTime} - ${facultyNextClass.endTime}`;

  return (
    <HeroCard>
      <Text color={COLORS.white} variant="caption">
        NEXT CLASS
      </Text>

      <Text color={COLORS.white} style={heroCardStyles.heroTitle}>
        {facultyNextClass.subject} — {facultyNextClass.section}
      </Text>

      <View style={styles.metaRow}>
        <MaterialIcons color={COLORS.white} name="meeting-room" size={16} />
        <Text color={COLORS.white} variant="body">
          Room {facultyNextClass.room}
        </Text>
      </View>

      <View style={styles.metaRow}>
        <MaterialIcons color={COLORS.white} name="schedule" size={16} />
        <Text color={COLORS.white} variant="body">
          {timeRange}
        </Text>
      </View>

      <ActionButton
        onPress={() => router.push("/(faculty)/timetable")}
        style={styles.button}
        variant="peach"
      >
        View Timetable
      </ActionButton>
    </HeroCard>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: SPACING.sm,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.xs,
  },
});

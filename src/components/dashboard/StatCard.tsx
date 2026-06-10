import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { Text } from "@/src/components/ui";
import { COLORS, SPACING } from "@/src/theme";

import { DashboardCard } from "./DashboardCard";

type StatCardProps = {
  label: string;
  style?: StyleProp<ViewStyle>;
  tone?: "accent" | "default";
  value: number | string;
};

export function StatCard({
  label,
  style,
  tone = "default",
  value,
}: StatCardProps) {
  return (
    <DashboardCard
      style={[
        styles.card,
        tone === "accent" ? styles.accentCard : undefined,
        style,
      ]}
    >
      <View style={styles.content}>
        <Text
          color={tone === "accent" ? COLORS.primary : COLORS.textSecondary}
          variant="caption"
        >
          {label}
        </Text>
        <Text variant="heading">{value}</Text>
      </View>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  accentCard: {
    backgroundColor: COLORS.primaryLight,
  },
  card: {
    alignItems: "center",
    flex: 1,
  },
  content: {
    alignItems: "center",
    gap: SPACING.xs,
  },
});

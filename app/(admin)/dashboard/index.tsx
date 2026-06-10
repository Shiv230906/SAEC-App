import { StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, SPACING } from "@/src/theme";

type StatCardProps = {
  detail: string;
  title: string;
  value: string;
  tone?: "accent" | "default";
};

function StatCard({
  detail,
  title,
  tone = "default",
  value,
}: StatCardProps) {
  return (
    <Card
      style={[
        styles.card,
        tone === "accent" ? styles.accentCard : undefined,
      ]}
    >
      <View style={styles.cardHeader}>
        <Text
          color={tone === "accent" ? COLORS.primary : COLORS.textSecondary}
          variant="caption"
        >
          {title}
        </Text>
        <Text style={styles.value} variant="subHeading">
          {value}
        </Text>
      </View>

      <Text color={COLORS.textSecondary} variant="body">
        {detail}
      </Text>
    </Card>
  );
}

const cards = [
  {
    detail: "Overall student enrollment is steady across all departments.",
    title: "Total Students",
    tone: "accent" as const,
    value: "1,240",
  },
  {
    detail: "Faculty strength is balanced across core programs.",
    title: "Total Faculty",
    value: "86",
  },
  {
    detail: "Attendance is trending well across the institution.",
    title: "Attendance Overview",
    value: "94.6%",
  },
  {
    detail: "Fee collection is currently ahead of the monthly target.",
    title: "Fee Collection Summary",
    value: "82%",
  },
  {
    detail: "Six events are scheduled and ready for promotion.",
    title: "Events",
    value: "6 Scheduled",
  },
  {
    detail: "Fourteen reports were generated this week.",
    title: "Reports",
    value: "14 Ready",
  },
];

export default function AdminDashboard() {
  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.copy}>
        <Text variant="subHeading">Admin Dashboard</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Monitor key institutional metrics, collections, events, and
          reporting from a concise analytics view.
        </Text>
      </View>

      <View style={styles.grid}>
        {cards.map((card) => (
          <View key={card.title} style={styles.gridItem}>
            <StatCard {...card} />
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  accentCard: {
    backgroundColor: COLORS.primaryLight,
  },
  card: {
    gap: SPACING.sm,
    minHeight: 132,
  },
  cardHeader: {
    gap: SPACING.xs,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  copy: {
    gap: SPACING.xs,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  gridItem: {
    flexBasis: "48%",
    flexGrow: 1,
    minWidth: 150,
  },
  value: {
    color: COLORS.textPrimary,
  },
});

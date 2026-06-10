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
    detail: "Five classes are scheduled for today across active batches.",
    title: "Today's Classes",
    tone: "accent" as const,
    value: "5 Classes",
  },
  {
    detail: "You have created 18 assignments this term.",
    title: "Assignments Created",
    value: "18",
  },
  {
    detail: "12 submissions are pending evaluation.",
    title: "Pending Evaluations",
    value: "12",
  },
  {
    detail: "Attendance can be marked for your current session.",
    title: "Attendance Management",
    value: "Live",
  },
  {
    detail: "You are currently teaching 240 students.",
    title: "Student Count",
    value: "240",
  },
  {
    detail: "Three faculty events are coming up soon.",
    title: "Upcoming Events",
    value: "3 Events",
  },
];

export default function FacultyDashboard() {
  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.copy}>
        <Text variant="subHeading">Faculty Dashboard</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Stay on top of class schedules, evaluations, and student progress
          with a clean action-first view.
        </Text>
      </View>

      <StatCard {...cards[0]} />

      <View style={styles.grid}>
        {cards.slice(1).map((card) => (
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

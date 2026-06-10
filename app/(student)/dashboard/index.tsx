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
    detail: "Your current attendance remains on track across the semester.",
    title: "Attendance Percentage",
    tone: "accent" as const,
    value: "92%",
  },
  {
    detail: "3 assignments are due this week.",
    title: "Pending Assignments",
    value: "3",
  },
  {
    detail: "Most recent internal marks are available for review.",
    title: "Internal Marks",
    value: "8 Subjects",
  },
  {
    detail: "Two campus events are coming up next.",
    title: "Upcoming Events",
    value: "2 Events",
  },
  {
    detail: "Your next class begins at 10:00 AM.",
    title: "Timetable",
    value: "Next Class",
  },
  {
    detail: "Four unread updates need your attention.",
    title: "Notifications",
    value: "4 New",
  },
];

export default function StudentDashboard() {
  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.copy}>
        <Text variant="subHeading">Student Dashboard</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Keep track of attendance, assignments, marks, and campus activity
          from one place.
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

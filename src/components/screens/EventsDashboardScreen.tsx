import { StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import { studentEvents, type StudentEvent } from "@/src/data/studentMockData";
import { COLORS, SPACING } from "@/src/theme";

type EventCardProps = StudentEvent;

function EventCard({
  date,
  detail,
  location,
  title,
  tone = "default",
}: EventCardProps) {
  return (
    <Card
      style={[styles.card, tone === "accent" ? styles.accentCard : undefined]}
    >
      <View style={styles.cardHeader}>
        <Text
          color={tone === "accent" ? COLORS.primary : COLORS.textSecondary}
          variant="caption"
        >
          {date}
        </Text>
        <Text style={styles.eventTitle} variant="innerHeading">
          {title}
        </Text>
      </View>

      <Text color={COLORS.textSecondary} variant="body">
        {detail}
      </Text>

      <Text color={COLORS.primary} variant="caption">
        {location}
      </Text>
    </Card>
  );
}

const facultyEvents = [
  {
    date: "Jun 14, 2026",
    detail: "Faculty coordination meeting for upcoming semester planning.",
    location: "Conference Room",
    title: "Academic Council Meet",
    tone: "accent" as const,
  },
  {
    date: "Jun 19, 2026",
    detail: "Workshop on outcome-based education and assessment methods.",
    location: "Faculty Lounge",
    title: "Faculty Development Program",
  },
  {
    date: "Jun 24, 2026",
    detail: "Annual cultural event coordination and volunteer briefing.",
    location: "Admin Block",
    title: "Cultural Committee Briefing",
  },
];

export type EventsDashboardScreenProps = {
  role: "student" | "faculty";
};

export function EventsDashboardScreen({ role }: EventsDashboardScreenProps) {
  const events =
    role === "student"
      ? studentEvents.filter((event) => !event.shortDate)
      : facultyEvents;
  const [featured, ...upcoming] = events;

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.copy}>
        <Text variant="subHeading">Events Dashboard</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Browse upcoming campus events, venues, and schedules in one place.
        </Text>
      </View>

      <EventCard {...featured} />

      <View style={styles.section}>
        <Text variant="innerHeading">Upcoming Events</Text>

        <View style={styles.grid}>
          {upcoming.map((event) => (
            <View key={event.title} style={styles.gridItem}>
              <EventCard {...event} />
            </View>
          ))}
        </View>
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
  eventTitle: {
    color: COLORS.textPrimary,
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
  section: {
    gap: SPACING.md,
  },
});

export default EventsDashboardScreen;

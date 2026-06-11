import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { ActionButton } from "@/src/components/dashboard";
import { Card, Input, Screen, Text } from "@/src/components/ui";
import {
  recentAdminEvents,
  type AdminEventRecord,
} from "@/src/data/adminEventsMockData";
import { COLORS, SPACING } from "@/src/theme";

export default function AdminEvents() {
  const [title, setTitle] = useState("Tech Symposium 2026");
  const [description, setDescription] = useState(
    "Inter-department technical talks and project demos.",
  );
  const [date, setDate] = useState("20-07-2026");
  const [venue, setVenue] = useState("Main Auditorium");
  const [events, setEvents] = useState<AdminEventRecord[]>(recentAdminEvents);
  const [message, setMessage] = useState("");

  const createEvent = () => {
    if (!title.trim()) {
      setMessage("Event title is required.");
      return;
    }

    const newEvent: AdminEventRecord = {
      createdTime: "Created just now",
      date: date || "Date not set",
      description,
      id: `event-local-${Date.now()}`,
      title: title.trim(),
      venue: venue || "Venue not set",
    };

    setEvents((current) => [newEvent, ...current]);
    setMessage(`Event "${title.trim()}" created locally.`);
    setTitle("");
    setDescription("");
    setDate("");
    setVenue("");
  };

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Events</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Create and manage college events.
        </Text>
      </View>

      <Card style={styles.formCard}>
        <Text variant="innerHeading">Create New Event</Text>

        <Input
          label="Event Title"
          onChangeText={setTitle}
          placeholder="Tech Fest 2026"
          value={title}
        />

        <Input
          inputStyle={styles.descriptionInput}
          label="Description"
          multiline
          onChangeText={setDescription}
          placeholder="Event details..."
          textAlignVertical="top"
          value={description}
        />

        <Input
          label="Date (DD-MM-YYYY)"
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9]/g, "");
            let formatted = cleaned;
            if (cleaned.length > 2) formatted = cleaned.slice(0, 2) + "-" + cleaned.slice(2);
            if (cleaned.length > 4) formatted = cleaned.slice(0, 2) + "-" + cleaned.slice(2, 4) + "-" + cleaned.slice(4, 8);
            setDate(formatted);
          }}
          placeholder="15-07-2026"
          value={date}
          keyboardType="numeric"
          maxLength={10}
        />

        <Input
          label="Venue"
          onChangeText={setVenue}
          placeholder="Main Auditorium"
          value={venue}
        />

        <ActionButton onPress={createEvent} variant="navy">
          Create Event
        </ActionButton>
      </Card>

      {message ? (
        <Card style={styles.messageCard}>
          <Text color={COLORS.success} variant="body">
            {message}
          </Text>
        </Card>
      ) : null}

      <View style={styles.section}>
        <Text variant="innerHeading">Recent Events</Text>

        {events.map((event) => (
          <Card key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={styles.eventCopy}>
                <Text variant="body">{event.title}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {event.date} · {event.createdTime}
                </Text>
              </View>
            </View>
            <Text color={COLORS.textSecondary} variant="caption">
              {event.venue}
            </Text>
            <Text color={COLORS.textSecondary} variant="body">
              {event.description}
            </Text>
            <View style={styles.actionRow}>
              <ActionButton variant="peach">View</ActionButton>
              <ActionButton variant="peach">Edit</ActionButton>
              <ActionButton
                labelColor={COLORS.error}
                onPress={() =>
                  setEvents((current) =>
                    current.filter((item) => item.id !== event.id),
                  )
                }
                variant="link"
              >
                Delete
              </ActionButton>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  descriptionInput: {
    minHeight: 100,
  },
  actionRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  eventCard: {
    gap: SPACING.sm,
  },
  eventCopy: {
    flex: 1,
    gap: SPACING.xs,
  },
  eventHeader: {
    flexDirection: "row",
  },
  formCard: {
    gap: SPACING.md,
  },
  header: {
    gap: SPACING.sm,
  },
  messageCard: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
});

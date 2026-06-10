import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { supabase } from "@/src/services/supabase";
import { Button, Card, Input, Screen, Text } from "@/src/components/ui";
import { COLORS, SPACING } from "@/src/theme";

export default function AdminEvents() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const createEvent = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Event title is required.");
      return;
    }

    setSubmitting(true);

    try {
      let isoDate: string | null = null;
      if (date) {
        const parts = date.split("-");
        if (parts.length === 3) {
          isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }

      const { error } = await supabase.from("events").insert([
        {
          title,
          description,
          event_date: isoDate,
          venue: venue || null,
        },
      ]);

      if (error) throw error;

      Alert.alert("Success", `Event "${title}" created.`);
      setTitle("");
      setDescription("");
      setDate("");
      setVenue("");
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      Alert.alert("Error", msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
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

        <Button
          loading={submitting}
          onPress={createEvent}
          title="Create Event"
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  descriptionInput: {
    minHeight: 100,
  },
  formCard: {
    gap: SPACING.md,
  },
  header: {
    gap: SPACING.sm,
  },
});

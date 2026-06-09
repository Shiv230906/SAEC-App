import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import { supabase } from "../../../src/services/supabase";
import { COLORS, SPACING } from "@/src/theme";

type StudentAssignment = {
  batch?: string | null;
  description?: string | null;
  due_date?: string | null;
  id: string | number;
  title?: string | null;
};

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const { data, error } = await supabase
        .from("assignments")
        .select("*")
        .order("due_date", { ascending: true });

      if (error) {
        console.log(error);
      } else {
        setAssignments(data || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Screen contentContainerStyle={styles.center}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </Screen>
    );
  }

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="subHeading">Assignments</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Track upcoming work and submissions.
        </Text>
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={assignments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text variant="innerHeading">{item.title ?? "Untitled"}</Text>

            <Text color={COLORS.textSecondary} variant="body">
              {item.description}
            </Text>

            <Text color={COLORS.textSecondary} variant="caption">
              Batch: {item.batch}
            </Text>

            <Text color={COLORS.primary} variant="caption">
              Due Date: {item.due_date}
            </Text>
          </Card>
        )}
        ListEmptyComponent={
          <Text color={COLORS.textSecondary}>No assignments available.</Text>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  card: {
    gap: SPACING.sm,
  },
  container: {
    flex: 1,
    gap: SPACING.lg,
  },
  header: {
    gap: SPACING.sm,
  },
  list: {
    gap: SPACING.md,
  },
});

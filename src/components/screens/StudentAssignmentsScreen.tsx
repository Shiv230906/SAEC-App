import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import {
  getAssignmentDotColor,
  studentAssignments,
  type StudentAssignment,
} from "@/src/data/studentMockData";
import { supabase } from "@/src/services/supabase";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

type RemoteAssignment = {
  batch?: string | null;
  description?: string | null;
  due_date?: string | null;
  id: string | number;
  title?: string | null;
};

function mapRemoteAssignment(item: RemoteAssignment): StudentAssignment {
  return {
    id: String(item.id),
    title: item.title ?? "Untitled",
    description: item.description ?? "No description provided.",
    batch: item.batch ?? "CSE III",
    due_date: item.due_date ?? "",
    dueLabel: item.due_date ? `Due ${item.due_date}` : "No due date",
    priority: "medium",
    status: "pending",
  };
}

export function StudentAssignmentsScreen() {
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchAssignments();
  }, []);

  async function fetchAssignments() {
    try {
      const { data, error } = await supabase
        .from("assignments")
        .select("*")
        .order("due_date", { ascending: true });

      if (error) {
        console.log(error);
        setAssignments(studentAssignments);
      } else if (!data || data.length === 0) {
        setAssignments(studentAssignments);
      } else {
        setAssignments(data.map(mapRemoteAssignment));
      }
    } catch (error) {
      console.log(error);
      setAssignments(studentAssignments);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Screen contentContainerStyle={styles.center} style={styles.screen}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </Screen>
    );
  }

  const pending = assignments.filter((item) => item.status === "pending");
  const submitted = assignments.filter((item) => item.status === "submitted");

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Assignments</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Track upcoming work and completed submissions.
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Pending</Text>

        {pending.map((item) => (
          <Card key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text variant="innerHeading">{item.title}</Text>
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getAssignmentDotColor(item.priority) },
                ]}
              />
            </View>

            <Text color={COLORS.textSecondary} variant="body">
              {item.description}
            </Text>

            <View style={styles.metaRow}>
              <Text color={COLORS.textSecondary} variant="caption">
                Batch: {item.batch}
              </Text>
              <Text color={COLORS.primary} variant="caption">
                {item.dueLabel}
              </Text>
            </View>
          </Card>
        ))}
      </View>

      {submitted.length > 0 ? (
        <View style={styles.section}>
          <Text variant="innerHeading">Submitted</Text>

          {submitted.map((item) => (
            <Card key={item.id} style={[styles.card, styles.submittedCard]}>
              <Text variant="innerHeading">{item.title}</Text>
              <Text color={COLORS.textSecondary} variant="body">
                {item.description}
              </Text>
              <Text color={COLORS.success} style={styles.submittedLabel} variant="caption">
                {item.dueLabel}
              </Text>
            </Card>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: SPACING.sm,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priorityDot: {
    borderRadius: RADIUS.pill,
    height: 10,
    width: 10,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
  submittedCard: {
    backgroundColor: COLORS.gray100,
  },
  submittedLabel: {
    fontFamily: FONT_FAMILY.semiBold,
  },
});

export default StudentAssignmentsScreen;

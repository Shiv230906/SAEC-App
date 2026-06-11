import { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

import { Card, Screen, Text } from "@/src/components/ui";
import type {
  ApprovalCard,
  OperationalQueue,
  WorkflowLog,
} from "@/src/data/adminMockData";
import {
  type ActionRequiredWorkspaceData,
  fetchActionRequiredData,
} from "@/src/services/actionRequired";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

const PRIORITY_CONFIG = {
  critical: { label: "Critical", bg: "#FEE2E2", text: "#DC2626" },
  high: { label: "High", bg: "#FFEDD5", text: "#EA580C" },
  medium: { label: "Medium", bg: "#FEF9C3", text: "#CA8A04" },
} as const;

const CATEGORY_ICON: Record<
  ApprovalCard["category"],
  { name: keyof typeof MaterialIcons.glyphMap; color: string }
> = {
  leave: { name: "event-busy", color: "#2563EB" },
  grade: { name: "grading", color: "#DC2626" },
  event: { name: "event", color: "#16A34A" },
  payment: { name: "payments", color: "#EA580C" },
  enrollment: { name: "person-add", color: "#7C3AED" },
};

const LOG_ICON: Record<
  WorkflowLog["type"],
  { name: keyof typeof MaterialIcons.glyphMap; color: string }
> = {
  task: { name: "assignment-late", color: "#DC2626" },
  payment: { name: "payments", color: "#EA580C" },
  user: { name: "person-add", color: "#2563EB" },
  event: { name: "event", color: "#16A34A" },
  leave: { name: "event-busy", color: "#2563EB" },
  grade: { name: "grading", color: "#DC2626" },
};

export default function ActionRequiredWorkspace() {
  const { refresh } = useLocalSearchParams<{ refresh?: string }>();
  const [data, setData] = useState<ActionRequiredWorkspaceData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const result = await fetchActionRequiredData();
    setData(result);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData, refresh])
  );

  if (loading || !data) {
    return (
      <Screen contentContainerStyle={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.primary} size="large" />
        <Text color={COLORS.textSecondary} variant="body">
          Loading action items...
        </Text>
      </Screen>
    );
  }

  const { approvalCards, workflowLogs, operationalQueues } = data;
  const totalPending = approvalCards.reduce((sum, card) => sum + card.count, 0);

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="subHeading">Action Required</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Supervisor workspace for pending approvals, workflow alerts, and
          operational queues.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <Card style={[styles.statCard, { backgroundColor: "#FEE2E2" }]}>
          <Text color="#DC2626" variant="innerHeading">
            {totalPending}
          </Text>
          <Text color="#DC2626" variant="caption">
            Pending Items
          </Text>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: "#FFEDD5" }]}>
          <Text color="#EA580C" variant="innerHeading">
            {approvalCards.length}
          </Text>
          <Text color="#EA580C" variant="caption">
            Approval Cards
          </Text>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: "#DBEAFE" }]}>
          <Text color="#2563EB" variant="innerHeading">
            {operationalQueues.length}
          </Text>
          <Text color="#2563EB" variant="caption">
            Active Queues
          </Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Pending Approval Cards</Text>
        <View style={styles.cardList}>
          {approvalCards.map((card) => {
            const cfg = PRIORITY_CONFIG[card.priority];
            const icon = CATEGORY_ICON[card.category];
            return (
              <Card key={card.id} style={styles.approvalCard}>
                <View style={styles.approvalTop}>
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: `${icon.color}18` },
                    ]}
                  >
                    <MaterialIcons
                      color={icon.color}
                      name={icon.name}
                      size={20}
                    />
                  </View>
                  <View style={styles.approvalInfo}>
                    <Text variant="body">{card.title}</Text>
                    <Text color={COLORS.textSecondary} variant="caption">
                      {card.description}
                    </Text>
                  </View>
                  <View style={[styles.countBadge, { backgroundColor: cfg.bg }]}>
                    <Text color={cfg.text} variant="innerHeading">
                      {card.count}
                    </Text>
                  </View>
                </View>
                <View style={styles.approvalMeta}>
                  <Text color={COLORS.textSecondary} variant="caption">
                    From: {card.requestedBy}
                  </Text>
                  <View
                    style={[styles.priorityBadge, { backgroundColor: cfg.bg }]}
                  >
                    <Text color={cfg.text} variant="caption">
                      {cfg.label}
                    </Text>
                  </View>
                  <Text color={COLORS.textSecondary} variant="caption">
                    {card.submittedAt}
                  </Text>
                </View>
              </Card>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Workflow Notification Logs</Text>
        <Card style={styles.logCard}>
          {workflowLogs.map((log, index) => {
            const icon = LOG_ICON[log.type];
            const isLast = index === workflowLogs.length - 1;
            return (
              <View
                key={log.id}
                style={[styles.logRow, !isLast ? styles.logDivider : undefined]}
              >
                <View
                  style={[
                    styles.logIconWrap,
                    { backgroundColor: `${icon.color}18` },
                  ]}
                >
                  <MaterialIcons color={icon.color} name={icon.name} size={18} />
                </View>
                <View style={styles.logContent}>
                  <Text variant="body">{log.title}</Text>
                  <Text color={COLORS.textSecondary} variant="caption">
                    {log.message}
                  </Text>
                </View>
                <Text color={COLORS.textSecondary} variant="caption">
                  {log.time}
                </Text>
              </View>
            );
          })}
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Operational Task Queues</Text>
        <View style={styles.cardList}>
          {operationalQueues.map((queue) => (
            <Card key={queue.id} style={styles.queueCard}>
              <View style={styles.queueTop}>
                <Text variant="body">{queue.queue}</Text>
                <View style={styles.queuePendingBadge}>
                  <Text color="#DC2626" variant="caption">
                    {queue.pending} pending
                  </Text>
                </View>
              </View>
              <View style={styles.queueMeta}>
                <Text color={COLORS.textSecondary} variant="caption">
                  Owner: {queue.owner}
                </Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  Oldest: {queue.oldest}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  approvalCard: {
    gap: SPACING.sm,
  },
  approvalInfo: {
    flex: 1,
    gap: 2,
  },
  approvalMeta: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  approvalTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: SPACING.sm,
  },
  cardList: {
    gap: SPACING.md,
  },
  categoryIcon: {
    alignItems: "center",
    borderRadius: RADIUS.md,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  countBadge: {
    alignItems: "center",
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    minWidth: 40,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  header: {
    gap: SPACING.sm,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.md,
    justifyContent: "center",
  },
  logCard: {
    gap: 0,
    paddingVertical: SPACING.xs,
  },
  logContent: {
    flex: 1,
    gap: 2,
  },
  logDivider: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  logIconWrap: {
    alignItems: "center",
    borderRadius: RADIUS.md,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  logRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  priorityBadge: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  queueCard: {
    gap: SPACING.xs,
  },
  queueMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  queuePendingBadge: {
    backgroundColor: "#FEE2E2",
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  queueTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    gap: SPACING.md,
  },
  statCard: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.xs,
    paddingVertical: SPACING.md,
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
});

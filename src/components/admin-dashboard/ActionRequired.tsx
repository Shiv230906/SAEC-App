import { StyleSheet, View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { actionRequired } from "@/src/data/adminMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

type Priority = "critical" | "high" | "medium";

type ActionItem = {
  key: keyof typeof actionRequired;
  label: string;
  description: string;
  priority: Priority;
};

const items: ActionItem[] = [
  {
    key: "overdueFacultyTasks",
    label: "Overdue Faculty Tasks",
    description: "Internal marks upload pending from 5 faculty members",
    priority: "critical",
  },
  {
    key: "pendingPayments",
    label: "Pending Payments",
    description: "12 students have outstanding fee balances past due date",
    priority: "high",
  },
  {
    key: "userRequests",
    label: "User Requests",
    description: "3 new enrollment requests awaiting verification",
    priority: "medium",
  },
];

const PRIORITY_CONFIG = {
  critical: { label: "Critical", bg: "#FEE2E2", text: "#DC2626" },
  high: { label: "High", bg: "#FFEDD5", text: "#EA580C" },
  medium: { label: "Medium", bg: "#FEF9C3", text: "#CA8A04" },
} as const;

export default function ActionRequired() {
  return (
    <DashboardCard>
      <SectionHeader icon="warning" title="Action Required" />

      <View style={dashboardStyles.list}>
        {items.map((item) => {
          const cfg = PRIORITY_CONFIG[item.priority];
          return (
            <View key={item.key} style={styles.alertRow}>
              <View style={styles.alertTop}>
                <View
                  style={[
                    dashboardStyles.taskDot,
                    { backgroundColor: cfg.text },
                  ]}
                />
                <Text style={styles.rowText} variant="body">
                  {item.label}
                </Text>
                <View style={[styles.priorityBadge, { backgroundColor: cfg.bg }]}>
                  <Text color={cfg.text} variant="caption">{cfg.label}</Text>
                </View>
                <Text color={COLORS.error} variant="body">
                  {actionRequired[item.key]}
                </Text>
              </View>
              <Text color={COLORS.textSecondary} variant="caption" style={styles.alertDesc}>
                {item.description}
              </Text>
            </View>
          );
        })}
      </View>

      <ActionButton variant="navy">Review All</ActionButton>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  rowText: {
    flex: 1,
  },
  alertRow: {
    gap: SPACING.xs,
  },
  alertTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  alertDesc: {
    paddingLeft: 20,
  },
  priorityBadge: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
});

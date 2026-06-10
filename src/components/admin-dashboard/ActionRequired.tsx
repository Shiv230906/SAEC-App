import { StyleSheet, View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { actionRequired } from "@/src/data/adminMockData";
import { COLORS } from "@/src/theme";

const items = [
  {
    key: "overdueFacultyTasks",
    label: "Overdue Faculty Tasks",
  },
  {
    key: "pendingPayments",
    label: "Pending Payments",
  },
  {
    key: "userRequests",
    label: "User Requests",
  },
] as const;

export default function ActionRequired() {
  return (
    <DashboardCard>
      <SectionHeader icon="warning" title="Action Required" />

      <View style={dashboardStyles.list}>
        {items.map((item) => (
          <View key={item.key} style={dashboardStyles.taskRow}>
            <View
              style={[
                dashboardStyles.taskDot,
                { backgroundColor: COLORS.error },
              ]}
            />
            <Text style={styles.rowText} variant="body">
              {item.label}
            </Text>
            <Text color={COLORS.error} variant="body">
              {actionRequired[item.key]}
            </Text>
          </View>
        ))}
      </View>

      <ActionButton variant="navy">Review All</ActionButton>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  rowText: {
    flex: 1,
  },
});

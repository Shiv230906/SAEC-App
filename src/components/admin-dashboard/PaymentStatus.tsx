import { router } from "expo-router";
import { View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { paymentOverview } from "@/src/data/adminMockData";
import { COLORS } from "@/src/theme";

export default function PaymentStatus() {
  const { collectionRate, paidStudents, pendingStudents } = paymentOverview;

  return (
    <DashboardCard>
      <SectionHeader icon="payments" title="Payment Status" />

      <View style={dashboardStyles.progressTrack}>
        <View
          style={[
            dashboardStyles.progressFill,
            { width: `${collectionRate}%` },
          ]}
        />
      </View>

      <View style={dashboardStyles.statsRow}>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{paidStudents}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Paid Students
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{pendingStudents}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Pending
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text color={COLORS.primary} variant="innerHeading">
            {collectionRate}%
          </Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Collection Rate
          </Text>
        </View>
      </View>

      <ActionButton
        onPress={() => router.push("/(admin)/payments")}
        variant="navy"
      >
        Manage Payments
      </ActionButton>
    </DashboardCard>
  );
}

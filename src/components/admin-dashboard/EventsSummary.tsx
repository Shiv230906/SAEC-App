import { router } from "expo-router";
import { View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { eventsSummary } from "@/src/data/adminMockData";
import { COLORS } from "@/src/theme";

export default function EventsSummary() {
  return (
    <DashboardCard>
      <SectionHeader icon="event" title="Events" />

      <View style={dashboardStyles.statsRow}>
        <View style={dashboardStyles.statItem}>
          <Text variant="innerHeading">{eventsSummary.upcoming}</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Upcoming
          </Text>
        </View>
        <View style={dashboardStyles.statItem}>
          <Text color={COLORS.primary} variant="innerHeading">
            {eventsSummary.active}
          </Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Active
          </Text>
        </View>
      </View>

      <ActionButton
        onPress={() => router.push("/(admin)/events")}
        variant="peach"
      >
        Create Event
      </ActionButton>
    </DashboardCard>
  );
}

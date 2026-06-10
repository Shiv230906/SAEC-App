import { router } from "expo-router";
import { View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { pendingMarksEntry } from "@/src/data/marksMockData";
import { COLORS } from "@/src/theme";

export default function PendingMarksEntry() {
  return (
    <DashboardCard>
      <SectionHeader icon="edit-note" title="Marks Pending" />

      <View style={dashboardStyles.noticeItem}>
        <View style={dashboardStyles.noticeHeader}>
          <Text variant="body">
            {pendingMarksEntry.subject} - {pendingMarksEntry.section}
          </Text>
          <Text color={COLORS.primary} variant="caption">
            Pending
          </Text>
        </View>
        <Text color={COLORS.textSecondary} variant="caption">
          {pendingMarksEntry.assessment}
        </Text>
      </View>

      <ActionButton
        onPress={() => router.push("/(faculty)/internal-marks")}
        variant="navy"
      >
        Enter Marks
      </ActionButton>
    </DashboardCard>
  );
}

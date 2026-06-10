import { StyleSheet, View } from "react-native";

import {
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { recentActivities } from "@/src/data/adminMockData";
import { COLORS } from "@/src/theme";

export default function RecentActivityFeed() {
  return (
    <DashboardCard>
      <SectionHeader icon="history" title="Recent Activity" />

      <View style={dashboardStyles.list}>
        {recentActivities.map((activity) => (
          <View key={activity.id} style={dashboardStyles.activityRow}>
            <View style={dashboardStyles.activityDot} />
            <View style={styles.copy}>
              <View style={dashboardStyles.noticeHeader}>
                <Text variant="body">{activity.title}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {activity.time}
                </Text>
              </View>
              <Text color={COLORS.textSecondary} variant="caption">
                {activity.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  copy: {
    flex: 1,
    gap: 2,
  },
});

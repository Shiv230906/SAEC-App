import { View } from "react-native";

import { StatCard, dashboardStyles } from "@/src/components/dashboard";
import { facultyQuickStats } from "@/src/data/facultyMockData";

export default function QuickStats() {
  return (
    <View style={dashboardStyles.statsRow}>
      <StatCard
        label="Classes Today"
        tone="accent"
        value={facultyQuickStats.classesToday}
      />
      <StatCard
        label="Pending Reviews"
        value={facultyQuickStats.pendingReviews}
      />
    </View>
  );
}

import { View } from "react-native";

import {
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { collegeOverview } from "@/src/data/adminMockData";
import { COLORS } from "@/src/theme";

const metrics = [
  { key: "students", label: "Students" },
  { key: "faculty", label: "Faculty" },
  { key: "courses", label: "Courses" },
  { key: "activeEvents", label: "Active Events" },
] as const;

export default function CollegeOverview() {
  return (
    <DashboardCard>
      <SectionHeader icon="domain" title="College Overview" />

      <View style={dashboardStyles.overviewGrid}>
        {metrics.map((metric) => (
          <View key={metric.key} style={dashboardStyles.overviewItem}>
            <Text color={COLORS.textSecondary} variant="caption">
              {metric.label}
            </Text>
            <Text variant="subHeading">
              {collegeOverview[metric.key].toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}

import { View } from "react-native";

import {
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { userSummary } from "@/src/data/adminMockData";
import { COLORS } from "@/src/theme";

const users = [
  { key: "students", label: "Students" },
  { key: "faculty", label: "Faculty" },
  { key: "admins", label: "Admins" },
] as const;

export default function UserSummary() {
  return (
    <DashboardCard>
      <SectionHeader icon="groups" title="User Summary" />

      <View style={dashboardStyles.statsRow}>
        {users.map((user) => (
          <View key={user.key} style={dashboardStyles.statItem}>
            <Text variant="innerHeading">
              {userSummary[user.key].toLocaleString()}
            </Text>
            <Text color={COLORS.textSecondary} variant="caption">
              {user.label}
            </Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}

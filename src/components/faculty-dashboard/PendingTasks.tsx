import { View } from "react-native";
import { router } from "expo-router";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import {
  facultyPendingTasks,
  getTaskPriorityColor,
} from "@/src/data/facultyMockData";

export default function PendingTasks() {
  const tasks = facultyPendingTasks.slice(0, 3);

  return (
    <DashboardCard>
      <SectionHeader icon="checklist" title="Pending Tasks" />

      <View style={dashboardStyles.list}>
        {tasks.map((task) => (
          <View key={task.id} style={dashboardStyles.taskRow}>
            <View
              style={[
                dashboardStyles.taskDot,
                { backgroundColor: getTaskPriorityColor(task.priority) },
              ]}
            />
            <Text variant="body">{task.title}</Text>
          </View>
        ))}
      </View>

      <ActionButton
        onPress={() => router.push("/(faculty)/tasks")}
        variant="peach"
      >
        View All
      </ActionButton>
    </DashboardCard>
  );
}

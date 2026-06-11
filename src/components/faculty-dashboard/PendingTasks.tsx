import { View } from "react-native";
import { router } from "expo-router";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { ROUTES } from "@/src/constants/routes";
import {
  facultyPendingTasks,
  getTaskPriorityColor,
  loggedInFacultyId,
} from "@/src/data/facultyMockData";

export default function PendingTasks() {
  const tasks = facultyPendingTasks
    .filter((task) => task.assignedFacultyId === loggedInFacultyId)
    .slice(0, 3);

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
        onPress={() => router.push(ROUTES.FACULTY_TASKS)}
        variant="peach"
      >
        View Task
      </ActionButton>
    </DashboardCard>
  );
}

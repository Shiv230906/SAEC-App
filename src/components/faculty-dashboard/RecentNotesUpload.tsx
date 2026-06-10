import { router } from "expo-router";
import { View } from "react-native";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyNotesInitial } from "@/src/data/notesMockData";
import { COLORS } from "@/src/theme";

export default function RecentNotesUpload() {
  const recentNotes = facultyNotesInitial.slice(0, 2);

  return (
    <DashboardCard>
      <SectionHeader icon="folder" title="Recent Uploads" />

      <View style={dashboardStyles.noticeList}>
        {recentNotes.map((note) => (
          <View key={note.id} style={dashboardStyles.noticeItem}>
            <View style={dashboardStyles.noticeHeader}>
              <Text variant="body">{note.title}</Text>
              <Text color={COLORS.textSecondary} variant="caption">
                {note.uploadDate}
              </Text>
            </View>
            <Text color={COLORS.textSecondary} variant="caption">
              {note.subject} · {note.className}
            </Text>
          </View>
        ))}
      </View>

      <ActionButton onPress={() => router.push("/(faculty)/notes")} variant="peach">
        Upload Notes
      </ActionButton>
    </DashboardCard>
  );
}

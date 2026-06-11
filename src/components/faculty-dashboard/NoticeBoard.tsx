import { View } from "react-native";
import { router } from "expo-router";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultyNotices } from "@/src/data/facultyMockData";
import { COLORS } from "@/src/theme";

export default function NoticeBoard() {
  const notices = facultyNotices.slice(0, 3);

  return (
    <DashboardCard>
      <SectionHeader icon="campaign" title="Notice Board" />

      <View style={dashboardStyles.noticeList}>
        {notices.map((notice) => (
          <View key={notice.id} style={dashboardStyles.noticeItem}>
            <View style={dashboardStyles.noticeHeader}>
              <Text variant="body">{notice.title}</Text>
              <Text color={COLORS.textSecondary} variant="caption">
                {notice.time}
              </Text>
            </View>
            <Text color={COLORS.textSecondary} variant="caption">
              {notice.body}
            </Text>
          </View>
        ))}
      </View>

      <ActionButton
        onPress={() => router.push("/(faculty)/notices")}
        variant="navy"
      >
        Create Notice
      </ActionButton>
    </DashboardCard>
  );
}

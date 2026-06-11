import { useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

import {
  ActionButton,
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { facultySubjectAnalytics } from "@/src/data/facultyMockData";
import { COLORS } from "@/src/theme";

export default function SubjectPerformance() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const subject = facultySubjectAnalytics[selectedIndex];

  if (!subject) {
    return null;
  }

  return (
    <DashboardCard>
      <SectionHeader icon="show-chart" title="Subject Performance" />

      <View style={dashboardStyles.chipRow}>
        {facultySubjectAnalytics.map((item, index) => {
          const isActive = index === selectedIndex;

          return (
            <Pressable
              key={item.subjectCode}
              accessibilityRole="button"
              onPress={() => setSelectedIndex(index)}
              style={({ pressed }) => [
                dashboardStyles.chip,
                isActive ? dashboardStyles.chipActive : undefined,
                pressed ? dashboardStyles.pressed : undefined,
              ]}
            >
              <Text
                color={isActive ? COLORS.white : COLORS.textSecondary}
                variant="caption"
              >
                {item.subjectCode}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={dashboardStyles.metricRow}>
        <View style={dashboardStyles.metricCard}>
          <Text color={COLORS.textSecondary} variant="caption">
            Top Performer
          </Text>
          <Text variant="body">{subject.topStudent}</Text>
          <Text color={COLORS.primary} variant="body">
            {subject.topScore}
          </Text>
        </View>

        <View style={dashboardStyles.metricCard}>
          <Text color={COLORS.textSecondary} variant="caption">
            Needs Attention
          </Text>
          <Text variant="body">{subject.bottomStudent}</Text>
          <Text color={COLORS.error} variant="body">
            {subject.bottomScore}
          </Text>
        </View>
      </View>

      <ActionButton onPress={() => router.push("/(faculty)/performance")} variant="peach">
        View Performance
      </ActionButton>
    </DashboardCard>
  );
}

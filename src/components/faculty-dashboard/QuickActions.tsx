import type { ComponentType } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import {
  DashboardCard,
  SectionHeader,
  dashboardStyles,
} from "@/src/components/dashboard";
import { Text } from "@/src/components/ui";
import { COLORS } from "@/src/theme";
import AssignmentIcon from "@/src/utils/icons/assignment.svg";
import AttendanceIcon from "@/src/utils/icons/attendance.svg";
import MarksIcon from "@/src/utils/icons/marks.svg";
import NotesIcon from "@/src/utils/icons/notes.svg";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type QuickAction = {
  Icon: ComponentType<SvgProps> | null;
  label: string;
  materialIcon?: keyof typeof MaterialIcons.glyphMap;
  route: string;
};

const actions: QuickAction[] = [
  {
    Icon: AttendanceIcon,
    label: "Attendance",
    route: "/(faculty)/attendance",
  },
  {
    Icon: AssignmentIcon,
    label: "Assignment",
    route: "/(faculty)/assignments",
  },
  {
    Icon: MarksIcon,
    label: "Marks",
    route: "/(faculty)/internal-marks",
  },
  {
    Icon: null,
    label: "Notice",
    materialIcon: "campaign",
    route: "/(faculty)/notices",
  },
  {
    Icon: NotesIcon,
    label: "Upload Notes",
    route: "/(faculty)/notes",
  },
];

export default function QuickActions() {
  return (
    <DashboardCard>
      <SectionHeader icon="bolt" title="Quick Actions" />

      <View style={dashboardStyles.actionsRow}>
        {actions.map((action) => (
          <Pressable
            key={action.label}
            accessibilityRole="button"
            onPress={() => router.push(action.route)}
            style={({ pressed }) => [
              dashboardStyles.actionButton,
              pressed ? dashboardStyles.pressed : undefined,
            ]}
          >
            <View style={dashboardStyles.actionIconWrap}>
              {action.Icon ? (
                <action.Icon color={COLORS.navy} height={24} width={24} />
              ) : action.materialIcon ? (
                <MaterialIcons
                  color={COLORS.navy}
                  name={action.materialIcon}
                  size={24}
                />
              ) : null}
            </View>
            <Text style={styles.label} variant="caption">
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
  },
});

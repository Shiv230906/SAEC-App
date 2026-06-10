import { Tabs } from "expo-router";
import type { ComponentType } from "react";
import type { ColorValue } from "react-native";
import type { SvgProps } from "react-native-svg";

import AssignmentIcon from "@/src/utils/icons/assignment.svg";
import AttendanceIcon from "@/src/utils/icons/attendance.svg";
import DashboardIcon from "@/src/utils/icons/dashboard.svg";
import NotesIcon from "@/src/utils/icons/notes.svg";
import ProfileIcon from "@/src/utils/icons/profile.svg";
import { COLORS, TYPOGRAPHY } from "@/src/theme";

type TabIcon = ComponentType<SvgProps>;

function tabOptions(title: string, Icon: TabIcon) {
  return {
    tabBarIcon: ({ color, size }: { color: ColorValue; size: number }) => (
      <Icon color={color} height={size} width={size} />
    ),
    title,
  };
}

export default function StudentLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarLabelStyle: {
          fontFamily: TYPOGRAPHY.caption.fontFamily,
          fontSize: TYPOGRAPHY.caption.fontSize,
        },
        tabBarStyle: {
          borderTopColor: COLORS.primaryLight,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={tabOptions("Dashboard", DashboardIcon)}
      />
      <Tabs.Screen
        name="attendance"
        options={tabOptions("Attendance", AttendanceIcon)}
      />
      <Tabs.Screen
        name="assignments"
        options={tabOptions("Assignments", AssignmentIcon)}
      />
      <Tabs.Screen
        name="notes"
        options={tabOptions("Notes", NotesIcon)}
      />
      <Tabs.Screen
        name="profile"
        options={tabOptions("My Profile", ProfileIcon)}
      />
      <Tabs.Screen
        name="internal-marks"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="payments"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="events"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="timetable"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="settings"
        options={{ href: null }}
      />
    </Tabs>
  );
}

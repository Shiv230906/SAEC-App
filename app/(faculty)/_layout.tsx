import { Tabs } from "expo-router";
import type { ComponentType } from "react";
import { Platform } from "react-native";
import type { ColorValue } from "react-native";
import type { SvgProps } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AssignmentIcon from "@/src/utils/icons/assignment.svg";
import AttendanceIcon from "@/src/utils/icons/attendance.svg";
import DashboardIcon from "@/src/utils/icons/dashboard.svg";
import NotesIcon from "@/src/utils/icons/notes.svg";
import MarksIcon from "@/src/utils/icons/marks.svg";
import { COLORS, SPACING, TYPOGRAPHY } from "@/src/theme";

type TabIcon = ComponentType<SvgProps>;

function tabOptions(title: string, Icon: TabIcon) {
  return {
    tabBarIcon: ({ color, size }: { color: ColorValue; size: number }) => (
      <Icon color={color} height={size} width={size} />
    ),
    title,
  };
}

export default function FacultyLayout() {
  const insets = useSafeAreaInsets();
  const tabBarBottomInset = Math.max(insets.bottom, SPACING.xs);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarAllowFontScaling: false,
        tabBarIconStyle: {
          marginBottom: -2,
        },
        tabBarItemStyle: {
          flex: 1,
          paddingVertical: SPACING.xs,
        },
        tabBarLabelStyle: {
          fontFamily: TYPOGRAPHY.caption.fontFamily,
          fontSize: 11,
          lineHeight: 14,
        },
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.primaryLight,
          borderTopWidth: 1,
          height: 52 + tabBarBottomInset,
          paddingBottom: tabBarBottomInset,
          paddingTop: SPACING.xs,
          ...Platform.select({
            android: { elevation: 8 },
            default: {},
          }),
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
        name="tasks"
        options={tabOptions("Tasks", MarksIcon)}
      />
      <Tabs.Screen
        name="events"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="notices"
        options={{ href: null }}
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
        name="profile"
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
      <Tabs.Screen
        name="account"
        options={{ href: null }}
      />
    </Tabs>
  );
}

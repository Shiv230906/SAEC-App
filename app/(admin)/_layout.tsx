import { Redirect, Tabs } from "expo-router";
import type { ComponentType } from "react";
import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import type { ColorValue } from "react-native";
import type { SvgProps } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getDashboardRoute, useAuth } from "../../src/context/AuthContext";
import { Screen } from "../../src/components/ui";
import { COLORS, SPACING, TYPOGRAPHY } from "../../src/theme";

import DashboardIcon from "@/src/utils/icons/dashboard.svg";
import AttendanceIcon from "@/src/utils/icons/attendance.svg";
import EventsIcon from "@/src/utils/icons/events.svg";
import ProfileIcon from "@/src/utils/icons/profile.svg";
import MarksIcon from "@/src/utils/icons/marks.svg";

type TabIcon = ComponentType<SvgProps>;

function tabOptions(title: string, Icon: TabIcon) {
  return {
    tabBarIcon: ({ color, size }: { color: ColorValue; size: number }) => (
      <Icon color={color} height={size} width={size} />
    ),
    title,
  };
}

export default function AdminLayout() {
  const { loading, session, role } = useAuth();
  const insets = useSafeAreaInsets();
  const tabBarBottomInset = Math.max(insets.bottom, SPACING.xs);

  if (loading) {
    return (
      <Screen contentContainerStyle={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.primary} />
      </Screen>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  if (role !== "admin") {
    return <Redirect href={getDashboardRoute(role)} />;
  }

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
          height: 56 + tabBarBottomInset,
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
        name="events"
        options={tabOptions("Events", EventsIcon)}
      />
      <Tabs.Screen
        name="users"
        options={tabOptions("Users", ProfileIcon)}
      />
      <Tabs.Screen
        name="reports"
        options={tabOptions("Tasks", MarksIcon)}
      />
      <Tabs.Screen name="courses" options={{ href: null }} />
      <Tabs.Screen name="departments" options={{ href: null }} />
      <Tabs.Screen name="internal-marks" options={{ href: null }} />
      <Tabs.Screen name="payments" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="timetable" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

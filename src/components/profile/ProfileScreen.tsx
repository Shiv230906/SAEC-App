import { Pressable, StyleSheet, View } from "react-native";
import { router, type Href } from "expo-router";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";

import AssignmentIcon from "@/src/utils/icons/assignment.svg";
import AttendanceIcon from "@/src/utils/icons/attendance.svg";
import EventsIcon from "@/src/utils/icons/events.svg";
import MarksIcon from "@/src/utils/icons/marks.svg";
import PaymentIcon from "@/src/utils/icons/payment.svg";
import TimetableIcon from "@/src/utils/icons/timetable.svg";
import SignOutButton from "@/src/components/SignOutButton";
import { Card, Screen, Text } from "@/src/components/ui";
import { useAuth, type UserRole } from "@/src/context/AuthContext";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

type SvgIcon = ComponentType<SvgProps>;

type MenuItem = {
  href: Href;
  icon?: SvgIcon;
  materialIcon?: keyof typeof MaterialIcons.glyphMap;
  title: string;
};

const menuItemsByRole = {
  admin: [
    { href: "/(admin)/account", materialIcon: "person" as const, title: "Account" },
    { href: "/(admin)/users", icon: AssignmentIcon, title: "User Management" },
    {
      href: "/(admin)/departments",
      icon: TimetableIcon,
      title: "Department Management",
    },
    { href: "/(admin)/reports", icon: MarksIcon, title: "Reports" },
    { href: "/(admin)/payments", icon: PaymentIcon, title: "Payments" },
    { href: "/(admin)/settings", materialIcon: "settings" as const, title: "Settings" },
  ],
  faculty: [
    { href: "/(faculty)/account", materialIcon: "person" as const, title: "Account" },
    {
      href: "/(faculty)/attendance",
      icon: AttendanceIcon,
      title: "Attendance Management",
    },
    {
      href: "/(faculty)/assignments",
      icon: AssignmentIcon,
      title: "Assignment Management",
    },
    {
      href: "/(faculty)/internal-marks",
      icon: MarksIcon,
      title: "Internal Marks Management",
    },
    { href: "/(faculty)/events", icon: EventsIcon, title: "Events" },
    { href: "/(faculty)/settings", materialIcon: "settings" as const, title: "Settings" },
  ],
  student: [
    { href: "/(student)/payments", icon: PaymentIcon, title: "Payments" },
    { href: "/(student)/events", icon: EventsIcon, title: "Events" },
    { href: "/(student)/timetable", icon: TimetableIcon, title: "Timetable" },
    {
      href: "/(student)/internal-marks",
      icon: MarksIcon,
      title: "Internal Marks",
    },
    { href: "/(student)/settings", materialIcon: "settings" as const, title: "Settings" },
  ],
} satisfies Record<UserRole, MenuItem[]>;

function getMenuItems(role: UserRole): MenuItem[] {
  return menuItemsByRole[role];
}

export type ProfileScreenProps = {
  role: UserRole;
};

export function ProfileScreen({ role }: ProfileScreenProps) {
  const { user } = useAuth();
  const menuItems = getMenuItems(role);

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      {user?.email ? (
        <Card style={styles.summaryCard}>
          <View style={styles.summaryCopy}>
            <Text color={COLORS.textSecondary} variant="caption">
              Email
            </Text>
            <Text selectable variant="body">
              {user.email}
            </Text>
          </View>
          <View style={styles.summaryCopy}>
            <Text color={COLORS.textSecondary} variant="caption">
              Role
            </Text>
            <Text variant="body">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Text>
          </View>
        </Card>
      ) : null}

      <Card style={styles.menuCard}>
        <Text variant="innerHeading">Profile Menu</Text>

        <View style={styles.menuItems}>
          {menuItems.map((item) => (
            <ProfileMenuItem key={item.title} item={item} />
          ))}
        </View>

        <SignOutButton />
      </Card>
    </Screen>
  );
}

function ProfileMenuItem({ item }: { item: MenuItem }) {
  const Icon = item.icon;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(item.href)}
      style={({ pressed }) => [
        styles.menuItem,
        pressed ? styles.menuItemPressed : undefined,
      ]}
    >
      <View style={styles.menuIcon}>
        {Icon ? (
          <Icon color={COLORS.primary} height={20} width={20} />
        ) : item.materialIcon ? (
          <MaterialIcons color={COLORS.primary} name={item.materialIcon} size={20} />
        ) : null}
      </View>

      <Text style={styles.menuText} variant="body">
        {item.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  menuCard: {
    gap: SPACING.md,
  },
  menuIcon: {
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.pill,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  menuItem: {
    alignItems: "center",
    borderColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: SPACING.md,
    minHeight: 52,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  menuItemPressed: {
    backgroundColor: COLORS.primaryLight,
  },
  menuItems: {
    gap: SPACING.sm,
  },
  menuText: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: COLORS.primaryLight,
    gap: SPACING.md,
  },
  summaryCopy: {
    gap: SPACING.xs,
  },
});

export default ProfileScreen;

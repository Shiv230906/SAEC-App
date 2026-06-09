import { Pressable, StyleSheet, View } from "react-native";
import { router, type Href } from "expo-router";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import EventsIcon from "@/src/utils/icons/events.svg";
import MarksIcon from "@/src/utils/icons/marks.svg";
import PaymentIcon from "@/src/utils/icons/payment.svg";
import ProfileIcon from "@/src/utils/icons/profile.svg";
import TimetableIcon from "@/src/utils/icons/timetable.svg";
import SignOutButton from "@/src/components/SignOutButton";
import { Card, Screen, Text } from "@/src/components/ui";
import { useAuth, type UserRole } from "@/src/context/AuthContext";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

import { ProfileHeader } from "./ProfileHeader";
import { getDisplayName, getRoleLabel } from "./profileUtils";

type SvgIcon = ComponentType<SvgProps>;

type ProfileMenuRouteSet = {
  events: Href;
  internalMarks: Href;
  payments: Href;
  profile: Href;
  settings: Href;
  timetable: Href;
};

type MenuItem = {
  href: Href;
  icon?: SvgIcon;
  title: string;
};

const menuRoutes = {
  admin: {
    events: "/(admin)/events",
    internalMarks: "/(admin)/internal-marks",
    payments: "/(admin)/payments",
    profile: "/(admin)/profile",
    settings: "/(admin)/settings",
    timetable: "/(admin)/timetable",
  },
  faculty: {
    events: "/(faculty)/events",
    internalMarks: "/(faculty)/internal-marks",
    payments: "/(faculty)/payments",
    profile: "/(faculty)/profile",
    settings: "/(faculty)/settings",
    timetable: "/(faculty)/timetable",
  },
  student: {
    events: "/(student)/events",
    internalMarks: "/(student)/internal-marks",
    payments: "/(student)/payments",
    profile: "/(student)/profile",
    settings: "/(student)/settings",
    timetable: "/(student)/timetable",
  },
} satisfies Record<UserRole, ProfileMenuRouteSet>;

function getMenuItems(role: UserRole): MenuItem[] {
  const routes = menuRoutes[role];

  return [
    { href: routes.profile, icon: ProfileIcon, title: "My Profile" },
    { href: routes.payments, icon: PaymentIcon, title: "Payments" },
    { href: routes.events, icon: EventsIcon, title: "Events" },
    { href: routes.timetable, icon: TimetableIcon, title: "Timetable" },
    { href: routes.internalMarks, icon: MarksIcon, title: "Internal Marks" },
    { href: routes.settings, title: "Settings" },
  ];
}

export type ProfileScreenProps = {
  role: UserRole;
};

export function ProfileScreen({ role }: ProfileScreenProps) {
  const { profile, user } = useAuth();
  const fullName = getDisplayName(profile, user);
  const roleLabel = getRoleLabel(role);

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <Card style={styles.summaryCard}>
        <ProfileHeader disabled role={role} />

        <View style={styles.profileDetails}>
          <View style={styles.detailRow}>
            <Text color={COLORS.textSecondary} variant="caption">
              Full name
            </Text>
            <Text selectable variant="body">
              {fullName ?? "User"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text color={COLORS.textSecondary} variant="caption">
              Role
            </Text>
            <Text selectable variant="body">
              {roleLabel}
            </Text>
          </View>

          {user?.email ? (
            <View style={styles.detailRow}>
              <Text color={COLORS.textSecondary} variant="caption">
                Email
              </Text>
              <Text selectable variant="body">
                {user.email}
              </Text>
            </View>
          ) : null}
        </View>
      </Card>

      <Card style={styles.menuCard}>
        <Text variant="innerHeading">Profile Menu</Text>

        <View style={styles.menuItems}>
          {getMenuItems(role).map((item) => (
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
        {Icon ? <Icon color={COLORS.primary} height={20} width={20} /> : null}
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
  detailRow: {
    gap: SPACING.xs,
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
  profileDetails: {
    gap: SPACING.md,
  },
  summaryCard: {
    backgroundColor: COLORS.primaryLight,
    gap: SPACING.lg,
  },
});

export default ProfileScreen;

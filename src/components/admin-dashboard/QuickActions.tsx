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
import EventsIcon from "@/src/utils/icons/events.svg";
import PaymentIcon from "@/src/utils/icons/payment.svg";
import ProfileIcon from "@/src/utils/icons/profile.svg";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type AdminQuickAction = {
  Icon: ComponentType<SvgProps> | null;
  label: string;
  materialIcon?: keyof typeof MaterialIcons.glyphMap;
  route: string;
};

const actions: AdminQuickAction[] = [
  {
    Icon: ProfileIcon,
    label: "Add User",
    route: "/(admin)/users",
  },
  {
    Icon: AssignmentIcon,
    label: "Assign Task",
    route: "/(admin)/reports",
  },
  {
    Icon: EventsIcon,
    label: "Create Event",
    route: "/(admin)/events",
  },
  {
    Icon: null,
    label: "Publish Notice",
    materialIcon: "campaign",
    route: "/(admin)/settings",
  },
  {
    Icon: PaymentIcon,
    label: "Manage Payments",
    route: "/(admin)/payments",
  },
];

export default function QuickActions() {
  return (
    <DashboardCard>
      <SectionHeader icon="bolt" title="Quick Actions" />

      <View style={styles.grid}>
        {actions.map((action) => (
          <Pressable
            key={action.label}
            accessibilityRole="button"
            onPress={() => router.push(action.route)}
            style={({ pressed }) => [
              styles.gridItem,
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  gridItem: {
    alignItems: "center",
    gap: 4,
    width: "30%",
  },
  label: {
    textAlign: "center",
  },
});

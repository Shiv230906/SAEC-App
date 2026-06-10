import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import { Card } from "@/src/components/ui";

import { dashboardStyles } from "./dashboardStyles";

type DashboardCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function DashboardCard({ children, style }: DashboardCardProps) {
  return <Card style={[dashboardStyles.dashboardCard, style]}>{children}</Card>;
}

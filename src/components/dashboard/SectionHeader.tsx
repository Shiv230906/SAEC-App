import { MaterialIcons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { View } from "react-native";

import { Text } from "@/src/components/ui";
import { COLORS } from "@/src/theme";

import { dashboardStyles } from "./dashboardStyles";

type SectionHeaderProps = {
  action?: ReactNode;
  icon?: keyof typeof MaterialIcons.glyphMap;
  title: string;
};

export function SectionHeader({ action, icon, title }: SectionHeaderProps) {
  return (
    <View style={dashboardStyles.sectionHeader}>
      <Text variant="innerHeading">{title}</Text>
      {action ??
        (icon ? (
          <MaterialIcons color={COLORS.primary} name={icon} size={22} />
        ) : null)}
    </View>
  );
}

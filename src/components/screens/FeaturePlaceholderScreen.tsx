import { StyleSheet } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, SPACING } from "@/src/theme";

export type FeaturePlaceholderScreenProps = {
  description?: string;
  title: string;
};

export function FeaturePlaceholderScreen({
  description = "This section is ready for the next workflow.",
  title,
}: FeaturePlaceholderScreenProps) {
  return (
    <Screen contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text variant="innerHeading">{title}</Text>
        <Text color={COLORS.textSecondary} variant="body">
          {description}
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primaryLight,
    gap: SPACING.sm,
  },
  container: {
    gap: SPACING.md,
  },
});

export default FeaturePlaceholderScreen;

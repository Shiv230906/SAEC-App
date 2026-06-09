import type { PropsWithChildren } from "react";
import {
  ScrollView,
  StyleSheet,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
  View,
} from "react-native";
import {
  SafeAreaView,
  type Edge,
} from "react-native-safe-area-context";

import { COLORS, SPACING } from "@/src/theme";

export type ScreenProps = PropsWithChildren<{
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  padded?: boolean;
  scrollProps?: ScrollViewProps;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

export function Screen({
  children,
  contentContainerStyle,
  edges,
  padded = true,
  scrollProps,
  scrollable = false,
  style,
}: ScreenProps) {
  const contentStyle = [
    styles.content,
    padded ? styles.padded : undefined,
    contentContainerStyle,
  ];

  return (
    <SafeAreaView edges={edges} style={[styles.safeArea, style]}>
      {scrollable ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          {...scrollProps}
          contentContainerStyle={[
            contentStyle,
            scrollProps?.contentContainerStyle,
          ]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={contentStyle}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  padded: {
    padding: SPACING.md,
  },
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
});

export default Screen;

import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import SignOutButton from "@/src/components/SignOutButton";
import { studentSettings } from "@/src/data/studentMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

export function StudentSettingsScreen() {
  const [settings, setSettings] = useState(studentSettings);

  function toggleSetting(id: string) {
    setSettings((current) =>
      current.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  }

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Settings</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Manage notifications, security, and app preferences.
        </Text>
      </View>

      <View style={styles.section}>
        {settings.map((setting) => (
          <Card key={setting.id} style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingCopy}>
                <Text variant="body">{setting.title}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {setting.description}
                </Text>
              </View>

              <Pressable
                accessibilityRole="switch"
                accessibilityState={{ checked: setting.enabled }}
                onPress={() => toggleSetting(setting.id)}
                style={[
                  styles.toggle,
                  setting.enabled ? styles.toggleOn : styles.toggleOff,
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    setting.enabled ? styles.toggleThumbOn : undefined,
                  ]}
                />
              </Pressable>
            </View>
          </Card>
        ))}
      </View>

      <Card style={styles.accountCard}>
        <Text variant="innerHeading">Account</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Sign out of your student account on this device.
        </Text>
        <SignOutButton />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  accountCard: {
    gap: SPACING.md,
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
  settingCard: {
    gap: SPACING.sm,
  },
  settingCopy: {
    flex: 1,
    gap: SPACING.xs,
    paddingRight: SPACING.md,
  },
  settingRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggle: {
    borderRadius: RADIUS.pill,
    height: 28,
    justifyContent: "center",
    paddingHorizontal: 3,
    width: 48,
  },
  toggleOff: {
    backgroundColor: COLORS.gray300,
  },
  toggleOn: {
    backgroundColor: COLORS.primary,
  },
  toggleThumb: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.pill,
    height: 22,
    width: 22,
  },
  toggleThumbOn: {
    alignSelf: "flex-end",
  },
});

export default StudentSettingsScreen;

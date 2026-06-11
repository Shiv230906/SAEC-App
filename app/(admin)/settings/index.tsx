import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

type SettingItem = {
  description: string;
  enabled: boolean;
  id: string;
  title: string;
};

const initialSettings: SettingItem[] = [
  {
    id: "notifications",
    title: "Push Notifications",
    description: "Receive alerts for user requests, events, and system updates.",
    enabled: true,
  },
  {
    id: "email",
    title: "Email Digests",
    description: "Get daily summaries of platform activity by email.",
    enabled: true,
  },
  {
    id: "biometric",
    title: "Biometric Login",
    description: "Use fingerprint or face unlock on supported devices.",
    enabled: false,
  },
  {
    id: "dark-mode",
    title: "Dark Mode",
    description: "Switch to a darker theme for low-light environments.",
    enabled: false,
  },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState(initialSettings);

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
          Manage your notifications and platform preferences.
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="innerHeading">Preferences</Text>
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

    </Screen>
  );
}


const styles = StyleSheet.create({
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

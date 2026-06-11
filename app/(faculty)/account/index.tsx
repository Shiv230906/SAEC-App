import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Button, Card, Input, Screen, Text } from "@/src/components/ui";
import { useAuth } from "@/src/context/AuthContext";
import { supabase } from "@/src/services/supabase";
import { COLORS, SPACING } from "@/src/theme";

export default function FacultyAccount() {
  const { profile, user } = useAuth();
  const currentName =
    (profile?.full_name as string) ??
    (user?.user_metadata?.full_name as string) ??
    "";

  const [name, setName] = useState(currentName);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleUpdateName = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Name cannot be empty.");
      return;
    }
    setSavingName(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name.trim() },
      });
      if (error) throw error;

      if (user?.id) {
        await supabase
          .from("profiles")
          .update({ full_name: name.trim() })
          .eq("id", user.id);
      }
      Alert.alert("Success", "Name updated successfully.");
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      Alert.alert("Error", msg);
    } finally {
      setSavingName(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      Alert.alert("Validation", "Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match.");
      return;
    }
    setSavingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      Alert.alert("Success", "Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      Alert.alert("Error", msg);
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <Screen scrollable contentContainerStyle={styles.container} style={styles.screen}>
      <View style={styles.header}>
        <Text variant="subHeading">Account</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Update your display name or change your login password.
        </Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <MaterialIcons color={COLORS.primary} name="person" size={20} />
          <Text variant="innerHeading">Display Name</Text>
        </View>
        <Input
          label="Full Name"
          onChangeText={setName}
          placeholder="Your full name"
          value={name}
        />
        <Button
          loading={savingName}
          onPress={handleUpdateName}
          title="Save Name"
        />
      </Card>

      <Card style={styles.card}>
        <View style={styles.sectionHeader}>
          <MaterialIcons color={COLORS.primary} name="lock" size={20} />
          <Text variant="innerHeading">Change Password</Text>
        </View>
        <Input
          label="New Password"
          onChangeText={setNewPassword}
          placeholder="Min. 6 characters"
          secureTextEntry
          value={newPassword}
        />
        <Input
          label="Confirm Password"
          onChangeText={setConfirmPassword}
          placeholder="Re-enter password"
          secureTextEntry
          value={confirmPassword}
        />
        <Button
          loading={savingPassword}
          onPress={handleUpdatePassword}
          title="Update Password"
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
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
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },
});

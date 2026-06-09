import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { Redirect, router } from "expo-router";

import { Button, Input, Screen, Text } from "@/src/components/ui";
import { signIn } from "../../../src/services/auth";
import { getDashboardRoute, useAuth } from "../../../src/context/AuthContext";
import { COLORS, SPACING } from "@/src/theme";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return String(error);
}

export default function LoginScreen() {
  const { loading, session, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <Screen contentContainerStyle={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.primary} />
      </Screen>
    );
  }

  if (session) {
    return <Redirect href={getDashboardRoute(role)} />;
  }

  async function handleLogin() {
    console.log("handleLogin called", { email });
    setSubmitting(true);

    try {
      await signIn(email, password);

      Alert.alert("Success", "Logged in");

      router.replace("/");
    } catch (error) {
      console.error("signIn error", error);
      Alert.alert("Error", getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="heading">Sign In</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Sign in to continue to SAEC App.
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
        />

        <Input
          label="Password"
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          value={password}
        />

        <Button
          loading={submitting}
          onPress={handleLogin}
          title="Sign In"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexGrow: 1,
    gap: SPACING.xl,
    justifyContent: "center",
    width: "100%",
  },
  form: {
    gap: SPACING.md,
  },
  header: {
    gap: SPACING.sm,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

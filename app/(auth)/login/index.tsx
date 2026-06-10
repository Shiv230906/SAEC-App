import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { Redirect, router } from "expo-router";

import { BrandMark } from "@/src/components/BrandMark";
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
        <BrandMark />
        <ActivityIndicator color={COLORS.primary} />
      </Screen>
    );
  }

  if (session) {
    return <Redirect href={getDashboardRoute(role)} />;
  }

  async function handleLogin() {
    setSubmitting(true);

    try {
      await signIn(email, password);

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
      <View style={styles.hero}>
        <BrandMark
          description="Secure access for students, faculty, and administrators."
        />
      </View>

      <View style={styles.card}>
        <View style={styles.formHeader}>
          <Text variant="innerHeading">Sign in</Text>
          <Text color={COLORS.textSecondary} variant="body">
            Use your college email and password to continue.
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

          <Button loading={submitting} onPress={handleLogin} title="Sign In" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexGrow: 1,
    gap: SPACING.lg,
    justifyContent: "center",
    maxWidth: 480,
    width: "100%",
  },
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.primaryLight,
    borderRadius: 24,
    borderWidth: 1,
    gap: SPACING.lg,
    padding: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 4,
  },
  formHeader: {
    gap: SPACING.xs,
  },
  form: {
    gap: SPACING.md,
  },
  hero: {
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.md,
    justifyContent: "center",
  },
});

import { useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Redirect, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/src/components/ui";
import { signIn } from "../../../src/services/auth";
import { getDashboardRoute, useAuth } from "../../../src/context/AuthContext";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

const SAEC_LOGO = require("../../../assets/SAEC_college_logo_login.png");

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

type LoginFieldProps = {
  icon: ReactNode;
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address";
  textContentType?: "emailAddress" | "password";
};

function LoginField({
  autoCapitalize,
  icon,
  keyboardType,
  label,
  onChangeText,
  placeholder,
  secureTextEntry,
  textContentType,
  value,
}: LoginFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <View style={styles.inputShell}>
        <TextInput
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          textContentType={textContentType}
          value={value}
        />
        <View style={styles.inputIcon}>{icon}</View>
      </View>
    </View>
  );
}

function LoginHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.logoShell}>
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          source={SAEC_LOGO}
          style={styles.logo}
        />
      </View>

      <Text style={styles.brandTitle}>SAEC</Text>
      <Text style={styles.brandSubtitle}>Academic Portal</Text>
    </View>
  );
}

export default function LoginScreen() {
  const { loading, session, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  if (loading) {
    return (
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <LoginHeader />
            <ActivityIndicator color={COLORS.primary} size="large" />
          </View>
        </SafeAreaView>
      </LinearGradient>
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

  function handleForgotPassword() {
    Alert.alert(
      "Forgot Password",
      "Please contact your college administrator to reset your password.",
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <LoginHeader />

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.signInTitle}>Sign in</Text>
                <Text color={COLORS.textSecondary} style={styles.signInSubtitle}>
                  Use your college email and password to continue.
                </Text>
              </View>

              <View style={styles.form}>
                <LoginField
                  autoCapitalize="none"
                  icon={
                    <MaterialIcons
                      color={COLORS.gray500}
                      name="mail-outline"
                      size={22}
                    />
                  }
                  keyboardType="email-address"
                  label="Email"
                  onChangeText={setEmail}
                  placeholder="example@gmail.com"
                  textContentType="emailAddress"
                  value={email}
                />

                <LoginField
                  icon={
                    <Pressable
                      accessibilityLabel={
                        passwordVisible ? "Hide password" : "Show password"
                      }
                      accessibilityRole="button"
                      hitSlop={8}
                      onPress={() => setPasswordVisible((visible) => !visible)}
                    >
                      <MaterialIcons
                        color={COLORS.gray500}
                        name={passwordVisible ? "visibility-off" : "visibility"}
                        size={22}
                      />
                    </Pressable>
                  }
                  label="Password"
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  textContentType="password"
                  value={password}
                />

                <Pressable
                  accessibilityRole="button"
                  disabled={submitting}
                  onPress={handleLogin}
                  style={({ pressed }) => [
                    styles.signInButton,
                    submitting ? styles.signInButtonDisabled : undefined,
                    pressed && !submitting ? styles.signInButtonPressed : undefined,
                  ]}
                >
                  {submitting ? (
                    <ActivityIndicator color={COLORS.white} size="small" />
                  ) : (
                    <>
                      <Text style={styles.signInButtonText}>Sign In</Text>
                      <MaterialIcons
                        color={COLORS.white}
                        name="login"
                        size={22}
                      />
                    </>
                  )}
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  onPress={handleForgotPassword}
                  style={styles.forgotPasswordPressable}
                >
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.footerSpacer} />

            <Text color={COLORS.footerText} style={styles.footer}>
              All Rights Reserved.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  brandSubtitle: {
    color: COLORS.navy,
    fontFamily: FONT_FAMILY.bold,
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    textAlign: "center",
  },
  brandTitle: {
    color: COLORS.navy,
    fontFamily: FONT_FAMILY.bold,
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 36,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    elevation: 6,
    gap: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    width: "100%",
  },
  cardHeader: {
    gap: SPACING.xs,
  },
  field: {
    gap: SPACING.sm,
  },
  fieldLabel: {
    color: COLORS.navy,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  footer: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  footerSpacer: {
    flexGrow: 1,
    minHeight: SPACING.lg,
  },
  forgotPassword: {
    color: COLORS.linkAccent,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  forgotPasswordPressable: {
    alignSelf: "flex-start",
  },
  form: {
    gap: SPACING.md,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  input: {
    color: COLORS.textPrimary,
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: 15,
    lineHeight: 20,
    minHeight: 48,
    paddingLeft: SPACING.md,
    paddingRight: SPACING.xxl,
    paddingVertical: SPACING.sm,
  },
  inputIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: SPACING.md,
  },
  inputShell: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 48,
  },
  keyboardView: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.lg,
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
  },
  logo: {
    height: 72,
    width: 72,
  },
  logoShell: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    elevation: 4,
    justifyContent: "center",
    padding: SPACING.sm,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  signInButton: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    gap: SPACING.sm,
    justifyContent: "center",
    marginTop: SPACING.xs,
    minHeight: 52,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonPressed: {
    opacity: 0.9,
  },
  signInButtonText: {
    color: COLORS.white,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  signInSubtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  signInTitle: {
    color: COLORS.navy,
    fontFamily: FONT_FAMILY.bold,
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
  },
});

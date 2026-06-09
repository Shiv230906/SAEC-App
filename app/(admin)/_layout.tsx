import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";

import { getDashboardRoute, useAuth } from "../../src/context/AuthContext";
import { Screen } from "../../src/components/ui";
import { COLORS } from "../../src/theme";

export default function AdminLayout() {
  const { loading, session, role } = useAuth();

  if (loading) {
    return (
      <Screen contentContainerStyle={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.primary} />
      </Screen>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  if (role !== "admin") {
    return <Redirect href={getDashboardRoute(role)} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

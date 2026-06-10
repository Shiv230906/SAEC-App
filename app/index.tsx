import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";

import { BrandMark } from "../src/components/BrandMark";
import { getDashboardRoute, useAuth } from "../src/context/AuthContext";
import { Screen } from "../src/components/ui";
import { COLORS } from "../src/theme";

export default function Index() {
  const { loading, session, role } = useAuth();

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

  return <Redirect href="/login" />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    gap: 20,
    justifyContent: "center",
  },
});

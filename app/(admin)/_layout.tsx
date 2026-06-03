import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { getDashboardRoute, useAuth } from "../../src/context/AuthContext";
import SignOutButton from "../../src/components/SignOutButton";

export default function AdminLayout() {
  const { loading, session, role } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
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
        headerRight: () => <SignOutButton />,
      }}
    />
  );
}

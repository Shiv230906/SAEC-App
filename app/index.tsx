import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { getDashboardRoute, useAuth } from "../src/context/AuthContext";

export default function Index() {
  const { loading, session, role } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (session) {
    return <Redirect href={getDashboardRoute(role)} />;
  }

  return <Redirect href="/login" />;
}

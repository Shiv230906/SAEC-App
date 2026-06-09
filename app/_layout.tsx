import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import { ProfileHeader } from "../src/components/profile/ProfileHeader";
import { AuthProvider } from "../src/context/AuthContext";
import { COLORS } from "../src/theme";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });

  useEffect(() => {
    if (fontError) {
      console.error("Failed to load Inter fonts", fontError);
    }
  }, [fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}

function AppStack() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: styles.header,
        headerTintColor: COLORS.primary,
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(student)"
        options={{
          headerTitle: () => <ProfileHeader role="student" />,
          title: "",
        }}
      />
      <Stack.Screen
        name="(faculty)"
        options={{
          headerTitle: () => <ProfileHeader role="faculty" />,
          title: "",
        }}
      />
      <Stack.Screen
        name="(admin)"
        options={{
          headerTitle: () => <ProfileHeader role="admin" />,
          title: "",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    alignItems: "center",
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "center",
  },
});

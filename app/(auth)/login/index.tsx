import { useState } from "react";
import { ActivityIndicator, View, TextInput, Button, Alert } from "react-native";
import { Redirect, router } from "expo-router";

import { signIn } from "../../../src/services/auth";
import { getDashboardRoute, useAuth } from "../../../src/context/AuthContext";

export default function LoginScreen() {
  const { loading, session, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  async function handleLogin() {
    console.log('handleLogin called', { email });

    try {
      await signIn(email, password);

      Alert.alert('Success', 'Logged in');

      router.replace("/");
    } catch (err: any) {
      console.error('signIn error', err);
      Alert.alert('Error', err?.message ?? String(err));
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
}

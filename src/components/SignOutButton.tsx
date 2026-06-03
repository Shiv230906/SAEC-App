import { useState } from "react";
import { Alert, Button } from "react-native";
import { router } from "expo-router";

import { useAuth } from "../context/AuthContext";

export default function SignOutButton() {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    try {
      setIsSigningOut(true);
      await signOut();
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Sign out failed", error?.message ?? String(error));
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <Button
      title={isSigningOut ? "Signing out..." : "Sign out"}
      onPress={handleSignOut}
      disabled={isSigningOut}
    />
  );
}

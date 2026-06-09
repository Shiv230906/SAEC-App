import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";

import { useAuth } from "../context/AuthContext";
import { Button, type ButtonProps } from "./ui";

type SignOutButtonProps = {
  style?: ButtonProps["style"];
};

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

export default function SignOutButton({ style }: SignOutButtonProps) {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    try {
      setIsSigningOut(true);
      await signOut();
      router.replace("/login");
    } catch (error) {
      Alert.alert("Sign out failed", getErrorMessage(error));
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <Button
      loading={isSigningOut}
      onPress={handleSignOut}
      disabled={isSigningOut}
      style={style}
      title={isSigningOut ? "Signing out..." : "Sign Out"}
    />
  );
}

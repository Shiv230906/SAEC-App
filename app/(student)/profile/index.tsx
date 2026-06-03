import { View, Text } from "react-native";

import Navbar from "../../../src/components/Navbar";
import SignOutButton from "../../../src/components/SignOutButton";

export default function Profile() {
  return (
    <View style={{ padding: 20 }}>
      <Navbar />

      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Profile
      </Text>

      <SignOutButton />
    </View>
  );
}

import { View, Button } from "react-native";
import { router } from "expo-router";

export default function Navbar() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 20,
      }}
    >
      <Button
        title="Dashboard"
        onPress={() =>
          router.push("/dashboard")
        }
      />

      <Button
        title="Attendance"
        onPress={() =>
          router.push("/attendance")
        }
      />

      <Button
        title="Assignments"
        onPress={() =>
          router.push("/assignments")
        }
      />

      <Button
        title="Marks"
        onPress={() =>
          router.push("/internal-marks")
        }
      />

      <Button
        title="Payments"
        onPress={() =>
          router.push("/payments")
        }
      />

      <Button
        title="Profile"
        onPress={() =>
          router.push("/profile")
        }
      />
    </View>
  );
}
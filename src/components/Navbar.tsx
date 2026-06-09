import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { Button } from "./ui";
import { SPACING } from "../theme";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <Button
        title="Dashboard"
        variant="secondary"
        onPress={() => router.push("/(student)/dashboard")}
      />

      <Button
        title="Attendance"
        variant="secondary"
        onPress={() => router.push("/(student)/attendance")}
      />

      <Button
        title="Assignments"
        variant="secondary"
        onPress={() => router.push("/(student)/assignments")}
      />

      <Button
        title="Notes"
        variant="secondary"
        onPress={() => router.push("/(student)/notes")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
});

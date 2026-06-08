import { View, Text, StyleSheet } from "react-native";
import Sidebar from "../../../src/components/Sidebar";

export default function StudentDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Student Dashboard</Text>
        <Text>Welcome Student</Text>
      </View>

      <Sidebar role="student" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
});


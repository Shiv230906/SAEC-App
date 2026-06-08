import { View, Text, StyleSheet } from "react-native";
import Sidebar from "../../../src/components/Sidebar";

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text>Manage Students, Faculty and Reports</Text>
      </View>

      <Sidebar role="admin" />
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
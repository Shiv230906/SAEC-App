import { View, Text, StyleSheet } from "react-native";
import Sidebar from "../../../src/components/Sidebar";

export default function FacultyDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Faculty Dashboard</Text>
        <Text>Manage Attendance, Assignments and Marks</Text>
      </View>

      <Sidebar role="faculty" />
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
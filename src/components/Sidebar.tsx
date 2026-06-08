import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Sidebar({ role }: { role: string }) {
  const studentItems = [
    { title: "Dashboard", route: "/(student)/dashboard" },
    { title: "Attendance", route: "/(student)/attendance" },
    { title: "Assignments", route: "/(student)/assignments" },
    { title: "Internal Marks", route: "/(student)/internal-marks" },
    { title: "Events", route: "/(student)/events" },
    { title: "Notes", route: "/(student)/notes" },
    { title: "Payments", route: "/(student)/payments" },
    { title: "Timetable", route: "/(student)/timetable" },
    { title: "Profile", route: "/(student)/profile" },
  ];

  const facultyItems = [
    { title: "Dashboard", route: "/(faculty)/dashboard" },
    { title: "Attendance", route: "/(faculty)/attendance" },
    { title: "Assignments", route: "/(faculty)/assignments" },
    { title: "Internal Marks", route: "/(faculty)/internal-marks" },
    { title: "Events", route: "/(faculty)/events" },
    { title: "Notes", route: "/(faculty)/notes" },
    { title: "Timetable", route: "/(faculty)/timetable" },
    { title: "Profile", route: "/(faculty)/profile" },
  ];

  const adminItems = [
    { title: "Dashboard", route: "/(admin)/dashboard" },
    { title: "Students", route: "/(admin)/students" },
    { title: "Faculty", route: "/(admin)/faculty" },
    { title: "Attendance", route: "/(admin)/attendance" },
    { title: "Assignments", route: "/(admin)/assignments" },
    { title: "Internal Marks", route: "/(admin)/internal-marks" },
    { title: "Events", route: "/(admin)/events" },
    { title: "Payments", route: "/(admin)/payments" },
    { title: "Reports", route: "/(admin)/reports" },
  ];

  const menu =
    role === "student"
      ? studentItems
      : role === "faculty"
      ? facultyItems
      : adminItems;

  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>SAEC APP</Text>

      {menu.map((item) => (
        <TouchableOpacity
          key={item.title}
          style={styles.menuItem}
          onPress={() => router.push(item.route as any)}
        >
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: "#1E293B",
    paddingTop: 40,
    height: "100%",
  },
  logo: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  menuText: {
    color: "white",
    fontSize: 16,
  },
});
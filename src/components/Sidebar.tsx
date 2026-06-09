import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

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
    height: "100%",
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xl,
    width: 220,
  },
  logo: {
    color: COLORS.white,
    fontFamily: TYPOGRAPHY.innerHeading.fontFamily,
    fontSize: TYPOGRAPHY.innerHeading.fontSize,
    fontWeight: TYPOGRAPHY.innerHeading.fontWeight,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
    padding: SPACING.md,
  },
  menuText: {
    color: COLORS.white,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: TYPOGRAPHY.body.fontSize,
  },
});

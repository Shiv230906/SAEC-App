import { Drawer } from "expo-router/drawer";

export default function StudentLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="dashboard" />
      <Drawer.Screen name="attendance" />
      <Drawer.Screen name="assignments" />
      <Drawer.Screen name="internal-marks" />
      <Drawer.Screen name="events" />
      <Drawer.Screen name="notes" />
      <Drawer.Screen name="payments" />
      <Drawer.Screen name="timetable" />
      <Drawer.Screen name="profile" />
    </Drawer>
  );
}
import { Drawer } from "expo-router/drawer";

export default function FacultyLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="dashboard" />
      <Drawer.Screen name="attendance" />
      <Drawer.Screen name="assignments" />
      <Drawer.Screen name="internal-marks" />
      <Drawer.Screen name="events" />
    </Drawer>
  );
}
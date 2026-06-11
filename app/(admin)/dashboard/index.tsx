import { Screen } from "@/src/components/ui";
import { dashboardStyles } from "@/src/components/dashboard";
import AttendanceOverview from "@/src/components/admin-dashboard/AttendanceOverview";
import CollegeOverview from "@/src/components/admin-dashboard/CollegeOverview";
import EventsSummary from "@/src/components/admin-dashboard/EventsSummary";
import FacultyTaskMonitoring from "@/src/components/admin-dashboard/FacultyTaskMonitoring";
import PaymentStatus from "@/src/components/admin-dashboard/PaymentStatus";
import RecentActivityFeed from "@/src/components/admin-dashboard/RecentActivityFeed";

export default function AdminDashboard() {
  return (
    <Screen
      scrollable
      contentContainerStyle={dashboardStyles.container}
      style={dashboardStyles.screen}
    >
      <CollegeOverview />
      <AttendanceOverview />
      <FacultyTaskMonitoring />
      <PaymentStatus />
      <EventsSummary />
      <RecentActivityFeed />
    </Screen>
  );
}

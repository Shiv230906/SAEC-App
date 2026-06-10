import { Screen } from "@/src/components/ui";
import { dashboardStyles } from "@/src/components/dashboard";
import ActionRequired from "@/src/components/admin-dashboard/ActionRequired";
import AdminHeader from "@/src/components/admin-dashboard/AdminHeader";
import AttendanceOverview from "@/src/components/admin-dashboard/AttendanceOverview";
import CollegeOverview from "@/src/components/admin-dashboard/CollegeOverview";
import EventsSummary from "@/src/components/admin-dashboard/EventsSummary";
import FacultyTaskMonitoring from "@/src/components/admin-dashboard/FacultyTaskMonitoring";
import PaymentStatus from "@/src/components/admin-dashboard/PaymentStatus";
import QuickActions from "@/src/components/admin-dashboard/QuickActions";
import RecentActivityFeed from "@/src/components/admin-dashboard/RecentActivityFeed";
import UserSummary from "@/src/components/admin-dashboard/UserSummary";

export default function AdminDashboard() {
  return (
    <Screen
      scrollable
      contentContainerStyle={dashboardStyles.container}
      style={dashboardStyles.screen}
    >
      <AdminHeader />
      <CollegeOverview />
      <AttendanceOverview />
      <ActionRequired />
      <UserSummary />
      <FacultyTaskMonitoring />
      <PaymentStatus />
      <EventsSummary />
      <RecentActivityFeed />
      <QuickActions />
    </Screen>
  );
}

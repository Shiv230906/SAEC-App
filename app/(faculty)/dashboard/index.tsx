import { Screen } from "@/src/components/ui";
import { dashboardStyles } from "@/src/components/dashboard";
import AssignmentOverview from "@/src/components/faculty-dashboard/AssignmentOverview";
import AttendanceReminder from "@/src/components/faculty-dashboard/AttendanceReminder";
import AttendanceStatus from "@/src/components/faculty-dashboard/AttendanceStatus";
import CurrentClassCard from "@/src/components/faculty-dashboard/CurrentClassCard";
import NoticeBoard from "@/src/components/faculty-dashboard/NoticeBoard";
import PendingMarksEntry from "@/src/components/faculty-dashboard/PendingMarksEntry";
import PendingTasks from "@/src/components/faculty-dashboard/PendingTasks";
import QuickStats from "@/src/components/faculty-dashboard/QuickStats";
import RecentNotesUpload from "@/src/components/faculty-dashboard/RecentNotesUpload";
import SubjectPerformance from "@/src/components/faculty-dashboard/SubjectPerformance";

export default function FacultyDashboard() {
  return (
    <Screen
      scrollable
      contentContainerStyle={dashboardStyles.container}
      style={dashboardStyles.screen}
    >
      <AttendanceReminder />
      <CurrentClassCard />
      <PendingTasks />
      <QuickStats />
      <PendingMarksEntry />
      <SubjectPerformance />
      <AttendanceStatus />
      <AssignmentOverview />
      <RecentNotesUpload />
      <NoticeBoard />
    </Screen>
  );
}

export type FacultyProfile = {
  avatarInitials: string;
  department: string;
  greeting: string;
  name: string;
};

export type FacultyNextClass = {
  endTime: string;
  room: string;
  section: string;
  startTime: string;
  subject: string;
};

export type FacultyTaskPriority = "high" | "low" | "medium";

export type FacultyPendingTask = {
  id: string;
  priority: FacultyTaskPriority;
  title: string;
};

export type FacultyQuickStats = {
  classesToday: number;
  pendingReviews: number;
};

export type FacultySubjectAnalytics = {
  bottomScore: string;
  bottomStudent: string;
  subject: string;
  subjectCode: string;
  topScore: string;
  topStudent: string;
};

export type FacultyAttendanceSummary = {
  classesToday: number;
  completed: number;
  pending: number;
};

export type FacultyAssignmentSummary = {
  newSubmissions: number;
  pendingReviews: number;
};

export type FacultyNotice = {
  body: string;
  id: string;
  time: string;
  title: string;
};

export const facultyProfile: FacultyProfile = {
  avatarInitials: "JD",
  department: "Computer Science",
  greeting: "Good Morning ☀️",
  name: "Dr. John Doe",
};

export const facultyNextClass: FacultyNextClass = {
  endTime: "12:00 PM",
  room: "302",
  section: "CSE A",
  startTime: "11:00 AM",
  subject: "DBMS",
};

export const facultyPendingTasks: FacultyPendingTask[] = [
  { id: "task-1", priority: "high", title: "Upload Internal Marks" },
  { id: "task-2", priority: "medium", title: "Verify Attendance" },
  { id: "task-3", priority: "low", title: "Submit Course Plan" },
  { id: "task-4", priority: "medium", title: "Review Lab Reports" },
  { id: "task-5", priority: "high", title: "Approve Project Topics" },
];

export const facultyQuickStats: FacultyQuickStats = {
  classesToday: 3,
  pendingReviews: 12,
};

export const facultySubjectAnalytics: FacultySubjectAnalytics[] = [
  {
    bottomScore: "42%",
    bottomStudent: "Kiran Kumar",
    subject: "DBMS",
    subjectCode: "DBMS",
    topScore: "96%",
    topStudent: "Rahul Sharma",
  },
  {
    bottomScore: "38%",
    bottomStudent: "Anita Rao",
    subject: "Operating Systems",
    subjectCode: "OS",
    topScore: "94%",
    topStudent: "Priya Nair",
  },
  {
    bottomScore: "45%",
    bottomStudent: "Vikram Singh",
    subject: "Computer Networks",
    subjectCode: "CN",
    topScore: "92%",
    topStudent: "Meera Joshi",
  },
];

export const facultyAttendanceSummary: FacultyAttendanceSummary = {
  classesToday: 3,
  completed: 2,
  pending: 1,
};

export const facultyAssignmentSummary: FacultyAssignmentSummary = {
  newSubmissions: 7,
  pendingReviews: 12,
};

export const facultyNotices: FacultyNotice[] = [
  {
    body: "Internal assessment for DBMS is scheduled tomorrow at 10:00 AM.",
    id: "notice-1",
    time: "2h ago",
    title: "Internal Exam Tomorrow",
  },
  {
    body: "Final year project review sessions will be held this Friday.",
    id: "notice-2",
    time: "5h ago",
    title: "Project Review Friday",
  },
  {
    body: "Submit semester course plan before the end of this week.",
    id: "notice-3",
    time: "1d ago",
    title: "Course Plan Deadline",
  },
  {
    body: "Lab session for Operating Systems moved to Room 405.",
    id: "notice-4",
    time: "1d ago",
    title: "Lab Room Change",
  },
  {
    body: "Guest lecture on cloud computing scheduled for next Monday.",
    id: "notice-5",
    time: "2d ago",
    title: "Guest Lecture Announcement",
  },
];

export function getTaskPriorityColor(priority: FacultyTaskPriority): string {
  switch (priority) {
    case "high":
      return "#DC2626";
    case "medium":
      return "#F97316";
    case "low":
      return "#EAB308";
  }
}

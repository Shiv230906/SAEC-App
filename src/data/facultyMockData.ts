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

export type FacultyTaskStatus = "ongoing" | "completed";

export type FacultyPendingTask = {
  assignedFacultyId: string;
  id: string;
  priority: FacultyTaskPriority;
  title: string;
};

export type FacultyAssignedTask = {
  assignee: string;
  assignedFacultyId: string;
  title: string;
  description: string;
  assignedBy: string;
  dueDate: string;
  id: string;
  priority: FacultyTaskPriority;
  status: FacultyTaskStatus;
};

export type FacultyTaskListRecord = {
  assignedFacultyId: string;
  completion: number;
  id: string;
  name: string;
  task: string;
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
  name: "Mr. Bala",
};

export const loggedInFacultyId = "fac-john-doe";

export const facultyNextClass: FacultyNextClass = {
  endTime: "12:00 PM",
  room: "302",
  section: "CSE A",
  startTime: "11:00 AM",
  subject: "DBMS",
};

export const facultyPendingTasks: FacultyPendingTask[] = [
  {
    assignedFacultyId: "fac-john-doe",
    id: "task-1",
    priority: "high",
    title: "Upload Internal Marks",
  },
  {
    assignedFacultyId: "fac-john-doe",
    id: "task-2",
    priority: "medium",
    title: "Verify Attendance",
  },
  {
    assignedFacultyId: "fac-john-doe",
    id: "task-3",
    priority: "medium",
    title: "Prepare Unit 3 Notes",
  },
  {
    assignedFacultyId: "fac-meera-iyer",
    id: "task-4",
    priority: "high",
    title: "Review Project Reports",
  },
  {
    assignedFacultyId: "fac-ravi-kumar",
    id: "task-5",
    priority: "medium",
    title: "Grade Assignments",
  },
];

export const facultyTaskList: FacultyTaskListRecord[] = [
  {
    assignedFacultyId: "fac-john-doe",
    completion: 100,
    id: "task-1",
    name: "Mr. Bala",
    task: "Upload Internal Marks",
  },
  {
    assignedFacultyId: "fac-meera-iyer",
    completion: 75,
    id: "task-2",
    name: "Dr. Meera Iyer",
    task: "Verify Attendance Records",
  },
  {
    assignedFacultyId: "fac-suresh-babu",
    completion: 50,
    id: "task-3",
    name: "Prof. Suresh Babu",
    task: "Submit Lab Assessment",
  },
  {
    assignedFacultyId: "fac-anita-rao",
    completion: 30,
    id: "task-4",
    name: "Dr. Anita Rao",
    task: "Review Project Reports",
  },
  {
    assignedFacultyId: "fac-ravi-kumar",
    completion: 90,
    id: "task-5",
    name: "Prof. Ravi Kumar",
    task: "Grade Assignments",
  },
  {
    assignedFacultyId: "fac-john-doe",
    completion: 40,
    id: "task-6",
    name: "Mr. Bala",
    task: "Prepare Unit 3 Notes",
  },
];

export const facultyAssignedTasks: FacultyAssignedTask[] = [
  {
    assignedFacultyId: "fac-john-doe",
    id: "task-1",
    assignee: "Mr. Bala",
    title: "Upload Internal Marks",
    description: "Upload DBMS internal test 1 marks for CSE A, B, C sections",
    assignedBy: "Admin Office",
    dueDate: "Jun 15, 2026",
    priority: "high",
    status: "ongoing",
  },
  {
    assignedFacultyId: "fac-john-doe",
    id: "task-2",
    assignee: "Mr. Bala",
    title: "Verify Attendance",
    description: "Verify DBMS attendance records for CSE C before Friday",
    assignedBy: "Academic Cell",
    dueDate: "Jun 13, 2026",
    priority: "medium",
    status: "ongoing",
  },
  {
    assignedFacultyId: "fac-john-doe",
    id: "task-3",
    assignee: "Mr. Bala",
    title: "Prepare Unit 3 Notes",
    description: "Upload DBMS Unit 3 transaction management notes",
    assignedBy: "HOD - CSE",
    dueDate: "Jun 18, 2026",
    priority: "medium",
    status: "ongoing",
  },
  {
    assignedFacultyId: "fac-meera-iyer",
    id: "task-4",
    assignee: "Dr. Meera Iyer",
    title: "Verify Attendance Records",
    description: "Cross-check attendance data for May 2026 semester records",
    assignedBy: "HOD - CSE",
    dueDate: "Jun 12, 2026",
    priority: "medium",
    status: "ongoing",
  },
  {
    assignedFacultyId: "fac-suresh-babu",
    id: "task-5",
    assignee: "Prof. Suresh Babu",
    title: "Submit Lab Assessment",
    description: "Submit OS lab assessment scores for batches CSE A and CSE B",
    assignedBy: "Exam Cell",
    dueDate: "Jun 14, 2026",
    priority: "medium",
    status: "ongoing",
  },
  {
    assignedFacultyId: "fac-anita-rao",
    id: "task-6",
    assignee: "Dr. Anita Rao",
    title: "Review Project Reports",
    description: "Review and grade final year project interim reports",
    assignedBy: "Project Coordinator",
    dueDate: "Jun 18, 2026",
    priority: "high",
    status: "ongoing",
  },
  {
    assignedFacultyId: "fac-ravi-kumar",
    id: "task-7",
    assignee: "Prof. Ravi Kumar",
    title: "Grade Assignments",
    description: "Grade CN Unit 3 assignments for all sections",
    assignedBy: "Admin Office",
    dueDate: "Jun 8, 2026",
    priority: "medium",
    status: "completed",
  },
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

export type AdminProfile = {
  avatarInitials: string;
  greeting: string;
  name: string;
};

export type CollegeOverview = {
  activeEvents: number;
  subjects: number;
  faculty: number;
  students: number;
};

export type ActionRequired = {
  overdueFacultyTasks: number;
  pendingPayments: number;
  userRequests: number;
};

export type UserSummary = {
  admins: number;
  faculty: number;
  students: number;
};

export type FacultyTaskMonitoring = {
  assignedToday: number;
  completed: number;
  pending: number;
};

export type PaymentOverview = {
  collectionRate: number;
  paidStudents: number;
  pendingStudents: number;
};

export type EventsSummary = {
  active: number;
  upcoming: number;
};

export type ActivityType =
  | "event"
  | "faculty"
  | "payment"
  | "role"
  | "task"
  | "user";

export type RecentActivity = {
  description: string;
  id: string;
  time: string;
  title: string;
  type: ActivityType;
};

export const adminProfile: AdminProfile = {
  avatarInitials: "AD",
  greeting: "Good Morning ☀️",
  name: "Admin User",
};

export const collegeOverview: CollegeOverview = {
  activeEvents: 3,
  subjects: 18,
  faculty: 78,
  students: 1050,
};

export const actionRequired: ActionRequired = {
  overdueFacultyTasks: 5,
  pendingPayments: 12,
  userRequests: 3,
};

export const userSummary: UserSummary = {
  admins: 3,
  faculty: 78,
  students: 1050,
};

export const facultyTaskMonitoring: FacultyTaskMonitoring = {
  assignedToday: 8,
  completed: 5,
  pending: 3,
};

export const paymentOverview: PaymentOverview = {
  collectionRate: 84,
  paidStudents: 890,
  pendingStudents: 160,
};

export const eventsSummary: EventsSummary = {
  active: 2,
  upcoming: 4,
};

export type ApprovalPriority = "critical" | "high" | "medium";

export type ApprovalCard = {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  submittedAt: string;
  priority: ApprovalPriority;
  category: "leave" | "grade" | "event" | "payment" | "enrollment";
  count: number;
};

export type WorkflowLog = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "task" | "payment" | "user" | "event" | "leave" | "grade";
};

export type OperationalQueue = {
  id: string;
  queue: string;
  pending: number;
  oldest: string;
  owner: string;
};

export const approvalCards: ApprovalCard[] = [
  {
    id: "ap1",
    title: "Faculty Leave Requests",
    description:
      "4 leave applications pending HOD approval — includes Dr. Meera Iyer (3 days)",
    requestedBy: "HR Department",
    submittedAt: "Jun 10, 2026",
    priority: "high",
    category: "leave",
    count: 4,
  },
  {
    id: "ap2",
    title: "Internal Grade Approvals",
    description:
      "DBMS Unit 2 re-evaluation marks submitted by 3 faculty for admin sign-off",
    requestedBy: "Exam Cell",
    submittedAt: "Jun 9, 2026",
    priority: "critical",
    category: "grade",
    count: 3,
  },
  {
    id: "ap3",
    title: "Event Authorization",
    description:
      "Tech Fest 2026 venue booking and budget revision awaiting supervisor review",
    requestedBy: "Events Committee",
    submittedAt: "Jun 8, 2026",
    priority: "high",
    category: "event",
    count: 1,
  },
  {
    id: "ap4",
    title: "Overdue Faculty Tasks",
    description: "Internal marks upload pending from 5 faculty members",
    requestedBy: "Academic Cell",
    submittedAt: "Jun 9, 2026",
    priority: "critical",
    category: "grade",
    count: actionRequired.overdueFacultyTasks,
  },
  {
    id: "ap5",
    title: "Pending Payments",
    description: "12 students have outstanding fee balances past due date",
    requestedBy: "Finance Office",
    submittedAt: "Jun 8, 2026",
    priority: "high",
    category: "payment",
    count: actionRequired.pendingPayments,
  },
  {
    id: "ap6",
    title: "Enrollment Verification",
    description: "3 new student enrollment requests awaiting document check",
    requestedBy: "Admissions Desk",
    submittedAt: "Jun 7, 2026",
    priority: "medium",
    category: "enrollment",
    count: actionRequired.userRequests,
  },
  {
    id: "ap7",
    title: "Cultural Day Authorization",
    description:
      "Outdoor event permit and security clearance pending admin approval",
    requestedBy: "Student Council",
    submittedAt: "Jun 6, 2026",
    priority: "medium",
    category: "event",
    count: 1,
  },
];

export const workflowLogs: WorkflowLog[] = [
  {
    id: "wl1",
    title: "Leave Request Submitted",
    message: "Dr. Anita Rao requested 2-day medical leave starting Jun 12.",
    time: "8 min ago",
    type: "leave",
  },
  {
    id: "wl2",
    title: "Grade Approval Pending",
    message: "OS internal marks re-evaluation escalated to admin review.",
    time: "22 min ago",
    type: "grade",
  },
  {
    id: "wl3",
    title: "Event Authorization",
    message: "Tech Fest venue contract uploaded for supervisor sign-off.",
    time: "35 min ago",
    type: "event",
  },
  {
    id: "wl4",
    title: "Faculty Task Overdue",
    message: "Internal marks upload task marked overdue for Dr. Meera Iyer.",
    time: "1h ago",
    type: "task",
  },
  {
    id: "wl5",
    title: "Payment Escalation",
    message: "Fee reminder escalated for 3 students in ECE department.",
    time: "2h ago",
    type: "payment",
  },
  {
    id: "wl6",
    title: "Enrollment Verification",
    message: "New student enrollment request received from Arjun Patel.",
    time: "3h ago",
    type: "user",
  },
];

export const operationalQueues: OperationalQueue[] = [
  {
    id: "oq1",
    queue: "Leave Approval Queue",
    pending: 4,
    oldest: "2 days",
    owner: "HR Department",
  },
  {
    id: "oq2",
    queue: "Grade Sign-off Queue",
    pending: 8,
    oldest: "4 days",
    owner: "Exam Cell",
  },
  {
    id: "oq3",
    queue: "Event Authorization Queue",
    pending: 2,
    oldest: "1 day",
    owner: "Events Committee",
  },
  {
    id: "oq4",
    queue: "Fee Reconciliation",
    pending: 12,
    oldest: "2 days",
    owner: "Finance Office",
  },
];

export const recentActivities: RecentActivity[] = [
  {
    description: "Dr. Meera Iyer joined the CSE department.",
    id: "activity-1",
    time: "10 min ago",
    title: "Faculty Added",
    type: "faculty",
  },
  {
    description: "Semester fee payment approved for 24 students.",
    id: "activity-2",
    time: "35 min ago",
    title: "Payment Approved",
    type: "payment",
  },
  {
    description: "Tech Fest 2026 published to the events portal.",
    id: "activity-3",
    time: "1h ago",
    title: "Event Published",
    type: "event",
  },
  {
    description: "Lab assistant role assigned to Arjun Patel.",
    id: "activity-4",
    time: "2h ago",
    title: "User Role Updated",
    type: "role",
  },
  {
    description: "Internal marks upload task marked overdue for 3 faculty.",
    id: "activity-5",
    time: "3h ago",
    title: "Faculty Task Overdue",
    type: "task",
  },
  {
    description: "New student enrollment request from ECE department.",
    id: "activity-6",
    time: "4h ago",
    title: "User Request Received",
    type: "user",
  },
  {
    description: "Workshop registration payments reconciled.",
    id: "activity-7",
    time: "5h ago",
    title: "Payment Reconciled",
    type: "payment",
  },
  {
    description: "Cultural Day event moved to active status.",
    id: "activity-8",
    time: "6h ago",
    title: "Event Activated",
    type: "event",
  },
];

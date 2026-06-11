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

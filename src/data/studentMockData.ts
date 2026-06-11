export type TimetableEntry = {
  label: string;
  room?: string;
  time: string;
  italic?: boolean;
};

export type WeeklyTimetableDay = {
  day: string;
  entries: TimetableEntry[];
};

export type AttendanceSubject = {
  attended: number;
  percentage: number;
  subject: string;
  total: number;
};

export type AttendanceRecord = {
  date: string;
  status: "present" | "absent" | "holiday";
  subject: string;
};

export type InternalMark = {
  assignment: number;
  grade: string;
  ia1: number;
  ia2: number;
  subject: string;
  total: number;
};

export type StudentAssignment = {
  batch: string;
  description: string;
  due_date: string;
  dueLabel: string;
  id: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "submitted";
  title: string;
};

export type Notice = {
  body: string;
  category: string;
  time: string;
  title: string;
};

export type StudyNote = {
  id: string;
  pages: number;
  subject: string;
  title: string;
  updated: string;
};

export type StudentEvent = {
  date: string;
  detail: string;
  location: string;
  shortDate?: string;
  title: string;
  tone?: "accent" | "default";
};

export type PaymentItem = {
  amount: number;
  date: string;
  id: string;
  status: "paid" | "pending" | "overdue";
  title: string;
};

export type SettingItem = {
  description: string;
  enabled: boolean;
  id: string;
  title: string;
};

export const studentCurrentClass = {
  endTime: "11:00 AM",
  room: "Room 204",
  startTime: "10:00 AM",
  status: "PRESENT" as const,
  subject: "Database Management Systems",
};

export const studentTimetableToday: TimetableEntry[] = [
  { label: "DBMS", room: "Room 204", time: "10:00 AM" },
  { label: "Operating Sys", room: "Lab 3", time: "11:00 AM" },
  { label: "Break", time: "12:00 PM", italic: true },
  { label: "CN", room: "Room 112", time: "01:00 PM" },
  { label: "Software Eng", room: "Room 208", time: "02:00 PM" },
];

export const studentWeeklyTimetable: WeeklyTimetableDay[] = [
  {
    day: "Monday",
    entries: [
      { label: "DBMS", room: "Room 204", time: "10:00 AM" },
      { label: "Operating Sys", room: "Lab 3", time: "11:00 AM" },
      { label: "Break", time: "12:00 PM", italic: true },
      { label: "CN", room: "Room 112", time: "01:00 PM" },
    ],
  },
  {
    day: "Tuesday",
    entries: [
      { label: "Software Eng", room: "Room 208", time: "09:00 AM" },
      { label: "DBMS Lab", room: "Lab 1", time: "10:30 AM" },
      { label: "Break", time: "12:00 PM", italic: true },
      { label: "CN", room: "Room 112", time: "01:00 PM" },
    ],
  },
  {
    day: "Wednesday",
    entries: [
      { label: "Operating Sys", room: "Room 305", time: "10:00 AM" },
      { label: "DBMS", room: "Room 204", time: "11:00 AM" },
      { label: "Break", time: "12:00 PM", italic: true },
      { label: "OS Lab", room: "Lab 3", time: "01:30 PM" },
    ],
  },
  {
    day: "Thursday",
    entries: [
      { label: "CN", room: "Room 112", time: "09:30 AM" },
      { label: "Software Eng", room: "Room 208", time: "11:00 AM" },
      { label: "Break", time: "12:00 PM", italic: true },
      { label: "DBMS", room: "Room 204", time: "02:00 PM" },
    ],
  },
  {
    day: "Friday",
    entries: [
      { label: "Operating Sys", room: "Room 305", time: "10:00 AM" },
      { label: "CN Lab", room: "Lab 2", time: "11:30 AM" },
      { label: "Break", time: "12:00 PM", italic: true },
      { label: "Software Eng", room: "Room 208", time: "01:00 PM" },
    ],
  },
  {
    day: "Saturday",
    entries: [
      { label: "DBMS Lab", room: "Lab 1", time: "09:00 AM" },
      { label: "Software Eng", room: "Room 208", time: "10:30 AM" },
      { label: "Break", time: "12:00 PM", italic: true },
      { label: "CN Tutorial", room: "Room 112", time: "01:00 PM" },
    ],
  },
];

export const studentAttendanceSummary = {
  absent: 14,
  percentage: 72,
  present: 36,
  total: 50,
};

export const studentAttendanceBySubject: AttendanceSubject[] = [
  { subject: "DBMS", attended: 28, total: 32, percentage: 88 },
  { subject: "Operating Sys", attended: 24, total: 30, percentage: 80 },
  { subject: "CN", attended: 27, total: 30, percentage: 90 },
  { subject: "Software Eng", attended: 24, total: 26, percentage: 92 },
];

export const studentRecentAttendance: AttendanceRecord[] = [
  { date: "Jun 10, 2026", status: "present", subject: "DBMS" },
  { date: "Jun 9, 2026", status: "present", subject: "Operating Sys" },
  { date: "Jun 8, 2026", status: "absent", subject: "CN" },
  { date: "Jun 7, 2026", status: "present", subject: "Software Eng" },
  { date: "Jun 6, 2026", status: "present", subject: "DBMS" },
];

export const studentPerformanceHighlights = {
  needsAttention: { score: "58%", subject: "Operating Sys" },
  strongest: { score: "92%", subject: "DBMS" },
};

export const studentInternalMarks: InternalMark[] = [
  {
    subject: "DBMS",
    ia1: 23,
    ia2: 24,
    assignment: 18,
    total: 65,
    grade: "A",
  },
  {
    subject: "Operating Sys",
    ia1: 14,
    ia2: 16,
    assignment: 12,
    total: 42,
    grade: "C",
  },
  {
    subject: "CN",
    ia1: 21,
    ia2: 22,
    assignment: 17,
    total: 60,
    grade: "A",
  },
  {
    subject: "Software Eng",
    ia1: 19,
    ia2: 20,
    assignment: 16,
    total: 55,
    grade: "B",
  },
];

export const studentAssignments: StudentAssignment[] = [
  {
    id: "1",
    title: "DBMS Assignment",
    description:
      "Design an ER diagram and normalize a library management database to 3NF.",
    batch: "CSE III",
    due_date: "2026-06-11",
    dueLabel: "Due Tomorrow",
    priority: "high",
    status: "pending",
  },
  {
    id: "2",
    title: "OS Lab Record",
    description:
      "Complete process scheduling simulations and document results for FCFS and SJF.",
    batch: "CSE III",
    due_date: "2026-06-13",
    dueLabel: "Due in 3 Days",
    priority: "medium",
    status: "pending",
  },
  {
    id: "3",
    title: "CN Unit Test Prep",
    description: "Submit short notes on TCP/IP layers and subnetting problems.",
    batch: "CSE III",
    due_date: "2026-06-16",
    dueLabel: "Due in 6 Days",
    priority: "low",
    status: "pending",
  },
  {
    id: "4",
    title: "Software Eng Case Study",
    description: "Agile sprint retrospective report for the mini project phase.",
    batch: "CSE III",
    due_date: "2026-06-02",
    dueLabel: "Submitted",
    priority: "low",
    status: "submitted",
  },
];

export const studentNotices: Notice[] = [
  {
    title: "Internal Exam Schedule",
    body: "The schedule for Semester 5 internals is now live on the portal.",
    time: "2h ago",
    category: "Exams",
  },
  {
    title: "Hackathon Open",
    body: "Register for SAEC Tech-Run 2024 before June 20.",
    time: "Yesterday",
    category: "Events",
  },
  {
    title: "Library Timings Updated",
    body: "Central library will remain open until 8 PM during exam week.",
    time: "Jun 8, 2026",
    category: "Campus",
  },
  {
    title: "Fee Reminder",
    body: "Semester 5 lab fee payment is due by June 25.",
    time: "Jun 5, 2026",
    category: "Finance",
  },
];

export const studentStudyNotes: StudyNote[] = [
  {
    id: "1",
    subject: "DBMS",
    title: "Normalization & ER Modeling",
    updated: "Jun 8, 2026",
    pages: 12,
  },
  {
    id: "2",
    subject: "Operating Sys",
    title: "Process Scheduling Algorithms",
    updated: "Jun 6, 2026",
    pages: 18,
  },
  {
    id: "3",
    subject: "CN",
    title: "TCP/IP & Subnetting",
    updated: "Jun 4, 2026",
    pages: 9,
  },
  {
    id: "4",
    subject: "Software Eng",
    title: "Agile & Sprint Planning",
    updated: "Jun 1, 2026",
    pages: 7,
  },
];

export const studentEvents: StudentEvent[] = [
  {
    date: "Aug 15, 2026",
    shortDate: "15 Aug",
    detail:
      "Annual technical symposium with workshops, hackathons, and project showcases.",
    location: "Main Auditorium",
    title: "Tech Symposium",
    tone: "accent",
  },
  {
    date: "Aug 20, 2026",
    shortDate: "20 Aug",
    detail: "Department-wide project expo for final year and third year teams.",
    location: "Innovation Block",
    title: "Project Expo",
  },
  {
    date: "Jun 14, 2026",
    detail: "Annual technical symposium with workshops and project showcases.",
    location: "Main Auditorium",
    title: "Tech Fest 2026",
    tone: "accent",
  },
  {
    date: "Jun 18, 2026",
    detail: "Inter-department cricket tournament finals.",
    location: "Sports Ground",
    title: "Sports Day Finals",
  },
  {
    date: "Jun 22, 2026",
    detail: "Guest lecture on emerging technologies in engineering.",
    location: "Seminar Hall B",
    title: "Industry Talk Series",
  },
];

export const studentPaymentsSummary = {
  paid: 85000,
  pending: 15000,
  total: 100000,
};

export const studentPayments: PaymentItem[] = [
  {
    id: "1",
    title: "Tuition Fee - Semester 5",
    amount: 45000,
    status: "paid",
    date: "Jan 15, 2026",
  },
  {
    id: "2",
    title: "Lab & Development Fee",
    amount: 12000,
    status: "paid",
    date: "Jan 15, 2026",
  },
  {
    id: "3",
    title: "Examination Fee",
    amount: 8000,
    status: "paid",
    date: "Mar 2, 2026",
  },
  {
    id: "4",
    title: "Transport Fee",
    amount: 10000,
    status: "pending",
    date: "Due Jun 25, 2026",
  },
  {
    id: "5",
    title: "Hostel Maintenance",
    amount: 5000,
    status: "pending",
    date: "Due Jun 25, 2026",
  },
];

export const studentSettings: SettingItem[] = [
  {
    id: "notifications",
    title: "Push Notifications",
    description: "Receive alerts for assignments, notices, and attendance.",
    enabled: true,
  },
  {
    id: "email",
    title: "Email Updates",
    description: "Get weekly summaries and exam reminders by email.",
    enabled: true,
  },
  {
    id: "biometric",
    title: "Biometric Login",
    description: "Use fingerprint or face unlock on supported devices.",
    enabled: false,
  },
  {
    id: "dark-mode",
    title: "Dark Mode",
    description: "Switch to a darker theme for low-light environments.",
    enabled: false,
  },
];

export function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getAssignmentDotColor(priority: StudentAssignment["priority"]) {
  if (priority === "high") {
    return "#F97316";
  }

  if (priority === "medium") {
    return "#1A2F5C";
  }

  return "#808080";
}

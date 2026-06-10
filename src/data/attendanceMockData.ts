export const ATTENDANCE_THRESHOLD = 75;

export type FacultyMember = {
  avatarInitials: string;
  department: string;
  id: string;
  name: string;
  subjects: { section: string; subject: string }[];
};

export type TimetableSlot = {
  day: string;
  endTime: string;
  facultyId: string;
  id: string;
  room: string;
  section: string;
  startTime: string;
  subject: string;
};

export type SectionStudent = {
  id: string;
  name: string;
  rollNo: string;
};

export type AttendanceStatus = "absent" | "present";

export type WeeklyAttendanceDay = {
  day: string;
  status: AttendanceStatus | "holiday";
};

export type ClassAttendanceRecord = {
  absentCount: number;
  date: string;
  presentCount: number;
  section: string;
  subject: string;
  totalStudents: number;
};

export type ClassWiseAttendance = {
  percentage: number;
  section: string;
};

export type DefaulterStudent = {
  name: string;
  percentage: number;
  section: string;
};

const cseAStudents = [
  "Aarav Mehta",
  "Ananya Reddy",
  "Dev Patel",
  "Isha Gupta",
  "Karthik Nair",
  "Lakshmi Rao",
  "Manoj Singh",
  "Neha Verma",
  "Omkar Joshi",
  "Pooja Iyer",
  "Ravi Shankar",
  "Sanjay Kumar",
  "Tanya Desai",
  "Uday Malhotra",
  "Varun Choudhary",
  "Yashika Menon",
  "Zara Khan",
  "Aditya Bose",
  "Bhavana Pillai",
  "Chandan Das",
];

const cseBStudents = [
  "Diya Sharma",
  "Eshan Kapoor",
  "Farhan Ali",
  "Gauri Nambiar",
  "Harsh Vardhan",
  "Irfan Sheikh",
  "Jyoti Mishra",
  "Kunal Agarwal",
  "Lavanya S",
  "Mohit Jain",
  "Nandini K",
  "Ojas Pandey",
  "Pranav R",
  "Qamar Hussain",
  "Ritika Bansal",
  "Sahil Dutta",
  "Tanvi Gowda",
  "Urvashi Menon",
  "Vivek Hegde",
  "Waseem Akram",
];

const cseCStudents = [
  "Rahul Kumar",
  "Priya Sharma",
  "Arjun Nair",
  "Kiran Patel",
  "Sneha Reddy",
  "Amit Joshi",
  "Bhavya Iyer",
  "Chetan Rao",
  "Divya Menon",
  "Esha Verma",
  "Farid Khan",
  "Gopal Singh",
  "Hema Das",
  "Imran Ali",
  "Jaya Krishnan",
  "Kavya Nambiar",
  "Lokesh Gowda",
  "Meera Pillai",
  "Nikhil Bose",
  "Oviya S",
];

function buildStudents(
  section: string,
  prefix: string,
  names: string[],
): SectionStudent[] {
  return names.map((name, index) => ({
    id: `stu-${prefix}-${String(index + 1).padStart(2, "0")}`,
    name,
    rollNo: `${prefix}${String(index + 1).padStart(3, "0")}`,
  }));
}

export const facultyMembers: FacultyMember[] = [
  {
    avatarInitials: "JD",
    department: "Computer Science",
    id: "fac-001",
    name: "Dr. John Doe",
    subjects: [
      { section: "CSE C", subject: "DBMS" },
      { section: "CSE A", subject: "Operating Systems" },
    ],
  },
];

export const loggedInFacultyId = "fac-001";

export const facultyTimetableToday: TimetableSlot[] = [
  {
    day: "Monday",
    endTime: "10:00 AM",
    facultyId: "fac-001",
    id: "slot-dbms-csec",
    room: "302",
    section: "CSE C",
    startTime: "09:00 AM",
    subject: "DBMS",
  },
  {
    day: "Monday",
    endTime: "11:00 AM",
    facultyId: "fac-001",
    id: "slot-os-csea",
    room: "205",
    section: "CSE A",
    startTime: "10:00 AM",
    subject: "Operating Systems",
  },
  {
    day: "Monday",
    endTime: "01:00 PM",
    facultyId: "fac-001",
    id: "slot-dbms-lab",
    room: "Lab 1",
    section: "CSE C",
    startTime: "12:00 PM",
    subject: "DBMS Lab",
  },
];

export const facultyTimetableMonday: TimetableSlot[] = facultyTimetableToday;

export const facultyCurrentClass = facultyTimetableToday[0];

export const facultyAttendanceReminder = {
  minutesUntilStart: 10,
  section: facultyCurrentClass.section,
  slotId: facultyCurrentClass.id,
  subject: facultyCurrentClass.subject,
};

export const sectionStudents: Record<string, SectionStudent[]> = {
  "CSE A": buildStudents("CSE A", "21CSA", cseAStudents),
  "CSE B": buildStudents("CSE B", "21CSB", cseBStudents),
  "CSE C": buildStudents("CSE C", "21CSC", cseCStudents),
};

export function getStudentsForSection(section: string): SectionStudent[] {
  return sectionStudents[section] ?? [];
}

export const facultyTodayAttendanceRecords: ClassAttendanceRecord[] = [
  {
    absentCount: 0,
    date: "Jun 10, 2026",
    presentCount: 20,
    section: "CSE A",
    subject: "Operating Systems",
    totalStudents: 20,
  },
];

export const facultyPreviousWeekRecords: ClassAttendanceRecord[] = [
  {
    absentCount: 2,
    date: "Jun 3, 2026",
    presentCount: 18,
    section: "CSE C",
    subject: "DBMS",
    totalStudents: 20,
  },
  {
    absentCount: 1,
    date: "Jun 4, 2026",
    presentCount: 19,
    section: "CSE A",
    subject: "Operating Systems",
    totalStudents: 20,
  },
  {
    absentCount: 3,
    date: "Jun 5, 2026",
    presentCount: 17,
    section: "CSE C",
    subject: "DBMS",
    totalStudents: 20,
  },
  {
    absentCount: 0,
    date: "Jun 6, 2026",
    presentCount: 20,
    section: "CSE A",
    subject: "Operating Systems",
    totalStudents: 20,
  },
  {
    absentCount: 2,
    date: "Jun 9, 2026",
    presentCount: 18,
    section: "CSE C",
    subject: "DBMS",
    totalStudents: 20,
  },
];

export const loggedInStudent = {
  id: "stu-21csc-01",
  name: "Rahul Kumar",
  section: "CSE C",
};

export const studentTodayClassAttendance = {
  endTime: "10:00 AM",
  room: "302",
  startTime: "09:00 AM",
  status: "present" as AttendanceStatus,
  subject: "DBMS",
};

export const studentWeeklyAttendance: WeeklyAttendanceDay[] = [
  { day: "Monday", status: "present" },
  { day: "Tuesday", status: "present" },
  { day: "Wednesday", status: "absent" },
  { day: "Thursday", status: "present" },
  { day: "Friday", status: "present" },
];

export const studentSubjectAttendance = [
  { percentage: 92, subject: "DBMS" },
  { percentage: 88, subject: "OS" },
  { percentage: 95, subject: "CN" },
];

export const studentOverallAttendance = {
  absent: 14,
  percentage: 72,
  present: 36,
  total: 50,
};

export const adminAttendanceOverview = {
  overallPercentage: 88,
};

export const adminClassWiseAttendance: ClassWiseAttendance[] = [
  { percentage: 92, section: "CSE A" },
  { percentage: 85, section: "CSE B" },
  { percentage: 87, section: "CSE C" },
  { percentage: 90, section: "ECE A" },
  { percentage: 83, section: "ECE B" },
];

export const adminLowAttendanceClasses: ClassWiseAttendance[] = [
  { percentage: 73, section: "CSE C" },
  { percentage: 74, section: "MECH B" },
];

export const adminDefaulterStudents: DefaulterStudent[] = [
  { name: "Rahul Kumar", percentage: 69, section: "CSE C" },
  { name: "Kiran Patel", percentage: 71, section: "CSE C" },
  { name: "Sneha Reddy", percentage: 72, section: "CSE C" },
  { name: "Arjun Nair", percentage: 74, section: "CSE C" },
];

export function formatAttendanceDate(): string {
  return "Jun 10, 2026";
}

export function getAttendanceStatusColor(
  status: AttendanceStatus | "holiday" | "pending",
): string {
  if (status === "present") {
    return "#16A34A";
  }
  if (status === "absent") {
    return "#DC2626";
  }
  if (status === "holiday") {
    return "#808080";
  }
  return "#F59E0B";
}

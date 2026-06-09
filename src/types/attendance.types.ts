export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface AttendanceRecord {
  classId?: string;
  courseId: string;
  date: string;
  id: string;
  markedBy?: string;
  status: AttendanceStatus;
  studentId: string;
}

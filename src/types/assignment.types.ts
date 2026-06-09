export type AssignmentStatus = "draft" | "published" | "submitted" | "graded";

export interface Assignment {
  courseId: string;
  description?: string | null;
  dueDate?: string | null;
  id: string;
  status: AssignmentStatus;
  title: string;
}

export interface AssignmentSubmission {
  assignmentId: string;
  id: string;
  submittedAt?: string;
  studentId: string;
}

export type TaskPriority = "high" | "low" | "medium";
export type TaskStatus = "completed" | "pending";

export type AdminAssignedTask = {
  assignedFaculty: string;
  dueDate: string;
  id: string;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
};

export const facultyTaskChecklist: {
  facultyName: string;
  id: string;
  status: TaskStatus;
  taskTitle: string;
}[] = [
  {
    facultyName: "Mr. Bala",
    id: "check-1",
    status: "completed",
    taskTitle: "Upload Internal Marks",
  },
  {
    facultyName: "Prof. Smith",
    id: "check-2",
    status: "completed",
    taskTitle: "Verify Attendance",
  },
  {
    facultyName: "Dr. Priya",
    id: "check-3",
    status: "pending",
    taskTitle: "Prepare Model Question Paper",
  },
];

export const recentlyAssignedTasks: AdminAssignedTask[] = [
  {
    assignedFaculty: "Mr. Bala",
    dueDate: "20-06-2026",
    id: "task-1",
    priority: "high",
    status: "pending",
    title: "Upload Internal Marks",
  },
  {
    assignedFaculty: "Prof. Smith",
    dueDate: "21-06-2026",
    id: "task-2",
    priority: "medium",
    status: "completed",
    title: "Verify Attendance",
  },
  {
    assignedFaculty: "Dr. Priya",
    dueDate: "24-06-2026",
    id: "task-3",
    priority: "high",
    status: "pending",
    title: "Prepare Model Question Paper",
  },
];

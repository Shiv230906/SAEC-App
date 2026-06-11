export const ROUTES = {
  LOGIN: "/login",
  STUDENT_DASHBOARD: "/(student)/dashboard",
  FACULTY_DASHBOARD: "/(faculty)/dashboard",
  FACULTY_TASKS: "/(faculty)/tasks",
  ADMIN_DASHBOARD: "/(admin)/dashboard",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

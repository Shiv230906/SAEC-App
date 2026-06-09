import type { UserRole } from "./auth.types";

export interface AppUser {
  createdAt?: string;
  departmentId?: string | null;
  email?: string | null;
  fullName?: string | null;
  id: string;
  role: UserRole;
}

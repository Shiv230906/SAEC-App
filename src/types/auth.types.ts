import type { Session, User } from "@supabase/supabase-js";

export type UserRole = "student" | "faculty" | "admin";

export interface AuthProfile {
  id?: string;
  role?: UserRole | string | null;
  user_id?: string;
  [key: string]: unknown;
}

export interface AuthState {
  loading: boolean;
  profile: AuthProfile | null;
  role: UserRole | null;
  session: Session | null;
  user: User | null;
}

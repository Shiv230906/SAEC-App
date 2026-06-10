import type { User } from "@supabase/supabase-js";

import type { UserRole } from "@/src/context/AuthContext";

type ProfileLike = Record<string, unknown> | null | undefined;

const roleLabels = {
  admin: "Admin",
  faculty: "Faculty",
  student: "Student",
} satisfies Record<UserRole, string>;

export function getStringField(
  source: ProfileLike,
  fields: readonly string[]
) {
  if (!source) {
    return null;
  }

  for (const field of fields) {
    const value = source[field];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
}

export function getDisplayName(profile: ProfileLike, user: User | null) {
  return (
    getStringField(profile, ["full_name", "fullName", "name"]) ??
    getStringField(user?.user_metadata, ["full_name", "fullName", "name"])
  );
}

export function getRoleLabel(role: UserRole | null) {
  return role ? roleLabels[role] : undefined;
}

export function getStudentSubtitle(profile: ProfileLike) {
  const year =
    getStringField(profile, ["year", "year_of_study", "current_year"]) ??
    "III Year";
  const branch =
    getStringField(profile, [
      "branch",
      "department",
      "course",
      "program",
    ]) ?? "CSE";

  return `${year} ${branch} - Student`;
}

export function getProfileRoute(role: UserRole) {
  if (role === "admin") {
    return "/(admin)/profile" as const;
  }

  if (role === "faculty") {
    return "/(faculty)/profile" as const;
  }

  return "/(student)/profile" as const;
}

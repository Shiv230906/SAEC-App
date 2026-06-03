import { Session, User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { supabase } from "../services/supabase";

export type UserRole = "student" | "faculty" | "admin";

type Profile = {
  id?: string;
  user_id?: string;
  role?: string | null;
  [key: string]: unknown;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function normalizeRole(role: unknown): UserRole | null {
  if (typeof role !== "string") {
    return null;
  }

  const normalizedRole = role.toLowerCase();

  if (
    normalizedRole === "student" ||
    normalizedRole === "faculty" ||
    normalizedRole === "admin"
  ) {
    return normalizedRole;
  }

  return null;
}

function getMetadataRole(user: User | null) {
  return normalizeRole(
    user?.app_metadata?.role ??
      user?.user_metadata?.role
  );
}

async function getProfile(userId: string) {
  const byId = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (byId.data) {
    return byId.data;
  }

  const byUserId = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (byUserId.error) {
    throw byUserId.error;
  }

  return byUserId.data;
}

export function getDashboardRoute(role: UserRole | null) {
  if (role === "admin") {
    return "/(admin)/dashboard" as const;
  }

  if (role === "faculty") {
    return "/(faculty)/dashboard" as const;
  }

  return "/(student)/dashboard" as const;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession(nextSession: Session | null) {
      const nextUser = nextSession?.user ?? null;

      if (!nextUser) {
        if (isMounted) {
          setSession(null);
          setProfile(null);
          setRole(null);
          setLoading(false);
        }

        return;
      }

      try {
        const nextProfile = await getProfile(nextUser.id);
        const nextRole =
          normalizeRole(nextProfile?.role) ??
          getMetadataRole(nextUser) ??
          "student";

        if (isMounted) {
          setSession(nextSession);
          setProfile(nextProfile);
          setRole(nextRole);
        }
      } catch (error) {
        console.error("Failed to load profile", error);

        if (isMounted) {
          setSession(nextSession);
          setProfile(null);
          setRole(getMetadataRole(nextUser) ?? "student");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    supabase.auth
      .getSession()
      .then(({ data }) => loadSession(data.session))
      .catch((error) => {
        console.error("Failed to load session", error);

        if (isMounted) {
          setLoading(false);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setLoading(true);
      void loadSession(nextSession);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      profile,
      role,
      loading,
      signOut: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        }
      },
    }),
    [loading, profile, role, session]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

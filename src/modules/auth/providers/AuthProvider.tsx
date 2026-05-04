import { useContext, useEffect, useState, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/services/supabase/supabaseClient";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "@/services/supabase/auth.service";
import type {
  LoginCredentials,
  AuthRole,
  UserProfile,
} from "../types/auth.types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<AuthRole | null>(null);

  const initialized = useRef(false);

  const loadUserData = async (userId: string) => {
    try {
      const [roleRes, profileRes] = await Promise.all([
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .maybeSingle(),
        supabase
          .from("users")
          .select("id, name, email")
          .eq("id", userId)
          .maybeSingle(),
      ]);

      const rawRole = roleRes?.data?.role;
      if (rawRole === "admin" || rawRole === "editor" || rawRole === "user") {
        setRole(rawRole);
      } else {
        console.warn(`Unexpected role: ${rawRole}. Defaulting to 'user'.`);
        setRole("user");
      }

      if (profileRes?.data) {
        setProfile(profileRes.data as UserProfile);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error("Error loading user extended data:", err);
      setRole("user");
    }
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initialize = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.auth.getUser();
        const currentUser = data.user ?? null;

        if (currentUser) {
          await loadUserData(currentUser.id);
        }

        setUser(currentUser);
      } catch (err) {
        console.error("Auth init failed: ", err);
      } finally {
        setLoading(false);
      }
    };

    initialize();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;

        if (currentUser) {
          await loadUserData(currentUser.id);
        } else {
          setProfile(null);
          setRole(null);
        }

        setUser(currentUser);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const result = await loginUser(credentials.email, credentials.password);
      if (result) {
        await loadUserData(result.id);
        setUser(result);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        loading,
        isLoading,
        login,
        logout: signOut,
        signInWithGoogle,
        isAuthenticated: !!user,
        refreshProfile,
      }}
    >
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

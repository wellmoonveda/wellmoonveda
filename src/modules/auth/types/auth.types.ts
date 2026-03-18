import type { User } from "@supabase/supabase-js";

// Credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

// Password reset
export interface ResetPasswordPayload {
  email: string;
}

// Auth Context 
export interface AuthContextValue {
  user: User | null;

  loading: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (credentials: LoginCredentials) => Promise<User>;

  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export type AuthRole = "user" | "admin" | "editor";
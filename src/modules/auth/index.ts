// Public exports for auth module

// Routes
export { AuthRoutes } from "./routes/auth.routes";

// Provider & Hook
export { AuthProvider, useAuth } from "./providers/AuthProvider";

// Guards
export { default as ProtectedRoute } from "./guards/ProtectedRoute";

// Types
export type {
  AuthRole,
  AuthContextValue,
  LoginCredentials,
  SignupCredentials,
  ResetPasswordPayload,
} from "./types/auth.types";

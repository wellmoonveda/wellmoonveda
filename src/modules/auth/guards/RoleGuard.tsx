import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useUserRole } from "../hooks/useUserRole";
import { useUserProfile } from "../hooks/useUserProfile";

type Props = {
  children: React.ReactNode;
  allowedRole: string;
};

export default function RoleGuard({ children, allowedRole }: Props) {
  const { user } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const { profile, loading: profileLoading } = useUserProfile();

  // 🔄 Loading state
  if (roleLoading || profileLoading) {
    return <div className="p-6">Checking permissions...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Role not loaded
  if (!role) {
    return <div>Loading role...</div>;
  }

  //Profile is null
  if (!profile) {
    return <div>Loading profile...</div>;
  }

  // Role mismatch
  if (role !== allowedRole) {
    console.log("Access denied. Role:", role, "Expected:", allowedRole);
    return <Navigate to="/auth/login" replace />;
  }

  // PASSWORD RESET LOGIC (ONLY EDITORS)
  if (role === "editor" && profile && !profile.password_set) {
    return <Navigate to="/auth/set-password" replace />;
  }

  return <>{children}</>;
}

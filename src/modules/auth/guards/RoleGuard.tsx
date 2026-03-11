import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useUserRole } from "../hooks/useUserRole";

type Props = {
  children: React.ReactNode;
  allowedRole: string;
};

export default function RoleGuard({ children, allowedRole }: Props) {
  const { user } = useAuth();

  const { role, loading } = useUserRole(user?.id);

  if (loading) {
    return <div className="p-6">Checking permissions...</div>;
  }

  // if (role !== allowedRole) {
  //   return <Navigate to="/auth/login" replace />;
  // }

  if (!role) {
    return <div>Loading role...</div>;
  }

  if (role !== allowedRole) {
    console.log("Access denied. Role:", role, "Expected:", allowedRole);
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

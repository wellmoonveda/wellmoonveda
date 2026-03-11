import { Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import DashboardPage from "@/modules/dashboard/user/pages/DashboardPage";
import AccountSettingsPage from "@/modules/dashboard/user/pages/AccountSettingsPage";

import ProtectedRoute from "@/modules/auth/guards/ProtectedRoute";
import RoleGuard from "@/modules/auth/guards/RoleGuard";

export function UserRoutes() {
  return (
    <Route
      path="/user"
      element={
        <ProtectedRoute>
          {/* <RoleGuard allowedRole="user">
            <UserLayout />
          </RoleGuard> */}
          <UserLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="account" element={<AccountSettingsPage />} />
    </Route>
  );
}

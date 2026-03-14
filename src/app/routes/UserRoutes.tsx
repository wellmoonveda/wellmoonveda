import { Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import DashboardPage from "@/modules/dashboard/user/pages/DashboardPage";
import AccountSettingsPage from "@/modules/dashboard/user/pages/AccountSettingsPage";
import HealingPathsPage from "@/modules/dashboard/user/pages/UserHealingPathsPage";
import MyContentPage from "@/modules/dashboard/user/pages/MyContentPage";

import ProtectedRoute from "@/modules/auth/guards/ProtectedRoute";

export function UserRoutes() {
  return (
    <Route
      path="/user"
      element={
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="healing-paths" element={<HealingPathsPage />} />
      <Route path="my-content" element={<MyContentPage />} />
      <Route path="account" element={<AccountSettingsPage />} />
    </Route>
  );
}

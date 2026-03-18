import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/modules/auth";
import RoleGuard from "@/modules/auth/guards/RoleGuard";
//Admin Pages
import DashboardPage from "@/modules/dashboard/admin/pages/DashboardPage";
import EditorsPage from "@/modules/dashboard/admin/pages/EditorsPage";
import ReviewQueuePage from "@/modules/dashboard/admin/pages/ReviewQueuePage";
import MediaLibraryPage from "@/modules/dashboard/admin/pages/MediaLibraryPage";
import AnalyticsPage from "@/modules/dashboard/admin/pages/AnalyticsPage";
import SettingsPage from "@/modules/dashboard/admin/pages/SettingsPage";
import AdminLayout from "../layouts/AdminLayout";
import CreatePostPage from "@/modules/dashboard/post/pages/CreatePostPage";
import MessagesPage from "@/modules/dashboard/admin/pages/MessagesPage";

export function AdminRoutes() {
  return (
    <>
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="admin">
              <AdminLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="editors" element={<EditorsPage />} />
        <Route path="review" element={<ReviewQueuePage />} />
        <Route path="media" element={<MediaLibraryPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="posts/create" element={<CreatePostPage />} />
      </Route>
    </>
  );
}

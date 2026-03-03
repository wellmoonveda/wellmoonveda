import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/modules/auth";

import { DashboardLayout } from "../layouts/DashboardLayout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUIController from "../layouts/admin/AdminUIController";
import AdminEditorsPage from "../pages/admin/users/AdminEditorsPage";
import AdminMediaPage from "../pages/admin/media/AdminMediaPage";
import AdminSubscribersPage from "../pages/admin/users/AdminSubscribersPage";
import AdminAuditLogPage from "../pages/admin/system/AdminAuditLogPage";
import AdminPendingSubmissionsPage from "../pages/admin/review/AdminPendingSubmissionsPage";
import AdminCreateEditorPage from "../pages/admin/users/AdminCreateEditorPage";
import AdminAddMediaPage from "../pages/admin/media/AdminAddMediaPage";

//Editor Routes

import { EditorDashboard } from "../pages/editor/EditorDashboard";
import { DraftsPage } from "../pages/editor/content/DraftsPage";
import { PendingPage } from "../pages/editor/content/PendingPage";
import { RejectedPage } from "../pages/editor/content/RejectedPage";
import { PublishedPage } from "../pages/editor/content/PublishedPage";
import { EditorMediaPage } from "../pages/editor/media/EditorMediaPage";
import { EditorNewPostPage } from "../pages/editor/create/EditorNewPostPage";
import { EditorProfilePage } from "../pages/editor/profile/EditorProfilePage";
import { EditorUIController } from "../layouts/editor/EditorUIController";

//user routes
import UserLayout from "../layouts/user/UserLayout";
import UserDashboard from "../pages/user/UserDashboard";
import UserMyContentPage from "../pages/user/UserMyContentPage";
import UserHealingPathsPage from "../pages/user/UserHealingPathsPage";
import UserSubscriptionPage from "../pages/user/UserSubscriptionPage";
import UserSettingsPage from "../pages/user/UserSettingsPage";

export function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* ADMIN */}
        <Route path="admin" element={<ProtectedRoute requiredRole="admin" />}>
          <Route element={<AdminUIController />}>
            <Route index element={<AdminDashboard />} />
            {/* Moderation */}
            <Route path="review" element={<AdminPendingSubmissionsPage />} />

            {/* Users */}
            <Route
              path="users/subscribers"
              element={<AdminSubscribersPage />}
            />
            <Route path="users/editors" element={<AdminEditorsPage />} />
            <Route
              path="users/editors/create"
              element={<AdminCreateEditorPage />}
            />

            {/* Media */}
            <Route path="media" element={<AdminMediaPage />} />
            <Route path="media/add" element={<AdminAddMediaPage />} />

            {/* System */}
            <Route path="system/audits" element={<AdminAuditLogPage />} />
          </Route>
        </Route>

        {/* EDITOR */}
        <Route path="editor" element={<ProtectedRoute requiredRole="editor" />}>
          <Route element={<EditorUIController />}>
            {/* Dashboard */}
            <Route index element={<EditorDashboard />} />

            {/* Content */}
            <Route path="content/drafts" element={<DraftsPage />} />
            <Route path="content/pending" element={<PendingPage />} />
            <Route path="content/rejected" element={<RejectedPage />} />
            <Route path="content/published" element={<PublishedPage />} />

            {/* Media (read-only) */}
            <Route path="media/library" element={<EditorMediaPage />} />

            {/* Create */}
            <Route path="create/new" element={<EditorNewPostPage />} />

            {/* Profile */}
            <Route path="profile" element={<EditorProfilePage />} />
          </Route>
        </Route>

        {/* USER */}
        <Route path="user" element={<ProtectedRoute requiredRole="user" />}>
          <Route element={<UserLayout />}>
            {/* Home / Overview */}
            <Route index element={<UserDashboard />} />

            {/* My Content */}
            <Route path="my-content" element={<UserMyContentPage />} />

            {/* Healing Paths */}
            <Route path="healing-paths" element={<UserHealingPathsPage />} />

            {/* Subscription */}
            <Route path="subscription" element={<UserSubscriptionPage />} />

            {/* Settings */}
            <Route path="settings" element={<UserSettingsPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

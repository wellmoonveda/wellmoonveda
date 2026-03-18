import { Route } from "react-router-dom";
import EditorLayout from "@/app/layouts/EditorLayout";
import RoleGuard from "@/modules/auth/guards/RoleGuard";
import { ProtectedRoute } from "@/modules/auth";

import DashboardPage from "@/modules/dashboard/editor/pages/DashboardPage";
import MyPostsPage from "@/modules/dashboard/editor/pages/MyPostsPage";
import DeletionRequestsPage from "@/modules/dashboard/editor/pages/DeletionRequestsPage";
import SettingsPage from "@/modules/dashboard/editor/pages/SettingsPage";
import CreatePostPage from "@/modules/dashboard/post/pages/CreatePostPage";
import EditPostPage from "@/modules/dashboard/post/pages/EditPostPage";

export function EditorRoutes() {
  return (
    <Route
      path="/editor"
      element={
        <ProtectedRoute>
          <RoleGuard allowedRole="editor">
            <EditorLayout />
          </RoleGuard>
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="posts" element={<MyPostsPage />} />
      <Route path="posts/create" element={<CreatePostPage />} />
      <Route path="posts/edit/:id" element={<EditPostPage />} />
      <Route path="deletion-requests" element={<DeletionRequestsPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  );
}

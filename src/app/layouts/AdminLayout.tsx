import { Outlet } from "react-router-dom";
import AdminHeader from "@/modules/dashboard/admin/components/AdminHeader";
import AdminSidebar from "@/modules/dashboard/admin/components/AdminSidebar";
import { AdminAnalyticsProvider } from "@/modules/dashboard/admin/providers/AdminAnalyticsProvider";

export default function AdminLayout() {
  return (
    <AdminAnalyticsProvider>
      <div className="dashboard-theme min-h-screen bg-page flex">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <AdminHeader />
          <main className="p-6 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminAnalyticsProvider>
  );
}

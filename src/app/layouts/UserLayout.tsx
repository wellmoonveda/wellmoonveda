import { Outlet } from "react-router-dom";
import UserSidebar from "@/modules/dashboard/user/components/UserSidebar";
import UserHeader from "@/modules/dashboard/user/components/UserHeader";
import "../../styles/user-dashboard-theme.css";

export default function UserLayout() {
  return (
    <div className="user-theme min-h-screen flex bg-page">
      <UserSidebar />

      <div className="flex-1 flex flex-col">
        <UserHeader />

        <main className="flex-1 p-6 bg-page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

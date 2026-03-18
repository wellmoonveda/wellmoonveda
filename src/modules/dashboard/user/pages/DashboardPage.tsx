import SubscriptionStatusCard from "../components/SubscriptionStatusCard";
import { useUserDashboard } from "../hooks/useUserDashboard";
import { useAuth } from "@/modules/auth";

export default function DashboardPage() {
  const auth = useAuth();
  const user = auth?.user;
  const { stats, loading } = useUserDashboard(user?.id);

  if (!user) {
    return <div className="card">Loading User...</div>;
  }

  if (loading) {
    return <div className="card">Loading dashboard...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <SubscriptionStatusCard />

      <div className="card">
        <h3 className="font-semibold text-main mb-2">Healing Paths Started</h3>

        <p className="text-muted">{stats?.startedPaths ?? 0}</p>
      </div>

      <div className="card">
        <h3 className="font-semibold text-main mb-2">Recently Accessed Path</h3>

        <p className="text-muted">{stats?.recentPath?.path_id ?? "None"}</p>
      </div>
    </div>
  );
}

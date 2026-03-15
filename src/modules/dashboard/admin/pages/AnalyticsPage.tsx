import { useAdminAnalytics } from "../hooks/useAdminAnalytics";
import HealingPathAnalytics from "../components/HealingPathAnalytics";
import HealingPathChart from "../components/HealingPathChart";
import EditorPublishingChart from "../components/EditorPublishingChart";
import SubscriptionGrowthChart from "../components/SubscriptionGrowthChart";

export default function AnalyticsPage() {
  const { activeSubscriptions, editorPublishing, loading, totalUsers } =
    useAdminAnalytics();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-lg font-semibold text-main">Analytics</h2>
        <p className="text-sm text-sub">
          Platform insights and engagement metrics
        </p>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-main font-semibold mb-2">Total Users</h3>

          {loading ? (
            <div className="animate-pulse h-8 w-40 bg-soft rounded"></div>
          ) : (
            <div className="text-3xl font-bold text-main">{totalUsers}</div>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-main font-semibold mb-2">Active Subscriptions</h3>

          {loading ? (
            <div className="animate-pulse h-8 w-40 bg-soft rounded"></div>
          ) : (
            <div className="text-3xl font-bold text-main">
              {activeSubscriptions}
            </div>
          )}
        </div>
      </div>

      {/* Healing Path Popularity */}
      <HealingPathAnalytics />

      {/* Editor Publishing Stats */}
      <div className="card p-6">
        <h3 className="text-main font-semibold mb-4">
          Editor Publishing Activity
        </h3>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-soft rounded"></div>
            <div className="h-4 bg-soft rounded"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {editorPublishing.map((editor, index) => (
              <div key={index} className="flex justify-between text-sub">
                <span>{editor.name}</span>
                <span>{editor.posts}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubscriptionGrowthChart />
        <HealingPathChart />
        <EditorPublishingChart />
      </div>
    </div>
  );
}

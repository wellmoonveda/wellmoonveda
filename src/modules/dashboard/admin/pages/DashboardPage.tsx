import SubscriberStats from "../components/SubscriberStats";
import HealingPathAnalytics from "../components/HealingPathAnalytics";
import { useAdminAnalyticsContext } from "../providers/AdminAnalyticsProvider";

export default function DashboardPage() {
  const { editorActivity, loading, recentPosts, activeSubscriptions } =
    useAdminAnalyticsContext();
  return (
    <div className="dashboard-theme p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubscriberStats />

        {/*Active Subscriptions */}
        <div className="card p-6">
          <h3 className="text-lg text-main font-semibold mb-2">
            Active Subscriptions
          </h3>
          {loading ? (
            <div className="animate-pulse h-8 w-20 bg-soft rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-main">
              {activeSubscriptions}
            </p>
          )}
        </div>

        <HealingPathAnalytics />
      </div>

      {/* Recent Editor Activity */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Editor Activity</h3>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-soft rounded"></div>
            <div className="h-4 bg-soft rounded"></div>
            <div className="h-4 bg-soft rounded"></div>
          </div>
        ) : (
          <ul className="space-y-2">
            {editorActivity.map((item, index) => (
              <li key={index} className="text-sub">
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Published Posts */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 text-main">
          Recent Published Posts
        </h3>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-soft rounded"></div>
            <div className="h-4 bg-soft rounded"></div>
            <div className="h-4 bg-soft rounded"></div>
          </div>
        ) : (
          <ul className="space-y-2">
            {recentPosts.map((post) => (
              <li key={post.id} className="text-sub">
                {post.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

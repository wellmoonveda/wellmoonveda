import { useAdminAnalyticsContext } from "../providers/AdminAnalyticsProvider";

const HealingPathAnalytics = () => {
  const { healingPaths, loading } = useAdminAnalyticsContext();

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="h-6 w-48 bg-soft rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-soft rounded"></div>
          <div className="h-4 bg-soft rounded"></div>
          <div className="h-4 bg-soft rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-main mb-4">
        Healing Path Usage
      </h3>

      <div className="space-y-3">
        {healingPaths.map((path) => (
          <div key={path.path_slug} className="flex justify-between text-sub">
            <span>{path.path_slug}</span>
            <span>{path.views}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealingPathAnalytics;

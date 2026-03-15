import { useAdminAnalyticsContext } from "../providers/AdminAnalyticsProvider";

const SubscriberStats = () => {
  const { subscriberCount, loading } = useAdminAnalyticsContext();

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="h-6 w-40 bg-soft rounded mb-4"></div>
        <div className="h-8 w-24 bg-soft rounded"></div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-main mb-2">
        Total Subscribers
      </h3>

      <p className="text-3xl font-bold text-main">{subscriberCount}</p>
    </div>
  );
};

export default SubscriberStats;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useAdminAnalyticsContext } from "../providers/AdminAnalyticsProvider";

const SubscriptionGrowthChart = () => {
  const { subscriptionGrowth, loading } = useAdminAnalyticsContext();

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="h-6 w-40 bg-soft rounded mb-4"></div>
        <div className="h-64 bg-soft rounded"></div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-main mb-4">
        Subscription Growth
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={subscriptionGrowth}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="subscriptions"
            stroke="#d4af37"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionGrowthChart;

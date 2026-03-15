import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminAnalyticsContext } from "../providers/AdminAnalyticsProvider";

const HealingPathChart = () => {
  const { healingPaths, loading } = useAdminAnalyticsContext();

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
        Healing Path Popularity
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={healingPaths}>
          <XAxis dataKey="path_slug" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#d4af37" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealingPathChart;

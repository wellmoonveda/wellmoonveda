import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminAnalyticsContext } from "../providers/AdminAnalyticsProvider";

const EditorPublishingChart = () => {
  const { editorPublishing, loading } = useAdminAnalyticsContext();

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
        Editor Publishing Activity
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={editorPublishing}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="posts" fill="#9A7B4F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EditorPublishingChart;

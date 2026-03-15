import { createContext, useContext, useState } from "react";
import { useAdminAnalytics } from "../hooks/useAdminAnalytics";
import type {
  AdminAnalyticsData,
  AnalyticsTimeRange,
} from "@/shared/types/analytics.types";

type AdminAnalyticsContextType = AdminAnalyticsData & {
  timeRange: AnalyticsTimeRange;
  setTimeRange: (value: AnalyticsTimeRange) => void;
};

const AdminAnalyticsContext = createContext<AdminAnalyticsContextType | null>(
  null,
);

export const AdminAnalyticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [timeRange, setTimeRange] = useState<AnalyticsTimeRange>("30d");

  const analytics = useAdminAnalytics(timeRange);

  return (
    <AdminAnalyticsContext.Provider
      value={{
        ...analytics,
        timeRange,
        setTimeRange,
      }}
    >
      {children}
    </AdminAnalyticsContext.Provider>
  );
};

export const useAdminAnalyticsContext = () => {
  const context = useContext(AdminAnalyticsContext);

  if (!context) {
    throw new Error(
      "useAdminAnalyticsContext must be used inside AdminAnalyticsProvider",
    );
  }

  return context;
};

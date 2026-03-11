import { useSubscription } from "../hooks/useSubscription";
import { useAuth } from "@/modules/auth";

export default function SubscriptionStatusCard() {
  const auth = useAuth();
  const user = auth?.user;
  const { subscription, loading } = useSubscription(user?.id);

  if (loading) {
    return <div className="card">Loading subscription...</div>;
  }

  if (!subscription) {
    return (
      <div className="card">
        <h3 className="text-main font-semibold mb-3">Subscription</h3>

        <p className="text-muted mb-3">You are not subscribed.</p>

        <button className="btn-primary">Subscribe Now</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-main font-semibold mb-3">Subscription</h3>

      <p className="text-sub">Plan: {subscription?.plan ?? "No Active Plan"}</p>

      <p className="text-muted">
        Renewal:{" "}
        {subscription?.renewal_date
          ? new Date(subscription.renewal_date).toDateString()
          : "Not subscribed"}
      </p>
    </div>
  );
}

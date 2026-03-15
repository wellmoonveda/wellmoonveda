import MessagesTable from "../components/MessagesTable";
import { useMessages } from "../hooks/useMessages";

const MessagesPage = () => {
  const { messages, loading, error } = useMessages();

  return (
    <div className="dashboard-theme bg-page min-h-screen p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-main">Messages</h1>
        <p className="text-muted mt-1">
          Messages submitted through the website contact form.
        </p>
      </div>

      {/* Error State */}
      {error && <div className="card p-4 text-red-500">{error}</div>}

      {/* Messages Table */}
      <MessagesTable messages={messages} loading={loading} />
    </div>
  );
};

export default MessagesPage;

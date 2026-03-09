import TableSkeleton from "../../shared/components/TableSkeleton";
import { useDeletionRequests } from "../hooks/useDeletionRequests";

const DeletionRequestsPage = () => {
  // temporary placeholder until auth is connected
  const authorId = "demo-editor-id";

  const { requests, loading } = useDeletionRequests(authorId);

  if (loading) {
    return (
      <div className="dashboard-theme">
        <div className="card p-6 text-muted">
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-theme space-y-6">
      <h1 className="text-2xl font-semibold text-main">Deletion Requests</h1>

      {requests.length === 0 ? (
        <div className="card p-6 text-muted">No deletion requests yet.</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-card-header text-white">
              <tr>
                <th className="p-3">Post</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3">Requested</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-main hover-soft">
                  <td className="p-3 text-main">{req.posts?.[0]?.title}</td>

                  <td className="p-3 text-sub">{req.reason}</td>

                  <td className="p-3 text-muted capitalize">{req.status}</td>

                  <td className="p-3 text-muted">
                    {new Date(req.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeletionRequestsPage;

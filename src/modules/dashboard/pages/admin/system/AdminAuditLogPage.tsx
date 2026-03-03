import AdminCard from "@/modules/dashboard/components/admin/ui-primitives/AdminCard";
import AdminBadge from "@/modules/dashboard/components/admin/ui-primitives/AdminBadge";

export default function AdminAuditLogPage() {
  const mockLogs = [
    {
      id: 1,
      action: "Approved post: React Performance",
      user: "Admin",
      time: "2 minutes ago",
      type: "Approval",
    },
    {
      id: 2,
      action: "Rejected post: SEO Tips",
      user: "Admin",
      time: "10 minutes ago",
      type: "Rejection",
    },
    {
      id: 3,
      action: "Created new editor account",
      user: "Admin",
      time: "1 hour ago",
      type: "User Action",
    },
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Audit Log</h1>

      <AdminCard>
        <ul className="divide-y">
          {mockLogs.map((log) => (
            <li
              key={log.id}
              className="py-4 flex justify-between items-center text-sm"
            >
              <div>
                <div className="font-medium">{log.action}</div>
                <div className="text-neutral-500 text-xs">
                  {log.user} • {log.time}
                </div>
              </div>
              <AdminBadge>{log.type}</AdminBadge>
            </li>
          ))}
        </ul>
      </AdminCard>
    </section>
  );
}

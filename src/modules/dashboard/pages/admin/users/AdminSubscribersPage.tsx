import AdminCard from "@/modules/dashboard/components/admin/ui-primitives/AdminCard";
import AdminTable from "@/modules/dashboard/components/admin/ui-primitives/AdminTable";
import AdminBadge from "@/modules/dashboard/components/admin/ui-primitives/AdminBadge";
import AdminButton from "@/modules/dashboard/components/admin/ui-primitives/AdminButton";
import AdminSearchInput from "@/modules/dashboard/components/admin/ui-primitives/AdminSearchInput";

export default function AdminSubscribersPage() {
  const mockSubscribers = [
    {
      id: "USR-001",
      name: "John Doe",
      email: "john@example.com",
      plan: "Premium",
      status: "Active",
      joined: "2026-01-12",
    },
    {
      id: "USR-002",
      name: "Emily Clark",
      email: "emily@example.com",
      plan: "Basic",
      status: "Inactive",
      joined: "2026-02-02",
    },
    {
      id: "USR-003",
      name: "Michael Smith",
      email: "michael@example.com",
      plan: "Premium",
      status: "Active",
      joined: "2026-02-20",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Subscribers</h1>
        <AdminButton variant="secondary">Export</AdminButton>
      </div>

      {/* Filters */}
      <AdminCard>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <AdminSearchInput placeholder="Search subscribers..." />
          <div className="flex gap-3">
            <AdminButton variant="secondary">Filter</AdminButton>
            <AdminButton variant="secondary">Sort</AdminButton>
          </div>
        </div>
      </AdminCard>

      {/* Subscribers Table */}
      <AdminCard>
        <AdminTable
          headers={[
            "User ID",
            "Name",
            "Email",
            "Plan",
            "Status",
            "Joined",
            "Actions",
          ]}
        >
          {mockSubscribers.map((user) => (
            <tr key={user.id} className="hover:bg-neutral-50">
              <td className="px-4 py-3">{user.id}</td>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.plan}</td>
              <td className="px-4 py-3">
                <AdminBadge
                  variant={user.status === "Active" ? "success" : "danger"}
                >
                  {user.status}
                </AdminBadge>
              </td>
              <td className="px-4 py-3">{user.joined}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <AdminButton variant="secondary">View</AdminButton>
                  {user.status === "Active" ? (
                    <AdminButton variant="danger">Deactivate</AdminButton>
                  ) : (
                    <AdminButton>Activate</AdminButton>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-neutral-600">
          <span>Showing 1–3 of 320 subscribers</span>
          <div className="flex gap-2">
            <AdminButton variant="secondary">Previous</AdminButton>
            <AdminButton variant="secondary">Next</AdminButton>
          </div>
        </div>
      </AdminCard>
    </section>
  );
}

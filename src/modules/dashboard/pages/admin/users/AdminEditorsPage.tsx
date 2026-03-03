import AdminCard from "@/modules/dashboard/components/admin/ui-primitives/AdminCard";
import AdminTable from "@/modules/dashboard/components/admin/ui-primitives/AdminTable";
import AdminBadge from "@/modules/dashboard/components/admin/ui-primitives/AdminBadge";
import AdminButton from "@/modules/dashboard/components/admin/ui-primitives/AdminButton";
import AdminSearchInput from "@/modules/dashboard/components/admin/ui-primitives/AdminSearchInput";
import { useNavigate } from "react-router-dom";

export default function AdminEditorsPage() {
  const navigate = useNavigate();

  const mockEditors = [
    {
      id: "EDT-001",
      name: "Sarah K",
      email: "sarah@example.com",
      role: "Senior Editor",
      posts: 42,
      status: "Active",
      joined: "2025-12-10",
    },
    {
      id: "EDT-002",
      name: "John D",
      email: "john@example.com",
      role: "Content Editor",
      posts: 28,
      status: "Inactive",
      joined: "2026-01-05",
    },
    {
      id: "EDT-003",
      name: "Michael T",
      email: "michael@example.com",
      role: "Junior Editor",
      posts: 15,
      status: "Active",
      joined: "2026-02-18",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Editors</h1>

        <AdminButton onClick={() => navigate("create")}>Add Editor</AdminButton>
      </div>

      {/* Filters */}
      <AdminCard>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <AdminSearchInput placeholder="Search editors..." />
          <div className="flex gap-3">
            <AdminButton variant="secondary">Filter</AdminButton>
            <AdminButton variant="secondary">Sort</AdminButton>
          </div>
        </div>
      </AdminCard>

      {/* Editors Table */}
      <AdminCard>
        <AdminTable
          headers={[
            "Editor ID",
            "Name",
            "Email",
            "Role",
            "Posts",
            "Status",
            "Joined",
            "Actions",
          ]}
        >
          {mockEditors.map((editor) => (
            <tr key={editor.id} className="hover:bg-neutral-50">
              <td className="px-4 py-3">{editor.id}</td>
              <td className="px-4 py-3">{editor.name}</td>
              <td className="px-4 py-3">{editor.email}</td>
              <td className="px-4 py-3">{editor.role}</td>
              <td className="px-4 py-3">{editor.posts}</td>
              <td className="px-4 py-3">
                <AdminBadge
                  variant={editor.status === "Active" ? "success" : "danger"}
                >
                  {editor.status}
                </AdminBadge>
              </td>
              <td className="px-4 py-3">{editor.joined}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <AdminButton variant="secondary">View</AdminButton>
                  {editor.status === "Active" ? (
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
          <span>Showing 1–3 of 12 editors</span>
          <div className="flex gap-2">
            <AdminButton variant="secondary">Previous</AdminButton>
            <AdminButton variant="secondary">Next</AdminButton>
          </div>
        </div>
      </AdminCard>
    </section>
  );
}

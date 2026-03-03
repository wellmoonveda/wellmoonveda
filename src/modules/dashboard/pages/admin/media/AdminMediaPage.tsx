import { useNavigate } from "react-router-dom";
import AdminCard from "@/modules/dashboard/components/admin/ui-primitives/AdminCard";
import AdminButton from "@/modules/dashboard/components/admin/ui-primitives/AdminButton";

export default function AdminMediaPage() {
  const navigate = useNavigate();

  const mockMedia = [
    {
      id: "IMG-001",
      title: "Hero Banner",
      category: "Homepage",
      uploaded: "2026-02-10",
    },
    {
      id: "IMG-002",
      title: "Blog Thumbnail",
      category: "Blog",
      uploaded: "2026-02-18",
    },
    {
      id: "IMG-003",
      title: "Author Avatar",
      category: "Profile",
      uploaded: "2026-03-01",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Media Library</h1>
        <AdminButton onClick={() => navigate("add")}>Add New Media</AdminButton>
      </div>

      {/* Media Grid */}
      <AdminCard>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockMedia.map((media) => (
            <div
              key={media.id}
              className="border rounded-lg p-4 space-y-3 hover:bg-neutral-50"
            >
              <div className="h-32 bg-neutral-200 rounded-md" />
              <div className="text-sm font-medium">{media.title}</div>
              <div className="text-xs text-neutral-500">{media.category}</div>
              <div className="text-xs text-neutral-400">
                Uploaded: {media.uploaded}
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </section>
  );
}

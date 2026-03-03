import AdminCard from "@/modules/dashboard/components/admin/ui-primitives/AdminCard";
import AdminButton from "@/modules/dashboard/components/admin/ui-primitives/AdminButton";

export default function AdminAddMediaPage() {
  return (
    <section className="max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Add New Media</h1>

      <AdminCard>
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Media Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Enter media title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Enter category"
            />
          </div>

          {/* Upload Placeholder */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload File
            </label>
            <div className="h-32 border-dashed border rounded-md flex items-center justify-center text-sm text-neutral-500">
              File upload area
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <AdminButton>Add Media</AdminButton>
            <AdminButton variant="secondary">Cancel</AdminButton>
          </div>
        </div>
      </AdminCard>
    </section>
  );
}

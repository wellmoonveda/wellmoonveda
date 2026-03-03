import CreateEditorForm from "@/modules/dashboard/components/admin/CreateEditorForm";

export default function AdminCreateEditorPage() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-6">Add New Editor</h1>

      <CreateEditorForm />
    </section>
  );
}

import { useState } from "react";
import EditorTable from "../components/EditorTable";
import { useEditors } from "../hooks/useEditors";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

const EditorsPage = () => {
  const {
    activeEditors,
    disabledEditors,
    loading,
    addEditor,
    removeEditor,
    enableEditor,
  } = useEditors();

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [editorToDisable, setEditorToDisable] = useState<string | null>(null);
  const [editorToActivate, setEditorToActivate] = useState<string | null>(null);

  //add new editor
  const handleCreate = async () => {
    if (!name || !email || !tempPassword) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addEditor(name, email, tempPassword);

      toast.success("Editor created successfully");

      setShowModal(false);
      setName("");
      setEmail("");
      setTempPassword("");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to add editor";
      toast.error(message);
    }
  };

  return (
    <div className="dashboard-theme p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Editors</h1>

        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="py-2! text-base!"
        >
          Add Editor
        </Button>
      </div>

      <h2 className="text-lg font-semibold">Active Editors</h2>

      <EditorTable
        editors={activeEditors}
        loading={loading}
        onDelete={(id) => setEditorToDisable(id)}
      />

      <h2 className="text-lg font-semibold mt-10">Disabled Editors</h2>

      <div className="card px-4 overflow-hidden">
        <table className="w-full text-left">
          <thead className=" text-white">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {disabledEditors.map((editor) => (
              <tr key={editor.id} className="border-main">
                <td className="p-4">{editor.name}</td>
                <td>{editor.email}</td>

                <td>
                  <button
                    onClick={() => setEditorToActivate(editor.id)}
                    className="btn-secondary px-3 py-1 rounded"
                  >
                    Reactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create editor modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="card p-6 w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">Create Editor</h2>

            <input
              className="border-main p-2 w-full"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border-main p-2 w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="border-main p-2 w-full"
              placeholder="Temporary Password"
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary px-3 py-2 rounded-full"
              >
                Cancel
              </button>

              <Button
                variant="secondary"
                onClick={handleCreate}
                className=" px-2! py-2! text-base! rounded-full!"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Disable confirmation modal */}
      {editorToDisable && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="card p-6 w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">Disable Editor</h2>

            <p className="text-sub">
              Are you sure you want to disable this editor? They will lose
              access to the platform but can be reactivated later.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditorToDisable(null)}
                className="btn-secondary px-3 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    if (editorToDisable) {
                      await removeEditor(editorToDisable);
                      toast.success("Editor successfully disabled");
                      setEditorToDisable(null);
                    }
                  } catch (error: unknown) {
                    const message =
                      error instanceof Error
                        ? error.message
                        : "Failed to disable editor";
                    toast.error(message);
                  }
                }}
                className="btn-primary px-3 py-2 rounded"
              >
                Disable Editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reactivation confirmation modal */}
      {editorToActivate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="card p-6 w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">Reactivate Editor</h2>

            <p className="text-sub">
              Are you sure you want to reactivate this editor? They will regain
              access to the platform.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditorToActivate(null)}
                className="btn-secondary px-3 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    if (editorToActivate) {
                      await enableEditor(editorToActivate);
                      toast.success("Editor reactivated");
                      setEditorToActivate(null);
                    }
                  } catch (error: unknown) {
                    const message =
                      error instanceof Error
                        ? error.message
                        : "Failed to reactivate editor";
                    toast.error(message);
                  }
                }}
                className="btn-primary px-3 py-2 rounded"
              >
                Reactivate Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorsPage;

import { useState } from "react";
import AdminCard from "./ui-primitives/AdminCard";
import AdminButton from "./ui-primitives/AdminButton";

function generateTempPassword() {
  return Math.random().toString(36).slice(-10);
}

export default function CreateEditorForm() {
  const [password, setPassword] = useState("");

  return (
    <AdminCard title="Create New Editor">
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            placeholder="Enter email"
          />
        </div>

        {/* Temporary Password */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Temporary Password
          </label>

          <div className="flex gap-3">
            <input
              type="text"
              value={password}
              readOnly
              className="flex-1 px-3 py-2 border rounded-md text-sm bg-neutral-50"
              placeholder="Generate password"
            />

            <AdminButton
              variant="secondary"
              onClick={() => setPassword(generateTempPassword())}
            >
              Generate
            </AdminButton>
          </div>

          <p className="text-xs text-neutral-500 mt-2">
            The editor will be required to change this password after first
            login.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <AdminButton>Create Editor</AdminButton>
          <AdminButton variant="secondary">Cancel</AdminButton>
        </div>
      </div>
    </AdminCard>
  );
}

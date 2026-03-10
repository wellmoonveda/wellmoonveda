import { useState } from "react";
import { useEditorSettings } from "../hooks/useEditorSettings";

const EditorSettingsForm = () => {
  const { saveProfile, changePassword, loading } = useEditorSettings();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();

    await saveProfile({
      name,
      bio,
    });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) return;

    await changePassword(password);

    setPassword("");
  };

  return (
    <div className="space-y-8 max-w-xl">
      {/* Profile */}

      <form onSubmit={handleProfileSave} className="space-y-4">
        <h3 className="font-semibold text-main">Profile</h3>

        <div>
          <label className="text-sm text-sub">Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-main rounded-md p-2"
          />
        </div>

        <div>
          <label className="text-sm text-sub">Bio</label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border-main rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="btn-prime text-white px-4 py-2 rounded-md"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>

      {/* Password */}

      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h3 className="font-semibold text-main">Change Password</h3>

        <div>
          <label className="text-sm text-sub">New Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-main rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="btn-prime text-white px-4 py-2 rounded-md"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default EditorSettingsForm;

import { useAccountSettings } from "../hooks/useAccountSettings";
import { useState, useEffect } from "react";

export default function AccountSettingsPage() {
  const { profile, updateProfile, updatePassword, deleteAccount, loading } =
    useAccountSettings();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile({ name, bio });
      alert("Profile updated successfully");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updatePassword(password);
      setPassword("");
      alert("Password updated successfully");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account?",
    );

    if (!confirmDelete) return;

    await deleteAccount();

    alert("Account deleted");
    window.location.href = "/";
  };

  return (
    <div className="max-w-xl flex flex-col gap-6">
      {/* Profile */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-main">
          Account Settings
        </h2>

        <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
          <div>
            <label className="text-sub block mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-main w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sub block mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border-main w-full p-2 rounded"
            />
          </div>

          <button className="btn-primary" disabled={loading}>
            Save Changes
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-main">
          Change Password
        </h2>

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-main w-full p-2 rounded"
            placeholder="New password"
          />

          <button className="btn-primary" disabled={loading}>
            Update Password
          </button>
        </form>
      </div>

      {/* Delete Account */}
      <div className="card border-red-400">
        <h2 className="text-lg font-semibold mb-4 text-main">Danger Zone</h2>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

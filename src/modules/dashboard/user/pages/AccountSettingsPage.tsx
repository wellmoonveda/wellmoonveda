import { useAccountSettings } from "../hooks/useAccountSettings";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { DeleteAccountSection } from "../components/DeleteAccountSection";

export default function AccountSettingsPage() {
  const { profile, updateProfile, updatePassword, loading } =
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

    if (!name) {
      toast.error("Name is required");
      return;
    }

    try {
      await updateProfile({ name, bio });
      toast.success("Profile updated");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error(message);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await updatePassword(password);
      setPassword("");
      toast.success("Password updated successfully");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update password";
      toast.error(message);
    }
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
            {loading ? "Saving..." : "Save Changes"}
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
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Delete Account */}
      <DeleteAccountSection />
    </div>
  );
}

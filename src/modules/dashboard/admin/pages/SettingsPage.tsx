import { useEffect, useState } from "react";
import { useSettingsContext } from "../context/SettingsContext";
import { useAuth } from "@/modules/auth";
import {
  updateUserProfile,
  changeUserPassword,
} from "@/services/supabase/auth.service";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { profile, refreshProfile } = useAuth();

  const { settings, loading, saveSettings } = useSettingsContext();

  const [name, setName] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [, setPendingMaintenance] = useState(false);

  const [updating, setUpdating] = useState(false);

  const [initialState, setInitialState] = useState({
    name: "",
    maintenanceMode: false,
  });

  const hasChanges =
    name !== initialState.name ||
    maintenanceMode !== initialState.maintenanceMode ||
    password !== "";

  useEffect(() => {
    if (settings && profile) {
      const currentName = profile.name || "";
      setName(currentName);

      setMaintenanceMode(settings.maintenance_mode);

      setInitialState({
        name: currentName,
        maintenanceMode: settings.maintenance_mode,
      });
    }
  }, [settings, profile]);

  const handleSave = async () => {
    try {
      setUpdating(true);

      if (name.trim()) {
        await updateUserProfile({ name });
        await refreshProfile();
      }

      if (password) {
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters");
          return;
        }

        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        await changeUserPassword(password);
      }

      await saveSettings({
        maintenance_mode: maintenanceMode,
      });

      setInitialState({
        name,
        maintenanceMode,
      });

      toast.success("Settings updated");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      toast.error(message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-main">Settings</h2>
        <p className="text-sm text-sub">
          Manage system configuration and account settings
        </p>
      </div>

      {/* PROFILE */}
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold">Profile</h3>

        <input
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-main px-3 py-2 rounded-md"
        />
      </div>

      {/* PASSWORD */}
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold">Change Password</h3>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-main px-3 py-2 rounded-md"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border-main px-3 py-2 rounded-md"
        />
      </div>

      {/* SYSTEM SETTINGS */}
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-main">System</h3>

        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm text-main">Maintenance Mode</h4>
            <p className="text-xs text-muted">
              Disable public access to the website
            </p>
          </div>

          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={() => {
              if (!maintenanceMode) {
                // turning ON → confirm first
                setPendingMaintenance(true);
                setShowConfirm(true);
              } else {
                // turning OFF → no confirmation needed
                setMaintenanceMode(false);
              }
            }}
          />

          {showConfirm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-[400px] space-y-4">
                <h3 className="text-lg font-semibold text-main">
                  Enable Maintenance Mode?
                </h3>

                <p className="text-sm text-sub">
                  This will block public users from accessing the website.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      setMaintenanceMode(true);
                      setShowConfirm(false);
                    }}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={updating || !hasChanges}
          className={` cursor-pointer text-base px-4 py-2 rounded-lg text-white ${
            hasChanges
              ? "btn-primary btn-primary-hover"
              : "bg-gray-300! !cursor-not-allowed"
          }`}
        >
          {updating ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

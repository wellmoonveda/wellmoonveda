import { useState } from "react";
import toast from "react-hot-toast";
import { useChangePassword } from "../hooks/useChangePassword";

export const ChangePasswordSection = () => {
  const { handleChangePassword, loading } = useChangePassword();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await handleChangePassword(password);

      toast.success("Password updated");

      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update password";

      toast.error(message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input"
      />

      <button disabled={loading} className="btn-primary">
        {loading ? "Updating..." : "Change Password"}
      </button>
    </form>
  );
};

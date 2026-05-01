import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { PasswordField } from "../components/PasswordField";
import { AuthButton } from "../components/AuthButton";
import { useResetPassword } from "../hooks/useResetPassword";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { handleResetPassword, loading } = useResetPassword();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await handleResetPassword(password);

      toast.success("Password updated successfully.");

      navigate("/auth/login");

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update password";

      toast.error(message);
    }
  };

  return (
    <AuthCard title="Set new password" subtitle="Create a new secure password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordField
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/*Added confirm password */}
        <PasswordField
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />

        <AuthButton type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </AuthButton>
      </form>
    </AuthCard>
  );
}

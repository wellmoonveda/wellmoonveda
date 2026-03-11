import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { PasswordField } from "../components/PasswordField";
import { AuthButton } from "../components/AuthButton";
import { updatePassword } from "@/services/supabase/auth.service";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updatePassword(password);

      alert("Password updated successfully.");

      navigate("/auth/login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
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

        <AuthButton type="submit" disabled={loading}>
          Update Password
        </AuthButton>
      </form>
    </AuthCard>
  );
}

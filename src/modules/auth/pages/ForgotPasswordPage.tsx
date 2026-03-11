import { useState } from "react";
import { AuthCard } from "../components/AuthCard";
import { AuthInput } from "../components/AuthInput";
import { AuthButton } from "../components/AuthButton";
import { AuthFooterLink } from "../components/AuthFooterLink";
import { resetPasswordEmail } from "@/services/supabase/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await resetPasswordEmail(email);

      alert("Password reset link sent to your email.");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Forgot Password" subtitle="Reset your password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthButton type="submit" disabled={loading}>
          Send Reset Link
        </AuthButton>
      </form>

      <AuthFooterLink
        text="Remember your password?"
        linkText="Sign in"
        to="/auth/login"
      />
    </AuthCard>
  );
}

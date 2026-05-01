import { useState } from "react";
import { AuthCard } from "../components/AuthCard";
import { AuthInput } from "../components/AuthInput";
import { AuthButton } from "../components/AuthButton";
import { AuthFooterLink } from "../components/AuthFooterLink";
import { resetPasswordEmail } from "@/services/supabase/auth.service";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      await resetPasswordEmail(email);

      toast.success("Password reset link sent to your email.");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to send reset email";

      toast.error(message);
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
          {loading ? "Sending..." : "Send Reset Link"}
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

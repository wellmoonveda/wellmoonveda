import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { AuthInput } from "../components/AuthInput";
import { PasswordField } from "../components/PasswordField";
import { AuthButton } from "../components/AuthButton";
import { AuthFooterLink } from "../components/AuthFooterLink";
import { useAuth } from "../providers/AuthProvider";
import { getUserRole } from "@/services/supabase/role.service";

export default function LoginPage() {
  const { login, signInWithGoogle, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login({ email, password });

      const role = await getUserRole(user.id);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "editor") {
        navigate("/editor/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordField
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton type="submit" disabled={isLoading}>
          Sign in
        </AuthButton>
      </form>

      <div className="my-4 text-center text-sm text-gray-500">or</div>

      <AuthButton type="button" onClick={signInWithGoogle} disabled={isLoading}>
        Continue with Google
      </AuthButton>

      <AuthFooterLink
        text="Forgot your password?"
        linkText="Reset it"
        to="/auth/forgot-password"
      />

      <AuthFooterLink
        text="Don’t have an account?"
        linkText="Sign up"
        to="/auth/signup"
      />
    </AuthCard>
  );
}

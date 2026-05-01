import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { AuthInput } from "../components/AuthInput";
import { PasswordField } from "../components/PasswordField";
import { AuthButton } from "../components/AuthButton";
import { AuthFooterLink } from "../components/AuthFooterLink";
import { signupUser } from "@/services/supabase/auth.service";
import toast from "react-hot-toast";

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }

    try {
      setLoading(true);

      await signupUser(email, password);

      toast.success("Signup successful! Check your email");

      navigate("/auth/login");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Signup failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center mb-2 cursor-pointer">
        <Link to="/">
          <img src="/images/site/Logo.png" alt="" className=" w-46" />
        </Link>
      </div>
      <AuthCard title="Create account" subtitle="Start your healing journey">
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

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </AuthButton>
        </form>

        <AuthFooterLink
          text="Already have an account?"
          linkText="Sign in"
          to="/auth/login"
        />
      </AuthCard>
    </>
  );
}

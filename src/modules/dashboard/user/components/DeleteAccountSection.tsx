import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { useLogout } from "../hooks/useLogout";

export const DeleteAccountSection = () => {
  const navigate = useNavigate();
  const { handleDeleteAccount, loading } = useDeleteAccount();
  const { handleLogout } = useLogout();

  const onDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (!confirmed) return;

    // Step 1: Delete account
    try {
      await handleDeleteAccount();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete account";
      toast.error(message);
      return;
    }

    // Step 2: Logout (best effort)
    try {
      await handleLogout();
    } catch {
      // Ignore logout failure (session might already be invalid)
    }

    // Step 3: Final UX
    toast.success("Account deleted");
    navigate("/auth/login");
  };

  return (
    <button onClick={onDelete} disabled={loading} className="btn-danger">
      {loading ? "Deleting..." : "Delete Account"}
    </button>
  );
};

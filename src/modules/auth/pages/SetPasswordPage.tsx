import { useForm } from "react-hook-form";
import { useSetPassword } from "../hooks/useSetPassword";
import { useNavigate } from "react-router-dom";

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function SetPasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const { setPassword } = useSetPassword();

  const onSubmit = async (data: FormData) => {
    try {
      await setPassword(data.password);

      // Redirect after success
      navigate("/editor/dashboard");
    } catch (err) {
      console.error("Failed to set password", err);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Set Your New Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {isSubmitting ? "Updating..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

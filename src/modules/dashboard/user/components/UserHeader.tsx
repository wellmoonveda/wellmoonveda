import { useNavigate } from "react-router-dom";
import { useAuth } from "@/modules/auth/providers/AuthProvider";
import { useAccountSettings } from "../hooks/useAccountSettings";
import { supabase } from "@/services/supabase/supabaseClient";
import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";

export default function UserHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useAccountSettings();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const name = profile?.name || user?.email || "User";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/login");
  };

  return (
    <header className="h-16 border-main flex items-center justify-between px-6 bg-card">
      {/* Greeting */}
      <h1 className="text-lg font-semibold text-main">Hello, {name} 👋</h1>

      {/* Right section */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 hover-soft px-2 py-1 rounded cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-soft flex items-center justify-center text-sm font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>

          <span className="text-sub">{name}</span>
        </button>

        {open && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-40 card shadow-lg transition-all duration-150 ease-out"
          >
            <button
              onClick={() => navigate("/user/account")}
              className="dropdown-item"
            >
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="dropdown-item flex flex-row items-center gap-1 "
            >
              Logout
              <span>
                <LogOut size={16} />
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

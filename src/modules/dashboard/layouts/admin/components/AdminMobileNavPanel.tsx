import { NavLink } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const baseLink =
  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors";
const inactive = "text-neutral-600 hover:bg-neutral-100";
const active = "bg-neutral-100 text-neutral-900 font-medium";

export default function AdminMobileNavPanel({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <aside className="absolute left-0 top-0 h-full w-72 bg-white border-r border-neutral-200 flex flex-col">
        <div className="h-16 px-6 flex items-center justify-between border-b font-semibold">
          Admin Menu
          <button onClick={onClose} className="text-sm">
            ✕
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 text-sm">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard/admin"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : inactive}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/review"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : inactive}`
                }
              >
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/users/subscribers"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : inactive}`
                }
              >
                Subscribers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/users/editors"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : inactive}`
                }
              >
                Editors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/media"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : inactive}`
                }
              >
                Media
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/system/audits"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : inactive}`
                }
              >
                System Audit Log
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

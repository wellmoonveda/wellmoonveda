import { NavLink } from "react-router-dom";

const baseLink =
  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors";
const inactive = "text-neutral-600 hover:bg-neutral-100";
const active = "bg-neutral-100 text-neutral-900 font-medium";

export default function AdminSidebar() {
  return (
    <aside
      className="
        hidden md:flex
        md:w-20 lg:w-64
        bg-white border-r border-neutral-200
        flex-col
        transition-all duration-200
      "
    >
      {/* Brand */}
      <div className="h-16 px-6 flex items-center font-semibold text-lg">
        <span className="hidden lg:inline">Admin Panel</span>
        <span className="lg:hidden">A P</span>
      </div>

      <nav className="flex-1 px-2 lg:px-4 text-sm space-y-6">
        {/* Overview */}
        <section>
          <p className="mb-2 text-xs uppercase tracking-wide text-neutral-500 hidden lg:block">
            Overview
          </p>
          <NavLink
            to="/dashboard/admin"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <span className="lg:hidden md:h-5 md:w-5 rounded bg-neutral-300 flex ">
              <p className="lg:hidden text-center w-full">D</p>
            </span>
            <span className="hidden lg:inline">Dashboard</span>
          </NavLink>
        </section>

        {/* Moderation */}
        <section>
          <p className="mb-2 text-xs uppercase tracking-wide text-neutral-500 hidden lg:block">
            Review
          </p>
          <NavLink
            to="/dashboard/admin/review"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <span className="lg:hidden md:h-5 md:w-5 rounded bg-neutral-300 flex ">
              <p className="lg:hidden text-center w-full">R</p>
            </span>
            <span className="hidden lg:inline">Review Posts</span>
          </NavLink>
        </section>

        {/* Users */}
        <section>
          <p className="mb-2 text-xs uppercase tracking-wide text-neutral-500 hidden lg:block">
            Users
          </p>
          <NavLink
            to="/dashboard/admin/users/subscribers"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <span className="lg:hidden md:h-5 md:w-5 rounded bg-neutral-300 flex ">
              <p className="lg:hidden text-center w-full">S</p>
            </span>
            <span className="hidden lg:inline">Subscribers</span>
          </NavLink>
          <NavLink
            to="/dashboard/admin/users/editors"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <span className="lg:hidden md:h-5 md:w-5 rounded bg-neutral-300 flex ">
              <p className="lg:hidden text-center w-full">E</p>
            </span>
            <span className="hidden lg:inline">Editors</span>
          </NavLink>
        </section>

        {/* Media */}
        <section>
          <p className="mb-2 text-xs uppercase tracking-wide text-neutral-500 hidden lg:block">
            Media
          </p>
          <NavLink
            to="/dashboard/admin/media"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <span className="lg:hidden md:h-5 md:w-5 rounded bg-neutral-300 flex ">
              <p className="lg:hidden text-center w-full">L</p>
            </span>
            <span className="hidden lg:inline">Library</span>
          </NavLink>
        </section>

        {/* System */}
        <section>
          <p className="mb-2 text-xs uppercase tracking-wide text-neutral-500 hidden lg:block">
            System
          </p>
          <NavLink
            to="/dashboard/admin/system/audits"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <span className="lg:hidden md:h-5 md:w-5 rounded bg-neutral-300 flex ">
              <p className="lg:hidden text-center w-full">A</p>
            </span>
            <span className="hidden lg:inline">Audit Log</span>
          </NavLink>
        </section>
      </nav>
    </aside>
  );
}

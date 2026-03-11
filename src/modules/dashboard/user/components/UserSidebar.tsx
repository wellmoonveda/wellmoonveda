import { NavLink } from "react-router-dom";

export default function UserSidebar() {
  return (
    <aside className="w-64 bg-sidebar border-main p-4">
      <h2 className="text-lg font-semibold mb-6 text-main">Wellmoon Veda</h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/user/dashboard"
          className="px-3 py-2 rounded hover-soft text-main"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/user/content"
          className="px-3 py-2 rounded hover-soft text-main"
        >
          My Content
        </NavLink>

        <NavLink
          to="/user/healing-paths"
          className="px-3 py-2 rounded hover-soft text-main"
        >
          Healing Paths
        </NavLink>

        <NavLink
          to="/user/account"
          className="px-3 py-2 rounded hover-soft text-main"
        >
          Account Settings
        </NavLink>
      </nav>
    </aside>
  );
}

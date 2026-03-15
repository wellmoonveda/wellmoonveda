import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "Editors",
    path: "/admin/editors",
  },
  {
    name: "Review Queue",
    path: "/admin/review",
  },
  {
    name: "Media Library",
    path: "/admin/media",
  },
  {
    name: "Create Post",
    path: "/admin/posts/create",
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
  },
  {
    name: "Messages",
    path: "/admin/messages",
  },
  {
    name: "Settings",
    path: "/admin/settings",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-sidebar min-h-screen flex flex-col border-r border-main">
      {/* Logo / Title */}
      <div className="px-6 py-5 border-b border-main">
        <h2 className="text-lg font-semibold text-main">CMS Admin</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive ? "bg-[#708090] text-white" : "text-sub hover-soft"}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-main text-sm text-sub">
        Admin Panel
      </div>
    </aside>
  );
}

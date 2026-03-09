import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/editor/dashboard" },
  { name: "My Posts", path: "/editor/posts" },
  { name: "Create Post", path: "/editor/create" },
  { name: "Deletion Requests", path: "/editor/deletion-requests" },
  { name: "Settings", path: "/editor/settings" },
];

const EditorSidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-main min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-main">Editor Panel</h2>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition 
              ${isActive ? "bg-soft text-main" : "text-sub hover-soft"}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default EditorSidebar;

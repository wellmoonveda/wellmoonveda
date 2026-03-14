import { NavLink } from "react-router-dom";

export default function UserSidebar() {
  const navItems = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "My Content", path: "/user/my-content" },
    { name: "Healing Paths", path: "/user/healing-paths" },
    { name: "Account Settings", path: "/user/account" },
  ];

  return (
    <aside className="w-64 bg-sidebar  p-4">
      <h2 className="text-lg font-semibold mb-6 text-main">Wellmoon Veda</h2>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition 
                    ${isActive ? "bg-secondary text-main" : "text-sub hover:bg-[#bdd3bc]"}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

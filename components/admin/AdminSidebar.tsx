import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookCopy,
  Shield,
  ChevronLeft,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const AdminSidebar: React.FC = () => {
  const { theme, toggleTheme } = useAppSettings();
  const activeLinkClass = "bg-gray-700 text-white";
  const inactiveLinkClass = "text-gray-300 hover:bg-gray-700 hover:text-white";
  const linkBaseClass =
    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all";

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4 flex flex-col">
      <div>
        <div className="flex items-center gap-4 mb-8">
          <NavLink
            to="/chat"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Chat</span>
          </NavLink>
        </div>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${linkBaseClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${linkBaseClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <Users className="h-4 w-4" />
            Users
          </NavLink>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `${linkBaseClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <BookCopy className="h-4 w-4" />
            Courses
          </NavLink>
          <NavLink
            to="/admin/roles"
            className={({ isActive }) =>
              `${linkBaseClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <Shield className="h-4 w-4" />
            Roles
          </NavLink>
        </nav>
      </div>
      <div className="mt-auto">
        <button
          onClick={toggleTheme}
          className={`${linkBaseClass} w-full ${inactiveLinkClass}`}
        >
          {theme === "light" ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
          <span>{theme === "light" ? "Dark" : "Light"} Mode</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

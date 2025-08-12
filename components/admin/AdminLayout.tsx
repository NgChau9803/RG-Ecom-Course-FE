import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const AdminLayout: React.FC = () => {
  const { theme } = useAppSettings();

  // This ensures the admin panel has the same theme as the main app
  if (document.documentElement.className !== theme) {
    document.documentElement.className = theme;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 font-bold text-lg text-gray-800 dark:text-gray-200">
          Admin Panel
        </div>
        <nav className="mt-5">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            Quản lý tài khoản
          </NavLink>
          <NavLink
            to="/admin/roles"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            Quản lý vai trò
          </NavLink>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            Quản lý khóa học
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

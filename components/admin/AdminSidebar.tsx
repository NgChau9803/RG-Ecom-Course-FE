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
import { useLanguage } from "../../contexts/LanguageContext";

const AdminSidebar: React.FC = () => {
  const { theme, toggleTheme } = useAppSettings();
  const { t } = useLanguage();
  const activeLinkClass = "bg-primary text-white";
  const inactiveLinkClass = "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white";
  const linkBaseClass =
    "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full w-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${linkBaseClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <LayoutDashboard className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white" />
            <span className="text-sm font-medium">{t("admin.menu.dashboard")}</span>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${linkBaseClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white" />
            <span className="text-sm font-medium">{t("admin.menu.users")}</span>
          </NavLink>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `${linkBaseClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <BookCopy className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white" />
            <span className="text-sm font-medium">{t("admin.menu.courses")}</span>
          </NavLink>
          <NavLink
            to="/admin/roles"
            className={({ isActive }) =>
              `${linkBaseClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <Shield className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white" />
            <span className="text-sm font-medium">{t("admin.menu.roles")}</span>
          </NavLink>
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className={`${linkBaseClass} w-full ${inactiveLinkClass}`}
        >
          {theme === "light" ? (
            <MoonIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white" />
          ) : (
            <SunIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white" />
          )}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
            {theme === "light" ? t("theme.dark") : t("theme.light")} {t("theme.mode")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

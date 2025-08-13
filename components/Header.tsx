import React from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ChatIcon, BookOpenIcon, HeartIcon, SettingsIcon } from "./icons/Icons";
import { LayoutDashboard, SunIcon, MoonIcon } from "lucide-react";
import { useAppSettings } from "../contexts/AppSettingsContext";

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  const activeLinkClass =
    "bg-primary-light text-primary dark:bg-primary/20 dark:text-white";
  const inactiveLinkClass =
    "text-gray-500 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  const linkBaseClass =
    "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors text-sm";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${linkBaseClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
      }
    >
      {children}
    </NavLink>
  );
};

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useAppSettings();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-105 transition-transform">
              <ChatIcon className="text-white h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-100 hidden sm:block">
              NinjaGPT
            </span>
          </NavLink>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
            <NavItem to="/chat">
              <ChatIcon className="h-4 w-4" />
              <span className="hidden md:inline">{t("header.chatbot")}</span>
            </NavItem>
            <NavItem to="/courses">
              <BookOpenIcon className="h-4 w-4" />
              <span className="hidden md:inline">{t("header.allCourses")}</span>
            </NavItem>
            <NavItem to="/favorites">
              <HeartIcon className="h-4 w-4" />
              <span className="hidden md:inline">{t("header.favorites")}</span>
            </NavItem>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NavItem to="/admin">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden md:inline">Admin</span>
          </NavItem>
          <NavItem to="/settings">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden md:inline">{t("header.settings")}</span>
          </NavItem>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { MessageCircle, BookOpen, Heart, LayoutDashboard } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import ProfileMenu from "./ProfileMenu";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";

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
  const { isAuthenticated, login } = useUser();

  // Mock login action for demonstration
  const handleLogin = () => {
    login({
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    });
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex-1 flex justify-start">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-105 transition-transform">
              <MessageCircle className="text-white h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-100 hidden sm:block">
              NinjaGPT
            </span>
          </NavLink>
        </div>

        <div className="flex-shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
            <NavItem to="/chat">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden md:inline">{t("header.chatbot")}</span>
            </NavItem>
            <NavItem to="/courses">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">{t("header.allCourses")}</span>
            </NavItem>
            <NavItem to="/favorites">
              <Heart className="h-4 w-4" />
              <span className="hidden md:inline">{t("header.favorites")}</span>
            </NavItem>
          </div>
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          <NavItem to="/admin">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden md:inline">{t("header.admin")}</span>
          </NavItem>
          <ThemeToggle />
          <LanguageSelector />
          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogin}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
              >
                {t("header.login")}
              </button>
              <Link
                to="/register"
                className="text-sm font-medium text-white bg-primary hover:bg-primary-dark px-3 py-1.5 rounded-md"
              >
                {t("header.signUp")}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

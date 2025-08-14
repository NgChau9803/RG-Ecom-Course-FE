import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Settings,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  Globe,
  ChevronRight,
} from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useAppSettings } from "../contexts/AppSettingsContext";
import { useLanguage } from "../contexts/LanguageContext";

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const { theme } = useAppSettings();
  const { t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-transparent hover:border-gray-300 dark:hover:border-gray-700 p-1 transition-colors"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="hidden sm:inline font-semibold text-sm">
          {user.name}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings size={16} />
            <span>{t("settings")}</span>
          </Link>
          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50"
          >
            <LogOut size={16} />
            <span>{t("logout")}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

import React from "react";
import { useAppSettings } from "../contexts/AppSettingsContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useAppSettings();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === "light" ? (
        <Moon className="text-gray-600 dark:text-gray-300" size={20} />
      ) : (
        <Sun className="text-gray-600 dark:text-gray-300" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;

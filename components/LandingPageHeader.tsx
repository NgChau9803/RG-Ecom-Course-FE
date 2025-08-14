import React from "react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon, Globe } from "lucide-react";
import { useAppSettings } from "../contexts/AppSettingsContext";
import { useLanguage } from "../contexts/LanguageContext";

interface LandingPageHeaderProps {
  logoText: string;
  switchLink: string;
  switchText: string;
  themeColor: "purple" | "green";
}

const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({
  logoText,
  switchLink,
  switchText,
  themeColor,
}) => {
  const { theme, toggleTheme } = useAppSettings();
  const { locale, setLocale, t } = useLanguage();

  const toggleLanguage = () => {
    const newLocale = locale === "vi" ? "en" : "vi";
    setLocale(newLocale);
  };

  const colorClasses = {
    purple: {
      text: "text-purple-700 dark:text-purple-400",
      hoverText: "hover:text-purple-800 dark:hover:text-purple-300",
    },
    green: {
      text: "text-green-700 dark:text-green-400",
      hoverText: "hover:text-green-800 dark:hover:text-green-300",
    },
  };

  const selectedColor = colorClasses[themeColor];

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className={`text-2xl font-bold ${selectedColor.text}`}>
          {logoText}
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={switchLink}
            className={`${selectedColor.text} ${selectedColor.hoverText} transition font-semibold`}
          >
            {switchText}
          </Link>
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            title={t("header.switchLanguage")}
          >
            <Globe size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default LandingPageHeader;

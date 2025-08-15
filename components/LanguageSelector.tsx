import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Locale } from "../types";
import { Globe } from "lucide-react";

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: Locale) => {
    setLanguage(lang);
    setIsOpen(false);
  };

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

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      >
        <Globe className="text-gray-600 dark:text-gray-300" size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => handleLanguageChange("en")}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange("vi")}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Tiếng Việt
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

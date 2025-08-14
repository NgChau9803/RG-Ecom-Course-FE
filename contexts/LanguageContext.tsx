import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import type { Locale } from "../types";
import en from "../locales/en.json";
import vi from "../locales/vi.json";

const translations = { en, vi };

type TranslationKey = keyof typeof en;

interface LanguageContextType {
  language: Locale;
  setLanguage: (locale: Locale) => void;
  t: (key: TranslationKey, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Locale>(() => {
    return (localStorage.getItem("language") as Locale) || "vi"; // Default to Vietnamese
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (
    key: TranslationKey,
    replacements?: Record<string, string>
  ): string => {
    let translation = translations[language][key] || translations["en"][key];
    if (replacements) {
      Object.entries(replacements).forEach(([key, value]) => {
        translation = translation.replace(`{{${key}}}`, value);
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

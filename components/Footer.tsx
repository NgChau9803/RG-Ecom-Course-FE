import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-2">{t("home.title")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("home.subtitle")}
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">{t("footer.about")}</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.careers")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">{t("footer.social")}</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">{t("footer.legal")}</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {currentYear} {t("home.title")}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

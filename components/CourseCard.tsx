import React from "react";
import type { Course } from "../types";
import { useAppSettings } from "../contexts/AppSettingsContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Briefcase,
  Clock,
  Signal,
  Heart,
  Star,
  Sparkles,
} from "lucide-react";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
  className?: string;
  isRecommended?: boolean;
  onAiIntroduce?: () => void;
}

const LevelBadge: React.FC<{ level: Course["level"]; label: string }> = ({
  level,
  label,
}) => {
  const levelColor = {
    Beginner:
      "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Intermediate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  }[level];

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${levelColor}`}
    >
      {label}
    </span>
  );
};

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onClick,
  className = "",
  isRecommended = false,
  onAiIntroduce,
}) => {
  const { favorites, toggleFavorite } = useAppSettings();
  const { locale, t } = useLanguage();
  const isFavorite = favorites.includes(course.id);

  const title =
    locale === "vi" && course.title_vi ? course.title_vi : course.title;
  const description =
    locale === "vi" && course.description_vi
      ? course.description_vi
      : course.description;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(course.id);
  };

  const handleAiIntroduceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAiIntroduce) {
      onAiIntroduce();
    }
  };

  const favoriteLabel = isFavorite
    ? t("course.removeFromFavorites", { title })
    : t("course.addToFavorites", { title });

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm flex flex-col relative ${className}`}
      role={onClick ? "button" : "article"}
      aria-label={t("course.viewDetails", { title })}
    >
      {isRecommended && (
        <div className="absolute top-0 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3" /> {t("course.recommended")}
        </div>
      )}

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 pr-2">
            {title}
          </h3>
          <button
            onClick={handleFavoriteClick}
            aria-label={favoriteLabel}
            className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors z-10 p-1 -m-1"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite
                  ? "fill-red-500 text-red-500 dark:text-red-400 dark:fill-red-400"
                  : "fill-transparent"
              }`}
            />
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {description}
        </p>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4 flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-300">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <span>
              {t("course.provider")}:{" "}
              <span className="font-semibold">{course.provider}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <span>
              {t("course.duration")}:{" "}
              <span className="font-semibold">{course.duration}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Signal className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <span>
              {t("course.level")}:{" "}
              <LevelBadge
                level={course.level}
                label={t(`level.${course.level}`)}
              />
            </span>
          </div>
        </div>
        {onAiIntroduce && (
          <button
            onClick={handleAiIntroduceClick}
            className="w-full mt-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            {t("course.aiIntroduce")}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;

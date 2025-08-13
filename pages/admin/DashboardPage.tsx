import React from "react";
import { Users, BookOpen, Briefcase, UserCheck } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Props for the StatCard component.
 * @property {React.ReactNode} icon - The icon to display in the card.
 * @property {string} title - The title of the statistic.
 * @property {string} value - The value of the statistic.
 * @property {string} color - The background color class for the card.
 */
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

/**
 * A reusable card component to display a single statistic on the dashboard.
 * @param {StatCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered StatCard component.
 */
const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
  <div
    className={`p-6 rounded-lg shadow-lg flex items-center space-x-4 ${color}`}
  >
    <div className="p-3 rounded-full bg-white bg-opacity-30">{icon}</div>
    <div>
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </div>
);

/**
 * The main dashboard page for administrators.
 * Displays key statistics and provides an overview of the platform's activity.
 */
const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  // Mock data for dashboard statistics
  const stats = {
    totalUsers: 150,
    totalCourses: 25,
    enterprises: 10,
    students: 120,
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        {t("admin.dashboard.title")}
      </h1>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users size={32} className="text-white" />}
          title={t("admin.dashboard.totalUsers")}
          value={stats.totalUsers.toString()}
          color="bg-blue-500"
        />
        <StatCard
          icon={<BookOpen size={32} className="text-white" />}
          title={t("admin.dashboard.totalCourses")}
          value={stats.totalCourses.toString()}
          color="bg-green-500"
        />
        <StatCard
          icon={<Briefcase size={32} className="text-white" />}
          title={t("admin.dashboard.enterprises")}
          value={stats.enterprises.toString()}
          color="bg-purple-500"
        />
        <StatCard
          icon={<UserCheck size={32} className="text-white" />}
          title={t("admin.dashboard.studentsInterns")}
          value={stats.students.toString()}
          color="bg-red-500"
        />
      </div>

      {/* Placeholder for future charts and recent activity */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          {t("admin.dashboard.recentActivity")}
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p>{t("admin.dashboard.welcome")}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import React from "react";
import { Users, BookOpen, Briefcase, UserCheck } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

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

const DashboardPage: React.FC = () => {
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
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users size={32} className="text-white" />}
          title="Total Users"
          value={stats.totalUsers.toString()}
          color="bg-blue-500"
        />
        <StatCard
          icon={<BookOpen size={32} className="text-white" />}
          title="Total Courses"
          value={stats.totalCourses.toString()}
          color="bg-green-500"
        />
        <StatCard
          icon={<Briefcase size={32} className="text-white" />}
          title="Enterprises"
          value={stats.enterprises.toString()}
          color="bg-purple-500"
        />
        <StatCard
          icon={<UserCheck size={32} className="text-white" />}
          title="Students & Interns"
          value={stats.students.toString()}
          color="bg-red-500"
        />
      </div>

      {/* Placeholder for future charts and recent activity */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p>Recent activity feed will be displayed here...</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSettings } from "../../contexts/AppSettingsContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout: React.FC = () => {
  const { theme } = useAppSettings();

  // This ensures the admin panel has the same theme as the main app
  if (document.documentElement.className !== theme) {
    document.documentElement.className = theme;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

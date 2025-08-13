import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSettings } from "../../contexts/AppSettingsContext";
import AdminSidebar from "./AdminSidebar";
import AdminMainContent from "./AdminMainContent";
import Header from "../Header";

const AdminLayout: React.FC = () => {
  const { theme } = useAppSettings();

  // This ensures the admin panel has the same theme as the main app
  if (document.documentElement.className !== theme) {
    document.documentElement.className = theme;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 p-4 border-r border-gray-200 dark:border-gray-700">
          <AdminSidebar />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center w-full p-4 overflow-auto">
          <div className="w-full h-full max-w-none mx-auto">
            <AdminMainContent>
              <Outlet />
            </AdminMainContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

import React from "react";
import { Outlet } from "react-router-dom";

interface AdminMainContentProps {
  children?: React.ReactNode;
}

const AdminMainContent: React.FC<AdminMainContentProps> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {children ? children : <Outlet />}
      </div>
    </div>
  );
};

export default AdminMainContent;
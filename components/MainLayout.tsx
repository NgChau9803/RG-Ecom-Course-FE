import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;

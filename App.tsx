import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import type { Course, CourseRecommendation } from "./types";
import { useCourses } from "./hooks/useCourses";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import MainLayout from "./components/MainLayout";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import CourseModal from "./components/CourseModal";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import RoleManagementPage from "./pages/admin/RoleManagementPage";
import CourseManagementPage from "./pages/admin/CourseManagementPage";
import UserDetailPage from "./pages/admin/UserDetailPage";
import ChatPage from "./pages/ChatPage";
import SelectionPage from "./pages/SelectionPage";
import InternLandingPage from "./pages/InternLandingPage";
import LearnerLandingPage from "./pages/LearnerLandingPage";

function App() {
  const courses = useCourses();
  const [selectedCourse, setSelectedCourse] =
    useState<CourseRecommendation | null>(null);

  const handleSelectCourse = (course: Course, analysis?: string) => {
    setSelectedCourse({ course, analysis: analysis });
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Routes>
        {/* Standalone Landing Page Route */}
        <Route path="/" element={<Navigate to="/selection" replace />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/intern-landing" element={<InternLandingPage />} />
        <Route path="/learner-landing" element={<LearnerLandingPage />} />
        <Route
          path="/home"
          element={
            <HomePage courses={courses} onSelectCourse={handleSelectCourse} />
          }
        />

        {/* Routes with Main Layout (Header, etc.) */}
        <Route element={<MainLayout />}>
          <Route
            path="/courses"
            element={
              <CoursesPage
                courses={courses}
                onSelectCourse={handleSelectCourse}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                courses={courses}
                onSelectCourse={handleSelectCourse}
              />
            }
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/chat"
            element={
              <ChatPage courses={courses} onSelectCourse={handleSelectCourse} />
            }
          />
        </Route>

        {/* Admin Routes (has its own layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="users/:userId" element={<UserDetailPage />} />
          <Route path="roles" element={<RoleManagementPage />} />
          <Route path="courses" element={<CourseManagementPage />} />
        </Route>
      </Routes>

      {/* Global Modal */}
      <CourseModal
        isOpen={!!selectedCourse}
        onClose={handleCloseModal}
        course={selectedCourse?.course}
        analysis={selectedCourse?.analysis}
      />
    </div>
  );
}

export default App;

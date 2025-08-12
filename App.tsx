import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import type { Course, CourseRecommendation } from "./types";
import { useCourses } from "./hooks/useCourses";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import CourseModal from "./components/CourseModal";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import RoleManagementPage from "./pages/admin/RoleManagementPage";
import CourseManagementPage from "./pages/admin/CourseManagementPage";
import UserDetailPage from "./pages/admin/UserDetailPage";

/**
 * The main application component.
 * It sets up the router, global state providers, and manages the main layout.
 */
function App() {
  const courses = useCourses();
  const [selectedCourse, setSelectedCourse] =
    useState<CourseRecommendation | null>(null);

  /**
   * Handles selecting a course to view its details in a modal.
   * @param course - The course object to display.
   * @param analysis - Optional AI analysis explaining why the course was recommended.
   */
  const handleSelectCourse = (course: Course, analysis?: string) => {
    setSelectedCourse({ course, analysis: analysis });
  };

  /**
   * Handles closing the course detail modal.
   */
  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage courses={courses} onSelectCourse={handleSelectCourse} />
            }
          />
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
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="users/:userId" element={<UserDetailPage />} />
            <Route path="roles" element={<RoleManagementPage />} />
            <Route path="courses" element={<CourseManagementPage />} />
          </Route>
        </Routes>
      </main>
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

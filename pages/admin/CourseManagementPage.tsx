import React, { useState } from "react";
import { Course } from "../../types";
import { PlusCircle, Search, Eye, Edit, Trash2 } from "lucide-react";
import CourseFormModal from "../../components/admin/CourseFormModal";
import EnrollmentDetailsModal from "../../components/admin/EnrollmentDetailsModal";

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: "1",
    title: "React for Beginners",
    provider: "Company A",
    description: "desc",
    longDescription: "long desc",
    duration: "4 weeks",
    level: "Beginner",
    topics: ["React", "JavaScript"],
    category: "Web Development",
  },
  {
    id: "2",
    title: "Advanced Node.js",
    provider: "Admin",
    description: "desc",
    longDescription: "long desc",
    duration: "6 weeks",
    level: "Advanced",
    topics: ["Node.js", "Backend"],
    category: "Web Development",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    provider: "Company B",
    description: "desc",
    longDescription: "long desc",
    duration: "3 weeks",
    level: "Intermediate",
    topics: ["UI", "UX", "Figma"],
    category: "Design",
  },
];

const CourseManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleOpenModal = (course: Course | null) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  const handleOpenEnrollmentModal = (course: Course) => {
    setSelectedCourse(course);
    setIsEnrollmentModalOpen(true);
  };

  const handleCloseEnrollmentModal = () => {
    setSelectedCourse(null);
    setIsEnrollmentModalOpen(false);
  };

  const handleSaveCourse = (courseData: Course) => {
    if (selectedCourse && "id" in selectedCourse) {
      // Edit existing course
      setCourses(
        courses.map((c) =>
          c.id === selectedCourse.id ? { ...c, ...courseData } : c
        )
      );
    } else {
      // Add new course
      const newCourse = { ...courseData, id: (courses.length + 1).toString() }; // Mock ID
      setCourses([...courses, newCourse]);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Course Management
      </h1>

      {/* Filters and Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <PlusCircle size={20} />
          <span>Add Course</span>
        </button>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 border">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Provider
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Level
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {courses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {course.title}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {course.provider}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      course.level === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : course.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {course.level}
                  </span>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium flex space-x-2">
                  <button
                    onClick={() => handleOpenEnrollmentModal(course)}
                    className="text-blue-600 hover:text-blue-900"
                    title="View Enrollments"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => handleOpenModal(course)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Edit Course"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    title="Delete Course"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CourseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCourse}
        course={selectedCourse}
      />

      <EnrollmentDetailsModal
        isOpen={isEnrollmentModalOpen}
        onClose={handleCloseEnrollmentModal}
        course={selectedCourse}
      />
    </div>
  );
};

export default CourseManagementPage;

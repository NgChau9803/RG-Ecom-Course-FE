import React from "react";
import { Course, User, Enrollment } from "../../types";
import { useLanguage } from "../../contexts/LanguageContext";

interface EnrollmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "3",
    email: "student1@example.com",
    fullName: "Student One",
    role: "student",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    email: "intern1@example.com",
    fullName: "Intern One",
    role: "intern",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    email: "student2@example.com",
    fullName: "Student Two",
    role: "student",
    createdAt: new Date().toISOString(),
  },
];

const mockEnrollments: Enrollment[] = [
  {
    id: "1",
    userId: "3",
    courseId: "1",
    enrolledAt: new Date().toISOString(),
    status: "in-progress",
  },
  {
    id: "2",
    userId: "4",
    courseId: "1",
    enrolledAt: new Date().toISOString(),
    status: "completed",
  },
  {
    id: "3",
    userId: "5",
    courseId: "2",
    enrolledAt: new Date().toISOString(),
    status: "in-progress",
  },
];

const EnrollmentDetailsModal: React.FC<EnrollmentDetailsModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  const { t } = useLanguage();
  if (!isOpen || !course) return null;

  const enrolledUsers = mockEnrollments
    .filter((enrollment) => enrollment.courseId === course.id)
    .map((enrollment) =>
      mockUsers.find((user) => user.id === enrollment.userId)
    )
    .filter((user): user is User => !!user);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-2">{t("admin.courses.enrollments.title")}</h2>
        <h3 className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
          {course.title}
        </h3>

        <div className="overflow-y-auto max-h-96">
          {enrolledUsers.length > 0 ? (
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="py-2 px-4 text-left">{t("admin.users.table.fullName")}</th>
                  <th className="py-2 px-4 text-left">{t("admin.users.table.email")}</th>
                  <th className="py-2 px-4 text-left">{t("admin.users.table.role")}</th>
                </tr>
              </thead>
              <tbody>
                {enrolledUsers.map((user) => (
                  <tr key={user.id} className="border-b dark:border-gray-700">
                    <td className="py-2 px-4">{user.fullName}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{t("admin.courses.enrollments.noEnrollments")}</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {t("form.close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDetailsModal;

import React from "react";
import { useParams, Link } from "react-router-dom";
import { User, Course, Enrollment } from "../../types";
import { ArrowLeft, Book, Shield } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

// Mock data - In a real app, this would come from an API
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    fullName: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "enterprise@example.com",
    fullName: "Enterprise User",
    role: "enterprise",
    createdAt: new Date().toISOString(),
  },
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
];
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
    userId: "3",
    courseId: "2",
    enrolledAt: new Date().toISOString(),
    status: "completed",
  },
  {
    id: "3",
    userId: "4",
    courseId: "1",
    enrolledAt: new Date().toISOString(),
    status: "in-progress",
  },
];

type EnrolledCourse = Course & { status: Enrollment["status"] };

const UserDetailPage: React.FC = () => {
  const { t } = useLanguage();
  const { userId } = useParams<{ userId: string }>();
  const user = mockUsers.find((u) => u.id === userId);

  const enrolledCourses: EnrolledCourse[] = mockEnrollments
    .filter((e) => e.userId === userId)
    .map((enrollment) => {
      const course = mockCourses.find((c) => c.id === enrollment.courseId);
      return course ? { ...course, status: enrollment.status } : null;
    })
    .filter((course): course is EnrolledCourse => course !== null);

  if (!user) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">
          {t("admin.details.user.notFound")}
        </h2>
        <Link
          to="/admin/users"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          &larr; {t("admin.details.user.backLink")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-2 text-blue-500 hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        {t("admin.details.user.backLink")}
      </Link>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-500">
              {user.fullName.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Shield size={16} className="text-gray-500" />
              <span className="font-semibold capitalize">{user.role}</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        {t("admin.details.user.enrolledCourses")}
      </h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {enrolledCourses.length > 0 ? (
          <ul className="space-y-4">
            {enrolledCourses.map((course) => (
              <li
                key={course.id}
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div>
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500">by {course.provider}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${
                    course.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {course.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t("admin.details.user.noCourses")}</p>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;

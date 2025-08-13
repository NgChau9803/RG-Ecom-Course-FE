import { Briefcase, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * A page that allows users to select their primary role (Intern or Learner).
 * This selection directs them to the appropriate landing page.
 * @returns {JSX.Element} The rendered SelectionPage component.
 */
const SelectionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 p-4">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3">
          Chào mừng bạn!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Để có trải nghiệm tốt nhất, hãy cho chúng tôi biết mục tiêu chính của
          bạn là gì?
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        {/* Card for Interns */}
        <Link
          to="/intern-landing"
          className="group flex-1 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transform hover:-translate-y-2"
        >
          <div className="flex items-center gap-6">
            <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-full">
              <Briefcase className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                Tìm Cơ Hội Thực Tập
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Dành cho người tìm kiếm việc làm & cơ hội sự nghiệp.
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>

        {/* Card for Learners */}
        <Link
          to="/learner-landing"
          className="group flex-1 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transform hover:-translate-y-2"
        >
          <div className="flex items-center gap-6">
            <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-full">
              <BookOpen className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                Tìm Khóa Học Phát Triển
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Dành cho người muốn học hỏi & nâng cấp kỹ năng.
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectionPage;

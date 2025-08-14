import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import LandingPageHeader from "../components/LandingPageHeader";
import Footer from "../components/Footer";
import { Sparkles, BookOpen, Briefcase } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import CourseFormModal from "../components/admin/CourseFormModal";
import { Course } from "../types";

/**
 * Landing page tailored for learners, showcasing learning paths and AI consultation.
 * @returns {JSX.Element} The rendered LearnerLandingPage component.
 */
const LearnerLandingPage = () => {
  const navigate = useNavigate();
  const [chatQuery, setChatQuery] = useState("");
  const courses = useCourses();
  const { t, locale } = useLanguage();
  const featuredCourses = courses.slice(0, 3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  /**
   * Handles the submission of the main chat form.
   * Navigates to the chat page with the user's query.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatQuery.trim()) {
      navigate(`/chat?q=${encodeURIComponent(chatQuery)}`);
    }
  };

  /**
   * Navigates to the chat page with a pre-filled query for a specific course consultation.
   * @param {string} courseTitle - The title of the course to consult about.
   */
  const handleCourseConsult = (courseTitle: string) => {
    const query = `Hãy tư vấn chi tiết về khóa học "${courseTitle}"`;
    navigate(`/chat?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <LandingPageHeader
        logoText="NinjaGPT"
        switchLink="/intern-landing"
        switchText={t("header.allCourses")}
        themeColor="green"
      />

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[500px] text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop')",
        }}
      >
        <div className="bg-black bg-opacity-60 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            {t("learnerLanding.title")}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl">
            {t("learnerLanding.subtitle")}
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
            {t("learnerLanding.callToAction")}
          </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">
            {t("learnerLanding.benefits.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="feature flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {t("learnerLanding.benefits.item1.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("learnerLanding.benefits.item1.description")}
              </p>
            </div>
            <div className="feature flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {t("learnerLanding.benefits.item2.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("learnerLanding.benefits.item2.description")}
              </p>
            </div>
            <div className="feature flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {t("learnerLanding.benefits.item3.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("learnerLanding.benefits.item3.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Learning Paths Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            {t("learnerLanding.featured.title")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={
                      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop"
                    }
                    alt={course.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
                    {t("course.internshipOpportunity")}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {locale === "vi" ? course.title_vi : course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {locale === "vi"
                      ? course.description_vi
                      : course.description}
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => handleOpenModal(course)}
                      className="w-full bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-lg hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900 transition duration-300"
                    >
                      {t("learnerLanding.featured.callToAction")}
                    </button>
                    <button
                      onClick={() =>
                        handleCourseConsult(
                          locale === "vi" ? course.title_vi! : course.title
                        )
                      }
                      className="w-full bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900 transition duration-300 flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} />
                      {t("course.aiIntroduce")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Consultation Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {t("home.chat.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("home.chat.subtitle")}
          </p>
          <form
            onSubmit={handleChatSubmit}
            className="max-w-xl mx-auto flex gap-2"
          >
            <input
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder={t("chatbot.inputPlaceholder")}
              className="flex-grow p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-r-md transition duration-300"
            >
              {t("chatbot.send")}
            </button>
          </form>
        </div>
      </section>

      <Footer />
      <CourseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        course={selectedCourse}
        onSave={() => {}}
        isReadOnly
      />
    </div>
  );
};

export default LearnerLandingPage;

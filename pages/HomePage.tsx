import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import type { Course } from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import { getAiCourseIntro } from "../services/geminiService";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import LandingPageHeader from "../components/LandingPageHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

/**
 * Props for the HomePage component.
 * @property {Course[]} courses - An array of all available courses.
 * @property {(course: Course, analysis: string) => void} onSelectCourse - Callback function when a course is selected.
 */
interface HomePageProps {
  courses: Course[];
  onSelectCourse: (course: Course, analysis: string) => void;
}

/**
 * The main landing page of the application.
 * It features a hero section, a carousel, featured courses, and an AI chat prompt.
 *
 * @param {HomePageProps} props - The props for the component.
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage: React.FC<HomePageProps> = ({ courses, onSelectCourse }) => {
  const { t, locale } = useLanguage();
  const navigate = useNavigate();
  const [initialMessage, setInitialMessage] = React.useState("");
  const [isAiLoading, setIsAiLoading] = React.useState<string | null>(null);
  const featuredCourses = courses.slice(0, 4); // Get first 4 courses for the featured section

  /**
   * Handles the action of getting an AI-generated introduction for a course.
   * @param {Course} course - The course to introduce.
   */
  const handleAiIntroduce = async (course: Course) => {
    setIsAiLoading(course.id);
    try {
      const intro = await getAiCourseIntro(course, locale);
      onSelectCourse(course, intro);
    } catch (error) {
      console.error("Failed to get AI introduction:", error);
      // Fallback to opening modal without analysis on error
      onSelectCourse(
        course,
        "Sorry, we couldn't generate an AI introduction at this moment."
      );
    } finally {
      setIsAiLoading(null);
    }
  };

  /**
   * Handles the submission of the chat form, navigating to the chat page.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialMessage.trim()) {
      navigate("/chat", { state: { initialMessage } });
    } else {
      navigate("/chat");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LandingPageHeader
        logoText="NinjaGPT"
        switchLink="/courses"
        switchText="View Courses"
        themeColor="purple"
      />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">{t("home.title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t("home.subtitle")}
            </p>
            <div className="flex justify-center gap-4">
              <NavLink
                to="/courses"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
  >
                {t("home.viewRoadmap")}
              </NavLink>
              <button
                onClick={() =>
                  navigate("/chat", {
                    state: { initialMessage: t("home.askAiRoadmap") },
                  })
                }
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
  >
                {t("home.askAiRoadmap")}
              </button>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-16 container mx-auto px-4">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper rounded-lg"
          >
            <SwiperSlide>
              <img
                src="https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=Learn+Anything"
                alt="Carousel 1"
                className="w-full h-64 md:h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://via.placeholder.com/1200x400/10B981/FFFFFF?text=Advance+Your+Career"
                alt="Carousel 2"
                className="w-full h-64 md:h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://via.placeholder.com/1200x400/8B5CF6/FFFFFF?text=Expert+Instructors"
                alt="Carousel 3"
                className="w-full h-64 md:h-96 object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </section>

        {/* Featured Courses Section */}
        <section id="featured-courses" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t("home.featuredCourses")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => onSelectCourse(course, "")}
                  onAiIntroduce={() => handleAiIntroduce(course)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* AI Chatbot Section */}
        <section className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t("home.chat.title")}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t("home.chat.subtitle")}
            </p>
            <form
              onSubmit={handleChatSubmit}
              className="max-w-xl mx-auto flex gap-2"
            >
              <input
                type="text"
                value={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                placeholder={t("chatbot.inputPlaceholder")}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
  >
                {t("chatbot.send")}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

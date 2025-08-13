import { Link } from "react-router-dom";
import { useLandingPageData } from "../hooks/useLandingPageData";
import LandingPageHeader from "../components/LandingPageHeader";
import Footer from "../components/Footer";

/**
 * Landing page specifically for interns seeking opportunities.
 * Displays featured internships and partner companies.
 * @returns {JSX.Element} The rendered InternLandingPage component.
 */
const InternLandingPage = () => {
  // Fetching data for the landing page from a custom hook
  const { featuredInternships, partnerLogos } = useLandingPageData();

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <LandingPageHeader
        logoText="CareerConnect"
        switchLink="/learner-landing"
        switchText="Bạn là Học viên?"
        themeColor="purple"
      />

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[500px] text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="bg-black bg-opacity-60 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Bắt Đầu Sự Nghiệp Của Bạn
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl">
            Tại hơn 100+ doanh nghiệp đối tác, nơi bạn có thể áp dụng kiến thức
            và phát triển kỹ năng thực tế.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
            Xem các vị trí đang tuyển
          </button>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Đối Tác Tuyển Dụng Hàng Đầu
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Chúng tôi tự hào hợp tác với các công ty công nghệ hàng đầu Việt
            Nam.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {partnerLogos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Partner ${index + 1}`}
                className="h-10 md:h-12 object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Internships Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Các Vị Trí Thực Tập Nổi Bật
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredInternships.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {job.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  {job.description}
                </p>
                <div className="mb-4 text-sm">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    Đối tác tiêu biểu:
                  </span>{" "}
                  <span className="text-purple-600 dark:text-purple-400">
                    {job.partners.join(", ")}
                  </span>
                </div>
                <button className="mt-auto bg-purple-100 text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900 transition duration-300">
                  Xem Lộ Trình & Ứng Tuyển
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternLandingPage;

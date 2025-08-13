export const useLandingPageData = () => {
  const featuredInternships = [
    {
      title: "TTS Content Marketing",
      description:
        "Sáng tạo nội dung đa kênh, quản lý social media và tham gia xây dựng chiến lược marketing.",
      partners: ["Tiki", "Shopee", "Lazada"],
    },
    {
      title: "TTS Business Analyst",
      description:
        "Phân tích dữ liệu kinh doanh, yêu cầu người dùng và đề xuất giải pháp cải thiện sản phẩm.",
      partners: ["FPT Software", "Viettel", "VNG"],
    },
    {
      title: "TTS Frontend Developer",
      description:
        "Tham gia phát triển giao diện người dùng cho các dự án web, làm việc với ReactJS và TailwindCSS.",
      partners: ["NashTech", "TMA Solutions", "AxonActive"],
    },
  ];

  const partnerLogos = [
    "https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png",
    "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/18/Lazada.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/FPT_Software_logo.svg/1200px-FPT_Software_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Logo_Viettel.svg/1200px-Logo_Viettel.svg.png",
    "https://upload.wikimedia.org/wikipedia/vi/1/1a/VNG_New_Logo.svg",
  ];

  const featuredCourses = [
    {
      title: "Lộ Trình Học Full-Stack Developer",
      description:
        "Trở thành chuyên gia phát triển web toàn diện với React, Node.js, và cơ sở dữ liệu.",
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Chuyên Sâu Về Khoa Học Dữ Liệu",
      description:
        "Nắm vững Python, các thuật toán Machine Learning và kỹ thuật trực quan hóa dữ liệu.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Thiết Kế UI/UX Chuyên Nghiệp",
      description:
        "Học cách xây dựng trải nghiệm người dùng hấp dẫn và giao diện đẹp mắt với Figma.",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return { featuredInternships, partnerLogos, featuredCourses };
};

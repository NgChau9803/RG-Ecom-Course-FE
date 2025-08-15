import React, { useState, useEffect } from "react";
import CVListPanel from "../../components/CVManagement/CVListPanel";
import CVDetailPanel from "../../components/CVManagement/CVDetailPanel";
import AIAnalysis from "../../components/CVManagement/AIAnalysis";

// Mock data - in a real app, this would come from an API
const initialCvs = [
  {
    id: "cv1",
    name: "Nguyễn Văn A",
    score: null,
    status: "Mới",
    content: `
NGUYỄN VĂN A
Lập trình viên Frontend

Kinh nghiệm:
- 4 năm phát triển ứng dụng web với ReactJS, Redux, TypeScript.
- Tham gia 3 dự án lớn về thương mại điện tử.

Học vấn:
- Cử nhân Khoa học Máy tính, Đại học Bách Khoa.

Kỹ năng:
- ReactJS, TypeScript, JavaScript, HTML, CSS.
    `.trim(),
    analysis: null,
  },
  {
    id: "cv2",
    name: "Trần Thị B",
    score: null,
    status: "Mới",
    content: `
TRẦN THỊ B
Fresher Developer

Kinh nghiệm:
- Các dự án cá nhân trong quá trình học.

Học vấn:
- Sinh viên năm cuối, chuyên ngành Kỹ thuật phần mềm.

Kỹ năng:
- JavaScript, HTML, CSS.
    `.trim(),
    analysis: null,
  },
];

// Mock AI scoring function
const fakeAIScoring = (cv: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (cv.name === "Nguyễn Văn A") {
        resolve({
          score: 85,
          status: "Phù hợp",
          analysis: {
            score: 85,
            status: "Phù hợp",
            summary:
              "Ứng viên có kinh nghiệm dày dặn với React và TypeScript. Đáp ứng hầu hết các yêu cầu chính, thiếu kinh nghiệm AWS nhưng đây là điểm cộng.",
            extractedInfo: {
              name: "Nguyễn Văn A",
              email: "nva@email.com",
              phone: "0901234567",
            },
            detailedScore: [
              {
                criterion: "ReactJS",
                match: true,
                comment:
                  "Có 4 năm kinh nghiệm làm việc với ReactJS trong các dự án.",
              },
              {
                criterion: "TypeScript",
                match: true,
                comment: "Sử dụng TypeScript trong 3 dự án gần nhất.",
              },
              {
                criterion: "3 năm kinh nghiệm",
                match: true,
                comment: "Tổng kinh nghiệm 4 năm.",
              },
              {
                criterion: "Bằng Cử nhân CNTT",
                match: true,
                comment:
                  "Tốt nghiệp Đại học Bách Khoa, chuyên ngành Khoa học Máy tính.",
              },
              {
                criterion: "AWS",
                match: false,
                comment: "Không đề cập trong CV.",
              },
            ],
          },
        });
      } else {
        resolve({
          score: 60,
          status: "Không phù hợp",
          analysis: {
            score: 60,
            status: "Không phù hợp",
            summary:
              "Ứng viên là fresher, chưa có kinh nghiệm làm việc thực tế.",
            extractedInfo: {
              name: "Trần Thị B",
              email: "ttb@email.com",
              phone: "0901234568",
            },
            detailedScore: [
              {
                criterion: "ReactJS",
                match: false,
                comment: "Không có kinh nghiệm.",
              },
              {
                criterion: "TypeScript",
                match: false,
                comment: "Không có kinh nghiệm.",
              },
              {
                criterion: "3 năm kinh nghiệm",
                match: false,
                comment: "Chưa có kinh nghiệm.",
              },
            ],
          },
        });
      }
    }, 1500);
  });
};

const CVManagementPage: React.FC = () => {
  const [cvs, setCvs] = useState(initialCvs);
  const [activeCv, setActiveCv] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scoreAllCvs = async () => {
      const scoredCvs = await Promise.all(
        initialCvs.map(async (cv) => {
          const result: any = await fakeAIScoring(cv);
          return { ...cv, ...result };
        })
      );
      setCvs(scoredCvs);
      if (scoredCvs.length > 0) {
        setActiveCv(scoredCvs[0]);
      }
      setLoading(false);
    };

    scoreAllCvs();
  }, []);

  const handleStatusChange = (cvId: string, newStatus: string) => {
    const updatedCvs = cvs.map((cv) => {
      if (cv.id === cvId) {
        const updatedCv = {
          ...cv,
          status: newStatus,
          analysis: { ...cv.analysis, status: newStatus },
        };
        if (cv.id === activeCv?.id) {
          setActiveCv(updatedCv);
        }
        return updatedCv;
      }
      return cv;
    });
    setCvs(updatedCvs);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Đang tự động chấm điểm CV...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <div className="w-[30%] border-r border-gray-200 flex flex-col">
        <CVListPanel
          cvs={cvs}
          onCvClick={setActiveCv}
          activeCvId={activeCv?.id}
        />
      </div>
      <div className="w-[40%] border-r border-gray-200 flex flex-col">
        <CVDetailPanel activeCv={activeCv} />
      </div>
      <div className="w-[30%] flex flex-col">
        <AIAnalysis activeCv={activeCv} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default CVManagementPage;

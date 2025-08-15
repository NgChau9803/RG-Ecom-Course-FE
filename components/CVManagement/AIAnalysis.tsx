import React, { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface AIAnalysisProps {
  activeCv: any | null;
  onStatusChange: (cvId: string, newStatus: string) => void;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({
  activeCv,
  onStatusChange,
}) => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!activeCv || !activeCv.analysis) {
    return (
      <div className="flex items-center justify-center h-full bg-white p-6">
        <p
          className="text-gray-500 text-center"
          dangerouslySetInnerHTML={{
            __html: t("admin.cv.noAnalysis").replace("\n", "<br/>"),
          }}
        />
      </div>
    );
  }

  const { analysis } = activeCv;
  const { score, summary, extractedInfo, detailedScore, status } = analysis;

  const statusOptions = [
    "Mới",
    "Phù hợp",
    "Không phù hợp",
    "Phỏng vấn",
    "Từ chối",
  ];

  const handleStatusSelect = (newStatus: string) => {
    onStatusChange(activeCv.id, newStatus);
    setIsMenuOpen(false);
  };

  const getStatusChip = (currentStatus: string) => {
    let statusKey = "status.new";
    let colorClasses = "text-gray-800 bg-gray-100";

    if (currentStatus === "Phù hợp") {
      statusKey = "status.suitable";
      colorClasses = "text-green-800 bg-green-100";
    } else if (currentStatus === "Không phù hợp") {
      statusKey = "status.unsuitable";
      colorClasses = "text-red-800 bg-red-100";
    } else if (currentStatus === "Mới") {
      statusKey = "status.new";
      colorClasses = "text-blue-800 bg-blue-100";
    }

    return (
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`px-2 py-1 text-xs font-medium rounded-full flex items-center whitespace-nowrap cursor-pointer ${colorClasses}`}
        >
          {t(statusKey)} <ChevronDown size={14} className="ml-1" />
        </button>
        {isMenuOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {statusOptions.map((option) => (
                <a
                  key={option}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleStatusSelect(option);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {t(
                    `status.${
                      {
                        Mới: "new",
                        "Phù hợp": "suitable",
                        "Không phù hợp": "unsuitable",
                        "Phỏng vấn": "interview",
                        "Từ chối": "rejected",
                      }[option]
                    }`
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center h-[65px]">
        <h2 className="text-lg font-semibold">{t("admin.cv.aiAnalysis")}</h2>
        {getStatusChip(status)}
      </div>
      <div className="flex-grow p-4 overflow-y-auto space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-blue-700">
            {t("admin.cv.suitabilityScore")}
          </p>
          <p className="text-4xl font-bold text-blue-600 my-2">{score}%</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">{t("admin.cv.summary")}</h4>
          <p className="text-sm text-gray-600">{summary}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">{t("admin.cv.extractedInfo")}</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Tên: {extractedInfo.name}</li>
            <li>Email: {extractedInfo.email}</li>
            <li>SĐT: {extractedInfo.phone}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">{t("admin.cv.detailedScore")}</h4>
          <div className="space-y-3">
            {detailedScore.map((item: any, index: number) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start">
                  {item.match ? (
                    <CheckCircle2
                      className="text-green-500 mr-3 mt-1 flex-shrink-0"
                      size={20}
                    />
                  ) : (
                    <XCircle
                      className="text-red-500 mr-3 mt-1 flex-shrink-0"
                      size={20}
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.criterion}</p>
                    <p className="text-sm text-gray-500">{item.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;

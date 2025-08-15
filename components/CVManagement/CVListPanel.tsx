import React, { useState } from "react";
import { CheckSquare, Square } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface CVListPanelProps {
  cvs: any[];
  onCvClick: (cv: any) => void;
  activeCvId?: string;
}

const CVListPanel: React.FC<CVListPanelProps> = ({
  cvs,
  onCvClick,
  activeCvId,
}) => {
  const { t } = useLanguage();
  const [selectedCvs, setSelectedCvs] = useState<string[]>([]);

  const handleSelect = (cvId: string) => {
    setSelectedCvs((prev) =>
      prev.includes(cvId) ? prev.filter((id) => id !== cvId) : [...prev, cvId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCvs.length === cvs.length) {
      setSelectedCvs([]);
    } else {
      setSelectedCvs(cvs.map((cv) => cv.id));
    }
  };

  const getStatusChip = (status: string) => {
    let statusKey = "status.new";
    let colorClasses = "text-gray-800 bg-gray-100";

    if (status === "Phù hợp") {
      statusKey = "status.suitable";
      colorClasses = "text-green-800 bg-green-100";
    } else if (status === "Không phù hợp") {
      statusKey = "status.unsuitable";
      colorClasses = "text-red-800 bg-red-100";
    } else if (status === "Mới") {
      statusKey = "status.new";
      colorClasses = "text-blue-800 bg-blue-100";
    }

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${colorClasses}`}
      >
        {t(statusKey)}
      </span>
    );
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center h-[65px]">
        <h2 className="text-lg font-semibold">{t("admin.cv.listTitle")}</h2>
        <button
          onClick={() => alert(`Gửi mail cho ${selectedCvs.length} ứng viên`)}
          disabled={selectedCvs.length === 0}
          className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300"
        >
          Gửi mail ({selectedCvs.length})
        </button>
      </div>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 text-sm font-medium text-gray-500">
        <div className="flex items-center w-1/12">
          <button onClick={handleSelectAll} className="p-1">
            {selectedCvs.length === cvs.length ? (
              <CheckSquare size={18} />
            ) : (
              <Square size={18} />
            )}
          </button>
        </div>
        <div className="w-5/12">{t("admin.cv.candidateName")}</div>
        <div className="w-3/12 text-center">{t("admin.cv.aiScore")}</div>
        <div className="w-3/12 text-center">{t("admin.cv.status")}</div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {cvs.map((cv) => (
          <div
            key={cv.id}
            onClick={() => onCvClick(cv)}
            className={`flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
              activeCvId === cv.id ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-center w-1/12">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(cv.id);
                }}
                className="p-1"
              >
                {selectedCvs.includes(cv.id) ? (
                  <CheckSquare size={18} className="text-blue-600" />
                ) : (
                  <Square size={18} />
                )}
              </button>
            </div>
            <div className="w-5/12 font-medium">{cv.name}</div>
            <div
              className={`w-3/12 text-center font-semibold ${
                cv.score > 80 ? "text-green-600" : "text-gray-600"
              }`}
            >
              {cv.score ? `${cv.score}%` : "N/A"}
            </div>
            <div className="w-3/12 flex justify-center">
              {getStatusChip(cv.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVListPanel;

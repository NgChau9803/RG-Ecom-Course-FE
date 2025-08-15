import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

interface CVDetailPanelProps {
  activeCv: any | null;
}

const CVDetailPanel: React.FC<CVDetailPanelProps> = ({ activeCv }) => {
  const { t } = useLanguage();

  if (!activeCv) {
    return (
      <div className="flex items-center justify-center h-full bg-white p-6">
        <p className="text-gray-500">{t("admin.cv.selectCV")}</p>
      </div>
    );
  }

  const handleScoreWithAI = () => {
    // Placeholder for AI scoring logic
    alert(`Bắt đầu chấm điểm AI cho CV của ${activeCv.name}`);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 h-[65px] flex items-center">
        <h2 className="text-lg font-semibold">{t("admin.cv.originalCV")}</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <pre className="whitespace-pre-wrap font-sans text-sm bg-gray-50 p-4 rounded-lg h-full">
          {activeCv.content}
        </pre>
      </div>
    </div>
  );
};

export default CVDetailPanel;

import React, { useState, useEffect } from "react";
import { Course } from "../../types";
import { useLanguage } from "../../contexts/LanguageContext";

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
  course: Course | null;
  isReadOnly?: boolean;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  course,
  isReadOnly,
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Partial<Course>>(course || {});

  useEffect(() => {
    setFormData(course || {});
  }, [course]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.title || !formData.provider || !formData.description) {
      alert("Please fill all required fields.");
      return;
    }
    onSave(formData as Course);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">
          {course ? t("form.course.editTitle") : t("form.course.addTitle")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder={t("form.course.title")}
              className="p-2 border rounded"
              disabled={isReadOnly}
            />
            <input
              name="provider"
              value={formData.provider || ""}
              onChange={handleChange}
              placeholder={t("form.course.provider")}
              className="p-2 border rounded"
              disabled={isReadOnly}
            />
            <input
              name="duration"
              value={formData.duration || ""}
              onChange={handleChange}
              placeholder={t("form.course.duration")}
              className="p-2 border rounded"
              disabled={isReadOnly}
            />
            <select
              name="level"
              value={formData.level || "Beginner"}
              onChange={handleChange}
              className="p-2 border rounded"
              disabled={isReadOnly}
            >
              <option value="Beginner">{t("level.Beginner")}</option>
              <option value="Intermediate">{t("level.Intermediate")}</option>
              <option value="Advanced">{t("level.Advanced")}</option>
            </select>
            <input
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              placeholder={t("form.course.category")}
              className="p-2 border rounded"
              disabled={isReadOnly}
            />
            <input
              name="topics"
              value={formData.topics?.join(", ") || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  topics: e.target.value.split(", "),
                }))
              }
              placeholder={t("form.course.topics")}
              className="p-2 border rounded"
              disabled={isReadOnly}
            />
          </div>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder={t("form.course.shortDescription")}
            className="p-2 border rounded w-full h-24"
            disabled={isReadOnly}
          ></textarea>
          <textarea
            name="longDescription"
            value={formData.longDescription || ""}
            onChange={handleChange}
            placeholder={t("form.course.longDescription")}
            className="p-2 border rounded w-full h-40"
            disabled={isReadOnly}
          ></textarea>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t("form.cancel")}
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                {t("form.saveCourse")}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;

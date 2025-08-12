import React, { useState, useEffect } from "react";
import { User, UserRole } from "../../types";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState<Partial<User>>(user || {});

  useEffect(() => {
    setFormData(user || { role: "student" });
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert("Please fill all required fields.");
      return;
    }
    // In a real app, you'd generate a proper ID and createdAt date on the backend
    const userToSave: User = {
      id: formData.id || new Date().toISOString(),
      createdAt: formData.createdAt || new Date().toISOString(),
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role || "student",
    };
    onSave(userToSave);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">
          {user ? "Edit User" : "Add New User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-2 border rounded w-full"
          />
          <input
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email Address"
            className="p-2 border rounded w-full"
          />
          <select
            name="role"
            value={formData.role || "student"}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          >
            <option value="student">Student</option>
            <option value="intern">Intern</option>
            <option value="enterprise">Enterprise</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;

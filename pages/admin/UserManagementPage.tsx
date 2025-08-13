import React, { useState } from "react";
import { User, UserRole } from "../../types";
import { PlusCircle, Search, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import UserFormModal from "../../components/admin/UserFormModal";
import { useLanguage } from "../../contexts/LanguageContext";

// Mock data for users
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    fullName: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "enterprise@example.com",
    fullName: "Enterprise User",
    role: "enterprise",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "student1@example.com",
    fullName: "Student One",
    role: "student",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    email: "intern1@example.com",
    fullName: "Intern One",
    role: "intern",
    createdAt: new Date().toISOString(),
  },
];

/**
 * Admin page for managing all users on the platform.
 * Provides functionality to view, filter, add, edit, and delete users.
 */
const UserManagementPage: React.FC = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filter, setFilter] = useState<UserRole | "all">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter users based on the selected role
  const filteredUsers = users.filter(
    (user) => filter === "all" || user.role === filter
  );

  /**
   * Opens the user form modal for adding or editing a user.
   * @param {User | null} user - The user to edit, or null to add a new one.
   */
  const handleOpenModal = (user: User | null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  /**
   * Closes the user form modal.
   */
  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  /**
   * Saves user data from the form modal (either creating or updating).
   * @param {User} userData - The user data to save.
   */
  const handleSaveUser = (userData: User) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map((u) => (u.id === selectedUser.id ? userData : u)));
    } else {
      // Add new user
      setUsers([...users, userData]);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {t("admin.users.title")}
      </h1>

      {/* Filters and Actions */}
      <div className="mb-8 max-w-4xl mx-auto space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t("courses.searchPlaceholder")}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-primary focus:border-primary transition-shadow bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            aria-label={t("courses.searchPlaceholder")}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <select
            onChange={(e) => setFilter(e.target.value as UserRole | "all")}
            value={filter}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-shadow bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          >
            <option value="all">{t("admin.users.allRoles")}</option>
            <option value="admin">Admin</option>
            <option value="enterprise">Enterprise</option>
            <option value="student">Student</option>
            <option value="intern">Intern</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <PlusCircle size={20} />
          <span>{t("admin.users.addUser")}</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 border">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("admin.users.table.fullName")}
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("admin.users.table.email")}
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("admin.users.table.role")}
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("admin.users.table.createdAt")}
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("admin.users.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6 whitespace-nowrap">{user.fullName}</td>
                <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800"
                        : user.role === "enterprise"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "student"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium flex space-x-4">
                  <Link
                    to={`/admin/users/${user.id}`}
                    className="text-blue-600 hover:text-blue-900"
                    title="View Details"
                  >
                    <Eye size={20} />
                  </Link>
                  <button
                    onClick={() => handleOpenModal(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Edit User"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    title="Delete User"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* User Form Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagementPage;

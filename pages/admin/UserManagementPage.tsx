import React, { useState } from "react";
import { User, UserRole } from "../../types";
import { PlusCircle, Search, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import UserFormModal from "../../components/admin/UserFormModal";

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

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filter, setFilter] = useState<UserRole | "all">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) => filter === "all" || user.role === filter
  );

  const handleOpenModal = (user: User | null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleSaveUser = (userData: User) => {
    if (selectedUser) {
      // Edit
      setUsers(users.map((u) => (u.id === selectedUser.id ? userData : u)));
    } else {
      // Add
      setUsers([...users, userData]);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        User Management
      </h1>

      {/* Filters and Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            onChange={(e) => setFilter(e.target.value as UserRole | "all")}
            value={filter}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="enterprise">Enterprise</option>
            <option value="student">Student</option>
            <option value="intern">Intern</option>
          </select>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <PlusCircle size={20} />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 border">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Full Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Created At
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
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

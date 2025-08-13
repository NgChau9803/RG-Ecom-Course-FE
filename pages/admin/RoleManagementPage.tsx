import React, { useState } from "react";
import { Role, UserRole } from "../../types";
import { PlusCircle, ShieldCheck, Trash2, Edit } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

// Mock data for roles
const mockRoles: Role[] = [
  {
    id: "admin",
    name: "Admin",
    permissions: [
      "manage_users",
      "manage_roles",
      "manage_courses",
      "view_dashboard",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    permissions: ["manage_courses", "view_enrollments"],
  },
  { id: "student", name: "Student", permissions: ["view_courses"] },
  {
    id: "intern",
    name: "Intern",
    permissions: ["view_courses", "view_assigned_tasks"],
  },
];

const allPermissions = [
  "manage_users",
  "manage_roles",
  "manage_courses",
  "view_dashboard",
  "view_enrollments",
  "view_courses",
  "view_assigned_tasks",
  "submit_work",
];

const RoleManagementPage: React.FC = () => {
  const { t } = useLanguage();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleUpdatePermissions = (
    roleId: UserRole,
    newPermissions: string[]
  ) => {
    setRoles(
      roles.map((role) =>
        role.id === roleId ? { ...role, permissions: newPermissions } : role
      )
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {t("admin.roles.title")}
      </h1>

      <div className="flex justify-end mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2">
          <PlusCircle size={20} />
          <span>{t("admin.roles.addRole")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {role.name}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSelectRole(role)}
                  className="text-blue-500 hover:text-blue-700"
                  title={t("action.edit")}
                >
                  <Edit size={20} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  title={t("action.delete")}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-md font-semibold mb-2 text-gray-600 dark:text-gray-400">
                {t("admin.roles.permissions")}
              </h3>
              <ul className="space-y-2">
                {role.permissions.map((permission) => (
                  <li
                    key={permission}
                    className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                  >
                    <ShieldCheck size={16} className="mr-2 text-green-500" />
                    {permission.replace(/_/g, " ")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRole && (
        <PermissionModal
          role={selectedRole}
          allPermissions={allPermissions}
          onClose={closeModal}
          onSave={handleUpdatePermissions}
        />
      )}
    </div>
  );
};

interface PermissionModalProps {
  role: Role;
  allPermissions: string[];
  onClose: () => void;
  onSave: (roleId: UserRole, permissions: string[]) => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
  role,
  allPermissions,
  onClose,
  onSave,
}) => {
  const { t } = useLanguage();
  const [selectedPermissions, setSelectedPermissions] = useState(
    new Set(role.permissions)
  );

  const handlePermissionChange = (permission: string) => {
    const newPermissions = new Set(selectedPermissions);
    if (newPermissions.has(permission)) {
      newPermissions.delete(permission);
    } else {
      newPermissions.add(permission);
    }
    setSelectedPermissions(newPermissions);
  };

  const handleSave = () => {
    onSave(role.id, Array.from(selectedPermissions));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {t("form.role.editTitle", { roleName: role.name })}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {allPermissions.map((permission) => (
            <label key={permission} className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded"
                checked={selectedPermissions.has(permission)}
                onChange={() => handlePermissionChange(permission)}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {permission.replace(/_/g, " ")}
              </span>
            </label>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {t("form.cancel")}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            {t("form.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPage;

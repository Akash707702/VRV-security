import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import RoleForm from "./RoleForm";

function RoleTable() {
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(savedRoles);
  }, []);

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  const handleSaveRole = (role) => {
    if (editingRole) {
      setRoles((prevRoles) =>
        prevRoles.map((r) => (r.id === editingRole.id ? { ...role, id: r.id } : r))
      );
      setEditingRole(null);
    } else {
      setRoles((prevRoles) => [...prevRoles, { ...role, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleDeleteRole = (id) => {
    setRoles((prevRoles) => prevRoles.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center py-10">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Role Management</h2>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 flex items-center gap-2"
            onClick={() => {
              setEditingRole(null);
              setShowForm(true);
            }}
          >
            <FaPlusCircle />
            Add Role
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full rounded-lg overflow-hidden shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Role Name</th>
                <th className="px-4 py-3 text-left">Permissions</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-500 px-4 py-6 bg-gray-50"
                  >
                    No roles found. Add a new role to get started!
                  </td>
                </tr>
              ) : (
                roles.map((role, index) => (
                  <tr
                    key={role.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3">{role.name}</td>
                    <td className="px-4 py-3">{role.permissions.join(", ")}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
                        onClick={() => {
                          setEditingRole(role);
                          setShowForm(true);
                        }}
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <FaTrashAlt />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <RoleForm
          onClose={() => setShowForm(false)}
          onSave={handleSaveRole}
          role={editingRole}
        />
      )}
    </div>
  );
}

export default RoleTable;

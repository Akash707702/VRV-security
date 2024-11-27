import React, { useState } from "react";

function RoleForm({ onClose, onSave, role }) {
  const [name, setName] = useState(role?.name || "");
  const [permissions, setPermissions] = useState(role?.permissions.join(", ") || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !permissions.trim()) {
      setError("Both Role Name and Permissions are required.");
      return;
    }

    onSave({
      name: name.trim(),
      permissions: permissions.split(",").map((perm) => perm.trim()),
    });
    setError("");
  };

  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">
          {role ? "Edit Role" : "Add Role"}
        </h3>

        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter role name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Permissions (comma-separated)
          </label>
          <textarea
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
            className="w-full p-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Enter permissions, e.g., read, write, delete"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleForm;

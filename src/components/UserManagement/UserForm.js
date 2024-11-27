import React, { useState } from "react";

function UserForm({ onClose, onSave, roles, user }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || (roles.length > 0 ? roles[0].name : ""));
  const [active, setActive] = useState(user?.active || false);

  const handleSubmit = () => {
    if (!name || !email || !role) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    onSave({ name, email, role, active });
    onClose();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          {user ? "Edit User" : "Add User"}
        </h3>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Role Select */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>

          {roles.length > 0 ? (
            roles.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No roles available
            </option>
          )}
        </select>

        {/* Active Checkbox */}
        <label className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <span className="text-gray-700">Active</span>
        </label>

        {/* Button Group */}
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;

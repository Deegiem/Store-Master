// // components/users/UsersProfileCard.tsx
// "use client";

// import { useState } from "react";
// import { useAdminStore } from "@/store/adminStore";
// import { Admin, UserRole } from "@/types/admin";

// interface Props {
//   user: Admin; // Use Admin type for admin management
// }

// export default function AdminActions({ user }: Props) {
//   const { deleteUser, updateUserRole } = useAdminStore();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [role, setRole] = useState<UserRole>(user.role);
//   const [submitting, setSubmitting] = useState(false);

//   const handleDelete = () => {
//     if (confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)) {
//       deleteUser(user.user_id);
//     }
//   };

//   const handleUpdateRole = async () => {
//     setSubmitting(true);
//     try {
//       await updateUserRole(user.user_id, role);
//       setModalOpen(false);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow-sm bg-white space-y-2">
//       <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Role:</strong> {user.role}</p>
//       <p><strong>Phone:</strong> {user.phone_number || "N/A"}</p>
//       <p><strong>Address:</strong> {user.address || "N/A"}</p>
//       <p><strong>State:</strong> {user.state || "N/A"}</p>
//       <p><strong>Country:</strong> {user.country || "N/A"}</p>
//       <p><strong>Email Status:</strong> {user.email_status}</p>

//       {/* Action Buttons */}
//       <div className="flex gap-2 mt-2">
//         <button
//           onClick={handleDelete}
//           className="px-3 py-1 border rounded text-red-500 hover:bg-red-50"
//         >
//           Delete
//         </button>
//         <button
//           onClick={() => setModalOpen(true)}
//           className="px-3 py-1 border rounded text-blue-500 hover:bg-blue-50"
//         >
//           Update Role
//         </button>
//       </div>

//       {/* Update Role Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-lg font-bold mb-4">Update Role for {user.first_name}</h2>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value as UserRole)}
//               className="border p-2 w-full rounded mb-4"
//             >
//               <option value="admin">Admin</option>
//               <option value="manager">Manager</option>
//               <option value="staff">Staff</option>
//               <option value="store manager">Store Manager</option>
//               <option value="sales staff">Sales Staff</option>
//             </select>
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdateRole}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//                 disabled={submitting}
//               >
//                 {submitting ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/adminStore";
import type { Admin, UserRole } from "@/types/admin";

interface Props {
  user: Admin;
}

export default function AdminActions({ user }: Props) {
  const { deleteUser, updateUserRole } = useAdminStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState<UserRole>(user.role);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    if (confirm(`Delete ${user.first_name} ${user.last_name}?`)) {
      deleteUser(user.user_id);
    }
  };

  const handleUpdateRole = async () => {
    setLoading(true);
    try {
      await updateUserRole(user.user_id, role);
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
      <div className="space-y-1">
        <h3 className="font-semibold text-lg text-gray-800">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm">
          <strong>Role:</strong> {user.role}
        </p>
        <p className="text-sm">
          <strong>Phone:</strong> {user.phone_number || "N/A"}
        </p>
        <p className="text-sm">
          <strong>Address:</strong> {user.address || "N/A"}
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleDelete}
          className="px-3 py-1 border text-red-600 rounded hover:bg-red-50"
        >
          Delete
        </button>
        <button
          onClick={() => setModalOpen(true)}
          className="px-3 py-1 border text-blue-600 rounded hover:bg-blue-50"
        >
          Update Role
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
            <h2 className="text-lg font-bold">Update Role for {user.first_name}</h2>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="border p-2 w-full rounded"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="store manager">Store Manager</option>
              <option value="sales staff">Sales Staff</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

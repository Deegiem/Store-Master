// "use client";

// import { useState, useEffect } from "react";
// import { useAdminStore } from "@/store/adminStore";
// import { Admin } from "@/types/admin";

// interface RoleModalProps {
//   user: Admin;
//   isOpen: boolean;
//   onClose: () => void;
// }

// function RoleModal({ user, isOpen, onClose }: RoleModalProps) {
//   const { updateUserRole } = useAdminStore();
//   const [role, setRole] = useState(user.role);
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     setSubmitting(true);
//     try {
//       await updateUserRole(user.user_id, role);
//       onClose();
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-lg font-bold mb-4">Update Role for {user.first_name}</h2>
//         <select
//           value={role}
//           onChange={e => setRole(e.target.value as any)}
//           className="border p-2 w-full rounded mb-4"
//         >
//           <option value="admin">Admin</option>
//           <option value="manager">Manager</option>
//           <option value="staff">Staff</option>
//           <option value="store_manager">Store Manager</option>
//           <option value="sales staff">Sales Staff</option>
//         </select>
//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//             disabled={submitting}
//           >
//             {submitting ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AllUsers() {
//   const { searchResults, fetchAllUsers, deleteUser } = useAdminStore();
//   const [modalUser, setModalUser] = useState<Admin | null>(null);

//   useEffect(() => {
//     fetchAllUsers(); // Fetch users once
//   }, [fetchAllUsers]);

//   const handleDelete = (user_id: string) => {
//     if (confirm("Are you sure you want to delete this user?")) {
//       deleteUser(user_id);
//     }
//   };

//   if (searchResults.length === 0) {
//     return <p className="text-gray-500">No users found.</p>;
//   }

//   return (
//     <div className="space-y-4">
//       {searchResults.map(user => (
//         <div key={user.user_id} className="border p-3 rounded shadow flex justify-between items-center">
//           <div>
//             <p className="font-semibold">{user.first_name} {user.last_name}</p>
//             <p className="text-sm text-gray-600">{user.email}</p>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => handleDelete(user.user_id)}
//               className="px-3 py-1 border rounded text-red-500"
//             >
//               Delete
//             </button>
//             <button
//               onClick={() => setModalUser(user)}
//               className="px-3 py-1 border rounded text-blue-500"
//             >
//               Update Role
//             </button>
//           </div>
//         </div>
//       ))}

//       {modalUser && (
//         <RoleModal
//           user={modalUser}
//           isOpen={!!modalUser}
//           onClose={() => setModalUser(null)}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useAdminStore } from "@/store/adminStore";
import AdminActions from "./AdminActions";

export default function AllUsers() {
  const { searchResults, loading } = useAdminStore();

  if (loading) {
    return <p className="text-gray-500 text-center mt-10">Loading users...</p>;
  }

  if (!searchResults || searchResults.length === 0) {
    return <p className="text-gray-500 text-center mt-10">No users found.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {searchResults.map((user) => (
        <AdminActions key={user.user_id} user={user} />
      ))}
    </div>
  );
}

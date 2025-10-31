// "use client";

// import { useState, useEffect } from "react";
// import { useAdminStore } from "@/store/adminStore";

// export default function SearchUser() {
//   const [query, setQuery] = useState("");
//   const { searchUsers } = useAdminStore();

//   useEffect(() => {
//     searchUsers(query);
//   }, [query, searchUsers]);

//   const handleReset = () => setQuery("");

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Search by name, email, or role..."
//           value={query}
//           onChange={e => setQuery(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//         <button
//           onClick={handleReset}
//           className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/store/adminStore";

export default function SearchUser() {
  const [query, setQuery] = useState("");
  const { searchUsers } = useAdminStore();

  useEffect(() => {
    searchUsers(query);
  }, [query, searchUsers]);

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="🔍 Search by name, email, or role..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
        >
          Reset
        </button>
      )}
    </div>
  );
}

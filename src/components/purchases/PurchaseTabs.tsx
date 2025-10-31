// "use client";

// import { useState } from "react";

// interface PurchaseTabsProps {
//   onTabChange?: (tab: "all" | "pending" | "rejected" | "approved") => void;
// }

// export default function PurchaseTabs({ onTabChange }: PurchaseTabsProps) {
//   const [activeTab, setActiveTab] = useState<"all" | "pending" | "rejected" | "approved">("all");

//   const handleTabClick = (tab: "all" | "pending" | "rejected" | "approved") => {
//     setActiveTab(tab);
//     onTabChange?.(tab);
//   };

//   return (
//     <div className="flex space-x-4 border-b mb-4">
//       {["all", "pending", "rejected", "approved"].map((tab) => (
//         <button
//           key={tab}
//           onClick={() => handleTabClick(tab as any)}
//           className={`px-4 py-2 font-medium ${
//             activeTab === tab
//               ? "border-b-2 border-blue-600 text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           {tab.charAt(0).toUpperCase() + tab.slice(1)}
//         </button>
//       ))}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";

interface PurchaseTabsProps {
  onTabChange?: (tab: "all" | "pending" | "rejected" | "approved") => void;
}

export default function PurchaseTabs({ onTabChange }: PurchaseTabsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "rejected" | "approved">("all");

  const handleTabClick = (tab: "all" | "pending" | "rejected" | "approved") => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  // 🔹 Update local activeTab when parent changes (optional)
  useEffect(() => {
    onTabChange?.(activeTab);
  }, [onTabChange, activeTab]);

  return (
    <div className="flex space-x-4 border-b mb-4">
      {["all", "pending", "rejected", "approved"].map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab as any)}
          className={`px-4 py-2 font-medium ${
            activeTab === tab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}

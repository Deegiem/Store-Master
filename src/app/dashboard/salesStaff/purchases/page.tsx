"use client";

import { useState } from "react";
import { CreatePurchaseForm, PurchaseTabs } from "@/components/purchases";
import AllPurchases from "@/components/purchases/AllPurchases";

export default function PurchasesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "rejected" | "approved">("all");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Purchases</h1>
      <CreatePurchaseForm />
      <PurchaseTabs onTabChange={(tab) => setActiveTab(tab)} />
      <AllPurchases filter={activeTab} />
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import PurchaseTabs from "@/components/purchases/PurchaseTabs";
// import AllPurchases from "@/components/purchases/AllPurchases";

// export default function PurchasesPage() {
//   const [currentTab, setCurrentTab] = useState<"all" | "pending" | "rejected" | "approved">("all");

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Purchases</h1>

//       {/* 🔹 Tabs */}
//       <PurchaseTabs onTabChange={setCurrentTab} />

//       {/* 🔹 Purchase list */}
//       <AllPurchases filter={currentTab} />
//     </div>
//   );
// }

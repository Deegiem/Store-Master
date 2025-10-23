// // app/page.tsx
// "use client"


// import Navbar from "@/components/Navbar"
// import Footer from "@/components/PageFooter"
// import AdminDashboard from "@/components/AdminDashboard"
// import StaffDashboard from "@/components/StaffDashboard"
// import { useUser } from "@/context/UserContext"
// import { AnimatePresence } from "framer-motion"
// import SearchBar from "@/components/SearchBar"

// export default function Dashboard() {
//   const { role } = useUser()
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <SearchBar />
//       <div className="flex-1 overflow-y-auto">
//        <AnimatePresence mode="wait">
//           {role === "admin" ? <AdminDashboard key="admin" /> : <StaffDashboard key="staff" />}
//         </AnimatePresence>
//       </div>
//       <Footer />
//     </div>
//   )
// }

"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

interface Widget {
  title: string;
  value: string | number;
  description?: string;
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    if (!user) return;

    // Mock role-based data
    const adminData = [
      { title: "Total Users", value: 234 },
      { title: "Reports Generated", value: 58 },
    ];

    const managerData = [
      { title: "Team Members", value: 12 },
      { title: "Active Projects", value: 4 },
    ];

    const staffData = [
      { title: "Tasks Assigned", value: 15 },
      { title: "Tasks Completed", value: 10 },
    ];

    const defaultData = [
      { title: "Welcome", value: user.name, description: "Have a great day!" },
    ];

    if (user.role === "admin") setWidgets(adminData);
    else if (user.role === "manager") setWidgets(managerData);
    else if (user.role === "staff") setWidgets(staffData);
    else setWidgets(defaultData);
  }, [user]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        {user ? `Welcome back, ${user.name}!` : "Welcome!"}
      </h2>
      <p className="text-gray-600">
        Here’s what’s happening in your workspace today.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((widget, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
          >
            <h3 className="font-medium text-gray-700">{widget.title}</h3>
            <p className="text-3xl font-bold text-blue-600">{widget.value}</p>
            {widget.description && (
              <p className="text-sm text-gray-500 mt-2">{widget.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

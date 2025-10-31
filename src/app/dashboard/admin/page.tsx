// // // components/DashboardNavbar.tsx
// // "use client";

// // import { useAuthStore } from "@/store/useAuthStore";
// // import { useRouter } from "next/navigation";
// // import { LogOut } from 'lucide-react';
// // import { motion } from "framer-motion";
// // import { Home, Users, Settings, FileText, User } from "lucide-react";
// // import Link from "next/link";



// // export default function Navbar({ pathname }: { pathname: string }) {
// //   const { logout } = useAuthStore();
// //   const router = useRouter();

// //   // const pageTitle = pathname.split("/").pop() || "Overview";


// //   const handleLogout = () => {
// //     logout();
// //     router.push("/login");
// //   };

// //   const links = [
// //     { href: "/dashboard", label: "Overview", icon: <Home size={16} /> },
// //     { href: "/dashboard/users", label: "Users", icon: <Users size={16} /> },
// //     { href: "/dashboard/reports", label: "Reports", icon: <FileText size={16} /> },
// //     { href: "/dashboard/profile", label: "Profile", icon: <User size={16} /> },
// //     { href: "/dashboard/settings", label: "Settings", icon: <Settings size={16} /> },
// //   ];

// //   return (
// //     <motion.nav className="text-blue-900 bg-white border-b p-4 flex items-center justify-between">
// //       <h2 className="font-semibold text-lg capitalize">MyApp</h2>
// //       {links.map((link) => {
// //           const isActive = pathname === link.href;
// //           return (
// //             <div
// //               key={link.href} 
// //               className="space-x-1"
// //             >
// //               <Link
// //                 href={link.href}
// //                 className={`flex items-center px-3 py-2 rounded-lg transition ${
// //                   isActive
// //                     ? "bg-blue-600 text-white"
// //                     : "text-gray-700 hover:bg-gray-100"
// //                 }`}
// //               >
// //                 {/* Icon always visible on all screens */}
// //                 <span className="block sm:block md:mr-2">{link.icon}</span>
                            
// //                 {/* Label hidden on sm, visible on md and larger */}
// //                 <span className="hidden md:inline">{link.label}</span>
// //               </Link>
// //             </div>
            
// //           );
// //         })}
// //         <Link
// //           href={"/dashboard/settings"}  
// //           className="text-[#204ae0] hover:bg-[#204ae0] hover:text-white rounded-lg p-1 "      
// //         >
// //           <Settings size={21}/>
// //         </Link>
// //       <LogOut
// //         aria-label="Logout"
// //         size={35}
// //         className="md:hidden  bg-[#e20606] text-white p-2 rounded-lg hover:bg-red-700 transition"
// //         onClick={handleLogout}
// //       />
// //       {/* </LogOut> */}

// //       {/* Desktop logout button */}
      
// //       <div
// //         onClick={handleLogout}
// //         className="hidden md:flex items-center bg-[#e20606] text-white px-3 py-2 gap-x-1 rounded-lg hover:bg-red-700 transition"
// //       >
// //         <span className="ml-2">Logout</span>
// //         <LogOut 
// //           size={16}
// //           className="w-5 h-5"
// //         /> {/* replace with your icon */}
// //       </div>

// //     </motion.nav>
// //   );
// // }
// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Menu, X, LayoutDashboard, Users, Settings, LogOut } from "lucide-react"

// const navItems = [
//   { name: "Dashboard", href: "/", icon: LayoutDashboard },
//   { name: "Users", href: "/users", icon: Users },
//   { name: "Settings", href: "/settings", icon: Settings },
//   { name: "Logout", href: "/login", icon: LogOut },
// ]

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <>
//       {/* ✅ Sidebar for Desktop */}
//       {/* <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40">
//         <div className="flex items-center justify-center h-16 border-b">
//           <h1 className="text-2xl font-bold text-blue-600">StoreMaster</h1>
//         </div>

//         <nav className="w-full flex-1 p-4 space-y-2">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
//             >
//               <item.icon className="w-5 h-5" />
//               <span className="font-medium">{item.name}</span>
//             </Link>
//           ))}
//         </nav>
//       </aside> */}

//       {/* ✅ Top Navbar for Mobile */}
//       <nav className=" fixed top-0 left-0 w-full bg-white shadow-sm z-50">
//         <div className="flex justify-between items-center px-6 h-16">
//           <h1 className="text-xl font-bold text-blue-600">StoreMaster</h1>

//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-700 hover:text-blue-600"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {isOpen && (
//           <div className="bg-white border-t border-gray-100 shadow-sm">
//             <div className="flex flex-col space-y-2 p-4">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
//                 >
//                   <item.icon className="w-5 h-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </nav>
//     </>
//   )
// }


// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Menu, X, Home, Package, Users } from "lucide-react"
// import clsx from "clsx"
// import { authService } from "@/services/authService"

// const ADMIN_NAV_ITEMS = [
//   { name: "Dashboard", icon: Home, href: "/dashboard/stats" },
//   { name: "Categories", icon: Home, href: "/dashboard/admin/categories" },
//   { name: "Products", icon: Package, href: "/dashboard/admin/products" },
//   { name: "Suppliers", icon: Package, href: "/dashboard/admin/suppliers" },
//   { name: "Purchases", icon: Package, href: "/dashboard/admin/purchases" },
//   { name: "Sales", icon: Package, href: "/dashboard/admin/sales" },
//   { name: "Users", icon: Users, href: "/dashboard/admin/users" },
//   // { name: "Profile", icon: Users, href: "/dashboard/admin/profile" },
// ]

// export default function Navigation() {

//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <>
//       {/* Mobile Navbar */}
//       <nav className="flex items-center px-4 py-2 justify-between fixed top-0 left-0 w-full h-[90px] bg-white border-b border-gray-200 shadow-sm md:hidden z-50">
//           <h1 className="text-lg font-semibold">StoreMaster</h1>
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-700 focus:outline-none"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//       </nav>

//       {/* Sidebar */}
//       <aside
//         className={clsx(
//           "fixed top-0 left-0 h-full w-66 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out z-40",
//           {
//             "-translate-x-full md:translate-x-0": !isOpen,
//             "translate-x-0": isOpen,
//           }
//         )}
//       >
//         <div className="flex items-center h-[90px] justify-between p-4 bg-[#1b42da] border-b">
//           <h2 className="text-xl text-white font-bold">StoreMaster</h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-700 md:hidden"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         <nav className="flex flex-col mt-4 px-2 space-y-1">
//           {ADMIN_NAV_ITEMS.map(({ name, icon: Icon, href }) => (
//             <Link
//               key={name}
//               href={href}
//               className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#1b42da] hover:text-[#ffffff] transition rounded-sm"
//               onClick={() => setIsOpen(false)}
//             >
//               <Icon size={18} />
//               <span>{name}</span>
//             </Link>
//           ))}
//           <div className="px-4 py-2">
             
//           </div>
//         </nav>
//       </aside>

//       {/* Overlay for mobile when sidebar is open */}
//       {isOpen && (
//         <div
//           onClick={() => setIsOpen(false)}
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
//         ></div>
//       )}

//       {/* Main Content Wrapper (adds margin when sidebar is visible) */}
//       <div className="pt-14 md:pl-64">
//         <main className="p-6">
//           <h1 className="text-3xl font-semibold text-gray-800">
//             Welcome to your dashboard
//           </h1>
//           <section></section>
//           <section></section>
//           <section></section>
//           <section></section>
//           <section></section>
//           <section></section>
//         </main>
//       </div>
//     </>
//   )
// }
// export default function AdminDashboardPage() {
//   return (
//     <div>
//       <h1 className="text-3xl font-semibold text-gray-800">
//         Welcome to your Admin Dashboard
//       </h1>
//       <p className="text-gray-600 mt-2">
//         Manage your categories, products, suppliers, and users here.
//       </p>


//     </div>

//   )
// }



// "use client";

// import { useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { ShoppingBag, Package, Users, Truck, Tag, ShoppingCart } from "lucide-react";

// export default function AdminDashboardPage() {
//   const [today] = useState(new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));

//   const summary = [
//     { title: "Categories", value: 12, icon: Tag, color: "bg-blue-100 text-blue-700" },
//     { title: "Products", value: 245, icon: Package, color: "bg-green-100 text-green-700" },
//     { title: "Suppliers", value: 18, icon: Truck, color: "bg-yellow-100 text-yellow-700" },
//     { title: "Users", value: 56, icon: Users, color: "bg-indigo-100 text-indigo-700" },
//     { title: "Purchases", value: 37, icon: ShoppingBag, color: "bg-purple-100 text-purple-700" },
//     { title: "Sales", value: 210, icon: ShoppingCart, color: "bg-pink-100 text-pink-700" },
//   ];

//   const chartData = [
//     { name: "Mon", sales: 3200 },
//     { name: "Tue", sales: 2700 },
//     { name: "Wed", sales: 3800 },
//     { name: "Thu", sales: 4200 },
//     { name: "Fri", sales: 3100 },
//     { name: "Sat", sales: 3900 },
//     { name: "Sun", sales: 4500 },
//   ];

//   const activities = [
//     "Added 5 new products to inventory",
//     "Updated supplier information for 'Dangote'",
//     "Approved purchase request",
//     "User 'Salmah A.' registered as sales staff",
//     "Completed sale of 120 units of 'Premium Oil'",
//   ];

//   return (
//     <div className="p-8 mt-6 space-y-10">
//       {/* Header Section */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin 👋</h1>
//         <p className="text-gray-500 mt-1">{today}</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
//         {summary.map((item) => (
//           <div
//             key={item.title}
//             className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">{item.title}</p>
//                 <h2 className="text-2xl font-semibold text-gray-800">{item.value}</h2>
//               </div>
//               <div className={`p-3 rounded-full ${item.color}`}>
//                 <item.icon className="w-6 h-6" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Sales Overview Chart */}
//       <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h3>
//         <div className="w-full h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={chartData}>
//               <XAxis dataKey="name" stroke="#555" />
//               <YAxis stroke="#555" />
//               <Tooltip />
//               <Bar dataKey="sales" fill="#000ac0" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
//         <ul className="space-y-3 text-gray-600">
//           {activities.map((activity, index) => (
//             <li key={index} className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-[#000ac0] rounded-full"></div>
//               <span>{activity}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useUserStore } from "@/store/useUserStore";
import {
  Package,
  Truck,
  ShoppingCart,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const { stats, fetchStats, loading, error } = useDashboardStore();
  const { currentUser, fetchCurrentUser } = useUserStore();

  const [today] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  useEffect(() => {
    fetchStats();
    if (!currentUser) fetchCurrentUser();
  }, [currentUser, fetchCurrentUser, fetchStats]);

  const userName = currentUser
    ? `${currentUser.first_name} ${currentUser.last_name}`
    : "User";

  const summary = [
    {
      title: "Products",
      value: stats?.total_products ?? "-",
      icon: Package,
      color: "bg-blue-50 text-[#000ac0]",
    },
    {
      title: "Suppliers",
      value: stats?.total_suppliers ?? "-",
      icon: Truck,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Sales",
      value: stats?.total_sales ?? "-",
      icon: ShoppingCart,
      color: "bg-pink-50 text-pink-600",
    },
    {
      title: "Purchases",
      value: stats?.total_purchases ?? "-",
      icon: ShoppingBag,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Low Stock",
      value: stats?.low_stock ?? "-",
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600",
    },
  ];

  const chartData = [
    { name: "Mon", sales: 3 },
    { name: "Tue", sales: 4 },
    { name: "Wed", sales: 13 },
    { name: "Thu", sales: 4 },
    { name: "Fri", sales: 2 },
    { name: "Sat", sales: 12 },
    { name: "Sun", sales: 7 },
  ];

  const activities = [
    "New purchase order approved by Manager",
    "Product ‘Industrial Wire’ restocked by 250 units",
    "Supplier ‘Dangote PLC’ added to system",
    "Low stock alert on ‘PVC Pipes’ triggered",
    "Sales report generated for the week",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="p-8 mt-9 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900">
            Welcome back,{" "}
            <span className="text-[#000ac0]">{userName.split(" ")[0]}</span> 👋
          </h2>
          <p className="text-gray-500 mt-1">{today}</p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {summary.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  {loading ? (
                    <div className="h-5 w-12 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {item.value}
                    </h2>
                  )}
                </div>
                <div className={`p-3 rounded-full ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sales Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Weekly Sales Overview
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip />
                <Bar dataKey="sales" fill="#000ac0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : (
            <ul className="space-y-3 text-gray-600">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#000ac0] rounded-full"></div>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </main>
    </div>
  );
}

"use client";

import { ReactNode } from "react";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <Navbar pathname={pathname} /> */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

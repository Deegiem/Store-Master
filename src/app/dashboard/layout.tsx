// src/app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar Navigation */}
      <Navigation />

      {/* Main content area - NO padding here, let pages handle their own padding */}
      <main className="flex-1 overflow-x-auto lg:mt-0 mt-14 md:mt-12">
        {children}
      </main>
    </div>
  );
}
"use client";

import { ReactNode } from "react";
import Navigation from "@/components/Navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Navigation />
      {/* NO margin here - let child layouts handle it */}
      <main className="flex-1 min-w-0 mt-14 md:mt-0">
        {children}
      </main>
    </div>
  );
}
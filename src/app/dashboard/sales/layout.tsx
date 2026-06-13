import Navigation from "@/components/Navigation";
import React from "react";

export default function SalesDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Navigation />
      <main className="flex-1 min-w-0 lg:ml-64 p-6">
        {children}
      </main>
    </div>
  );
}
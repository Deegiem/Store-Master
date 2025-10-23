// components/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Settings, FileText, User } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: <Home size={18} /> },
  { href: "/dashboard/users", label: "Users", icon: <Users size={18} /> },
  { href: "/dashboard/reports", label: "Reports", icon: <FileText size={18} /> },
  { href: "/dashboard/profile", label: "Profile", icon: <User size={18} /> },
  { href: "/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r flex flex-col p-4">
      <div className="text-2xl font-semibold mb-6 text-blue-600">MyApp</div>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

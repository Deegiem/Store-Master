// components/DashboardNavbar.tsx
"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { LogOut } from 'lucide-react';
import { motion } from "framer-motion";
import { Home, Users, Settings, FileText, User } from "lucide-react";
import Link from "next/link";



export default function Navbar({ pathname }: { pathname: string }) {
  const { logout } = useAuthStore();
  const router = useRouter();

  // const pageTitle = pathname.split("/").pop() || "Overview";


  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const links = [
    { href: "/dashboard", label: "Overview", icon: <Home size={16} /> },
    { href: "/dashboard/users", label: "Users", icon: <Users size={16} /> },
    { href: "/dashboard/reports", label: "Reports", icon: <FileText size={16} /> },
    { href: "/dashboard/profile", label: "Profile", icon: <User size={16} /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings size={16} /> },
  ];

  return (
    <motion.nav className="text-blue-900 bg-white border-b p-4 flex items-center justify-between">
      <h2 className="font-semibold text-lg capitalize">MyApp</h2>
      {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <div
              key={link.href} 
              className="space-x-1"
            >
              <Link
                href={link.href}
                className={`flex items-center px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {/* Icon always visible on all screens */}
                <span className="block sm:block md:mr-2">{link.icon}</span>
                            
                {/* Label hidden on sm, visible on md and larger */}
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            </div>
            
          );
        })}
        <Link
          href={"/dashboard/settings"}  
          className="text-[#204ae0] hover:bg-[#204ae0] hover:text-white rounded-lg p-1 "      
        >
          <Settings size={21}/>
        </Link>
      <LogOut
        aria-label="Logout"
        size={35}
        className="md:hidden  bg-[#e20606] text-white p-2 rounded-lg hover:bg-red-700 transition"
        onClick={handleLogout}
      />
      {/* </LogOut> */}

      {/* Desktop logout button */}
      
      <div
        onClick={handleLogout}
        className="hidden md:flex items-center bg-[#e20606] text-white px-3 py-2 gap-x-1 rounded-lg hover:bg-red-700 transition"
      >
        <span className="ml-2">Logout</span>
        <LogOut 
          size={16}
          className="w-5 h-5"
        /> {/* replace with your icon */}
      </div>

    </motion.nav>
  );
}

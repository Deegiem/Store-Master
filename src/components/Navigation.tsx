"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutDashboard, Package, Users, TableOfContents , LogOut, ChartNoAxesColumn, User, Container, ShoppingCart, BadgeDollarSign } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import clsx from "clsx"

export default function Navigation() {
  const { profile, logout } = useAuthStore()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const role = profile?.role 
  // 🧭 Role-based menu configuration
  const MENU_ITEMS = {
    "admin": [
      { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin" },
      { name: "Categories", icon: TableOfContents, href: "/dashboard/admin/categories" },
      { name: "Products", icon: Package, href: "/dashboard/admin/products" },
      { name: "Suppliers", icon: Container, href: "/dashboard/admin/suppliers" },
      { name: "Purchases", icon: ShoppingCart, href: "/dashboard/admin/purchases" },
      { name: "Sales", icon: BadgeDollarSign, href: "/dashboard/admin/sales" },
      { name: "Users", icon: Users, href: "/dashboard/admin/users" },
      { name: "Statistics", icon: ChartNoAxesColumn , href: "/dashboard/admin/stats" },
    ],
    "store manager": [
      { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/manager" },
      { name: "Categories", icon: TableOfContents, href: "/dashboard/manager/categories" },
      { name: "Products", icon: Package, href: "/dashboard/manager/products" },
      { name: "Suppliers", icon: Container, href: "/dashboard/manager/suppliers" },
      { name: "Purchases", icon: ShoppingCart, href: "/dashboard/manager/purchases" },
      { name: "Sales", icon: BadgeDollarSign, href: "/dashboard/manager/sales" },
      { name: "Profile", icon: User, href: "/dashboard/manager/user" },
    ],
    "sales staff": [
      { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/salesStaff" },
      { name: "Categories", icon: TableOfContents, href: "/dashboard/salesStaff/categories" },
      { name: "Products", icon: Package, href: "/dashboard/salesStaff/products" },
      { name: "Sales", icon: BadgeDollarSign, href: "/dashboard/salesStaff/sales" },
      { name: "Profile", icon: User, href: "/dashboard/salesStaff/user" },
    ],
  }

  const items = MENU_ITEMS[role as keyof typeof MENU_ITEMS] || []

  return (
    <>
      {/* --- Top Navbar (Mobile Only) --- */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">
            {profile?.role ? `${profile.role.toUpperCase()} Dashboard` : "Dashboard"}
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* --- Sidebar (Visible on Desktop / Drawer on Mobile) --- */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">StoreMaster</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-1 flex flex-col space-y-1 rounded-b-md">
          {items.map(({ name, icon: Icon, href }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center px-4 py-2.5 text-gray-700 hover:bg-[#050fc5] hover:text-white transition",
                  active && "bg-[#000ac0] font-medium text-white"
                )}
              >
                <Icon className={`w-5 h-5 mr-3 {active ? 'text-gray-700' : 'text-[#ffffff]'`} />
                {name}
              </Link>
            )
          })}

        </nav>

        <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 p-4">
          <button
            onClick={logout}
            className="w-full flex flex-row items-center justify-center px-4 space-x-2 py-2.5 bg-[#b32323] text-white rounded-lg hover:bg-red-600 transition"
          >
            <p>Logout</p>
            <LogOut />
          </button>
        </div>
      </aside>
    </>
  )
}

"use client"

import React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface NavItemProps {
  name: string
  icon: LucideIcon
  isActive?: boolean
  href?: string
  onClick?: () => void
}

export const NavItem: React.FC<NavItemProps> = ({ name, icon: Icon, isActive, href = "#", onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center p-3 rounded-xl transition duration-200 cursor-pointer ${
      isActive ? "bg-indigo-600 text-white shadow-lg" : "text-gray-300 hover:bg-indigo-700"
    }`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="font-medium">{name}</span>
  </Link>
)

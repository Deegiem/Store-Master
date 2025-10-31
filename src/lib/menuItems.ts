// src/components/navigation/menuItems.ts
import { Home, Users, Box, Tag, Truck, ShoppingCart, Activity, User } from "lucide-react"

export const ADMIN_MENU_ITEMS = [
  { name: "Dashboard", icon: Home },
  { name: "User Management", icon: Users },
  { name: "Inventory", icon: Box },
  { name: "Categories", icon: Tag },
  { name: "Suppliers", icon: Truck },
  { name: "Purchases", icon: ShoppingCart },
  { name: "Sales Records", icon: Activity },
]

export const MANAGER_MENU_ITEMS = [
  { name: "Dashboard", icon: Home },
  { name: "Inventory", icon: Box },
  { name: "Sales Records", icon: Activity },
]

export const STAFF_MENU_ITEMS = [
  { name: "Dashboard", icon: Home },
  { name: "Sales Records", icon: Activity },
]

export const PROFILE_ITEM = { name: "Profile", icon: User }

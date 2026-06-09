// src/config/navigation.ts
import {
  LayoutDashboard,
  Package,
  Users,
  TableOfContents,
  ShoppingCart,
  BadgeDollarSign,
  Container,
  ArrowLeftRight,
  Warehouse,
  FileText,
  Settings,
  ShieldAlert,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ClipboardList,
  BarChart3,
  UserCog,
  CreditCard,
  AlertCircle,
  Activity,
} from "lucide-react"

export type AppRole = "admin" | "manager" | "finance" | "purchase" | "store" | "sales" | "guest"

export interface DynamicNavItem {
  name: string
  icon: any
  href?: string
  badge?: number
  subItems?: DynamicNavItem[]
  visibleFor: AppRole[]
}

// Master navigation configuration (role-agnostic)
export const DYNAMIC_NAVIGATION: DynamicNavItem[] = [
  { 
    name: "Dashboard", 
    icon: LayoutDashboard, 
    href: "/dashboard/admin",
    visibleFor: ["admin", "manager", "finance", "purchase", "sales"]
  },
  
  // Access Control (Admin only)
  { 
    name: "Access Control", 
    icon: Users,
    visibleFor: ["admin"],
    subItems: [
      { name: "All Users", icon: UserCog, href: "/dashboard/admin/users", visibleFor: ["admin"] },
      { name: "User Audit Logs", icon: ShieldAlert, href: "/dashboard/admin/user-audit", visibleFor: ["admin"] },
      { name: "System Audit Logs", icon: Activity, href: "/dashboard/admin/audit", visibleFor: ["admin"] },
    ]
  },
  
  // Business Structure (Admin only)
  { 
    name: "Business Structure", 
    icon: Building2,
    visibleFor: ["admin"],
    subItems: [
      { name: "Branches", icon: Warehouse, href: "/dashboard/admin/branches", visibleFor: ["admin"] },
      { name: "Branch Performance", icon: TrendingUp, href: "/dashboard/admin/branches/performance", visibleFor: ["admin"] },
    ]
  },
  
  // Product Catalog
  { 
    name: "Product Catalog", 
    icon: Package,
    visibleFor: ["admin", "manager", "purchase"],
    subItems: [
      { name: "Products", icon: Package, href: "/dashboard/admin/products", visibleFor: ["admin", "manager", "purchase", "store", "sales"] },
      { name: "Categories", icon: TableOfContents, href: "/dashboard/admin/categories", visibleFor: ["admin", "manager", "purchase"] },
      { name: "Suppliers", icon: Container, href: "/dashboard/admin/suppliers", visibleFor: ["admin", "purchase"] },
    ]
  },
  
  // Procurement
  { 
    name: "Procurement", 
    icon: ShoppingCart,
    visibleFor: ["admin", "manager", "finance", "purchase", "store"],
    subItems: [
      { name: "All Orders", icon: ClipboardList, href: "/dashboard/admin/procurement", visibleFor: ["admin", "manager", "finance", "purchase"] },
      { name: "Pending Approvals", icon: Clock, href: "/dashboard/admin/procurement/pending-approval", visibleFor: ["admin", "finance", "purchase" ] },
      { name: "Approved Orders", icon: CheckCircle, href: "/dashboard/admin/procurement/approved", visibleFor: ["admin", "manager", "finance", "purchase"] },
      { name: "Rejected Orders", icon: XCircle, href: "/dashboard/admin/procurement/rejected", visibleFor: ["admin", "manager", "finance", "purchase"] },
    ]
  },
  
  // Inventory - Manager handles all inventory
{ 
  name: "Inventory", 
  icon: Warehouse,
  visibleFor: ["admin", "manager"],
  subItems: [
    { name: "Branch Inventory", icon: Building2, href: "/dashboard/admin/inventory", visibleFor: ["admin", "manager"] },
    { name: "Stock Transfers", icon: ArrowLeftRight, href: "/dashboard/admin/transfers", visibleFor: ["admin", "manager"] },
    { name: "Global Adjustments", icon: AlertCircle, href: "/dashboard/admin/inventory/adjustments", visibleFor: ["admin"] },
  ]
},
  
  // Sales
  { 
    name: "Sales", 
    icon: BadgeDollarSign,
    visibleFor: ["admin", "manager", "sales"],
    subItems: [
      { name: "All Sales", icon: CreditCard, href: "/dashboard/admin/sales", visibleFor: ["admin", "manager", "sales"] },
      { name: "Sales Reports", icon: BarChart3, href: "/dashboard/admin/sales/reports", visibleFor: ["admin", "manager", "sales"] },
      { name: "Daily Sales", icon: TrendingUp, href: "/dashboard/admin/sales/daily", visibleFor: ["admin", "manager", "sales"] },
    ]
  },
  
// Reports
{ 
  name: "Reports", 
  icon: FileText,
  visibleFor: ["admin", "manager", "finance"],
  subItems: [
    { name: "Sales Summary", icon: BarChart3, href: "/dashboard/admin/reports/sales", visibleFor: ["admin", "finance"] },
    { name: "Sales by Payment", icon: CreditCard, href: "/dashboard/admin/reports/sales/by-payment", visibleFor: ["admin", "finance"] },
    { name: "Sales by Branch", icon: Building2, href: "/dashboard/admin/reports/sales/by-branch", visibleFor: ["admin", "finance"] },
    { name: "Procurement Spend", icon: ShoppingCart, href: "/dashboard/admin/reports/procurement", visibleFor: ["admin", "finance"] },
    { name: "Profit Reports", icon: TrendingUp, href: "/dashboard/admin/reports/profit", visibleFor: ["admin", "finance"] },
    { name: "Tax Reports", icon: FileText, href: "/dashboard/admin/reports/tax", visibleFor: ["admin", "finance"] },
  ]
},
  
  // System (Admin only)
{ 
  name: "System", 
  icon: Settings,
  visibleFor: ["admin"],
  subItems: [
    { name: "System Settings", icon: Settings, href: "/dashboard/admin/settings", visibleFor: ["admin"] },
    { name: "Security Reports", icon: ShieldAlert, href: "/dashboard/admin/security", visibleFor: ["admin"] },  // New
    { name: "System Status", icon: Activity, href: "/dashboard/admin/status", visibleFor: ["admin"] },
    { name: "Backup Logs", icon: Clock, href: "/dashboard/admin/backups", visibleFor: ["admin"] },
  ]
},
]

// Update getFilteredNavigation to handle "store" -> "manager" mapping
export const getFilteredNavigation = (role: AppRole): DynamicNavItem[] => {
  // If role is "store", treat it as "manager" for navigation
  const effectiveRole = role === "store" ? "manager" : role
  
  return DYNAMIC_NAVIGATION.filter(item => item.visibleFor.includes(effectiveRole))
    .map(item => {
      if (item.subItems) {
        return {
          ...item,
          subItems: item.subItems.filter(sub => sub.visibleFor.includes(effectiveRole))
        }
      }
      return item
    })
}

// Convert static href to dynamic role-based href
export const getDynamicHref = (href: string | undefined, role: AppRole): string | undefined => {
  if (!href) return undefined
  return href.replace("/dashboard/admin", `/dashboard/${role}`)
}
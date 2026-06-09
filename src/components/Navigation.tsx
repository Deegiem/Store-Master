"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  LogOut,
  UserCircle,
  ChevronDown,
  ChevronRight,
  Bell,
  Store,
  HelpCircle
} from "lucide-react"
import clsx from "clsx"

import { useAuthStore } from "@/store/useAuthStore"
import { useProcurementStore } from "@/store/useProcurementStore"
import { normalizeRole, type AppRole } from "@/lib/roleMapper"
import { DYNAMIC_NAVIGATION, getFilteredNavigation, getDynamicHref, type DynamicNavItem } from "@/config/navigation"

export default function Navigation() {
  const { profile, logout } = useAuthStore()
  const { pendingApprovals, fetchPending, list, fetchAll } = useProcurementStore()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [isMobile, setIsMobile] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)

  const roleKey = normalizeRole(profile?.role)

  // Get filtered navigation based on user role - memoized without badge
  const baseNavItems = useMemo(() => getFilteredNavigation(roleKey), [roleKey])

  // Calculate pending approvals count for purchase manager (their own POs) - memoized
  const pendingCount = useMemo(() => {
    // For admin and finance, use the store's pendingApprovals count
    if (roleKey === "admin" || roleKey === "finance") {
      return pendingApprovals.length
    }

    // For purchase manager, calculate from their own POs in the list
    if (roleKey === "purchase") {
      return list.filter(po => po.status === "Pending Approval").length
    }

    // For manager, calculate from their branch POs
    if (roleKey === "manager") {
      return list.filter(po => po.status === "Pending Approval").length
    }

    return 0
  }, [roleKey, pendingApprovals.length, list])

  // Convert static hrefs to dynamic role-based hrefs and add badges - memoized
  // Convert static hrefs to dynamic role-based hrefs and add badges - memoized
  const navItems = useMemo(() => {
    const items = baseNavItems.map(item => {
      const dynamicHref = getDynamicHref(item.href, roleKey)

      if (item.subItems) {
        const filteredSubItems = item.subItems
          .map(subItem => {
            const subDynamicHref = getDynamicHref(subItem.href, roleKey)
            if (subItem.name === "Pending Approvals") {
              return {
                ...subItem,
                href: subDynamicHref,
                badge: pendingCount > 0 ? pendingCount : undefined
              }
            }
            return { ...subItem, href: subDynamicHref }
          })
          .filter(subItem => subItem.href) // Remove subItems with undefined href

        // Only include parent if it has valid subItems or if it's a standalone item
        if (filteredSubItems.length === 0 && !dynamicHref) {
          return null
        }

        return {
          ...item,
          href: dynamicHref,
          subItems: filteredSubItems
        }
      }
      return { ...item, href: dynamicHref }
    }).filter(item => item !== null) // Remove null items

    return items
  }, [baseNavItems, pendingCount, roleKey])

  // Create a stable reference to navItems for the useEffect dependency
  const navItemsString = useMemo(() => JSON.stringify(navItems.map(item => ({ name: item.name, href: item.href, subItems: item.subItems?.map(sub => ({ name: sub.name, href: sub.href })) }))), [navItems])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  // Handle responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto-expand based on active path - FIXED: use navItemsString instead of navItems
  useEffect(() => {
    const newExpanded: Record<string, boolean> = {}
    navItems.forEach((item) => {
      if (item.subItems) {
        const hasActiveChild = item.subItems.some((sub) => pathname === sub.href)
        if (hasActiveChild) {
          newExpanded[item.name] = true
        }
      }
    })

    setExpandedItems((prev) => {
      // Only update if there are actual changes
      let hasChanges = false
      for (const key in newExpanded) {
        if (newExpanded[key] !== prev[key]) {
          hasChanges = true
          break
        }
      }
      for (const key in prev) {
        if (!newExpanded[key] && prev[key]) {
          hasChanges = true
          break
        }
      }
      return hasChanges ? { ...prev, ...newExpanded } : prev
    })
  }, [pathname, navItemsString]) // Use navItemsString instead of navItems

  // Fetch pending approvals and POs based on role - FIXED: only fetch once
  useEffect(() => {
    const rolesWithApproval = ["admin", "finance"]
    const rolesWithOwnPOs = ["purchase", "manager"]

    if (rolesWithApproval.includes(roleKey)) {
      // Admin and Finance: fetch all pending approvals
      fetchPending()
      fetchAll()
    } else if (rolesWithOwnPOs.includes(roleKey)) {
      // Purchase Manager and Manager: fetch their own POs to calculate pending counts
      fetchAll()
    }
  }, [roleKey]) // Only depend on roleKey, not on fetch functions

  const toggleExpand = (itemName: string) => {
    setExpandedItems((prev) => ({ ...prev, [itemName]: !prev[itemName] }))
  }

  const closeSidebar = () => {
    if (isMobile) setIsOpen(false)
  }

  // Close on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, isOpen])

  return (
    <>
      {/* Mobile Top Bar */}
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white md:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href={`/dashboard/${roleKey}`} onClick={closeSidebar} className="flex items-center gap-2">
            <Store className="h-6 w-6 text-[#003e9d]" />
            <span className="text-lg font-bold text-slate-900">StoreMaster</span>
          </Link>

          <div className="flex items-center gap-2">
            <button className="rounded-sm p-2 text-slate-600 hover:bg-slate-100">
              <Bell className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-sm p-2 text-slate-600 hover:bg-slate-100"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef as any}
        initial={false}
        animate={{
          x: isMobile ? (isOpen ? 0 : -280) : 0,
          width: 280
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className={clsx(
          "fixed left-0 top-0 z-50 flex h-full flex-col bg-white shadow-lg md:z-40",
          "border-r border-slate-200"
        )}
        style={{ width: 280 }}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <Link href={`/dashboard/${roleKey}`} onClick={closeSidebar} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9]">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">StoreMaster</span>
          </Link>

          {isMobile && (
            <button onClick={() => setIsOpen(false)} className="rounded-sm p-1 text-slate-400 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* User Profile Section */}
        <div className="shrink-0 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
              <UserCircle className="h-6 w-6 text-[#003e9d]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{profile?.name || profile?.email || "User"}</p>
              <p className="text-xs capitalize text-slate-500">{roleKey}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu - Scrollable */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3">
            {navItems.map((item, index) => (
              <DynamicNavItemComponent
                key={item.name}
                item={item}
                pathname={pathname}
                roleKey={roleKey}
                isExpanded={expandedItems[item.name]}
                onToggle={() => toggleExpand(item.name)}
                onClose={closeSidebar}
                delay={index * 0.03}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 border-t border-slate-200 p-4">
          <div className="space-y-2">
            <button
              onClick={() => window.open("/help", "_blank")}
              className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>

            <div className="mt-2 rounded-sm bg-slate-50 p-2 text-center">
              <p className="text-[10px] text-slate-400">Version 2.0.0</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
// Dynamic Nav Item Component
function DynamicNavItemComponent({
  item,
  pathname,
  roleKey,
  isExpanded,
  onToggle,
  onClose,
  delay,
}: {
  item: DynamicNavItem
  pathname: string
  roleKey: AppRole
  isExpanded: boolean
  onToggle: () => void
  onClose: () => void
  delay: number
}) {
  const isActive = item.href === pathname
  const hasSubItems = item.subItems && item.subItems.length > 0
  const Icon = item.icon

  const hasActiveChild = item.subItems?.some((sub) => pathname === sub.href)

  // Skip rendering if it's a parent item with no href and no subItems
  if (!hasSubItems && !item.href) {
    return null;
  }

  if (hasSubItems) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="mb-1"
      >
        <button
          onClick={onToggle}
          className={clsx(
            "flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-sm transition-all",
            hasActiveChild
              ? "bg-[#003e9d]/10 text-[#003e9d]"
              : "text-slate-700 hover:bg-slate-100"
          )}
        >
          <div className="flex items-center gap-3">
            <Icon className={clsx("h-5 w-5", hasActiveChild ? "text-[#003e9d]" : "text-slate-500")} />
            <span className="font-medium">{item.name}</span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 mt-1 overflow-hidden"
            >
              {item.subItems!.map((subItem) => (
                <DynamicSubNavItemComponent
                  key={subItem.href || subItem.name}
                  item={subItem}
                  pathname={pathname}
                  roleKey={roleKey}
                  onClose={onClose}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  // Only render Link if href exists
  if (!item.href) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="mb-1"
    >
      <Link
        href={item.href}
        onClick={onClose}
        className={clsx(
          "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-all",
          isActive
            ? "bg-gradient-to-r from-[#003e9d] to-[#0050c9] text-white shadow-[0_2px_8px_rgba(0,71,195,0.25)]"
            : "text-slate-700 hover:bg-slate-100"
        )}
      >
        <Icon className={clsx("h-5 w-5", isActive ? "text-white" : "text-slate-500")} />
        <span className="font-medium">{item.name}</span>
      </Link>
    </motion.div>
  )
}

// Dynamic Sub Navigation Item Component
function DynamicSubNavItemComponent({
  item,
  pathname,
  roleKey,
  onClose,
}: {
  item: DynamicNavItem
  pathname: string
  roleKey: AppRole
  onClose: () => void
}) {
  const isActive = pathname === item.href
  const Icon = item.icon

  // Skip rendering if href is undefined
  if (!item.href) {
    return null;
  }

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={clsx(
        "group relative flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-all",
        isActive
          ? "bg-[#003e9d]/10 text-[#003e9d]"
          : "text-slate-600 hover:bg-slate-100"
      )}
    >
      <ChevronRight className={clsx(
        "h-3 w-3 transition-all",
        isActive ? "text-[#003e9d]" : "text-slate-400 group-hover:translate-x-0.5"
      )} />
      <Icon className={clsx("h-4 w-4", isActive ? "text-[#003e9d]" : "text-slate-500")} />
      <span className="flex-1">{item.name}</span>
      {item.badge && item.badge > 0 && (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
          {item.badge}
        </span>
      )}
    </Link>
  )
}
"use client";

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Building2, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  DollarSign,
  Package,
  Users
} from "lucide-react"
import type { BranchRevenue } from "@/types/admin"

interface Props {
  branches: BranchRevenue[]
}

export function BranchPerformance({ branches }: Props) {
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null)
  const safeBranches = Array.isArray(branches) ? branches : []
  
  const maxRevenue = Math.max(...safeBranches.map(b => b.monthly_revenue), 0)
  const totalRevenue = safeBranches.reduce((sum, b) => sum + b.monthly_revenue, 0)
  const averageRevenue = safeBranches.length > 0 ? totalRevenue / safeBranches.length : 0

  if (safeBranches.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-slate-200 bg-white p-6 text-center"
      >
        <Building2 className="mx-auto h-12 w-12 text-slate-400" />
        <p className="mt-4 text-base font-semibold text-slate-900">No branch data available</p>
        <p className="mt-1 text-sm text-slate-500">Branch performance metrics will appear here</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-sm border border-slate-200 bg-white"
    >
      {/* Header - Stack on mobile */}
      <div className="border-b border-slate-200 p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#003e9d]" />
              <h2 className="text-lg font-semibold text-slate-900">Branch Performance</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">Revenue and performance metrics by branch</p>
          </div>
          
          {/* Stats - Stack on mobile, row on desktop */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <div>
              <p className="text-xs text-slate-500">Total Revenue</p>
              <p className="text-base sm:text-lg font-bold text-slate-900">₦{totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Average Revenue</p>
              <p className="text-base sm:text-lg font-bold text-slate-900">₦{averageRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch List - Card-based on mobile */}
      <div className="divide-y divide-slate-100">
        {safeBranches.map((branch, index) => {
          const percentage = (branch.monthly_revenue / maxRevenue) * 100
          const isExpanded = expandedBranch === branch.branch_id
          
          return (
            <motion.div
              key={branch.branch_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 sm:p-5 transition-colors hover:bg-slate-50"
            >
              {/* Branch Header - Responsive */}
              <div 
                className="flex cursor-pointer flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                onClick={() => setExpandedBranch(isExpanded ? null : branch.branch_id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#003e9d]/10">
                      <Building2 className="h-5 w-5 text-[#003e9d]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{branch.branch_name}</h3>
                      <p className="text-xs text-slate-500">ID: {branch.branch_id.slice(0, 8)}...</p>
                    </div>
                  </div>
                </div>
                
                {/* Stats - Wrap on mobile */}
                <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-6">
                  <div>
                    <p className="text-xs text-slate-500">Monthly Revenue</p>
                    <p className="text-base sm:text-lg font-bold text-slate-900">₦{branch.monthly_revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Market Share</p>
                    <p className="text-sm font-semibold text-[#003e9d]">
                      {((branch.monthly_revenue / totalRevenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Performance</span>
                  <span>{percentage.toFixed(0)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#003e9d] to-[#0050c9]"
                  />
                </div>
              </div>

              {/* Expanded Details - Stack vertically on mobile */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3 border-t border-slate-100 pt-4"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-sm bg-[#F3F4F6] p-3">
                      <DollarSign className="h-5 w-5 text-green-600 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500">Revenue Target</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          ₦{(branch.monthly_revenue * 1.2).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 rounded-sm bg-[#F3F4F6] p-3">
                      <Package className="h-5 w-5 text-blue-600 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500">Products Sold</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {Math.floor(branch.monthly_revenue / 5000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 rounded-sm bg-[#F3F4F6] p-3">
                      <Users className="h-5 w-5 text-purple-600 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500">Active Staff</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {branch.staff?.filter(s => s.is_active).length ?? 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
"use client"

import { motion } from "framer-motion"

interface BranchMetric {
  id: string
  name: string
  revenue: number
}

interface RevenueDistributionChartProps {
  branches: BranchMetric[]
  totalRevenue: number
  currencySymbol: string
  maxBranches?: number  // Optional: limit number of branches shown
}

export function RevenueDistributionChart({ 
  branches, 
  totalRevenue, 
  currencySymbol, 
  maxBranches = 5 
}: RevenueDistributionChartProps) {
  // Sort by revenue descending
  const sortedBranches = [...branches].sort((a, b) => b.revenue - a.revenue)
  
  // Split into top N and others
  const topBranches = sortedBranches.slice(0, maxBranches)
  const otherBranches = sortedBranches.slice(maxBranches)
  
  const otherRevenue = otherBranches.reduce((sum, b) => sum + b.revenue, 0)
  
  // Build display list
  const displayBranches = [...topBranches]
  if (otherBranches.length > 0) {
    displayBranches.push({
      id: "others",
      name: `Other (${otherBranches.length} branches)`,
      revenue: otherRevenue
    })
  }
  
  // Calculate percentages
  const branchesWithPercentages = displayBranches.map(branch => ({
    ...branch,
    percentage: (branch.revenue / totalRevenue) * 100
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="rounded-sm border border-slate-200 bg-white p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Revenue Distribution</h3>
        <p className="text-xs text-slate-500">
          Total: {currencySymbol}{totalRevenue.toLocaleString()}
        </p>
      </div>
      
      <div className="space-y-4">
        {branchesWithPercentages.map((branch, index) => (
          <div key={branch.id}>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">{branch.name}</span>
                {branch.id !== "others" && (
                  <span className="text-xs text-slate-400">#{index + 1}</span>
                )}
              </div>
              <div className="flex gap-3">
                <span className="text-slate-500">
                  {currencySymbol}{branch.revenue.toLocaleString()}
                </span>
                <span className="font-medium text-slate-700 w-16 text-right">
                  {branch.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#003e9d] to-[#0050c9] transition-all duration-500"
                style={{ width: `${Math.max(branch.percentage, 0.5)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Total Check */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-700">Total</span>
          <span className="font-semibold text-slate-900">
            {branchesWithPercentages.reduce((sum, b) => sum + b.percentage, 0).toFixed(1)}%
          </span>
        </div>
      </div>
      
      {/* Summary note */}
      {otherBranches.length > 0 && (
        <p className="mt-3 text-xs text-slate-400 text-center">
          Showing top {maxBranches} branches. {otherBranches.length} other branches represent the remaining revenue.
        </p>
      )}
    </motion.div>
  )
}
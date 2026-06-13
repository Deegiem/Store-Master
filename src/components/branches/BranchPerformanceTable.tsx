"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, Users, DollarSign, Package, ChevronDown, ChevronUp } from "lucide-react"
import React from "react"

interface BranchMetric {
  id: string
  name: string
  code: string
  revenue: number
  salesCount: number
  itemsSold: number
  staffCount: number
  avgTransaction: number
  growth: number
  isActive: boolean
  currencySymbol: string
}

interface BranchPerformanceTableProps {
  branches: BranchMetric[]
  maxRevenue: number
  currencySymbol: string
}

export function BranchPerformanceTable({ branches, maxRevenue, currencySymbol }: BranchPerformanceTableProps) {
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null)
  const sortedBranches = [...branches].sort((a, b) => b.revenue - a.revenue)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-sm border border-slate-200 bg-white"
    >
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Branch Performance Metrics</h3>
        <p className="text-sm text-slate-500">Detailed performance breakdown by branch</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Branch
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Revenue
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Sales
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Items Sold
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Avg Transaction
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Growth
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedBranches.map((branch) => {
                const isExpanded = expandedBranch === branch.id
                const percentage = (branch.revenue / maxRevenue) * 100

                return (
                  <React.Fragment key={branch.id}>
                    <tr className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#003e9d]/10">
                            <Building2 className="h-4 w-4 text-[#003e9d]" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{branch.name}</p>
                            <p className="text-xs text-slate-400">{branch.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-slate-900">
                        {currencySymbol}{branch.revenue.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right text-slate-600">
                        {branch.salesCount}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right text-slate-600">
                        {branch.itemsSold.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right text-slate-600">
                        {currencySymbol}{branch.avgTransaction.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <span className={`inline-flex items-center gap-1 ${branch.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {branch.growth >= 0 ? '↑' : '↓'}
                          {Math.abs(branch.growth).toFixed(1)}%
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-center">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${branch.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {branch.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-center">
                        <button
                          onClick={() => setExpandedBranch(isExpanded ? null : branch.id)}
                          className="p-1 hover:bg-slate-100 rounded"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {isExpanded && (
                      <tr className="bg-slate-50">
                        <td colSpan={8} className="px-5 py-4">
                          <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-sm bg-white p-3 border border-slate-200">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-slate-400" />
                                <p className="text-xs font-medium text-slate-600">Staff Count</p>
                              </div>
                              <p className="mt-1 text-lg font-semibold text-slate-900">{branch.staffCount}</p>
                            </div>
                            <div className="rounded-sm bg-white p-3 border border-slate-200">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-slate-400" />
                                <p className="text-xs font-medium text-slate-600">Revenue per Staff</p>
                              </div>
                              <p className="mt-1 text-lg font-semibold text-slate-900">
                                {currencySymbol}{Math.round(branch.revenue / branch.staffCount).toLocaleString()}
                              </p>
                            </div>
                            <div className="rounded-sm bg-white p-3 border border-slate-200">
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-slate-400" />
                                <p className="text-xs font-medium text-slate-600">Items per Sale</p>
                              </div>
                              <p className="mt-1 text-lg font-semibold text-slate-900">
                                {branch.salesCount > 0 ? (branch.itemsSold / branch.salesCount).toFixed(1) : '0'}
                              </p>
                            </div>
                          </div>
                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                              <span>Revenue Contribution</span>
                              <span>{percentage.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                              <div 
                                className="h-full rounded-full bg-gradient-to-r from-[#003e9d] to-[#0050c9]"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
        </table>
        </div>
      </div>
    </motion.div>
  )
}
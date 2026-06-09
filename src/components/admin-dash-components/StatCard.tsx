// src/components/StatCard.tsx
"use client";

import { motion } from "framer-motion"
import type { ComponentType } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon?: ComponentType<{ className?: string }>
  subtitle?: string
  trend?: string
  trendUp?: boolean
  color?: string
  bgColor?: string
  iconColor?: string
  delay?: number
  tooltipText?: string
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  subtitle, 
  trend, 
  trendUp = true,
  bgColor = "bg-blue-50",
  iconColor = "text-blue-600",
  delay = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-3 flex items-center gap-1">
              {trendUp ? (
                <TrendingUp className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-600" />
              )}
              <span className={`text-xs font-medium ${trendUp ? "text-green-600" : "text-red-600"}`}>
                {trend}
              </span>
              <span className="text-xs text-slate-500">vs last month</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`flex h-11 w-11 items-center justify-center rounded-sm ${bgColor} transition-all group-hover:scale-105`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

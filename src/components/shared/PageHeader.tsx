// src/components/shared/PageHeader.tsx
"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle: string
  badge?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, subtitle, badge, actions }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
          </div>
        )}
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </div>
      {actions && <div className="flex flex-col gap-2 sm:flex-row">{actions}</div>}
    </motion.div>
  )
}
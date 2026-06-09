// src/components/branches/BranchActionCard.tsx
"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface BranchActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  onClick: () => void
  color?: "blue" | "green" | "purple" | "red" | "slate"
  danger?: boolean
  delay?: number
}

const colorStyles = {
  blue: "border-blue-200 bg-blue-50 hover:bg-blue-100 icon-blue",
  green: "border-green-200 bg-green-50 hover:bg-green-100 icon-green",
  purple: "border-purple-200 bg-purple-50 hover:bg-purple-100 icon-purple",
  red: "border-red-200 bg-red-50 hover:bg-red-100 icon-red",
  slate: "border-slate-200 bg-slate-50 hover:bg-slate-100 icon-slate",
}

const iconColors = {
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  red: "text-red-600",
  slate: "text-slate-600",
}

export function BranchActionCard({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  color = "blue",
  danger = false,
  delay = 0 
}: BranchActionCardProps) {
  const style = danger ? colorStyles.red : colorStyles[color]
  const iconColor = danger ? iconColors.red : iconColors[color]

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`group rounded-sm border p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${style}`}
    >
      <div className={`flex h-11 w-11 items-center justify-center rounded-sm ${style.replace("hover:", "").replace("icon-blue", "").replace("icon-green", "").replace("icon-purple", "").replace("icon-red", "").replace("icon-slate", "")} bg-opacity-100`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </motion.button>
  )
}
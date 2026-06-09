"use client"

import { ShoppingCart } from "lucide-react"

interface EmptySalesStateProps {
  message?: string
}

export function EmptySalesState({ message = "No sales found" }: EmptySalesStateProps) {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-12 text-center">
      <ShoppingCart className="mx-auto h-12 w-12 text-slate-400" />
      <p className="mt-4 text-sm text-slate-500">{message}</p>
    </div>
  )
}
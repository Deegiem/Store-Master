"use client"

import { ShoppingCart } from "lucide-react"

export function EmptyProcurementState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-20 text-center">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
        <ShoppingCart className="h-10 w-10 text-zinc-400" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-zinc-900">
        No Purchase Orders Found
      </h3>

      <p className="mt-2 max-w-md text-sm text-zinc-500">
        No procurement records match the current filters or no purchase orders have been created yet.
      </p>
    </div>
  )
}
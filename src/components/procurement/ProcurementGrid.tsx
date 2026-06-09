// src/components/procurement/ProcurementGrid.tsx
"use client"

import { ProcurementCard } from "./ProcurementCard"
import type { ProcurementListItem } from "@/types/procurement"

interface ProcurementGridProps {
  orders: ProcurementListItem[]
}

export function ProcurementGrid({ orders }: ProcurementGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order, index) => (
        <ProcurementCard key={order.po_id} order={order} delay={index * 0.05} />
      ))}
    </div>
  )
}
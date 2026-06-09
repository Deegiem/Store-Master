"use client"

import type { PriceHistoryItem } from "@/types/products"

interface Props {
  history: PriceHistoryItem[]
  loading: boolean
}

export default function PriceHistoryTable({
  history,
  loading,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
        Loading history...
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-5 py-4 text-left">
              Date
            </th>

            <th className="px-5 py-4 text-left">
              Type
            </th>

            <th className="px-5 py-4 text-left">
              Old Price
            </th>

            <th className="px-5 py-4 text-left">
              New Price
            </th>

            <th className="px-5 py-4 text-left">
              Margin
            </th>

            <th className="px-5 py-4 text-left">
              Changed By
            </th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr
              key={index}
              className="border-t"
            >
              <td className="px-5 py-4">
                {item.change_date}
              </td>

              <td className="px-5 py-4">
                {item.change_type}
              </td>

              <td className="px-5 py-4">
                ₦{item.old_price ?? 0}
              </td>

              <td className="px-5 py-4">
                ₦{item.new_price ?? 0}
              </td>

              <td className="px-5 py-4">
                {item.new_margin ?? 0}%
              </td>

              <td className="px-5 py-4">
                {item.changed_by}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
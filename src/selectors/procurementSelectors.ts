import type { ProcurementListItem, POStatus } from "@/types/procurement"

export const filterProcurements = (
  list: ProcurementListItem[],
  search: string,
  status: POStatus | "all"
) => {
  return list.filter((po) => {
    const matchesSearch =
      po.supplier_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      po.target_branch
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesStatus =
      status === "all" || po.status === status

    return matchesSearch && matchesStatus
  })
}

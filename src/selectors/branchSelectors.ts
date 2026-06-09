import { Branch } from "@/types/branch"

export function filterBranches(
  branches: Branch[] = [],
  search: string,
  status: "all" | "active" | "inactive"
) {
  if (!Array.isArray(branches)) return []

  const query = search.trim().toLowerCase()

  return branches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(query) ||
      branch.code.toLowerCase().includes(query)

    const matchesStatus =
      status === "all"
        ? true
        : status === "active"
        ? branch.is_active
        : !branch.is_active

    return matchesSearch && matchesStatus
  })
}
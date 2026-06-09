// utils/audit.ts
export const getAuditStatus = (action: string) => {
  if (action.includes("FAILED") || action.includes("REJECTED"))
    return "REJECTED"
  return "SUCCESS"
}
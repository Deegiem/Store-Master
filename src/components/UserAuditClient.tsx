// UserAuditClient.tsx
"use client"

import { useEffect, useState } from "react"
import { useAdminStore } from "@/store/adminStore"

export default function UserAuditClient({
  userId,
}: {
  userId: string
}) {
  const {
    userAuditTrails,
    fetchUserAuditTrail,
    adminloading,
  } = useAdminStore()

  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!userId) return
    fetchUserAuditTrail(userId, { page, limit: 10 })
  }, [page, userId, fetchUserAuditTrail])

  const audit = userAuditTrails
  const user = audit?.user
  const logs = audit?.logs ?? []

  console.log("USER ID (FINAL):", userId)
  console.log("AUDIT:", audit)

  return (
    <div className="p-6 space-y-6">
      {adminloading.userAuditTrails && <p>Loading...</p>}

      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}

      <div>
        {logs.length === 0 ? (
          <p>No activity found</p>
        ) : (
          logs.map((log, i) => (
            <div key={i}>
              {log.action} — {log.module}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

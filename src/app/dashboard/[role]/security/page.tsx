// src\app\dashboard\[role]\security\page.tsx
"use client"

import { RoleGuard } from "@/components/RoleGuard"
import { FailedLoginReport } from "@/components/admin/security/FailedLoginReport"
import type { AppRole } from "@/lib/roleMapper"

export default function SecurityPage() {
  const allowedRoles: AppRole[] = ["admin"]

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Security Reports</h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor failed login attempts and suspicious activities
            </p>
          </div>
          <FailedLoginReport />
        </div>
      </div>
    </RoleGuard>
  )
}
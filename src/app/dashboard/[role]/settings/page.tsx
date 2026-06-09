"use client"

import { RoleGuard } from "@/components/RoleGuard"
import { SystemSettingsForm } from "@/components/admin/settings/SystemSettingsForm"
import type { AppRole } from "@/lib/roleMapper"

export default function SettingsPage() {
  const allowedRoles: AppRole[] = ["admin"]

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
            <p className="mt-1 text-sm text-slate-500">
              Configure global system parameters and business rules
            </p>
          </div>
          <SystemSettingsForm />
        </div>
      </div>
    </RoleGuard>
  )
}
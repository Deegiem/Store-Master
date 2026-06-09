"use client"

import type { SystemSettings } from "@/types/admin"

interface GeneralSettingsTabProps {
  settings: SystemSettings | null
  onChange: (settings: SystemSettings) => void
  lastUpdatedByName?: string
}

export function GeneralSettingsTab({ settings, onChange, lastUpdatedByName }: GeneralSettingsTabProps) {
  if (!settings) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent" />
        <span className="ml-3 text-sm text-slate-600">Loading settings...</span>
      </div>
    )
  }

  const updateField = <K extends keyof SystemSettings>(field: K, value: SystemSettings[K]) => {
    onChange({ ...settings, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
          System Name
        </label>
        <input
          type="text"
          value={settings.system_name ?? ""}
          onChange={(e) => updateField("system_name", e.target.value)}
          className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          placeholder="System Name"
        />
        <p className="mt-1 text-xs text-slate-500">Name displayed throughout the system</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Currency Symbol
          </label>
          <input
            type="text"
            value={settings.currency_symbol ?? "₦"}
            onChange={(e) => updateField("currency_symbol", e.target.value)}
            className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            placeholder="₦"
            maxLength={3}
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Currency Code
          </label>
          <input
            type="text"
            value={settings.currency_code ?? "NGN"}
            disabled
            className="mt-2 w-full rounded-sm border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-slate-500">ISO currency code (read-only)</p>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
          Timezone
        </label>
        <input
          type="text"
          value={settings.timezone ?? "Africa/Lagos"}
          disabled
          className="mt-2 w-full rounded-sm border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-slate-500">System timezone (read-only)</p>
      </div>

      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
          Last Updated
        </label>
        <input
          type="text"
          value={settings.last_updated_at ? new Date(settings.last_updated_at).toLocaleString() : "N/A"}
          disabled
          className="mt-2 w-full rounded-sm border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-slate-500">
          Last updated by: {lastUpdatedByName || settings.last_updated_by || "Unknown"}
        </p>
      </div>
    </div>
  )
}
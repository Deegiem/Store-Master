"use client"

import type { SystemSettings } from "@/types/admin"

interface ThresholdSettingsTabProps {
  settings: SystemSettings | null
  onChange: (settings: SystemSettings) => void
}

export function ThresholdSettingsTab({ settings, onChange }: ThresholdSettingsTabProps) {
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
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Default Low Stock Threshold
          </label>
          <input
            type="number"
            min="0"
            value={settings.default_low_stock_threshold ?? 10}
            onChange={(e) => updateField("default_low_stock_threshold", parseInt(e.target.value) || 0)}
            className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          />
          <p className="mt-1 text-xs text-slate-500">Products below this level trigger low stock alerts</p>
        </div>

        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Critical Stock Threshold
          </label>
          <input
            type="number"
            min="0"
            value={settings.critical_stock_threshold ?? 5}
            onChange={(e) => updateField("critical_stock_threshold", parseInt(e.target.value) || 0)}
            className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          />
          <p className="mt-1 text-xs text-slate-500">Products below this level trigger critical alerts</p>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
          PO Approval Threshold
        </label>
        <input
          type="number"
          min="0"
          value={settings.po_approval_threshold ?? 0}
          onChange={(e) => updateField("po_approval_threshold", parseInt(e.target.value) || 0)}
          className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
        />
        <p className="mt-1 text-xs text-slate-500">
          Purchase orders above this amount require approval
        </p>
      </div>

      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
          Max Discount Percentage
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={settings.max_discount_percentage ?? 0}
          onChange={(e) => updateField("max_discount_percentage", parseInt(e.target.value) || 0)}
          className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
        />
        <p className="mt-1 text-xs text-slate-500">Maximum discount percentage allowed per transaction</p>
      </div>
    </div>
  )
}
"use client"

import type { SystemSettings } from "@/types/admin"

interface BusinessSettingsTabProps {
  settings: SystemSettings | null
  onChange: (settings: SystemSettings) => void
}

export function BusinessSettingsTab({ settings, onChange }: BusinessSettingsTabProps) {
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
            VAT Rate
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={settings.vat_rate ?? 0}
            onChange={(e) => updateField("vat_rate", parseFloat(e.target.value) || 0)}
            className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          />
          <p className="mt-1 text-xs text-slate-500">Current VAT rate: {settings.vat_percentage ?? "0.0%"}</p>
        </div>

        <div className="flex items-center justify-between rounded-sm border border-slate-200 bg-slate-50 p-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Allow Negative Stock
            </label>
            <p className="text-xs text-slate-500">Permit sales when stock is insufficient</p>
          </div>
          <button
            type="button"
            onClick={() => updateField("allow_negative_stock", !settings.allow_negative_stock)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              settings.allow_negative_stock ? "bg-[#003e9d]" : "bg-slate-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                settings.allow_negative_stock ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-sm border border-slate-200 bg-slate-50 p-4">
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Require Till Number
          </label>
          <p className="text-xs text-slate-500">Force cashiers to enter till number for each sale</p>
        </div>
        <button
          type="button"
          onClick={() => updateField("require_till_number", !settings.require_till_number)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            settings.require_till_number ? "bg-[#003e9d]" : "bg-slate-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              settings.require_till_number ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect, useCallback } from "react"
import { Save, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"
import { useAdminStore } from "@/store/adminStore"
import { useUserStore } from "@/store/useUserStore"
import { SettingsSkeleton } from "./SettingsSkeleton"
import { GeneralSettingsTab } from "./GeneralSettingsTab"
import { ThresholdSettingsTab } from "./ThresholdSettingsTab"
import { BusinessSettingsTab } from "./BusinessSettingsTab"
import { usePermissions } from "@/hooks/usePermissions"
import type { SystemSettings } from "@/types/admin"

type TabType = "general" | "thresholds" | "business"

export function SystemSettingsForm() {
    const { canEditSettings } = usePermissions()
    const { systemSettings, fetchSystemSettings, updateSystemSettings, adminloading, error } = useAdminStore()
    const { users, fetchUsers } = useUserStore()
    const [settings, setSettings] = useState<SystemSettings | null>(null)
    const [activeTab, setActiveTab] = useState<TabType>("general")
    const [isSaving, setIsSaving] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [lastUpdatedByName, setLastUpdatedByName] = useState<string>("")

    useEffect(() => {
        fetchSystemSettings()
        fetchUsers()
    }, [fetchSystemSettings, fetchUsers])

    useEffect(() => {
        if (systemSettings) {
            setSettings(systemSettings)
            // Find user name from users list
            if (users.length > 0 && systemSettings.last_updated_by) {
                const user = users.find(u => u.user_id === systemSettings.last_updated_by)
                setLastUpdatedByName(user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : systemSettings.last_updated_by)
            } else if (systemSettings.last_updated_by) {
                setLastUpdatedByName(systemSettings.last_updated_by)
            }
        }
    }, [systemSettings, users])

    const handleSave = async () => {
        if (!settings) return

        setIsSaving(true)
        try {
            console.log('Saving settings payload:', settings) // Debug log
            const response = await updateSystemSettings(settings)
            console.log('API Response:', response) // Debug log

            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)

            // Refetch settings to ensure UI shows saved values
            await fetchSystemSettings()
        } catch (err) {
            console.error("Failed to save settings:", err)
            alert(`Failed to save: ${err}`)
        } finally {
            setIsSaving(false)
            setShowConfirm(false)
        }
    }

    const handleReset = () => {
        if (systemSettings) {
            setSettings(systemSettings)
        }
    }

    const hasChanges = () => {
        if (!settings || !systemSettings) return false
        return JSON.stringify(settings) !== JSON.stringify(systemSettings)
    }

    const tabs = [
        { id: "general" as TabType, name: "General Settings", description: "System name, currency, timezone" },
        { id: "thresholds" as TabType, name: "Thresholds", description: "Stock levels, approvals, discounts" },
        { id: "business" as TabType, name: "Business Rules", description: "Tax rates, stock policies" },
    ]

    const isLoading = adminloading.systemSettings

    if (error.systemSettings) {
        return (
            <div className="rounded-sm border border-red-200 bg-red-50 p-8 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
                <p className="mt-4 text-sm text-red-600">{error.systemSettings}</p>
                <button
                    onClick={fetchSystemSettings}
                    className="mt-4 rounded-sm bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>
        )
    }

    if (isLoading || !settings) {
        return <SettingsSkeleton />
    }

    return (
        <div className="space-y-6">
            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-sm bg-green-50 border border-green-200 px-4 py-3 shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm font-medium text-green-700">Settings saved successfully!</p>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-sm bg-white shadow-xl">
                        <div className="border-b border-slate-200 p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-amber-50">
                                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Save Changes</h2>
                                    <p className="text-sm text-slate-500">Confirm your changes</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            <p className="text-sm text-slate-600">
                                These changes will take effect immediately across the entire system. Are you sure you want to proceed?
                            </p>
                        </div>
                        <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="rounded-sm border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 rounded-sm bg-[#003e9d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#002a6b] disabled:opacity-50"
                            >
                                {isSaving && <RefreshCw className="h-4 w-4 animate-spin" />}
                                Confirm Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Form */}
            <div className="rounded-sm border border-slate-200 bg-white">
                {/* Tabs */}
                <div className="border-b border-slate-200 bg-slate-50 px-6">
                    <div className="flex gap-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`border-b-2 py-3 text-sm font-medium transition ${activeTab === tab.id
                                        ? "border-[#003e9d] text-[#003e9d]"
                                        : "border-transparent text-slate-600 hover:text-slate-900"
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === "general" && (
                        <GeneralSettingsTab
                            settings={settings}
                            onChange={setSettings}
                            lastUpdatedByName={lastUpdatedByName}
                        />
                    )}
                    {activeTab === "thresholds" && (
                        <ThresholdSettingsTab settings={settings} onChange={setSettings} />
                    )}
                    {activeTab === "business" && (
                        <BusinessSettingsTab settings={settings} onChange={setSettings} />
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
                    <button
                        onClick={handleReset}
                        disabled={!hasChanges()}
                        className="rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Reset
                    </button>
                    {canEditSettings && (
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={!hasChanges() || isSaving}
                            className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            Save Changes
                        </button>
                    )}
                </div>
            </div>

            {/* Info Banner */}
            <div className="rounded-sm border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                    ⚡ Changes take effect immediately. Last updated by <strong>{lastUpdatedByName}</strong> on{" "}
                    {new Date(settings.last_updated_at).toLocaleString()}
                </p>
            </div>
        </div>
    )
}
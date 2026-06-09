// src/components/dashboard/DashboardError.tsx
"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

interface DashboardErrorProps {
  message: string
  onRetry?: () => void
}

export function DashboardError({ message, onRetry }: DashboardErrorProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-center rounded-sm border border-red-200 bg-red-50 p-12 text-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-lg font-semibold text-red-700">Unable to Load Dashboard</h2>
          <p className="mt-2 text-sm text-red-600">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
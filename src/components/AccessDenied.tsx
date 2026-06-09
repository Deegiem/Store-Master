// src/components/AccessDenied.tsx
import { ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"

interface AccessDeniedProps {
  message?: string
  showBackButton?: boolean
}

export function AccessDenied({ message = "You don't have permission to access this page", showBackButton = true }: AccessDeniedProps) {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col items-center justify-center rounded-sm border border-red-200 bg-red-50 p-8 text-center">
          <ShieldAlert className="h-16 w-16 text-red-500" />
          <h2 className="mt-4 text-xl font-bold text-red-700">Access Denied</h2>
          <p className="mt-2 text-sm text-red-600">{message}</p>
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="mt-6 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
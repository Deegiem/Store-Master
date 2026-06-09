"use client"

import { useState } from "react"
import { XCircle } from "lucide-react"
import { useSalesStore } from "@/store/saleStore"
import { usePermissions } from "@/hooks/usePermissions"
import { CancellationConfirmModal } from "./CancellationConfirmModal"

interface CancelSaleButtonProps {
  saleId: string
  onCancel?: () => void
}

export function CancelSaleButton({ saleId, onCancel }: CancelSaleButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [reason, setReason] = useState("")
  const { cancelSale, loading } = useSalesStore()
  const { userBranchId } = usePermissions()

  const handleCancel = async () => {
    if (!reason.trim()) {
      alert("Please provide a cancellation reason")
      return
    }
    
    await cancelSale(saleId, { cancellation_reason: reason }, userBranchId)
    setShowModal(false)
    setReason("")
    onCancel?.()
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={loading.cancelSale}
        className="inline-flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
      >
        <XCircle className="h-4 w-4" />
        {loading.cancelSale ? "Processing..." : "Cancel Sale"}
      </button>

      <CancellationConfirmModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setReason("")
        }}
        title="Cancel Sale"
        description="Please provide a reason for cancelling this sale. This action cannot be undone and will restore inventory."
        actionText="Cancel Sale"
        loading={loading.cancelSale}
        danger={true}
        onConfirm={handleCancel}
      >
        <div className="mt-4">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Cancellation Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Customer returned item, Wrong product selected, etc."
            rows={3}
            className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            required
          />
        </div>
      </CancellationConfirmModal>
    </>
  )
}
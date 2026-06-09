// src/components/procurement/ActionButtons.tsx
"use client"

import { useState } from "react"
import { CheckCircle, XCircle, PackageCheck } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { ReceiveGoodsModal } from "./ReceiveGoodsModal"
import { ApprovalConfirmModal } from "./ApprovalConfirmModal"
import { RejectionReasonModal } from "./RejectionReasonModal"
import type { ReceivePOItem } from "@/types/procurement"

interface ActionButtonsProps {
  canApprove: boolean
  canReject: boolean
  canReceive: boolean
  poId: string
  items?: Array<{ product_id: string; quantity: number }>
}

export function ActionButtons({ canApprove, canReject, canReceive, poId, items = [] }: ActionButtonsProps) {
  const { approvePO, rejectPO, receiveGoods, loading } = useProcurementStore()
  const [receiveModalOpen, setReceiveModalOpen] = useState(false)
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)

  const handleApprove = async () => {
    await approvePO(poId)
    setApproveModalOpen(false)
  }

  // This function will be called from the modal with the reason
  const handleConfirmReject = async (reason: string) => {
    await rejectPO(poId, reason)
    setRejectModalOpen(false)
  }

  const handleReceive = async (notes: string) => {
    // Get the current PO items to check which products exist
    const selectedPO = useProcurementStore.getState().selectedPO

    // Filter out items where product_name is missing (deleted)
    const validItems = items.filter((item, idx) => {
      const productName = selectedPO?.items?.[idx]?.product_name
      return productName && productName !== "Unknown"
    })

    if (validItems.length === 0) {
      alert("Cannot receive goods: The products in this order no longer exist in the system.")
      return
    }

    if (validItems.length !== items.length) {
      const confirmed = confirm(`Some products in this order have been deleted from the catalog. Only ${validItems.length} of ${items.length} items can be received. Do you want to continue?`)
      if (!confirmed) return
    }

    const receiveItems: ReceivePOItem[] = validItems.map(item => ({
      product_id: item.product_id,
      received_qty: item.quantity
    }))

    console.log("📦 Receiving items:", receiveItems)
    await receiveGoods(poId, { items: receiveItems, notes })
  }

  if (!canApprove && !canReject && !canReceive) return null

  return (
    <>
      <div className="flex gap-3">
        {canApprove && (
          <button
            onClick={() => setApproveModalOpen(true)}
            disabled={loading.approve}
            className="inline-flex items-center gap-2 rounded-sm bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(34,197,94,0.25)] transition hover:-translate-y-0.5 hover:bg-green-700 disabled:opacity-50"
          >
            <CheckCircle className="h-4 w-4" />
            {loading.approve ? "Processing..." : "Approve Order"}
          </button>
        )}

        {canReject && (
          <button
            onClick={() => setRejectModalOpen(true)}
            disabled={loading.reject}
            className="inline-flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
          >
            <XCircle className="h-4 w-4" />
            {loading.reject ? "Processing..." : "Reject Order"}
          </button>
        )}

        {canReceive && (
          <button
            onClick={() => setReceiveModalOpen(true)}
            disabled={loading.receive}
            className="inline-flex items-center gap-2 rounded-sm bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:opacity-50"
          >
            <PackageCheck className="h-4 w-4" />
            Receive Goods
          </button>
        )}
      </div>

      <ApprovalConfirmModal
        open={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        onConfirm={handleApprove}
        title="Approve Purchase Order"
        description="Are you sure you want to approve this purchase order? This will allow the order to proceed to receiving."
        confirmText="Approve Order"
        isLoading={loading.approve}
        type="approve"
      />

      <RejectionReasonModal
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleConfirmReject}  // ← Fixed: use handleConfirmReject instead of handleReject
        isLoading={loading.reject}
      />

      <ReceiveGoodsModal
        open={receiveModalOpen}
        onClose={() => setReceiveModalOpen(false)}
        onSubmit={handleReceive}
      />
    </>
  )
}
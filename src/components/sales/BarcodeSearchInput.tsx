"use client"

import { useState } from "react"
import React from "react"
import { Barcode, Loader2 } from "lucide-react"
import { useSalesStore } from "@/store/saleStore"
import { usePermissions } from "@/hooks/usePermissions"

interface BarcodeSearchInputProps {
    onSuccess: (productId: string) => void
    branchId: string  // Add this prop

}

export function BarcodeSearchInput({ onSuccess, branchId }: BarcodeSearchInputProps) {
    const [barcode, setBarcode] = useState("")
    const { searchProductByBarcode, barcodeProduct, loading, error } = useSalesStore()

    const handleSearch = async () => {
        if (!barcode.trim()) return
        if (!branchId) {
            alert("No branch selected")
            return
        }
        await searchProductByBarcode(barcode, branchId)
        if (barcodeProduct) {
            onSuccess(barcodeProduct.product_id)
            setBarcode("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="rounded-sm border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2">
                <Barcode className="h-4 w-4 text-slate-400" />
                <label className="text-sm font-medium text-slate-700">Scan Barcode</label>
            </div>
            <div className="mt-2 flex gap-2">
                <input
                    type="text"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Scan or enter barcode"
                    className="flex-1 rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    autoFocus={false}
                />
                <button
                    onClick={handleSearch}
                    disabled={loading.barcode}
                    className="rounded-sm bg-[#003e9d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#002a6b] disabled:opacity-50"
                >
                    {loading.barcode ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
                </button>
            </div>
            {error.barcode && (
                <p className="mt-2 text-xs text-red-600">{error.barcode}</p>
            )}
            {barcodeProduct && !error.barcode && (
                <p className="mt-2 text-xs text-green-600">
                    Added: {barcodeProduct.name}
                </p>
            )}
        </div>
    )
}
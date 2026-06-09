// src/components/procurement/CreatePOModal.tsx
"use client"

import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { CreatePOPayload } from "@/types/procurement"
import {
    Building2,
    Package2,
    Plus,
    Search,
    Trash2,
    Truck,
    Wallet,
    Loader2,
    ShoppingCart,
    X,
    AlertCircle
} from "lucide-react"

import { useBranchStore } from "@/store/useBranchStore"
import { useSupplierStore } from "@/store/supplierStore"
import { useProductStore } from "@/store/productStore"
import { useProcurementStore } from "@/store/useProcurementStore"

interface Props {
    open: boolean
    onClose: () => void
}

interface LineItem {
    product_id: string
    quantity: number
    unit_cost: number
}

export function CreatePOModal({ open, onClose }: Props) {
    const { branches, fetchBranches, branchloading } = useBranchStore()
    const { suppliers, fetchSuppliers, loading: supplierLoading } = useSupplierStore()
    const { products, fetchProducts, productloading } = useProductStore()
    const { createPurchaseOrder, loading, fetchAll, error } = useProcurementStore()

    const [supplierId, setSupplierId] = useState("")
    const [branchId, setBranchId] = useState("")
    const [productSearch, setProductSearch] = useState("")
    const [items, setItems] = useState<LineItem[]>([
        { product_id: "", quantity: 1, unit_cost: 0 },
    ])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [onClose])

    useEffect(() => {
        if (open) {
            fetchBranches()
            fetchSuppliers()
            fetchProducts()
        }
    }, [open, fetchBranches, fetchSuppliers, fetchProducts])

    useEffect(() => {
        if (!open) {
            setSupplierId("")
            setBranchId("")
            setProductSearch("")
            setItems([{ product_id: "", quantity: 1, unit_cost: 0 }])
        }
    }, [open])

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase())
    )

    const updateItem = (index: number, key: keyof LineItem, value: string | number) => {
        const copy = [...items]
        copy[index] = { ...copy[index], [key]: value }
        setItems(copy)
    }

    const addItem = () => {
        setItems([...items, { product_id: "", quantity: 1, unit_cost: 0 }])
    }

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index))
    }

    const total = useMemo(() => {
        return items.reduce((acc, item) => acc + item.quantity * item.unit_cost, 0)
    }, [items])

    const valid = supplierId && branchId && items.every((x) => x.product_id && x.quantity > 0 && x.unit_cost > 0)

    const submit = async () => {
        if (!valid) return

        const payload: CreatePOPayload = {
            supplier_id: supplierId,
            target_branch: branchId,
            items: items.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                unit_cost: item.unit_cost
            }))
        }

        const result = await createPurchaseOrder(payload)

        if (result) {
            await fetchAll()
            onClose()
        }
    }

    const isLoading = branchloading.branches || supplierLoading.suppliers || productloading.products

    if (!open) return null

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-sm bg-white shadow-xl"
                    >
                        {/* HEADER */}
                        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-6 py-5 text-white">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/20">
                                    <ShoppingCart className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Create Purchase Order</h2>
                                    <p className="text-sm text-blue-100">Generate procurement requests for branch inventory</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-sm p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {isLoading ? (
                                <div className="flex h-64 items-center justify-center">
                                    <Loader2 className="h-8 w-8 animate-spin text-[#003e9d]" />
                                </div>
                            ) : (
                                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                                    {/* LEFT PANEL */}
                                    <div className="space-y-6">
                                        {/* Supplier & Branch Selection */}
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                    Supplier *
                                                </label>
                                                <select
                                                    value={supplierId}
                                                    onChange={(e) => setSupplierId(e.target.value)}
                                                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                                >
                                                    <option value="">Select supplier</option>
                                                    {suppliers.map((s) => (
                                                        <option key={s.id} value={s.id}>
                                                            {s.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                    Target Branch *
                                                </label>
                                                <select
                                                    value={branchId}
                                                    onChange={(e) => setBranchId(e.target.value)}
                                                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                                >
                                                    <option value="">Select branch</option>
                                                    {branches.map((b) => (
                                                        <option key={b.id} value={b.id}>
                                                            {b.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Products Section */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-slate-900">Procurement Items</h3>
                                                    <p className="text-xs text-slate-500">Add products and quantities</p>
                                                </div>
                                                <button
                                                    onClick={addItem}
                                                    className="inline-flex items-center gap-1 rounded-sm border border-slate-200 px-3 py-1.5 text-sm text-[#003e9d] transition hover:bg-slate-50"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    Add Item
                                                </button>
                                            </div>

                                            {/* Product Search */}
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="text"
                                                    value={productSearch}
                                                    onChange={(e) => setProductSearch(e.target.value)}
                                                    placeholder="Search products..."
                                                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                                />
                                            </div>

                                            {/* Items List */}
                                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                                {items.map((item, index) => (
                                                    <div key={index} className="rounded-sm border border-slate-200 bg-white p-4">
                                                        <div className="grid gap-3 sm:grid-cols-[2fr,1fr,1fr,auto]">
                                                            <div>
                                                                <label className="text-xs text-slate-500">Product</label>
                                                                <select
                                                                    value={item.product_id}
                                                                    onChange={(e) => updateItem(index, "product_id", e.target.value)}
                                                                    className="mt-1 h-10 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 text-sm focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                                                >
                                                                    <option value="">Select Product</option>
                                                                    {filteredProducts.map((p) => (
                                                                        <option key={p.id} value={p.id}>
                                                                            {p.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label className="text-xs text-slate-500">Quantity</label>
                                                                <input
                                                                    type="number"
                                                                    min={1}
                                                                    value={item.quantity}
                                                                    onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                                                                    className="mt-1 h-10 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 text-sm focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-xs text-slate-500">Unit Cost</label>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    step={100}
                                                                    value={item.unit_cost}
                                                                    onChange={(e) => updateItem(index, "unit_cost", Number(e.target.value))}
                                                                    className="mt-1 h-10 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 text-sm focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                                                />
                                                            </div>

                                                            <div className="flex items-end">
                                                                <button
                                                                    onClick={() => removeItem(index)}
                                                                    disabled={items.length === 1}
                                                                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-40"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 flex justify-end">
                                                            <div className="rounded-sm bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                                                                Subtotal: ₦{(item.quantity * item.unit_cost).toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT PANEL - Summary */}
                                    <div className="space-y-6">
                                        <div className="sticky top-0 rounded-sm border border-slate-200 bg-white p-5">
                                            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-purple-50">
                                                    <Wallet className="h-4 w-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">Procurement Summary</h3>
                                                    <p className="text-xs text-slate-500">Real-time PO breakdown</p>
                                                </div>
                                            </div>

                                            <div className="mt-4 space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-slate-500">Items</span>
                                                    <span className="font-semibold text-slate-900">{items.length}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-slate-500">Total Quantity</span>
                                                    <span className="font-semibold text-slate-900">
                                                        {items.reduce((acc, item) => acc + item.quantity, 0)}
                                                    </span>
                                                </div>
                                                <div className="border-t border-slate-100 pt-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-sm font-medium text-slate-500">Total Amount</span>
                                                        <span className="text-xl font-bold text-slate-900">₦{total.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* FOOTER */}
                        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                            <button
                                onClick={onClose}
                                className="rounded-sm border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submit}
                                disabled={!valid || loading.create}
                                className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
                            >
                                {loading.create && <Loader2 className="h-4 w-4 animate-spin" />}
                                Submit Purchase Order
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

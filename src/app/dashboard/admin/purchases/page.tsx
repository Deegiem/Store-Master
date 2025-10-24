"use client"

import { useEffect, useState } from "react"
import { usePurchaseStore } from "@/store/purchaseStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function PurchasesPage() {
  const {
    purchases,
    loading,
    error,
    fetchPendingPurchases,
    createPurchase,
    approvePurchase,
    rejectPurchase,
  } = usePurchaseStore()

  const [form, setForm] = useState({
    supplier_id: "",
    product_id: "",
    quantity: "",
  })
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  // Fetch pending purchases on mount
  useEffect(() => {
    fetchPendingPurchases()
  }, [fetchPendingPurchases])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.supplier_id || !form.product_id || !form.quantity) {
      toast.error("All fields are required.")
      return
    }

    try {
      await createPurchase({
        supplier_id: form.supplier_id,
        product_id: form.product_id,
        quantity: Number(form.quantity),
      })
      toast.success("Purchase request created successfully!")
      setForm({ supplier_id: "", product_id: "", quantity: "" })
    } catch (err) {
        console.error(err);
        toast.error("Failed to create purchase request.")
    }
  }

  const handleApprove = async (id: string) => {
    await approvePurchase(id)
    toast.success("Purchase approved successfully!")
  }

  const handleReject = async (id: string) => {
    if (!rejectionReason) {
      toast.error("Please provide a reason for rejection.")
      return
    }
    await rejectPurchase(id, rejectionReason)
    toast.success("Purchase rejected.")
    setRejectingId(null)
    setRejectionReason("")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Purchases Management</h1>
      </div>

      {/* Create Purchase Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Purchase</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-3">
            <Input
              placeholder="Supplier ID"
              value={form.supplier_id}
              onChange={(e) => setForm({ ...form, supplier_id: e.target.value })}
            />
            <Input
              placeholder="Product ID"
              value={form.product_id}
              onChange={(e) => setForm({ ...form, product_id: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin size-4" /> : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Purchases List */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-6">
              <Loader2 className="animate-spin size-6" />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : purchases.length === 0 ? (
            <p className="text-gray-500">No pending purchases at the moment.</p>
          ) : (
            <div className="space-y-4">
              {purchases.map((p) => (
                <div
                  key={p.purchase_id}
                  className="flex items-center justify-between border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Product: {p.product_id}</p>
                    <p className="text-sm text-gray-600">Supplier: {p.supplier_id}</p>
                    <p className="text-sm text-gray-600">Quantity: {p.quantity}</p>
                    <p className="text-sm text-gray-500">
                      Status: <span className="capitalize">{p.status}</span>
                    </p>
                  </div>

                  {rejectingId === p.purchase_id ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Reason..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(p.purchase_id)}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setRejectingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={() => handleApprove(p.purchase_id)}>Approve</Button>
                      <Button
                        variant="destructive"
                        onClick={() => setRejectingId(p.purchase_id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

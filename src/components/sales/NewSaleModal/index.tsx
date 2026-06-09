"use client"

import { useState, useEffect, useCallback, useTransition, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, Loader2 } from "lucide-react"
import { useSalesStore } from "@/store/saleStore"
import { ProductSearchInput } from "./ProductSearchInput"
import { CartTable } from "./CartTable"
import { DiscountInput } from "./DiscountInput"
import { CheckoutForm } from "./CheckoutForm"
import type { SaleLineItem } from "@/types/sale"

interface NewSaleModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  branchId: string
}

export function NewSaleModal({ open, onClose, onSuccess, branchId }: NewSaleModalProps) {
  const [cart, setCart] = useState<SaleLineItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [tillNumber, setTillNumber] = useState("")
  const [notes, setNotes] = useState("")
  const [isPending, startTransition] = useTransition()
  const quoteRequestRef = useRef<NodeJS.Timeout | null>(null)
  
  const { 
    quote, 
    requestSaleQuote, 
    createSale, 
    loading,
    error,
    clearQuote
  } = useSalesStore()

  // Debounced quote request
  const debouncedRequestQuote = useCallback((items: SaleLineItem[], discountAmount: number) => {
    if (quoteRequestRef.current) {
      clearTimeout(quoteRequestRef.current)
    }
    
    quoteRequestRef.current = setTimeout(() => {
      if (items.length > 0 && branchId) {
        requestSaleQuote({ items, discount: discountAmount }, branchId)
      }
    }, 300) // Wait 300ms before fetching quote
  }, [branchId, requestSaleQuote])

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!open) {
      setCart([])
      setDiscount(0)
      setPaymentMethod("")
      setTillNumber("")
      setNotes("")
      clearQuote()
    }
  }, [open, clearQuote])

  // Get quote when cart or discount changes (debounced)
  useEffect(() => {
    if (open && cart.length > 0 && branchId) {
      debouncedRequestQuote(cart, discount)
    } else if (cart.length === 0) {
      clearQuote()
    }
  }, [cart, discount, open, branchId, debouncedRequestQuote, clearQuote])

  // Optimistic cart updates
  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product_id === productId)
      if (existing) {
        return prev.map(item =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product_id: productId, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.product_id !== productId))
    } else {
      setCart(prev =>
        prev.map(item =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product_id !== productId))
  }

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method")
      return
    }
    
    if (!tillNumber.trim()) {
      alert("Please enter till number")
      return
    }

    if (!branchId) {
      alert("No branch selected")
      return
    }

    try {
      await createSale(
        {
          items: cart,
          payment_method: paymentMethod,
          till_number: tillNumber,
          notes: notes || undefined,
        },
        branchId
      )
      
      onSuccess?.()
      onClose()
    } catch (err) {
      console.error("Checkout failed:", err)
    }
  }

  const isValidPaymentMethod = quote?.payment_methods.includes(paymentMethod) ?? false
  const isCheckingOut = loading.createSale
  const isGettingQuote = loading.quote || isPending

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-sm bg-white shadow-xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-50">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">New Sale</h2>
                  <p className="text-sm text-slate-500">Create a new sales transaction</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column - Product Search & Cart */}
                <div className="space-y-6">
                  <ProductSearchInput onSelectProduct={addToCart} branchId={branchId} />
                  
                  {cart.length > 0 ? (
                    <>
                      <CartTable
                        cart={cart}
                        quote={quote}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                        isUpdating={isGettingQuote}
                      />
                      <DiscountInput discount={discount} setDiscount={setDiscount} />
                    </>
                  ) : (
                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-8 text-center">
                      <ShoppingCart className="mx-auto h-12 w-12 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-500">Cart is empty</p>
                      <p className="text-xs text-slate-400">Search and add products above</p>
                    </div>
                  )}
                </div>

                {/* Right Column - Checkout */}
                <div className="space-y-6">
                  {quote && (
                    <CheckoutForm
                      quote={quote}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      tillNumber={tillNumber}
                      setTillNumber={setTillNumber}
                      notes={notes}
                      setNotes={setNotes}
                      onSubmit={handleCheckout}
                      isLoading={isCheckingOut}
                      isValidPaymentMethod={isValidPaymentMethod}
                      cartEmpty={cart.length === 0}
                    />
                  )}
                  
                  {isGettingQuote && cart.length > 0 && !quote && (
                    <div className="rounded-sm border border-slate-200 bg-white p-6 text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#003e9d]" />
                      <p className="mt-2 text-sm text-slate-500">Calculating totals...</p>
                    </div>
                  )}
                  
                  {error.createSale && (
                    <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                      {error.createSale}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
"use client"

import { useState, useEffect } from "react"
import { Search, Package, Loader2 } from "lucide-react"
import { useSalesStore } from "@/store/saleStore"
import { BarcodeSearchInput } from "../BarcodeSearchInput"

interface ProductSearchInputProps {
  onSelectProduct: (productId: string) => void
  branchId: string
}

export function ProductSearchInput({ onSelectProduct, branchId }: ProductSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const { productsForSale, fetchProductsForSale, loading, error } = useSalesStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    if (branchId) {
      console.log('Fetching products for branch:', branchId, 'search:', debouncedSearch)
      fetchProductsForSale(
        { 
          search: debouncedSearch || undefined, 
          limit: 20 
        }, 
        branchId
      )
    }
  }, [debouncedSearch, branchId, fetchProductsForSale])

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products by name or SKU..."
          className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
        />
      </div>

      {/* Barcode Scanner */}
      {/* <BarcodeSearchInput onSuccess={onSelectProduct} branchId={branchId} /> */}

      {/* Loading State */}
      {loading.products && (
        <div className="flex items-center justify-center gap-2 py-8">
          <Loader2 className="h-5 w-5 animate-spin text-[#003e9d]" />
          <span className="text-sm text-slate-500">Loading products...</span>
        </div>
      )}

      {/* Error State */}
      {error.products && (
        <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Error: {error.products}
        </div>
      )}

      {/* Products List - Show when products exist (with or without search) */}
      {!loading.products && !error.products && productsForSale.length > 0 && (
        <div className="max-h-80 overflow-y-auto rounded-sm border border-slate-200 bg-white">
          <div className="sticky top-0 bg-slate-50 px-4 py-2 border-b border-slate-200">
            <p className="text-xs font-semibold text-slate-600">
              {productsForSale.length} product{productsForSale.length !== 1 ? "s" : ""} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
          {productsForSale.map((product) => (
            <button
              key={product.product_id}
              onClick={() => {
                onSelectProduct(product.product_id)
                setSearchTerm("")
              }}
              className="w-full border-b border-slate-100 p-3 text-left transition hover:bg-slate-50 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs">
                    <span className="text-slate-500">SKU: {product.sku}</span>
                    {product.barcode && (
                      <span className="text-slate-400">Barcode: {product.barcode}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">₦{product.price.toLocaleString()}</p>
                  <p className={`text-xs ${product.available_quantity < 10 ? "text-red-600 font-medium" : "text-slate-500"}`}>
                    Stock: {product.available_quantity}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Empty State - No products found */}
      {!loading.products && !error.products && productsForSale.length === 0 && (
        <div className="rounded-sm border border-slate-200 bg-white p-8 text-center">
          <Package className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-2 text-sm text-slate-500">No products found</p>
          <p className="text-xs text-slate-400">
            {searchTerm 
              ? `No products match "${searchTerm}"` 
              : "This branch has no products available for sale"}
          </p>
        </div>
      )}
    </div>
  )
}
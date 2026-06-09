"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Package, TrendingUp, AlertCircle } from "lucide-react"

import { useProductStore } from "@/store/productStore"
import { useCategoryStore } from "@/store/useCategoryStore"
import { usePermissions } from "@/hooks/usePermissions"

import ProductTable from "@/components/products/ProductTable"
import ProductStats from "@/components/products/ProductStats"
import ProductFilters from "@/components/products/ProductFilters"
import CreateProductModal from "@/components/products/CreateProductModal"

export default function ProductsPage() {
  const {
    products,
    total,
    unpricedCount,
    fetchProducts,
    productloading,
    error,
  } = useProductStore()

  const { canCreateProduct } = usePermissions()
  const [search, setSearch] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [unpricedOnly, setUnpricedOnly] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const { categories, fetchCategories } = useCategoryStore()

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts({
        search,
        category_id: categoryId || undefined,
        unpriced_only: unpricedOnly,
        page: 1,
        limit: 50,
      })
    }, 400)
    return () => clearTimeout(timeout)
  }, [search, categoryId, unpricedOnly, fetchProducts])

  const pricedCount = useMemo(() => {
    return products.filter((product) => product.is_priced).length
  }, [products])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Package className="h-3.5 w-3.5" />
              Product Catalog
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Products
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage catalog products, pricing and lifecycle
            </p>
          </div>

          {canCreateProduct && (
            <button
              onClick={() => setOpenCreate(true)}
              className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-6 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Create Product
            </button>
          )}
        </motion.div>

        {/* STATS */}
        <ProductStats
          totalProducts={total}
          pricedCount={pricedCount}
          unpricedCount={unpricedCount}
        />

        {/* FILTERS */}
        <ProductFilters
          search={search}
          setSearch={setSearch}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          unpricedOnly={unpricedOnly}
          setUnpricedOnly={setUnpricedOnly}
          categories={categories}
        />

        {/* ERROR */}
        {error.products && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            <AlertCircle className="h-5 w-5" />
            {error.products}
          </motion.div>
        )}

        {/* EMPTY STATE */}
        {!productloading.products && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white"
          >
            <Package className="h-12 w-12 text-slate-400" />
            <p className="mt-4 text-lg font-semibold text-slate-900">No products found</p>
            <p className="mt-1 text-sm text-slate-500">Create your first product to get started</p>
            {canCreateProduct && (
              <button
                onClick={() => setOpenCreate(true)}
                className="mt-6 rounded-lg bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-6 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg"
              >
                Create Product
              </button>
            )}
          </motion.div>
        )}

        {/* TABLE */}
        {products.length > 0 && (
          <ProductTable products={products} loading={productloading.products} />
        )}

        {/* MODAL */}
        <CreateProductModal open={openCreate} onClose={() => setOpenCreate(false)} />
      </div>
    </div>
  )
}
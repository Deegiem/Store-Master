"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Pencil,
  Trash2,
  Plus,
  FolderTree,
  Package,
} from "lucide-react"

import { useCategoryStore } from "@/store/useCategoryStore"
import { usePermissions } from "@/hooks/usePermissions"
import { CreateCategoryModal } from "@/components/categories/CreateCategoryModal"
import { EditCategoryModal } from "@/components/categories/EditCategoryModal"
import { DeleteCategoryModal } from "@/components/categories/DeleteCategoryModal"

import type { Category } from "@/types/category"

export default function CategoriesPage() {
  const { categories, fetchCategories, categoryloading } = useCategoryStore()
  const { canCreateCategory, canUpdateCategory, canDeleteCategory, canViewCategories } = usePermissions()
  
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  useEffect(() => {
    if (canViewCategories) {
      fetchCategories()
    }
  }, [fetchCategories, canViewCategories])

  // If user doesn't have view permission, show access denied
  if (!canViewCategories) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
            <FolderTree className="mx-auto h-12 w-12 text-red-400" />
            <p className="mt-4 text-lg font-semibold text-red-600">Access Denied</p>
            <p className="mt-1 text-sm text-red-500">
              You don't have permission to view categories.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <FolderTree className="h-3.5 w-3.5" />
              Product Classification
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Categories
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage product classification structure
            </p>
          </div>

          {canCreateCategory && (
            <button
              onClick={() => setCreateOpen(true)}
              className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-6 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              New Category
            </button>
          )}
        </motion.div>

        {/* LOADING STATE */}
        {categoryloading.categories && (
          <div className="flex items-center justify-center rounded-sm border border-slate-200 bg-white p-12">
            <div className="text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent"></div>
              <p className="text-sm text-slate-500">Loading categories...</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!categoryloading.categories && categories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white"
          >
            <FolderTree className="h-12 w-12 text-slate-400" />
            <p className="mt-4 text-lg font-semibold text-slate-900">No categories found</p>
            <p className="mt-1 text-sm text-slate-500">Create your first category to organize products</p>
            {canCreateCategory && (
              <button
                onClick={() => setCreateOpen(true)}
                className="mt-6 rounded-lg bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-6 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg"
              >
                Create Category
              </button>
            )}
          </motion.div>
        )}

        {/* CATEGORIES GRID */}
        {!categoryloading.categories && categories.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md"
              >
                {/* Icon and Actions */}
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-[#F3F4F6] text-3xl">
                    {category.icon || "📦"}
                  </div>
                  {(canUpdateCategory || canDeleteCategory) && (
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {canUpdateCategory && (
                        <button
                          onClick={() => {
                            setSelectedCategory(category)
                            setEditOpen(true)
                          }}
                          className="rounded-sm p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[#003e9d]"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {canDeleteCategory && (
                        <button
                          onClick={() => {
                            setSelectedCategory(category)
                            setDeleteOpen(true)
                          }}
                          className="rounded-sm p-2 text-slate-500 transition hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Category Info */}
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-900">{category.name}</h3>
                  <p className="mt-1 font-mono text-xs text-slate-400">{category.slug}</p>
                  {category.description && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Stats Badge */}
                <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-100">
                  <Package className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500">
                    {category.products?.length || 0} products
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* MODALS - Only render if user has permission */}
      {canCreateCategory && (
        <CreateCategoryModal open={createOpen} onClose={() => setCreateOpen(false)} />
      )}
      {canUpdateCategory && (
        <EditCategoryModal
          open={editOpen}
          onClose={() => {
            setEditOpen(false)
            setSelectedCategory(null)
          }}
          category={selectedCategory}
        />
      )}
      {canDeleteCategory && (
        <DeleteCategoryModal
          open={deleteOpen}
          onClose={() => {
            setDeleteOpen(false)
            setSelectedCategory(null)
          }}
          category={selectedCategory}
        />
      )}
    </div>
  )
}
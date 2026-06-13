"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UserCircle, Loader2, X, Save, AlertCircle } from "lucide-react"
import { useUserStore } from "@/store/useUserStore"
import type { UpdateProfilePayload } from "@/types/user"

interface EditProfileModalProps {
  onSuccess?: () => void
}

export function EditProfileModal({ onSuccess }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser, updateUser, loading } = useUserStore()
  const [formData, setFormData] = useState<UpdateProfilePayload>({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    state: "",
    country: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    if (currentUser && isOpen) {
      setFormData({
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        phone_number: currentUser.phone_number || "",
        address: currentUser.address || "",
        state: currentUser.state || "",
        country: currentUser.country || "",
      })
      setErrors({})
    }
  }, [currentUser, isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required"
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    if (!currentUser) return

    try {
      await updateUser(currentUser.user_id, formData)
      setUpdateSuccess(true)
      setTimeout(() => {
        setUpdateSuccess(false)
        setIsOpen(false)
        if (onSuccess) onSuccess()
      }, 2000)
    } catch (error) {
      console.error("Failed to update profile:", error)
      setErrors({ submit: "Failed to update profile. Please try again." })
    }
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => setIsOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <UserCircle className="h-4 w-4" />
        Edit Profile
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-sm bg-white shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                    <UserCircle className="h-5 w-5 text-[#003e9d]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
                    <p className="text-sm text-slate-500">Update your personal information</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      First Name *
                    </label>
                    <input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      placeholder="Enter first name"
                    />
                    {errors.first_name && (
                      <p className="text-xs text-red-600">{errors.first_name}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Last Name *
                    </label>
                    <input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      placeholder="Enter last name"
                    />
                    {errors.last_name && (
                      <p className="text-xs text-red-600">{errors.last_name}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Phone Number
                    </label>
                    <input
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      placeholder="Enter your address"
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      State
                    </label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      placeholder="Enter state"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Country
                    </label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      placeholder="Enter country"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="mt-4 flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-3">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                {/* Success Message */}
                {updateSuccess && (
                  <div className="mt-4 rounded-sm border border-green-200 bg-green-50 p-3">
                    <p className="text-sm text-green-700">Profile updated successfully!</p>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-6">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-sm border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading.updateUser}
                    className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {loading.updateUser && <Loader2 className="h-4 w-4 animate-spin" />}
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
// src/app/(auth)/forgot-password/page.tsx
"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { motion } from "framer-motion"
import ForgotPasswordForm from "@/components/auth-components/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  const successMessage = useAuthStore((state) => state.successMessage);
  const errorMessage = useAuthStore((state) => state.errorMessage);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-sm w-full max-w-[440px] flex flex-col items-center"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Store Master</h1>
          <p className="text-sm text-slate-500 mt-1">Reset Your Password</p>
        </div>

        <ForgotPasswordForm />

        {/* Display messages */}
        {successMessage && (
          <div className="mt-4 text-sm text-green-600 text-center font-medium">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 text-sm text-red-600 text-center font-medium">
            {errorMessage}
          </div>
        )}

        {/* Back to Login Link */}
        <div className="text-center pt-6">
          <p className="text-sm text-slate-600">
            Remembered your password?{' '}
            <a href="/login" className="text-blue-600 font-bold hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
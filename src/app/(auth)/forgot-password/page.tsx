"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const { forgotPassword, isLoading, successMessage, errorMessage } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await forgotPassword({ email })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Enter your email address below and we’ll send you an OTP to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Sending...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        {/* ✅ Display messages */}
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

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </a>
        </p>
      </motion.div>
    </div>
  )
}

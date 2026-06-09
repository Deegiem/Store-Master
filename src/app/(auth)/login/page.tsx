// src/app/(auth)/login/page.tsx
"use client"
import React from "react"
import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { normalizeRole } from "@/lib/roleMapper"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, rememberMe, setRememberMe, token, refreshToken } = useAuthStore()
  const successMessage = useAuthStore((state) => state.successMessage)
  const errorMessage = useAuthStore((state) => state.errorMessage)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  console.log('Access Token:', token)
  console.log('Refresh Token:', refreshToken)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = await login({ email, password }, rememberMe)
    if (!user) return

    // Get the backend role from the user object
    const backendRole = user.role

    // Use your normalizeRole function to convert to frontend role key
    const frontendRole = normalizeRole(backendRole)

    // Redirect to dynamic dashboard
    router.push(`/dashboard/${frontendRole}`)
  }

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
          <p className="text-sm text-slate-500 mt-1">Spatial Authority in Inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* Email Input */}
          <div className="space-y-8">
            <label className="text-[12px] font-semibold text-black uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full bg-[#F3F4F6] border-none px-10 py-3 rounded-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-black uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#F3F4F6] border-none px-10 py-3 rounded-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 text-[13px] text-slate-600 cursor-pointer">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="border-slate-300 p-2 flex items-center justify-center data-[state=checked]:bg-[#003E9D] data-[state=checked]:text-white data-[state=checked]:border-[#003E9D] transition-colors"
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-[13px] text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#003e9d] to-[#0050c9] hover:bg-[#003bb0] text-white font-bold py-3.5 rounded-lg shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-slate-600">
              New to Store Master?{' '}
              <Link href="/request-access" className="text-blue-600 font-bold hover:underline">
                Request Access
              </Link>
            </p>
          </div>
        </form>

        {errorMessage && <p className="text-red-500 text-sm font-medium mt-4 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm font-medium mt-4 text-center">{successMessage}</p>}
      </motion.div>
    </div>
  )
}
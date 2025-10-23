// src/app/(auth)/login/page.tsx
"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, errorMessage } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { rememberMe, setRememberMe } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
    // read user from store (since login sets it). Small timeout to allow store to update.
    setTimeout(() => {
      const u = (useAuthStore.getState()).user
      if (u?.role) {
        // redirect based on role
        if (u.role === "admin") router.push("/dashboard/admin")
        else if (u.role === "manager") router.push("/dashboard/manager")
        else router.push("/dashboard/staff")
      } else {
        // fallback
        router.push("/dashboard")
      }
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"   
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center text-neutral-700 gap-2 text-sm">
            <Checkbox checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked === true)}
 />
            Remember me
          </label>

          <Link href="/forgot-password" className="text-sm text-blue-600">Forgot password?</Link>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {errorMessage && <p className="text-red-600 text-center mt-2">{errorMessage}</p>}
      </form>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"

export default function CreatePasswordPage() {
  const { createPassword, isLoading, successMessage, errorMessage } = useAuthStore()
  const [form, setForm] = useState({ password: "", confirmPassword: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createPassword(form)
  }

  return (
    <div className="max-w-md mx-auto mt-20 text-black bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Create Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Creating..." : "Create Password"}
        </button>
      </form>

      {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  )
}

"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion";


export default function CreatePasswordPage() {
  const { createPassword, isLoading,  } = useAuthStore()
  const successMessage = useAuthStore((state) => state.successMessage);
  const errorMessage = useAuthStore((state) => state.errorMessage);

  const [form, setForm] = useState({ password: "", confirmPassword: "" })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createPassword(form)
    if (successMessage) {
      router.push("/login")
    } else if (errorMessage) {
      // handle error if needed
    }
  }

  return (
    <div className="min-h-screen flex flex-col text-center items-center justify-center mx-auto text-black bg-white p-6 rounded-2xl shadow">
      <motion.form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Create Password</h2>

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

        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}

      </motion.form>
    </div>

  )
}

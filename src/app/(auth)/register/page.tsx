// app/(auth)/register/page.tsx
"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import type { RegisterPayload } from "@/types/auth"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const { register, isLoading, successMessage, errorMessage } = useAuthStore()
  const router = useRouter()

  const [form, setForm] = useState<RegisterPayload>({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    phone_number: "",
    address: "",
    state: "",
    country: "",
  })

  // ✅ Type-safe change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await register(form)
    if (successMessage) {
      router.push("/verify-otp")
    }

  }

  const fields: Array<keyof RegisterPayload> = [
    "first_name",
    "last_name",
    "email",
    "role",
    "phone_number",
    "address",
    "state",
    "country",
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="max-w-lg flex-grow flex justify-center bg-gray-50 items-center mx-auto my-[30px] p-6 rounded-2xl">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">

          <h2 className="md:text-3xl text-2xl font-bold my-4 text-black text-center">Register User</h2>

          {fields.map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.replace("_", " ").toUpperCase()}
              required
              className="w-full text-[16px] font-normal text-[#373737] border-[0.5px] h-[46px] border-[#000438] px-3 py-2 rounded-lg"
            />
          ))}
  
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 h-[45px] mb-2 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>


          {successMessage && <p className="text-green-600 mt-3">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 mt-3">{errorMessage}</p>}
        </form>
      </main>
    </div>
      
  )
}

// src/app/(auth)/reset-password/page.tsx
"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword, isLoading } = useAuthStore();
  const successMessage = useAuthStore((state) => state.successMessage);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const [newPassword, setNewPassword] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await resetPassword({ new_password: newPassword });

  // Wait for store to update
  setTimeout(() => {
    const { errorMessage, successMessage } = useAuthStore.getState();

    if (!errorMessage && successMessage) {
      router.push("/auth/login"); // ✅ redirect only on success
    } else if (errorMessage) {
      setNewPassword(""); // clear field
    }
    // else → stay on page; the errorMessage will display automatically
  }, 200);
};


  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-50 p-4">
      <motion.form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-center">Reset Password</h2>

        <input
          type="password"
          name="new_password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>

        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
      </motion.form>
    </div>
  );
}


/* 
  ALTERNATIVE FLOW (for learning):

  If the backend returns a temporary reset-token after verify-otp:
    1. verifyOtp -> { message, reset_token }
    2. Client stores reset_token in memory (or sessionStorage) for short life
    3. reset-password request includes header: Authorization: Bearer <reset_token>
    4. Backend validates reset_token and allows password update without email+otp

  Example (pseudo):
    // after verifyOtp
    set({ resetToken: res.reset_token });

    // when calling resetPassword
    await api.post('/auth/reset-password', { new_password }, {
      headers: { Authorization: `Bearer ${get().resetToken}` }
    });
*/


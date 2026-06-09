// src/components/SetupPasswordForm.tsx
"use client";
import React from "react";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Key } from "lucide-react";

export default function SetupPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const { setupPassword, loading } = useUserStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await setupPassword({
        token,
        new_password: password,
      });
      
      setSuccessMessage("Account setup complete! Redirecting to login...");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || "Failed to setup password. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-10 rounded-sm w-full max-w-[440px] flex flex-col items-center"
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Store Master</h1>
        <p className="text-sm text-slate-500 mt-1">Set Up Your Password</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-5">
        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-black uppercase tracking-wider ml-1">
            New Password
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

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-black uppercase tracking-wider ml-1">
            Confirm Password
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full bg-[#F3F4F6] border-none px-10 py-3 rounded-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="text-xs text-slate-500 space-y-1 mt-2">
          <p className="font-medium">Password requirements:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>At least 6 characters long</li>
            <li>Use a mix of letters, numbers, and symbols for better security</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading.passwordFlow}
          className="w-full bg-gradient-to-r from-[#003e9d] to-[#0050c9] hover:bg-[#003bb0] text-white font-bold py-3.5 rounded-lg shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
        >
          {loading.passwordFlow ? "SETTING UP..." : "SETUP ACCOUNT"}
        </button>

        {/* Back to Login Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>

      {/* Error and Success Messages */}
      {error && (
        <p className="text-red-500 text-sm font-medium mt-4 text-center">{error}</p>
      )}
      {successMessage && (
        <p className="text-green-500 text-sm font-medium mt-4 text-center">{successMessage}</p>
      )}
    </motion.div>
  );
}
// src/components/ForgotPasswordForm.tsx
"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Mail } from "lucide-react";
import React from "react";

export default function ForgotPasswordForm() {
  const { forgotPassword, loading } = useUserStore();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword({ email });
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {/* Email Input */}
      <div className="space-y-2">
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

      {/* Info Text */}
      <p className="text-xs text-slate-500 text-center mt-2">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading.passwordFlow}
        className="w-full bg-gradient-to-r from-[#003e9d] to-[#0050c9] hover:bg-[#003bb0] text-white font-bold py-3.5 rounded-lg shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition-all active:scale-[0.98] disabled:opacity-70"
      >
        {loading.passwordFlow ? "SENDING..." : "SEND RESET LINK"}
      </button>
    </form>
  );
}
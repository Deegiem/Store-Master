// src/app/(auth)/reset-password/page.tsx
"use client";

import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth-components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] font-sans">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
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


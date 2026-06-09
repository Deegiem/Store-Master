// src/app/(auth)/setup-password/page.tsx
"use client";

import { Suspense } from "react";
import SetupPasswordForm from "@/components/auth-components/SetupPasswordForm";

export default function SetupPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] font-sans">
      <Suspense fallback={null}>
        <SetupPasswordForm />
      </Suspense>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";

export default function ChangePasswordForm() {
  const { resetPassword, loading } = useUserStore();

  const [form, setForm] = useState({
    token: "",
    new_password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await resetPassword(form);

    alert("Password changed successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input
        placeholder="Token / Current auth token"
        value={form.token}
        onChange={(e) =>
          setForm({ ...form, token: e.target.value })
        }
        className="border p-2 w-full"
      />

      <input
        type="password"
        placeholder="New password"
        value={form.new_password}
        onChange={(e) =>
          setForm({ ...form, new_password: e.target.value })
        }
        className="border p-2 w-full"
      />

      <button
        disabled={loading.passwordFlow}
        className="bg-red-600 text-white px-4 py-2"
      >
        Change Password
      </button>
    </form>
  );
}
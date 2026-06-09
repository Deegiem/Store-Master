// app/dashboard/salesStaff/user/page.tsx
"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { MyProfileCard } from "@/components/users/MyProfileCard";

export default function SalesStaffUserPage() {
  const { fetchCurrentUser, loading, error } = useUserStore();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (loading.currentUser) return <p>Loading...</p>;
  if (error.currentUser) return <p className="text-red-500">{error.currentUser}</p>;

  return (
    <div className="p-6 space-y-6">
      <MyProfileCard />
    </div>
  );
}

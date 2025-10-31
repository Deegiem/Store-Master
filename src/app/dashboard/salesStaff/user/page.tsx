// app/dashboard/admin/users/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import MyProfileCard from "@/components/users/MyProfileCard";
import UpdateProfileForm from "@/components/users/UpdateProfileForm";
// import UsersProfileCard from "@/components/users/UsersProfileCard";

export default function AdminUsersPage() {
  const {  fetchCurrentUser, loading, error } = useUserStore();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
  }, [ fetchCurrentUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <MyProfileCard onEdit={() => setEditing(true)} />
      {editing && <UpdateProfileForm onClose={() => setEditing(false)} />}
    </div>
  );
}

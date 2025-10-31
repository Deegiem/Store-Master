// app/dashboard/admin/users/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import MyProfileCard from "@/components/users/MyProfileCard";
import UpdateProfileForm from "@/components/users/UpdateProfileForm";
import UsersProfileCard from "@/components/users/UsersProfileCard";

export default function AdminUsersPage() {
  const { users, fetchAllUsers, fetchCurrentUser, loading, error } = useUserStore();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
    fetchAllUsers();
  }, [fetchAllUsers, fetchCurrentUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 mt-8 space-y-6">
      <MyProfileCard onEdit={() => setEditing(true)} />
      {editing && <UpdateProfileForm onClose={() => setEditing(false)} />}

      <h1 className="text-xl font-semibold">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <UsersProfileCard key={u.user_id} user={u} />
        ))}
      </div>
    </div>
  );
}

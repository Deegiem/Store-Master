"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/store/adminStore";
import SearchUser from "@/components/AdminCat/SearchUser";
import AllUsers from "@/components/AdminCat/AllUsers";

export default function AdminAllUsersPage() {
  const { fetchAllUsers } = useAdminStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Manage Users</h1>
      <SearchUser />
      <AllUsers />
    </div>
  );
}

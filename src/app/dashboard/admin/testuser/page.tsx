"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export default function TestUsers() {
  const { users, fetchUsers, loading } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>

      {loading.users && <p>Loading...</p>}

      {users.map((user) => (
        <p key={user.user_id}>
          {user.first_name} - {user.email}
        </p>
      ))}
    </div>
  );
}
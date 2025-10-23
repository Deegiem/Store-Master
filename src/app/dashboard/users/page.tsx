"use client";

import { useState } from "react";

export default function UsersPage() {
  const [users] = useState([
    { id: 1, name: "Amina Bello", role: "manager", email: "amina@corp.com" },
    { id: 2, name: "Seyi Ade", role: "staff", email: "seyi@corp.com" },
  ]);

  return (
    <section>
      <h1 className="text-xl font-semibold mb-4">User Management</h1>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border capitalize">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

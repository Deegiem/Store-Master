// components/users/UsersProfileCard.tsx
"use client";
import { User } from "@/types/user";

interface Props {
  user: User;
}

export default function UsersProfileCard({ user }: Props) {
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Phone:</strong> {user.phone_number || "N/A"}</p>
      <p><strong>Address:</strong> {user.address || "N/A"}</p>
      <p><strong>State:</strong> {user.state || "N/A"}</p>
      <p><strong>Country:</strong> {user.country || "N/A"}</p>
      <p><strong>Email Status:</strong> {user.email_status}</p>
    </div>
  );
}

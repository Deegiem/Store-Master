// components/users/MyProfileCard.tsx
"use client";
import { useUserStore } from "@/store/useUserStore";

interface Props {
  onEdit: () => void;
}

export default function MyProfileCard({ onEdit }: Props) {
  const { currentUser } = useUserStore();

  if (!currentUser) return <p>No user data available.</p>;

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-2">My Profile</h2>
      <p><strong>Name:</strong> {currentUser.first_name} {currentUser.last_name}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>Phone:</strong> {currentUser.phone_number || "N/A"}</p>
      <p><strong>Address:</strong> {currentUser.address || "N/A"}</p>
      <p><strong>State:</strong> {currentUser.state || "N/A"}</p>
      <p><strong>Country:</strong> {currentUser.country || "N/A"}</p>
      <p><strong>Role:</strong> {currentUser.role}</p>
      <button
        onClick={onEdit}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Edit Profile
      </button>
    </div>
  );
}

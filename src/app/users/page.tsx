"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/userService";
import { User } from "@/types/user";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Redirecting to login...");
        setTimeout(() => router.push("/login"), 500);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Profile</h1>
        <div className="space-y-3 text-gray-700">
          <p><span className="font-medium">First Name:</span> {user.first_name}</p>
          <p><span className="font-medium">Last Name:</span> {user.last_name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
          <p><span className="font-medium">Email Status:</span> {user.email_status}</p>
          <p><span className="font-medium">Phone:</span> {user.phone_number ?? "N/A"}</p>
          <p><span className="font-medium">Address:</span> {user.address ?? "N/A"}</p>
          <p><span className="font-medium">State:</span> {user.state ?? "N/A"}</p>
          <p><span className="font-medium">Country:</span> {user.country ?? "N/A"}</p>
          <hr className="my-4" />
          <p className="text-sm text-gray-500">
            Joined on {new Date(user.created_at).toLocaleDateString()}  
            <br />
            Last updated {new Date(user.updated_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

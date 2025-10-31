// components/users/UpdateProfileForm.tsx
"use client";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { UpdateProfilePayload } from "@/types/user";

interface Props {
  onClose: () => void;
}

export default function UpdateProfileForm({ onClose }: Props) {
  const { currentUser, editProfile, fetchCurrentUser } = useUserStore();
  const [form, setForm] = useState<UpdateProfilePayload>({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (currentUser) {
      setForm({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        phone_number: currentUser.phone_number || "",
        address: currentUser.address || "",
        state: currentUser.state || "",
        country: currentUser.country || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editProfile(form);
  setForm((prev) => ({ ...prev }));  
  await fetchCurrentUser();     // refresh store with latest user

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-3">
      <div className="flex space-x-2">
        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 flex-1 rounded"
        />
        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 flex-1 rounded"
        />
      </div>
      <input
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        className="border p-2 w-full rounded"
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="border p-2 w-full rounded"
      />
      <div className="flex space-x-2">
        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className="border p-2 flex-1 rounded"
        />
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className="border p-2 flex-1 rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Save Changes
      </button>
    </form>
  );
}

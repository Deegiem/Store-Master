"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", users: 30 },
  { name: "Feb", users: 40 },
  { name: "Mar", users: 35 },
  { name: "Apr", users: 50 },
];

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Monthly Reports</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

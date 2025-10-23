// components/ChartsSection.tsx
"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const stockData = [
  { month: "Jan", stock: 200 },
  { month: "Feb", stock: 180 },
  { month: "Mar", stock: 220 },
  { month: "Apr", stock: 160 },
  { month: "May", stock: 190 },
  { month: "Jun", stock: 210 },
]

const salesData = [
  { month: "Jan", sales: 1000 },
  { month: "Feb", sales: 1200 },
  { month: "Mar", sales: 1100 },
  { month: "Apr", sales: 900 },
  { month: "May", sales: 1300 },
  { month: "Jun", sales: 1400 },
]

export default function ChartsSection() {
  return (
    <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
        <h4 className="text-gray-300 mb-3">Stock Overview</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={stockData}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Bar dataKey="stock" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
        <h4 className="text-gray-300 mb-3">Sales Performance</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

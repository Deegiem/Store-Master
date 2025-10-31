
"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useUserStore } from "@/store/useUserStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const { loading, error } = useDashboardStore();
  const { currentUser, fetchCurrentUser } = useUserStore();

  const [today] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  useEffect(() => {
    if (!currentUser) fetchCurrentUser();
  }, [currentUser, fetchCurrentUser]);

  const userName = currentUser
    ? `${currentUser.first_name} ${currentUser.last_name}`
    : "User";



  const chartData = [
    { name: "Mon", sales: 3 },
    { name: "Tue", sales: 4 },
    { name: "Wed", sales: 13 },
    { name: "Thu", sales: 4 },
    { name: "Fri", sales: 2 },
    { name: "Sat", sales: 12 },
    { name: "Sun", sales: 7 },
  ];

  const activities = [
    "New purchase order approved by Manager",
    "Product ‘Industrial Wire’ restocked by 250 units",
    "Supplier ‘Dangote PLC’ added to system",
    "Low stock alert on ‘PVC Pipes’ triggered",
    "Sales report generated for the week",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="p-8 mt-9 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900">
            Welcome back,{" "}
            <span className="text-[#000ac0]">{userName.split(" ")[0]}</span> 👋
          </h2>
          <p className="text-gray-500 mt-1">{today}</p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}


        {/* Sales Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Weekly Sales Overview
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip />
                <Bar dataKey="sales" fill="#000ac0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : (
            <ul className="space-y-3 text-gray-600">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#000ac0] rounded-full"></div>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </main>
    </div>
  );
}

// components/StaffDashboard.tsx
"use client"

import { motion } from "framer-motion"
import DashboardHeader from "./DashboardHeader"
import StatsCards from "./StatsCards"
import TransactionsTable from "./TransactionsTable"

export default function StaffDashboard() {
  return (
    <motion.div
      key="staff"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <DashboardHeader />
      <StatsCards />
      <TransactionsTable />
    </motion.div>
  )
}

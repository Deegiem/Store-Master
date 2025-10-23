// components/AdminDashboard.tsx
"use client"

import { motion } from "framer-motion"
import DashboardHeader from "./DashboardHeader"
import StatsCards from "./StatsCards"
import ChartsSection from "./ChartsSection"
import TransactionsTable from "./TransactionsTable"

export default function AdminDashboard() {
  return (
    <motion.div
      key="admin"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <DashboardHeader />
      <StatsCards />
      <ChartsSection />
      <TransactionsTable />
    </motion.div>
  )
}

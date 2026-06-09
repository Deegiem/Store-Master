'use client'

import { motion } from "framer-motion"
import Link from "next/link"

export default function AuthFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white border-t border-gray-100 px-12 py-8 mt-auto"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding */}
        <div className="flex-1 text-left">
          <span className="text-lg font-bold text-slate-900">Store Master</span>
        </div>

        {/* Center: Copyright & Motto */}
        <div className="flex-[2] text-center">
          <p className="text-[13px] text-slate-500 font-medium">
            © 2024 Store Master. All rights reserved.
          </p>
        </div>

        {/* Right: Legal Links */}
        <div className=" flex justify-end items-center gap-6">
          <Link 
            href="/privacy" 
            className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms" 
            className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors"
          >
            Terms of Service
          </Link>
          <Link 
            href="/status" 
            className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors"
          >
            System Status
          </Link>
        </div>
      </div>
    </motion.footer>
  )
}
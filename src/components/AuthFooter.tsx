'use client'

import { motion } from "framer-motion"

export default function AuthFooter() {

  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center px-6 py-4 border-b border-gray-800 bg-gray-900"
    >
      {/* Footer Section */}
      <div className="flex flex-row items-center gap-4">
        <p className="flex mx-auto text-center text-md font-medium text-blue-400">© 2025 StoreMaster | All Rights Reserved</p>
      </div>
    </motion.footer>
  )
}

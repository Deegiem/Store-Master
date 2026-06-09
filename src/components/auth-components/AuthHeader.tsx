'use client'

import { motion } from "framer-motion"

export default function AuthHeader() {

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between px-6 py-4 bg-[#020517]"
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-blue-400">StoreMaster</h1>
    
      </div>

      {/* Right Section */}
      {/* <div className="flex items-center gap-6"> */}

        {/* Role Switch Button */}


        {/* Role Avatar */}

      {/* </div> */}
    </motion.header>
  )
}

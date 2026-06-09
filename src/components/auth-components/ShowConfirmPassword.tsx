// import { EyeOff } from 'lucide-react';
// import { Eye } from 'lucide-react';
// import { useState } from 'react';

// export default function ShowConfirmPassword() {
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [form, setForm] = useState({ password: "", confirmPassword: "" })

//     return (
//         <div className="relative">
//             <input
//                 id="password"
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={form.confirmPassword}
//                 onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
//                 required
//                 minLength={6}
//                 className="w-full border p-2 rounded"
//                 placeholder="Confirm password"
//             />
//             <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 focus:outline-none"
//                 aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//             >
//                 {showConfirmPassword ? (<Eye />) : (<EyeOff />)}
//             </button>
//         </div>
//     )
// }




"use client"

import { EyeOff, Eye } from 'lucide-react'
import { useState } from 'react'

interface ShowConfirmPasswordProps {
  confirmPassword: string
  setConfirmPassword: (password: string) => void
}

export default function ShowConfirmPassword({ 
  confirmPassword, 
  setConfirmPassword 
}: ShowConfirmPasswordProps) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="relative">
      <input
        id="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        placeholder="Confirm password"
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 focus:outline-none"
        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
      >
        {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  )
}
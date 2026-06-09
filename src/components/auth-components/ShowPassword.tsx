// import { EyeOff } from 'lucide-react';
// import { Eye } from 'lucide-react';
// import { useState } from 'react';

// export default function ShowPassword() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [form, setForm] = useState({ password: "", confirmPassword: "" })

//     return (
//         <div className="relative">
//             <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//                 minLength={6}
//                 className="w-full border p-2 rounded"
//                 placeholder="New password"
//             />
//             <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 focus:outline-none"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//                 {showPassword ? (<Eye />) : (<EyeOff />)}
//             </button>
//         </div>
//     )
// }


"use client"

import { EyeOff, Eye } from 'lucide-react'
import { useState } from 'react'

interface ShowPasswordProps {
  password: string
  setPassword: (password: string) => void
}

export default function ShowPassword({ password, setPassword }: ShowPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        placeholder="New password"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 focus:outline-none"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  )
}
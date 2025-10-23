// context/UserContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type UserRole = "admin" | "staff"

interface UserContextType {
  role: UserRole
  switchRole: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("admin")

  const switchRole = () => setRole((prev) => (prev === "admin" ? "staff" : "admin"))

  return <UserContext.Provider value={{ role, switchRole }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used within UserProvider")
  return context
}

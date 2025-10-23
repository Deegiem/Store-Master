// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
// import { UserProvider } from "@/context/UserContext"

const inter = Inter({ subsets: ["latin"], display: "swap"  })

export const metadata = {
  title: "StoreMaster Dashboard",
  description: "Inventory Store Management Dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
       {children}
      </body>
    </html>
  )
}

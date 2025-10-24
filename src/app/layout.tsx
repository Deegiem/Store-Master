// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

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
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}

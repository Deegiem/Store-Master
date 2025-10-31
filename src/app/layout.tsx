// app/layout.tsx
import "./globals.css"
import Providers from "./providers"

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
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}

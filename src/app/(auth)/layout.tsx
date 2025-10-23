// import "../globals.css"
// import { Inter } from "next/font/google"
// import AuthHeader  from "@/components/AuthHeader"
import AuthFooter from "@/components/AuthFooter"


export const metadata = {
  title: "StoreMaster Onboarding",
  description: "Inventory Store Management Dashboard",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body >
        {/* <AuthHeader /> */}
        {children}
        <AuthFooter />
      </body>
    </html>
  )
}

// app/(auth)/layout.tsx
// Remove the html and body tags - just return a fragment or div
import AuthFooter from "@/components/auth-components/AuthFooter"

export const metadata = {
  title: "StoreMaster Onboarding",
  description: "Inventory Store Management Dashboard",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <AuthHeader /> */}
      {children}
      <AuthFooter />
    </>
  )
}
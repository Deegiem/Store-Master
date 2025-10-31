import NavigationAdmin from "@/components/NavigationAdmin"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <NavigationAdmin />
      <main className="flex-1 ml-0 md:ml-64 p-6 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  )
}

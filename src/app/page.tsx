// // app/page.tsx
// import Navbar from "@/components/Navbar"
// import Footer from "@/components/PageFooter"
// import AdminDashboard from "@/components/AdminDashboard"
// import StaffDashboard from "@/components/StaffDashboard"
// import { useUser } from "@/context/UserContext"
// // import { AnimatePresence } from "framer-motion"

// export default function HomePage() {
//   const { role } = useUser()
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 overflow-y-auto">
//        {/* <AnimatePresence mode="wait"> */}
//           {role === "admin" ? <AdminDashboard key="admin" /> : <StaffDashboard key="staff" />}
//         {/* </AnimatePresence> */}
//       </main>
//       <Footer />
//     </div>
//   )
// }

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Inventory Management System</h1>
    </div>
  )
}
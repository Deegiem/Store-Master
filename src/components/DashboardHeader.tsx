// components/DashboardHeader.tsx


export default function DashboardHeader() {
  return (
    <div className="px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back, Asake 👋</h2>
        <p className="text-gray-400 text-sm">Here’s an overview of your inventory today.</p>
      </div>
      <div className="flex gap-3 mt-4 md:mt-0">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          + New Product
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-md">
          Generate Report
        </button>
      </div>
    </div>
  )
}

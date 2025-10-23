// components/StatsCards.tsx
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const stats = [
  { title: "Total Products", value: "1,250", trend: "+10%", status: "up" },
  { title: "Low Stock", value: "75", trend: "-5%", status: "down" },
  { title: "Total Sales", value: "$250k", trend: "+15%", status: "up" },
  { title: "Pending Orders", value: "25", trend: "-2%", status: "flat" },
  { title: "Active Customers", value: "500", trend: "+8%", status: "up" },
]

export default function StatsCards() {
  return (
    <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((item) => (
        <div key={item.title} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <h4 className="text-gray-400 text-sm">{item.title}</h4>
          <p className="text-2xl font-semibold mt-2">{item.value}</p>
          <div className="flex items-center text-sm mt-1">
            {item.status === "up" && <TrendingUp size={16} className="text-green-400 mr-1" />}
            {item.status === "down" && <TrendingDown size={16} className="text-red-400 mr-1" />}
            {item.status === "flat" && <Minus size={16} className="text-yellow-400 mr-1" />}
            <span
              className={
                item.status === "up"
                  ? "text-green-400"
                  : item.status === "down"
                  ? "text-red-400"
                  : "text-yellow-400"
              }
            >
              {item.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

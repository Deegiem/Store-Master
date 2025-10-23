// components/TransactionsTable.tsx

const transactions = [
  { product: "Product A", category: "Electronics", stock: 100, price: "$50.00" },
  { product: "Product B", category: "Clothing", stock: 50, price: "$25.00" },
  { product: "Product C", category: "Home Goods", stock: 75, price: "$75.00" },
]

export default function TransactionsTable() {
  return (
    <div className="px-6 pb-8 mt-[18px]">
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h4 className="text-gray-300">Recent Transactions</h4>
        </div>
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-gray-800 text-gray-400 uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-t border-gray-800 hover:bg-gray-800/50">
                <td className="py-3 px-4 font-medium">{t.product}</td>
                <td className="py-3 px-4">{t.category}</td>
                <td className="py-3 px-4">{t.stock}</td>
                <td className="py-3 px-4">{t.price}</td>
                <td className="py-3 px-4 text-blue-400 cursor-pointer">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// components/SearchBar.tsx


export default function SearchBar() {
  return (
    <div className="px-8 py-4 w-full  flex flex-col  md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 rounded-full border-[1px] border-[#a8dcf5] h-[50px] text-gray-300 text-[14px] px-6 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
    </div>
  )
}

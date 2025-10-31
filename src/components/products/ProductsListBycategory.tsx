// "use client";

// import { useEffect, useState } from "react";
// import { useProductStore } from "@/store/productStore";
// import { useCategoryStore } from "@/store/categoryStore";

// export default function ProductsListByCategory() {
//   const { categories, fetchCategories } = useCategoryStore();
//   const { productsByCategory, fetchProductsByCategory, loading, error } = useProductStore();

//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

//   // Fetch categories when component mounts
//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   // Fetch products whenever category changes
//   useEffect(() => {
//     if (selectedCategory) {
//       fetchProductsByCategory(selectedCategory);
//     }
//   }, [selectedCategory, fetchProductsByCategory]);

//   // Debounce search term (updates after user stops typing for 400ms)
//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedSearch(searchTerm), 400);
//     return () => clearTimeout(handler);
//   }, [searchTerm]);

//   const products = selectedCategory ? productsByCategory[selectedCategory] || [] : [];

//   // Filter products by the debounced search value
//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
//   );

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 space-y-3 md:space-y-0">
//         <h3 className="text-xl font-semibold text-blue-700">
//           Products by Category
//         </h3>

//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* Category Selector */}
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="border border-blue-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.category_id} value={cat.category_id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* Search Input */}
//           <input
//             type="text"
//             placeholder="Search product..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border border-blue-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>
//       </div>

//       {/* Status feedback */}
//       {loading && <p className="text-blue-600 font-medium animate-pulse">Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* No category selected */}
//       {!selectedCategory && !loading && (
//         <p className="text-gray-500 italic">Please select a category to view its products.</p>
//       )}

//       {/* No results */}
//       {!loading && selectedCategory && filteredProducts.length === 0 && (
//         <p className="text-gray-500 italic">No products found for this category.</p>
//       )}

//       {/* Product Table */}
//       {!loading && selectedCategory && filteredProducts.length > 0 && (
//         <div className="overflow-x-auto rounded-lg mt-2">
//           <table className="min-w-full text-sm text-left border border-blue-100 rounded-lg overflow-hidden">
//             <thead className="bg-blue-50 text-blue-700 uppercase text-xs font-semibold tracking-wide">
//               <tr>
//                 <th className="px-5 py-3 border-b border-blue-100">Name</th>
//                 <th className="px-5 py-3 border-b border-blue-100">Qty</th>
//                 <th className="px-5 py-3 border-b border-blue-100">Price</th>
//                 <th className="px-5 py-3 border-b border-blue-100">Threshold</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map((p, idx) => (
//                 <tr
//                   key={p.product_id}
//                   className={`transition-all duration-200 ${
//                     idx % 2 === 0 ? "bg-white" : "bg-blue-50/30"
//                   } hover:bg-blue-100/50`}
//                 >
//                   <td className="px-5 py-3 border-b border-blue-100 font-medium text-gray-800">
//                     {p.name}
//                   </td>
//                   <td className="px-5 py-3 border-b border-blue-100 text-gray-700">
//                     {p.quantity}
//                   </td>
//                   <td className="px-5 py-3 border-b border-blue-100 font-semibold text-blue-700">
//                     ₦{p.price.toLocaleString()}
//                   </td>
//                   <td className="px-5 py-3 border-b border-blue-100 text-gray-700">
//                     {p.threshold}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }










// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { useProductStore } from "@/store/productStore";
// import { useCategoryStore } from "@/store/categoryStore";
// import { XCircle } from "lucide-react";

// export default function ProductsListByCategory() {
//   const {
//     productsByCategory,
//     products,
//     fetchProductsByCategory,
//     fetchProducts,
//     loading,
//     error,
//   } = useProductStore();

//   const { categories, fetchCategories } = useCategoryStore();

//   const [categoryId, setCategoryId] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   // 🧭 Fetch categories on mount
//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   // 📡 Fetch products when category changes
//   useEffect(() => {
//     if (categoryId) {
//       fetchProductsByCategory(categoryId);
//     } else {
//       fetchProducts();
//     }
//   }, [categoryId, fetchProductsByCategory, fetchProducts]);

//   // ⏳ Debounce search input (wait 500ms after typing stops)
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(searchQuery);
//     }, 500);
//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   // 🔍 Filter products based on category and search query
//   const products = useMemo(() => {
//     const baseList = categoryId
//       ? productsByCategory[categoryId] || []
//       : products || [];

//     if (!debouncedQuery.trim()) return baseList;

//     return baseList.filter((p) =>
//       p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
//     );
//   }, [categoryId, debouncedQuery, productsByCategory, allProducts]);

//   // 🧹 Reset filters (category + search)
//   const handleReset = () => {
//     setCategoryId("");
//     setSearchQuery("");
//     fetchProducts();
//   };

//   return (
//     <div className="bg-white border border-blue-100 p-6 rounded-xl shadow-sm max-w-3xl mx-auto">
//       <h3 className="text-xl font-semibold text-blue-700 mb-4">
//         Product Explorer
//       </h3>

//       {/* Controls: Category, Search, Reset */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
//         <select
//           value={categoryId}
//           onChange={(e) => setCategoryId(e.target.value)}
//           className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat.category_id} value={cat.category_id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <div className="flex items-center w-full sm:flex-1 gap-2">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           {(categoryId || searchQuery) && (
//             <button
//               onClick={handleReset}
//               className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg px-3 py-2 transition-colors duration-150"
//               title="Reset filters"
//             >
//               <XCircle size={18} />
//               <span className="hidden sm:inline">Reset</span>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* States: Loading / Error / Empty */}
//       {loading && (
//         <p className="text-blue-600 text-center font-medium">
//           Fetching products...
//         </p>
//       )}
//       {error && (
//         <p className="text-red-500 text-center font-medium">Error: {error}</p>
//       )}
//       {!loading && !error && products.length === 0 && (
//         <p className="text-gray-500 text-center italic">
//           No products found matching your search.
//         </p>
//       )}

//       {/* Product List */}
//       <ul className="divide-y divide-blue-100">
//         {products.map((p) => (
//           <li
//             key={p.product_id}
//             className="flex justify-between items-center py-3 px-2 hover:bg-blue-50 rounded transition-colors duration-150"
//           >
//             <span className="font-medium text-gray-800">{p.name}</span>
//             <span className="text-blue-600 font-semibold">
//               ₦{p.price.toLocaleString()}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


  // 🔍 Filter products dynamically
//   const filteredProducts = useMemo(() => {
//     const baseList = categoryId
//       ? productsByCategory[categoryId] || []
//       : products || [];

//     if (!debouncedQuery.trim()) return baseList;

//     return baseList.filter((p) =>
//       p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
//     );
//   }, [categoryId, debouncedQuery, productsByCategory, products]);


//   const filteredProducts = useMemo(() => {
//   if (!categoryId && !debouncedQuery.trim()) return []; // 👈 don't show anything initially

//   const baseList = categoryId
//     ? productsByCategory[categoryId] || []
//     : products || [];

//   if (!debouncedQuery.trim()) return baseList;

//   return baseList.filter((p) =>
//     p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
//   );
// }, [categoryId, debouncedQuery, productsByCategory, products]);



"use client";

import { useState, useEffect, useMemo } from "react";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import { XCircle } from "lucide-react";

export default function ProductsListByCategory() {
  const {
    productsByCategory,
    products,
    fetchProductsByCategory,
    fetchProducts,
    loading,
    error,
  } = useProductStore();

  const { categories, fetchCategories } = useCategoryStore();

  const [category_id, setCategoryId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // 🧭 Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 📡 Fetch products when category changes
useEffect(() => {
  const load = async () => {
    if (category_id) {
      await fetchProductsByCategory(category_id, true);
    } else {
      await fetchProducts();
    }
  };
  load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [category_id]);


  // ⏳ Debounce search input (500ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);



// const filteredProducts = useMemo(() => {
//     if (!category_id && !debouncedQuery.trim()) return []; // 👈 don't show anything initially

//   const categoryProducts =
//     category_id && productsByCategory[category_id]
//       ? productsByCategory[category_id]
//       : [];

// //   const baseList =
// //     Array.isArray(categoryProducts) && categoryProducts.length > 0
// //       ? categoryProducts
// //       : Array.isArray(products)
// //       ? products
// //       : [];
//   const baseList = category_id
//     ? productsByCategory[category_id] || []
//     : products || [];

//   if (!debouncedQuery.trim()) return baseList;

//   return baseList.filter((p) =>
//     p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
//   );
// }, [category_id, debouncedQuery, productsByCategory, products]);

const filteredProducts = useMemo(() => {
  // 🧠 1. When neither category nor search query is selected — show nothing
  if (!category_id && !debouncedQuery.trim()) return [];

  // 🧩 2. Determine base list:
  // - If category is selected and has fetched products, use that.
  // - Otherwise, fallback to all products.
  const baseList =
    category_id && Array.isArray(productsByCategory[category_id])
      ? productsByCategory[category_id]
      : Array.isArray(products)
      ? products
      : [];

  // 🔍 3. If no search query, show baseList (either specific category or global)
  if (!debouncedQuery.trim()) return baseList;

  // ⚡ 4. Otherwise, filter the baseList (category-aware search)
  return baseList.filter((p) =>
    p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );
}, [category_id, debouncedQuery, productsByCategory, products]);

// useEffect(() => {
//   console.log("📦 productsByCategory:", productsByCategory);
// }, [productsByCategory]);





  // 🧹 Reset filters
  const handleReset = () => {
    setCategoryId("");
    setSearchQuery("");
    fetchProducts();
  };

  return (
    <div className="bg-white border border-blue-100 p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">
        Product Explorer
      </h3>

      {/* Controls: Category, Search, Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <select
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex items-center w-full sm:flex-1 gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {(category_id || searchQuery) && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg px-3 py-2 transition-colors duration-150"
              title="Reset filters"
            >
              <XCircle size={18} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-blue-600 text-center font-medium">
          Fetching products...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center font-medium">Error: {error}</p>
      )}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-gray-500 text-center italic">
          No products found matching your search.
        </p>
      )}

      {/* Product List */}
      <ul className="divide-y divide-blue-100">
        {filteredProducts.map((p) => (
          <li
            key={p.product_id}
            className="flex justify-between items-center py-3 px-2 hover:bg-blue-50 rounded transition-colors duration-150"
          >
            <span className="font-medium text-gray-800">{p.name}</span>
            <span className="text-blue-600 font-semibold">
              ₦{p.price.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "use client"

// import { useToastStore } from "./use-toast"

// export function Toaster() {
//   const toasts = useToastStore((state) => state.toasts)

//   return (
//     <div className="fixed bottom-5 right-5 z-50 space-y-2">
//       {toasts.map((toast) => (
//         <div
//           key={toast.id}
//           className="rounded-lg bg-black text-white p-3 shadow-lg transition-all duration-300"
//         >
//           <strong className="block text-sm">{toast.title}</strong>
//           {toast.description && (
//             <p className="text-xs opacity-80">{toast.description}</p>
//           )}
//         </div>
//       ))}
//     </div>
//   )
// }

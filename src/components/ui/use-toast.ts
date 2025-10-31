// // src/components/ui/use-toast.ts
// "use client"

// import * as React from "react"
// import { ToastActionElement, type ToastProps } from "./toast"

// const TOAST_LIMIT = 1
// const TOAST_REMOVE_DELAY = 1000000

// type ToasterToast = ToastProps & {
//   id: string
//   title?: React.ReactNode
//   description?: React.ReactNode
//   action?: ToastActionElement
// }

// const actionTypes = {
//   ADD_TOAST: "ADD_TOAST",
//   UPDATE_TOAST: "UPDATE_TOAST",
//   DISMISS_TOAST: "DISMISS_TOAST",
//   REMOVE_TOAST: "REMOVE_TOAST",
// } as const

// let count = 0
// function genId() {
//   count = (count + 1) % Number.MAX_VALUE
//   return count.toString()
// }

// export const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// const addToRemoveQueue = (toastId: string) => {
//   if (toastTimeouts.has(toastId)) return
//   const timeout = setTimeout(() => {
//     toastTimeouts.delete(toastId)
//     dispatch({ type: "REMOVE_TOAST", toastId })
//   }, TOAST_REMOVE_DELAY)
//   toastTimeouts.set(toastId, timeout)
// }

// const reducer = (state: ToasterToast[], action: any): ToasterToast[] => {
//   switch (action.type) {
//     case "ADD_TOAST":
//       return [action.toast, ...state].slice(0, TOAST_LIMIT)
//     case "UPDATE_TOAST":
//       return state.map((t) =>
//         t.id === action.toast.id ? { ...t, ...action.toast } : t
//       )
//     case "DISMISS_TOAST":
//       const toastToDismiss = state.find((t) => t.id === action.toastId)
//       if (toastToDismiss) addToRemoveQueue(toastToDismiss

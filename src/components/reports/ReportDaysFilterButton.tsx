"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { X, Clock, Funnel } from "lucide-react"

interface Props {
  currentDays?: string
}

export function ReportDaysFilterButton({ currentDays = "30" }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [days, setDays] = useState(currentDays)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setDays(currentDays)
    }
  }, [isOpen, currentDays])

  const handleApply = () => {
    const params = new URLSearchParams()
    if (days) params.set("days_threshold", days)

    const url = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`
    router.push(url)
    setIsOpen(false)
  }

  const handleReset = () => {
    router.push(window.location.pathname)
    setIsOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
      >
        <Funnel className="h-4 w-4" />
        Filter
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="w-full max-w-xl rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Filter slow moving inventory</h2>
                    <p className="text-sm text-slate-500">Adjust the threshold for slow-moving items.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5 p-6">
                <label className="space-y-2 block">
                  <span className="text-sm font-semibold text-slate-700">Threshold (days)</span>
                  <input
                    type="number"
                    min={1}
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleApply}
                    className="rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                  >
                    Apply Threshold
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

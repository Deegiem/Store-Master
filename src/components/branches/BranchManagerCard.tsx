// src/components/branches/BranchManagerCard.tsx
"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { UserCircle, Mail, Briefcase, UserPlus, ChevronRight } from "lucide-react"
import { AssignManagerModal } from "@/components/branches/AssignManagerModal"
import type { Branch } from "@/types/branch"
import { useUserStore } from "@/store/useUserStore"
import { useEffect } from "react"
import { usePermissions } from "@/hooks/usePermissions"

interface BranchManagerCardProps {
    branch: Branch
}

export function BranchManagerCard({ branch }: BranchManagerCardProps) {
    const [assignOpen, setAssignOpen] = useState(false)
    const { users, fetchUsers } = useUserStore()
    const {
        canAssignBranchManager,
    } = usePermissions()

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const manager = users?.find(u => u.user_id === branch.manager_id)


    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-sm border border-slate-200 bg-white p-5"
            >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-purple-50">
                            <UserCircle className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Branch Manager</h2>
                            <p className="text-sm text-slate-500">Leadership & oversight</p>
                        </div>
                    </div>
                    {canAssignBranchManager && (
                        <button
                            onClick={() => setAssignOpen(true)}
                            className="inline-flex items-center gap-1 rounded-sm px-2 py-1 text-sm text-[#003e9d] transition hover:bg-slate-100"
                        >
                            <UserPlus className="h-3.5 w-3.5" />
                            Assign
                        </button>
                    )}
                </div>

                <div className="mt-4">
                    {!branch.manager_id ? (
                        <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                            <UserCircle className="h-12 w-12 text-slate-300" />
                            <p className="mt-2 text-sm font-medium text-slate-600">No manager assigned</p>
                            <p className="text-xs text-slate-400">Assign a store manager to this branch</p>
                            {canAssignBranchManager && (
                                <button
                                    onClick={() => setAssignOpen(true)}
                                    className="mt-3 inline-flex items-center gap-1 rounded-sm bg-[#003e9d]/10 px-3 py-1.5 text-xs font-medium text-[#003e9d] transition hover:bg-[#003e9d]/20"
                                >
                                    <UserPlus className="h-3 w-3" />
                                    Assign Manager
                                </button>
                            )}
                        </div>
                    ) : manager ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 rounded-sm bg-slate-50 p-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-r from-[#003e9d]/10 to-[#0050c9]/10">
                                    <UserCircle className="h-6 w-6 text-[#003e9d]" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">
                                        {manager.first_name} {manager.last_name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Mail className="h-3 w-3 text-slate-400" />
                                        <p className="text-xs text-slate-500">{manager.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                                    <span className="text-xs text-slate-600">{manager.role}</span>
                                </div>
                                {canAssignBranchManager && (
                                    <button
                                        onClick={() => setAssignOpen(true)}
                                        className="text-xs text-[#003e9d] hover:underline"
                                    >
                                        Change
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-sm bg-amber-50 p-3 text-center">
                            <p className="text-sm text-amber-600">Loading manager details...</p>
                        </div>
                    )}
                </div>
            </motion.div>

            <AssignManagerModal
                open={assignOpen}
                onClose={() => setAssignOpen(false)}
                branchId={branch.id}
            />
        </>
    )
}
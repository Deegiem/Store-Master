"use client"

import { useEffect } from "react"
import { useUserStore } from "@/store/useUserStore"
import { usePermissions } from "@/hooks/usePermissions"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ProfileInfoCard } from "@/components/profile/ProfileInfoCard"
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton"
import { EditProfileModal } from "@/components/profile/EditProfileModal"

export default function ProfilePage() {
  const { currentUser, loading, error, fetchCurrentUser } = useUserStore()
  const { canManageUsers, role } = usePermissions()

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  // Show loading state
  if (loading.currentUser) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-4xl">
          <ProfileSkeleton />
        </div>
      </div>
    )
  }

  // Show error state
  if (error.currentUser) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
            <h3 className="text-lg font-semibold text-red-800">Error Loading Profile</h3>
            <p className="mt-2 text-sm text-red-600">{error.currentUser}</p>
            <button
              onClick={() => fetchCurrentUser()}
              className="mt-4 rounded-sm bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show no data state
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-sm border border-amber-200 bg-amber-50 p-6 text-center">
            <h3 className="text-lg font-semibold text-amber-800">No Profile Data</h3>
            <p className="mt-2 text-sm text-amber-600">Unable to load profile information.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <ProfileHeader 
          title="My Profile" 
          description={`View and manage your personal information (${role})`}
          showEditButton={canManageUsers}
        />
        
        <ProfileInfoCard profile={currentUser} />
        
        {canManageUsers && <EditProfileModal onSuccess={fetchCurrentUser} />}
      </div>
    </div>
  )
}
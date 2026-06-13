"use client"

import { motion } from "framer-motion"
import {
  UserCircle,
  Mail,
  Building2,
  Briefcase,
  Phone,
  MapPin,
  Calendar,
  Shield
} from "lucide-react"
import type { UserProfile } from "@/types/user"

interface ProfileInfoCardProps {
  profile: UserProfile
}

export function ProfileInfoCard({ profile }: ProfileInfoCardProps) {
  const infoSections = [
    {
      title: "Personal Information",
      icon: UserCircle,
      fields: [
        { label: "Full Name", value: `${profile.first_name} ${profile.last_name}`, icon: UserCircle },
        { label: "Email Address", value: profile.email, icon: Mail },
        { label: "Phone Number", value: profile.phone_number || "Not provided", icon: Phone },
      ]
    },
    {
      title: "Professional Information",
      icon: Briefcase,
      fields: [
        { label: "Role", value: profile.role, icon: Shield },
        { label: "Branch", value: profile.branch_name, icon: Building2 },
      ]
    },
    {
      title: "Location Details",
      icon: MapPin,
      fields: [
        { label: "Address", value: profile.address || "Not provided", icon: MapPin },
        { label: "State", value: profile.state || "Not provided", icon: MapPin },
        { label: "Country", value: profile.country || "Not provided", icon: MapPin },
      ]
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      {infoSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + sectionIndex * 0.1 }}
          className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#003e9d]/10">
                <section.icon className="h-4 w-4 text-[#003e9d]" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {section.fields.map((field, fieldIndex) => (
              <div key={field.label} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-100">
                  <field.icon className="h-4 w-4 text-slate-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {field.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {field.value || "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Account Status & Meta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-between rounded-sm border border-slate-200 bg-white p-4"
      >
        <div className="flex items-center gap-3">
          <div className={`h-2 w-2 rounded-full ${profile.is_active !== false ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm text-slate-600">
            Account Status: 
            <span className={`ml-1 font-semibold ${profile.is_active !== false ? "text-green-700" : "text-red-700"}`}>
              {profile.is_active !== false ? "Active" : "Inactive"}
            </span>
          </span>
        </div>
        {profile.created_at && (
          <div className="text-right">
            <p className="text-[10px] text-slate-400">Member Since</p>
            <p className="text-xs text-slate-600">{new Date(profile.created_at).toLocaleDateString()}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
"use client";

import { useParams } from "next/navigation";
import { RoleGuard } from "@/components/RoleGuard";
import UserAuditDetailPage from "@/app/dashboard/admin/user-audit/[userId]/page";
import type { AppRole } from "@/lib/roleMapper";

export default function DynamicUserAuditDetailPage() {
  const allowedRoles: AppRole[] = ["admin"];

  const params = useParams<{ userId: string }>();

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <UserAuditDetailPage params={Promise.resolve(params)} />
    </RoleGuard>
  );
}
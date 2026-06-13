import { redirect } from "next/navigation"

export default function OldDynamicProfileRedirect() {
  redirect("/dashboard/profile")
}
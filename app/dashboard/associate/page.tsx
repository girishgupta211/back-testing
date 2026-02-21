"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function AssociateDashboard() {
  const router = useRouter()
  const { role } = useUser()

  useEffect(() => {
    // If the user is not an associate, redirect them to the main dashboard
    if (role !== "associate") {
      router.push("/dashboard")
    }
  }, [role, router])

  // If the user is an associate, show a loading state while redirecting
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>Redirecting to associate dashboard...</p>
      </div>
    </div>
  )
}

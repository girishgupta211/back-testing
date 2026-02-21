"use client"

import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { MobileNav } from "@/components/mobile-nav"
import { GlobalDataProvider } from "@/contexts/global-data-context"
import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const showBackButton = pathname !== "/dashboard"
  const showNavigation = pathname.includes("/v300") || pathname.includes("/planner") || pathname.includes("/leadgen")

  return (
    <GlobalDataProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2" aria-label="Go back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="flex gap-2 items-center font-semibold text-lg">
            <div className="h-6 w-6 bg-[#0496ff] rounded-md flex items-center justify-center text-white font-bold">
              Z
            </div>
            <span>Zinnimoney</span>
          </div>
          <div className="flex-1 flex items-center justify-end md:justify-between">
            <nav className="hidden md:flex">{/* Navigation links removed as requested */}</nav>
            <div className="flex items-center gap-4">
              <MobileNav />
            </div>
          </div>
        </header>
        <div className="flex-1 flex">
          {showNavigation && (
            <aside className="hidden md:flex w-64 flex-col border-r bg-background">
              <DashboardNav />
            </aside>
          )}
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </div>
    </GlobalDataProvider>
  )
}

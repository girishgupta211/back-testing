"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, LineChart, Zap } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  // Define navigation items with explicit typing
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Investment Planner",
      href: "/dashboard/planner",
      icon: LineChart,
    },
    {
      title: "Lead Generation",
      href: "/dashboard/leadgen",
      icon: Zap,
    },
  ]

  // Render the navigation items
  return (
    <nav className="grid items-start px-2 py-4 gap-1">
      {navItems.map((item, index) => {
        const ItemIcon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
              isActive
                ? "bg-[#0496ff]/20 text-[#0496ff] font-medium"
                : "text-muted-foreground hover:bg-gray-800 hover:text-foreground",
            )}
          >
            <ItemIcon className={cn("h-4 w-4", isActive ? "text-[#0496ff]" : "text-muted-foreground")} />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

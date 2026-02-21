"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, LineChart, Users, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Planner",
    href: "/dashboard/planner",
    icon: LineChart,
  },
  {
    title: "Lead Generation",
    href: "/dashboard/leadgen",
    icon: Users,
  },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 sm:max-w-xs">
        <div className="px-7">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#0496ff] text-white font-bold text-xl">
              Z
            </div>
            <h1 className="text-xl font-bold tracking-tight">Zinnimoney</h1>
          </div>
        </div>
        <nav className="grid gap-2 px-2 py-6">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  pathname === item.href ? "bg-muted text-primary font-medium" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

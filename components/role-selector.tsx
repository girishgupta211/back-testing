"use client"

import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Shield, Users } from "lucide-react"

export function RoleSelector() {
  const { role, setRole } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          {role === "admin" ? (
            <Shield className="h-4 w-4 text-blue-500" />
          ) : (
            <Users className="h-4 w-4 text-green-500" />
          )}
          <span className="capitalize">{role}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setRole("admin")} className="gap-2">
          <Shield className="h-4 w-4 text-blue-500" />
          <span>Admin</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRole("associate")} className="gap-2">
          <Users className="h-4 w-4 text-green-500" />
          <span>Associate</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

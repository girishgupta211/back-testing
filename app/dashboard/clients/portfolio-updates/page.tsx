"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { ScheduleUpdateDialog } from "@/components/schedule-update-dialog"

// Mock data for clients needing updates
const clientsNeedingUpdates = [
  {
    id: "c1",
    name: "Vikram Mehta",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "vikram.mehta@example.com",
    phone: "+91 98765 43210",
    lastUpdate: "2023-01-15",
    priority: "high",
    portfolioValue: 1250000,
    change: 8.5,
  },
  {
    id: "c2",
    name: "Priya Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "priya.singh@example.com",
    phone: "+91 87654 32109",
    lastUpdate: "2023-02-22",
    priority: "medium",
    portfolioValue: 850000,
    change: 5.2,
  },
  {
    id: "c3",
    name: "Amit Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "amit.patel@example.com",
    phone: "+91 76543 21098",
    lastUpdate: "2023-03-10",
    priority: "medium",
    portfolioValue: 1850000,
    change: 6.8,
  },
  {
    id: "4",
    name: "Neha Gupta",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "neha.gupta@example.com",
    phone: "+91 65432 10987",
    lastUpdate: "2022-12-05",
    priority: "high",
    portfolioValue: 750000,
    change: 4.3,
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "rajesh.kumar@example.com",
    phone: "+91 54321 09876",
    lastUpdate: "2023-01-25",
    priority: "low",
    portfolioValue: 2250000,
    change: 7.5,
  },
  {
    id: "9",
    name: "Rahul Dravid",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "rahul.dravid@example.com",
    phone: "+91 10987 65432",
    lastUpdate: "2022-11-20",
    priority: "high",
    portfolioValue: 1650000,
    change: 9.8,
  },
]

export default function ClientsNeedingUpdatesPage() {
  const [selectedClient, setSelectedClient] = useState<(typeof clientsNeedingUpdates)[0] | null>(null)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)

  const handleSchedule = (client: (typeof clientsNeedingUpdates)[0]) => {
    setSelectedClient(client)
    setIsScheduleDialogOpen(true)
  }

  const getLastUpdateDays = (dateString: string) => {
    const lastUpdate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastUpdate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Clients Needing Portfolio Updates</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsNeedingUpdates.length}</div>
            <p className="text-xs text-muted-foreground">Out of 185 total clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {clientsNeedingUpdates.filter((c) => c.priority === "high").length}
            </div>
            <p className="text-xs text-muted-foreground">Last update over 90 days ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AUM Requiring Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(clientsNeedingUpdates.reduce((sum, client) => sum + client.portfolioValue, 0) / 10000000).toFixed(2)}{" "}
              Cr
            </div>
            <p className="text-xs text-muted-foreground">38% of total AUM</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clients Due for Portfolio Updates</CardTitle>
          <CardDescription>Clients who haven't received a portfolio update in over 60 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">Client</th>
                  <th className="py-3 px-4 text-right">Portfolio Value</th>
                  <th className="py-3 px-4 text-right">Last Update</th>
                  <th className="py-3 px-4 text-left">Priority</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientsNeedingUpdates.map((client) => (
                  <tr key={client.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-muted-foreground">{client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      ₹{(client.portfolioValue / 100000).toFixed(1)}L
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{getLastUpdateDays(client.lastUpdate)} days ago</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getPriorityBadge(client.priority)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/dashboard/clients/${client.id}`}>
                          <Button variant="outline" size="sm" className="h-8">
                            View
                          </Button>
                        </Link>
                        <Button variant="default" size="sm" className="h-8" onClick={() => handleSchedule(client)}>
                          Schedule
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedClient && (
        <ScheduleUpdateDialog
          isOpen={isScheduleDialogOpen}
          onClose={() => setIsScheduleDialogOpen(false)}
          clientName={selectedClient.name}
          clientPhone={selectedClient.phone}
        />
      )}
    </div>
  )
}

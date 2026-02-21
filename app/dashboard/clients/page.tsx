"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Download, Search, UserPlus, Users, UserCheck, UserX } from "lucide-react"
import Link from "next/link"

export default function ClientsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
        <p className="text-muted-foreground">Manage your clients and their portfolios</p>
      </div>

      {/* Client Count Cards - Moved to the top and arranged in the specified order */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">Across all segments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185</div>
            <p className="text-xs text-muted-foreground">74.6% of total clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Clients</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">63</div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">25.4% of total clients</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/clients/inactive">Reactivate</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Insights - Shown after the cards and before the client list */}
      <Card>
        <CardHeader>
          <CardTitle>Client Insights</CardTitle>
          <CardDescription>Key metrics and trends about your client base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Average AUM</p>
              <p className="text-2xl font-bold">₹20.5L</p>
              <div className="text-xs text-green-600">↑ 8.2% from last month</div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Avg. Investment Period</p>
              <p className="text-2xl font-bold">4.2 yrs</p>
              <div className="text-xs text-green-600">↑ 0.3 yrs from last year</div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
              <p className="text-2xl font-bold">97%</p>
              <div className="text-xs text-green-600">↑ 2% from last quarter</div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">New Clients (30d)</p>
              <p className="text-2xl font-bold">15</p>
              <div className="text-xs text-green-600">↑ 25% from previous period</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client List - Shown after insights */}
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Client List</CardTitle>
            <CardDescription>View and manage all your clients</CardDescription>
          </div>
          <div className="ml-auto flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search clients..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
              <div>Name</div>
              <div>Segment</div>
              <div>AUM</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            {clients.map((client) => (
              <div key={client.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">{client.email}</div>
                  </div>
                </div>
                <div>
                  <Badge
                    variant={
                      client.segment === "Premium" ? "default" : client.segment === "Standard" ? "secondary" : "outline"
                    }
                  >
                    {client.segment}
                  </Badge>
                </div>
                <div>₹{client.aum}</div>
                <div>
                  <Badge variant={client.status === "Active" ? "success" : "destructive"}>{client.status}</Badge>
                </div>
                <div className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/clients/${client.id}`}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample client data
const clients = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    segment: "Premium",
    aum: "32.5L",
    status: "Active",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    segment: "Standard",
    aum: "18.2L",
    status: "Active",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    segment: "Premium",
    aum: "45.7L",
    status: "Active",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "4",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    segment: "Basic",
    aum: "8.3L",
    status: "Inactive",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    segment: "Standard",
    aum: "22.1L",
    status: "Active",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "6",
    name: "Ananya Desai",
    email: "ananya.desai@example.com",
    segment: "Premium",
    aum: "38.9L",
    status: "Active",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "7",
    name: "Rajesh Verma",
    email: "rajesh.verma@example.com",
    segment: "Basic",
    aum: "5.6L",
    status: "Inactive",
    avatar: "/placeholder.svg?height=36&width=36",
  },
]

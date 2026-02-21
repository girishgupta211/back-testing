"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Download, Search, Calendar, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function InactiveClientsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Inactive Clients</h2>
        <p className="text-muted-foreground">Reactivate dormant clients with personalized strategies</p>
      </div>

      {/* Reactivation Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Reactivation Strategies</CardTitle>
          <CardDescription>Proven approaches to re-engage inactive clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Personalized Portfolio Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Offer a free, comprehensive review of their current investments with personalized recommendations.
                </p>
                <Button className="w-full" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Reviews
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Special Comeback Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Provide exclusive fee discounts or special access to premium funds for returning clients.
                </p>
                <Button className="w-full" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Offers
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Direct Outreach Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Conduct a targeted phone campaign to understand their needs and concerns.
                </p>
                <Button className="w-full" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Start Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Inactive Client Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Inactivity Analysis</CardTitle>
          <CardDescription>Understanding why clients became inactive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4f46e5]"></div>
                  <span>No Recent Transactions</span>
                </div>
                <span>42%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#4f46e5]" style={{ width: "42%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0ea5e9]"></div>
                  <span>Poor Performance</span>
                </div>
                <span>28%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#0ea5e9]" style={{ width: "28%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                  <span>Changed Financial Goals</span>
                </div>
                <span>18%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#f59e0b]" style={{ width: "18%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                  <span>Switched Advisors</span>
                </div>
                <span>12%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#10b981]" style={{ width: "12%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inactive Client List */}
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Inactive Clients</CardTitle>
            <CardDescription>Clients with no activity in the last 6 months</CardDescription>
          </div>
          <div className="ml-auto flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export List
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search inactive clients..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                <SelectItem value="no-transactions">No Transactions</SelectItem>
                <SelectItem value="performance">Poor Performance</SelectItem>
                <SelectItem value="goals">Changed Goals</SelectItem>
                <SelectItem value="advisor">Switched Advisors</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
              <div>Name</div>
              <div>Last Active</div>
              <div>AUM</div>
              <div>Segment</div>
              <div>Reactivation Potential</div>
              <div className="text-right">Actions</div>
            </div>
            {inactiveClients.map((client) => (
              <div key={client.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0 items-center">
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
                <div>{client.lastActive}</div>
                <div>₹{client.aum}</div>
                <div>
                  <Badge
                    variant={
                      client.segment === "Premium" ? "default" : client.segment === "Standard" ? "secondary" : "outline"
                    }
                  >
                    {client.segment}
                  </Badge>
                </div>
                <div>
                  <Badge
                    variant={
                      client.potential === "High"
                        ? "success"
                        : client.potential === "Medium"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {client.potential}
                  </Badge>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                    <span className="sr-only">Call</span>
                  </Button>
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

// Sample inactive client data
const inactiveClients = [
  {
    id: "4",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    segment: "Basic",
    aum: "8.3L",
    lastActive: "6 months ago",
    potential: "Medium",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "7",
    name: "Rajesh Verma",
    email: "rajesh.verma@example.com",
    segment: "Basic",
    aum: "5.6L",
    lastActive: "8 months ago",
    potential: "Low",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "12",
    name: "Sanjay Malhotra",
    email: "sanjay.m@example.com",
    segment: "Premium",
    aum: "42.1L",
    lastActive: "7 months ago",
    potential: "High",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "15",
    name: "Meera Reddy",
    email: "meera.r@example.com",
    segment: "Standard",
    aum: "15.8L",
    lastActive: "9 months ago",
    potential: "Medium",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "18",
    name: "Arjun Nair",
    email: "arjun.n@example.com",
    segment: "Standard",
    aum: "18.3L",
    lastActive: "10 months ago",
    potential: "High",
    avatar: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "23",
    name: "Kavita Joshi",
    email: "kavita.j@example.com",
    segment: "Basic",
    aum: "6.7L",
    lastActive: "11 months ago",
    potential: "Low",
    avatar: "/placeholder.svg?height=36&width=36",
  },
]

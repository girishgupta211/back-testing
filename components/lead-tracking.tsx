"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus, Phone, Mail, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "closed" | "lost"
  source: string
  assignedTo: string
  lastActivity: string
  value: number
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "+91 98765 43210",
    status: "new",
    source: "LinkedIn",
    assignedTo: "You",
    lastActivity: "2 hours ago",
    value: 250000,
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 87654 32109",
    status: "contacted",
    source: "Facebook",
    assignedTo: "Rahul Sharma",
    lastActivity: "1 day ago",
    value: 180000,
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 76543 21098",
    status: "qualified",
    source: "Referral",
    assignedTo: "You",
    lastActivity: "3 days ago",
    value: 500000,
  },
  {
    id: "4",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+91 65432 10987",
    status: "proposal",
    source: "Website",
    assignedTo: "Rahul Sharma",
    lastActivity: "5 days ago",
    value: 350000,
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 54321 09876",
    status: "negotiation",
    source: "Instagram",
    assignedTo: "You",
    lastActivity: "1 week ago",
    value: 750000,
  },
]

export function LeadTracking() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLeads = leads.filter((lead) => {
    // Filter by tab
    if (activeTab !== "all" && lead.status !== activeTab) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !lead.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="bg-[#0496ff]/10 text-[#0496ff] hover:bg-[#0496ff]/20">New</Badge>
      case "contacted":
        return <Badge className="bg-[#0496ff]/20 text-[#0496ff] hover:bg-[#0496ff]/30">Contacted</Badge>
      case "qualified":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-800/20 dark:text-amber-400">
            Qualified
          </Badge>
        )
      case "proposal":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-800/20 dark:text-orange-400">
            Proposal
          </Badge>
        )
      case "negotiation":
        return (
          <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100 dark:bg-pink-800/20 dark:text-pink-400">
            Negotiation
          </Badge>
        )
      case "closed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
            Closed
          </Badge>
        )
      case "lost":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400">Lost</Badge>
        )
      default:
        return null
    }
  }

  const updateLeadStatus = (id: string, status: Lead["status"]) => {
    setLeads(leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Lead Tracking</h2>
          <p className="text-sm text-muted-foreground">Monitor and manage your leads through the sales pipeline</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>Track and manage your leads efficiently</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  className="pl-8 w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Lead
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="qualified">Qualified</TabsTrigger>
              <TabsTrigger value="proposal">Proposal</TabsTrigger>
              <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
              <TabsTrigger value="lost">Lost</TabsTrigger>
            </TabsList>

            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left hidden md:table-cell">Contact</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left hidden md:table-cell">Source</th>
                    <th className="py-3 px-4 text-left hidden lg:table-cell">Assigned To</th>
                    <th className="py-3 px-4 text-right">Value</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/avatars/0${(Number.parseInt(lead.id) % 5) + 1}.png`} alt={lead.name} />
                            <AvatarFallback>
                              {lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-xs text-muted-foreground md:hidden">{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="text-xs flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {lead.email}
                          </div>
                          <div className="text-xs flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {lead.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(lead.status)}
                          <div className="text-xs text-muted-foreground hidden md:block">{lead.lastActivity}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">{lead.source}</td>
                      <td className="py-3 px-4 hidden lg:table-cell">{lead.assignedTo}</td>
                      <td className="py-3 px-4 text-right font-medium">₹{lead.value.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                            <span className="sr-only">Call</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "new")}>New</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "contacted")}>
                                Contacted
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "qualified")}>
                                Qualified
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "proposal")}>
                                Proposal
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "negotiation")}>
                                Negotiation
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "closed")}>
                                Closed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "lost")}>
                                Lost
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

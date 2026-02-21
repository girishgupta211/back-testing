import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

const clientsNeedingUpdates = [
  {
    id: "1",
    name: "Vikram Mehta",
    avatar: "/avatars/01.png",
    email: "vikram.mehta@example.com",
    phone: "+91 98765 43210",
    portfolioValue: 1250000,
    lastUpdate: "95 days ago",
    priority: "High",
    preferredContact: "Phone",
  },
  {
    id: "2",
    name: "Priya Singh",
    avatar: "/avatars/02.png",
    email: "priya.singh@example.com",
    phone: "+91 87654 32109",
    portfolioValue: 850000,
    lastUpdate: "82 days ago",
    priority: "Medium",
    preferredContact: "Email",
  },
  {
    id: "3",
    name: "Amit Patel",
    avatar: "/avatars/03.png",
    email: "amit.patel@example.com",
    phone: "+91 76543 21098",
    portfolioValue: 1850000,
    lastUpdate: "110 days ago",
    priority: "High",
    preferredContact: "Phone",
  },
  {
    id: "4",
    name: "Neha Gupta",
    avatar: "/avatars/04.png",
    email: "neha.gupta@example.com",
    phone: "+91 65432 10987",
    portfolioValue: 750000,
    lastUpdate: "75 days ago",
    priority: "Medium",
    preferredContact: "Email",
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    avatar: "/avatars/05.png",
    email: "rajesh.kumar@example.com",
    phone: "+91 54321 09876",
    portfolioValue: 2250000,
    lastUpdate: "88 days ago",
    priority: "Medium",
    preferredContact: "Phone",
  },
  {
    id: "6",
    name: "Ananya Desai",
    avatar: "/avatars/06.png",
    email: "ananya.desai@example.com",
    phone: "+91 43210 98765",
    portfolioValue: 1550000,
    lastUpdate: "105 days ago",
    priority: "High",
    preferredContact: "Email",
  },
  {
    id: "7",
    name: "Suresh Reddy",
    avatar: "/avatars/07.png",
    email: "suresh.reddy@example.com",
    phone: "+91 32109 87654",
    portfolioValue: 950000,
    lastUpdate: "92 days ago",
    priority: "Medium",
    preferredContact: "Phone",
  },
  {
    id: "8",
    name: "Kavita Sharma",
    avatar: "/avatars/08.png",
    email: "kavita.sharma@example.com",
    phone: "+91 21098 76543",
    portfolioValue: 1150000,
    lastUpdate: "78 days ago",
    priority: "Medium",
    preferredContact: "Email",
  },
]

export default function PortfolioUpdatesPage() {
  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Portfolio Updates</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Needing Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Out of 185 total clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Time Since Update</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90 days</div>
            <p className="text-xs text-muted-foreground">Recommended: 60 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clients Needing Portfolio Updates</CardTitle>
          <CardDescription>Clients who haven't received portfolio updates in over 75 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">Client</th>
                  <th className="py-3 px-4 text-right">Portfolio Value</th>
                  <th className="py-3 px-4 text-left">Last Update</th>
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
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{client.lastUpdate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          client.priority === "High"
                            ? "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                        }
                      >
                        {client.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4" />
                          <span className="sr-only">Call</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
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
    </div>
  )
}

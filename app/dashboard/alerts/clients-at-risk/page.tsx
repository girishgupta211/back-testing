import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowDownRight, Phone, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

const clientsAtRisk = [
  {
    id: "c1", // Changed to match the client IDs in the client detail page
    name: "Vikram Mehta",
    avatar: "/avatars/01.png",
    email: "vikram.mehta@example.com",
    phone: "+91 98765 43210",
    portfolioValue: 1250000,
    change: -18.5,
    riskFactor: "Market Volatility",
    lastContact: "15 days ago",
  },
  {
    id: "c2", // Changed to match the client IDs in the client detail page
    name: "Priya Singh",
    avatar: "/avatars/02.png",
    email: "priya.singh@example.com",
    phone: "+91 87654 32109",
    portfolioValue: 850000,
    change: -15.2,
    riskFactor: "Sector Concentration",
    lastContact: "22 days ago",
  },
  {
    id: "c3", // Changed to match the client IDs in the client detail page
    name: "Amit Patel",
    avatar: "/avatars/03.png",
    email: "amit.patel@example.com",
    phone: "+91 76543 21098",
    portfolioValue: 1850000,
    change: -12.8,
    riskFactor: "Market Volatility",
    lastContact: "10 days ago",
  },
  {
    id: "4",
    name: "Neha Gupta",
    avatar: "/avatars/04.png",
    email: "neha.gupta@example.com",
    phone: "+91 65432 10987",
    portfolioValue: 750000,
    change: -14.3,
    riskFactor: "Fund Underperformance",
    lastContact: "30+ days ago",
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    avatar: "/avatars/05.png",
    email: "rajesh.kumar@example.com",
    phone: "+91 54321 09876",
    portfolioValue: 2250000,
    change: -11.5,
    riskFactor: "Sector Concentration",
    lastContact: "25 days ago",
  },
  {
    id: "6",
    name: "Ananya Desai",
    avatar: "/avatars/06.png",
    email: "ananya.desai@example.com",
    phone: "+91 43210 98765",
    portfolioValue: 1550000,
    change: -16.7,
    riskFactor: "Fund Underperformance",
    lastContact: "18 days ago",
  },
  {
    id: "7",
    name: "Suresh Reddy",
    avatar: "/avatars/07.png",
    email: "suresh.reddy@example.com",
    phone: "+91 32109 87654",
    portfolioValue: 950000,
    change: -13.9,
    riskFactor: "Market Volatility",
    lastContact: "12 days ago",
  },
  {
    id: "8",
    name: "Kavita Sharma",
    avatar: "/avatars/08.png",
    email: "kavita.sharma@example.com",
    phone: "+91 21098 76543",
    portfolioValue: 1150000,
    change: -17.2,
    riskFactor: "Fund Underperformance",
    lastContact: "28 days ago",
  },
  {
    id: "9",
    name: "Rahul Dravid",
    avatar: "/avatars/09.png",
    email: "rahul.dravid@example.com",
    phone: "+91 10987 65432",
    portfolioValue: 1650000,
    change: -10.8,
    riskFactor: "Sector Concentration",
    lastContact: "20 days ago",
  },
  {
    id: "10",
    name: "Meera Iyer",
    avatar: "/avatars/10.png",
    email: "meera.iyer@example.com",
    phone: "+91 09876 54321",
    portfolioValue: 2050000,
    change: -12.1,
    riskFactor: "Market Volatility",
    lastContact: "15 days ago",
  },
  {
    id: "11",
    name: "Arjun Nair",
    avatar: "/avatars/01.png",
    email: "arjun.nair@example.com",
    phone: "+91 98765 12345",
    portfolioValue: 1350000,
    change: -19.5,
    riskFactor: "Fund Underperformance",
    lastContact: "35 days ago",
  },
  {
    id: "12",
    name: "Divya Menon",
    avatar: "/avatars/02.png",
    email: "divya.menon@example.com",
    phone: "+91 87654 23456",
    portfolioValue: 950000,
    change: -21.3,
    riskFactor: "Market Volatility",
    lastContact: "40 days ago",
  },
]

export default function ClientsAtRiskPage() {
  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Clients at Risk</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Out of 185 total clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Portfolio Drop</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-15.3%</div>
            <p className="text-xs text-muted-foreground">In the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AUM at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1.65 Cr</div>
            <p className="text-xs text-muted-foreground">43% of total AUM</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clients Requiring Attention</CardTitle>
          <CardDescription>Clients with significant portfolio value drop in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">Client</th>
                  <th className="py-3 px-4 text-right">Portfolio Value</th>
                  <th className="py-3 px-4 text-right">Change</th>
                  <th className="py-3 px-4 text-left">Risk Factor</th>
                  <th className="py-3 px-4 text-left">Last Contact</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientsAtRisk.map((client) => (
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
                      <div className="flex items-center justify-end gap-1 text-red-600">
                        <ArrowDownRight className="h-4 w-4" />
                        <span>{client.change}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{client.riskFactor}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className={client.lastContact.includes("30+") ? "text-red-600" : ""}>
                        {client.lastContact}
                      </span>
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
                        <Link href={`/dashboard/clients/${client.id}`}>
                          <Button variant="outline" size="sm" className="h-8">
                            View
                          </Button>
                        </Link>
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

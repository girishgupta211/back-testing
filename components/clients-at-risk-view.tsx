"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ClientsAtRiskViewProps {
  data: any[]
  onViewClient: (clientId: string) => void
}

export function ClientsAtRiskView({ data, onViewClient }: ClientsAtRiskViewProps) {
  return (
    <div className="flex-1 space-y-6">
      <h1 className="text-2xl font-semibold">Clients at Risk</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-xs text-muted-foreground">Out of 221 total clients</p>
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
                {data.map((client, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatars/01.png" alt={client.name} />
                          <AvatarFallback>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-muted-foreground">client.email@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">₹{(client.aum / 100000).toFixed(1)}L</td>
                    <td className="py-3 px-4 text-right text-red-600">{client.portfolioChange}%</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{client.riskFactor}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-red-600">30+ days ago</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => onViewClient(client.id)}>
                          View
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

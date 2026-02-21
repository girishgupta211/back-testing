"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, BarChart3 } from "lucide-react"
import { PortfolioRebalanceView } from "@/components/portfolio-rebalance-view"

// Sample client data for the portfolio rebalance view
const sampleClientData = {
  id: "priya-patel",
  name: "Priya Patel",
  avatar: "/diverse-avatars.png",
  email: "priya.patel@example.com",
  phone: "+91 98765 43210",
  portfolioValue: 2450000,
  riskProfile: "Moderate",
  lastRebalanced: "6 months ago",
  imbalances: [
    { category: "Large Cap", current: 45, recommended: 40, difference: 5 },
    { category: "Mid Cap", current: 15, recommended: 20, difference: -5 },
    { category: "Small Cap", current: 10, recommended: 10, difference: 0 },
    { category: "Debt", current: 25, recommended: 25, difference: 0 },
    { category: "Gold", current: 5, recommended: 5, difference: 0 },
  ],
}

interface RebalancingViewProps {
  data: any[]
  onSelectClient?: (client: any) => void
}

export function RebalancingView({ data, onSelectClient }: RebalancingViewProps) {
  const [selectedClient, setSelectedClient] = useState<any | null>(null)

  const handleSelectClient = (client: any, e?: React.MouseEvent) => {
    // Prevent default if event is provided
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setSelectedClient(client)

    // Only call onSelectClient if provided and we're not showing the rebalance view
    if (onSelectClient && !selectedClient) {
      onSelectClient(client)
    }
  }

  if (selectedClient) {
    // Create client data in the format expected by PortfolioRebalanceView
    const clientData = {
      ...sampleClientData,
      id: selectedClient.id,
      name: selectedClient.name,
      portfolioValue: selectedClient.portfolioValue,
      lastRebalanced: selectedClient.lastRebalanced,
    }

    return <PortfolioRebalanceView client={clientData} onBack={() => setSelectedClient(null)} />
  }

  return (
    <div className="flex-1 space-y-6">
      <h1 className="text-2xl font-semibold">Portfolio Rebalancing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clients Needing Rebalancing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Out of 185 total clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Allocation Imbalance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4%</div>
            <p className="text-xs text-muted-foreground">Threshold: 10%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AUM to Rebalance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2.1 Cr</div>
            <p className="text-xs text-muted-foreground">55% of total AUM</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clients Needing Portfolio Rebalancing</CardTitle>
          <CardDescription>Clients whose portfolios have significant allocation imbalances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">Client</th>
                  <th className="py-3 px-4 text-right">Portfolio Value</th>
                  <th className="py-3 px-4 text-left">Allocation Imbalance</th>
                  <th className="py-3 px-4 text-left">Risk Profile</th>
                  <th className="py-3 px-4 text-left">Last Rebalanced</th>
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
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      ₹{(client.portfolioValue / 100000).toFixed(1)}L
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-amber-600" />
                          <span className="text-xs">
                            Large Cap: 45% <span className="text-amber-600">+5%</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-blue-600" />
                          <span className="text-xs">
                            Mid Cap: 15% <span className="text-blue-600">-5%</span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                      >
                        Moderate
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{client.lastRebalanced}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSelectClient(client, e)
                          }}
                        >
                          <BarChart3 className="h-4 w-4 mr-1" /> Rebalance
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

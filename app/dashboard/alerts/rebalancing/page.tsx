"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, ArrowLeft, BarChart3, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { PortfolioRebalanceView } from "@/components/portfolio-rebalance-view"

const clientsNeedingRebalancing = [
  {
    id: "1",
    name: "Vikram Mehta",
    avatar: "/avatars/01.png",
    email: "vikram.mehta@example.com",
    phone: "+91 98765 43210",
    portfolioValue: 1250000,
    imbalances: [
      { category: "Mid Cap", current: 42, recommended: 30, difference: 12 },
      { category: "Small Cap", current: 8, recommended: 15, difference: -7 },
    ],
    riskProfile: "Moderate",
    lastRebalanced: "12 months ago",
  },
  {
    id: "2",
    name: "Priya Singh",
    avatar: "/avatars/02.png",
    email: "priya.singh@example.com",
    phone: "+91 87654 32109",
    portfolioValue: 850000,
    imbalances: [
      { category: "Debt", current: 15, recommended: 25, difference: -10 },
      { category: "Equity", current: 75, recommended: 65, difference: 10 },
    ],
    riskProfile: "Aggressive",
    lastRebalanced: "10 months ago",
  },
  {
    id: "3",
    name: "Amit Patel",
    avatar: "/avatars/03.png",
    email: "amit.patel@example.com",
    phone: "+91 76543 21098",
    portfolioValue: 1850000,
    imbalances: [
      { category: "Large Cap", current: 45, recommended: 30, difference: 15 },
      { category: "Gold", current: 5, recommended: 10, difference: -5 },
    ],
    riskProfile: "Conservative",
    lastRebalanced: "14 months ago",
  },
  {
    id: "4",
    name: "Neha Gupta",
    avatar: "/avatars/04.png",
    email: "neha.gupta@example.com",
    phone: "+91 65432 10987",
    portfolioValue: 750000,
    imbalances: [
      { category: "Debt", current: 35, recommended: 25, difference: 10 },
      { category: "Equity", current: 55, recommended: 65, difference: -10 },
    ],
    riskProfile: "Moderate",
    lastRebalanced: "11 months ago",
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    avatar: "/avatars/05.png",
    email: "rajesh.kumar@example.com",
    phone: "+91 54321 09876",
    portfolioValue: 2250000,
    imbalances: [
      { category: "Cash", current: 18, recommended: 5, difference: 13 },
      { category: "Equity", current: 52, recommended: 65, difference: -13 },
    ],
    riskProfile: "Moderate",
    lastRebalanced: "9 months ago",
  },
  {
    id: "6",
    name: "Ananya Desai",
    avatar: "/avatars/06.png",
    email: "ananya.desai@example.com",
    phone: "+91 43210 98765",
    portfolioValue: 1550000,
    imbalances: [
      { category: "International", current: 22, recommended: 10, difference: 12 },
      { category: "Large Cap", current: 18, recommended: 30, difference: -12 },
    ],
    riskProfile: "Aggressive",
    lastRebalanced: "13 months ago",
  },
  {
    id: "7",
    name: "Suresh Reddy",
    avatar: "/avatars/07.png",
    email: "suresh.reddy@example.com",
    phone: "+91 32109 87654",
    portfolioValue: 950000,
    imbalances: [
      { category: "Mid Cap", current: 35, recommended: 20, difference: 15 },
      { category: "Debt", current: 15, recommended: 30, difference: -15 },
    ],
    riskProfile: "Conservative",
    lastRebalanced: "15 months ago",
  },
  {
    id: "8",
    name: "Kavita Sharma",
    avatar: "/avatars/08.png",
    email: "kavita.sharma@example.com",
    phone: "+91 21098 76543",
    portfolioValue: 1150000,
    imbalances: [
      { category: "Small Cap", current: 25, recommended: 10, difference: 15 },
      { category: "Large Cap", current: 20, recommended: 35, difference: -15 },
    ],
    riskProfile: "Moderate",
    lastRebalanced: "12 months ago",
  },
  {
    id: "9",
    name: "Rahul Dravid",
    avatar: "/avatars/09.png",
    email: "rahul.dravid@example.com",
    phone: "+91 10987 65432",
    portfolioValue: 1650000,
    imbalances: [
      { category: "Debt", current: 40, recommended: 30, difference: 10 },
      { category: "Equity", current: 55, recommended: 65, difference: -10 },
    ],
    riskProfile: "Conservative",
    lastRebalanced: "8 months ago",
  },
  {
    id: "10",
    name: "Meera Iyer",
    avatar: "/avatars/10.png",
    email: "meera.iyer@example.com",
    phone: "+91 09876 54321",
    portfolioValue: 2050000,
    imbalances: [
      { category: "Mid Cap", current: 32, recommended: 20, difference: 12 },
      { category: "Large Cap", current: 28, recommended: 40, difference: -12 },
    ],
    riskProfile: "Moderate",
    lastRebalanced: "10 months ago",
  },
  {
    id: "11",
    name: "Arjun Nair",
    avatar: "/avatars/01.png",
    email: "arjun.nair@example.com",
    phone: "+91 98765 12345",
    portfolioValue: 1350000,
    imbalances: [
      { category: "Small Cap", current: 28, recommended: 15, difference: 13 },
      { category: "Debt", current: 12, recommended: 25, difference: -13 },
    ],
    riskProfile: "Aggressive",
    lastRebalanced: "16 months ago",
  },
  {
    id: "12",
    name: "Divya Menon",
    avatar: "/avatars/02.png",
    email: "divya.menon@example.com",
    phone: "+91 87654 23456",
    portfolioValue: 950000,
    imbalances: [
      { category: "International", current: 18, recommended: 5, difference: 13 },
      { category: "Debt", current: 17, recommended: 30, difference: -13 },
    ],
    riskProfile: "Moderate",
    lastRebalanced: "14 months ago",
  },
  {
    id: "13",
    name: "Kiran Rao",
    avatar: "/avatars/03.png",
    email: "kiran.rao@example.com",
    phone: "+91 76543 34567",
    portfolioValue: 1750000,
    imbalances: [
      { category: "Cash", current: 15, recommended: 5, difference: 10 },
      { category: "Equity", current: 70, recommended: 80, difference: -10 },
    ],
    riskProfile: "Aggressive",
    lastRebalanced: "11 months ago",
  },
  {
    id: "14",
    name: "Sanjay Verma",
    avatar: "/avatars/04.png",
    email: "sanjay.verma@example.com",
    phone: "+91 65432 45678",
    portfolioValue: 2350000,
    imbalances: [
      { category: "Mid Cap", current: 38, recommended: 25, difference: 13 },
      { category: "Large Cap", current: 22, recommended: 35, difference: -13 },
    ],
    riskProfile: "Moderate",
    lastRebalanced: "13 months ago",
  },
  {
    id: "15",
    name: "Lakshmi Krishnan",
    avatar: "/avatars/05.png",
    email: "lakshmi.krishnan@example.com",
    phone: "+91 54321 56789",
    portfolioValue: 1450000,
    imbalances: [
      { category: "Small Cap", current: 20, recommended: 10, difference: 10 },
      { category: "Debt", current: 20, recommended: 30, difference: -10 },
    ],
    riskProfile: "Conservative",
    lastRebalanced: "12 months ago",
  },
]

export default function RebalancingPage() {
  const [selectedClient, setSelectedClient] = useState<(typeof clientsNeedingRebalancing)[0] | null>(null)
  const [showRebalanceView, setShowRebalanceView] = useState(false)

  const handleRebalanceClick = (client: (typeof clientsNeedingRebalancing)[0], e: React.MouseEvent) => {
    e.preventDefault() // Prevent any default navigation
    setSelectedClient(client)
    setShowRebalanceView(true)
  }

  const handleBack = () => {
    setShowRebalanceView(false)
    setSelectedClient(null)
  }

  // If showing rebalance view, render it in a modal-like container
  if (showRebalanceView && selectedClient) {
    return (
      <div className="flex-1 p-4 md:p-6">
        <PortfolioRebalanceView client={selectedClient} onBack={handleBack} />
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Portfolio Rebalancing</h1>
      </div>

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
                {clientsNeedingRebalancing.map((client) => (
                  <tr key={client.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
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
                      <div className="space-y-1">
                        {client.imbalances.map((imbalance, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <AlertTriangle
                              className={`h-3 w-3 ${imbalance.difference > 0 ? "text-amber-600" : "text-blue-600"}`}
                            />
                            <span className="text-xs">
                              {imbalance.category}: {imbalance.current}%
                              <span className={imbalance.difference > 0 ? "text-amber-600" : "text-blue-600"}>
                                {" "}
                                {imbalance.difference > 0 ? "+" : ""}
                                {imbalance.difference}%
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          client.riskProfile === "Aggressive"
                            ? "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                            : client.riskProfile === "Moderate"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                              : "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                        }
                      >
                        {client.riskProfile}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{client.lastRebalanced}</td>
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={(e) => handleRebalanceClick(client, e)}
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

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Trophy, TrendingUp, Users } from "lucide-react"

// Define types for our data
type Distributor = {
  id: string
  name: string
  avatar?: string
  initials: string
  aum: number
  clients: number
  growth: number
  rank: number
}

type LeaderboardCategory = "aum" | "clients" | "growth"

// Sample data for distributors
const distributors: Distributor[] = [
  {
    id: "d1",
    name: "Rajesh Sharma",
    initials: "RS",
    avatar: "/abstract-rs.png",
    aum: 42500000,
    clients: 78,
    growth: 12.3,
    rank: 1,
  },
  {
    id: "d2",
    name: "Priya Patel",
    initials: "PP",
    avatar: "/interconnected-purple-spheres.png",
    aum: 38700000,
    clients: 65,
    growth: 15.7,
    rank: 2,
  },
  {
    id: "d3",
    name: "Vikram Mehta",
    initials: "VM",
    avatar: "/virtual-machine-concept.png",
    aum: 35200000,
    clients: 82,
    growth: 9.5,
    rank: 3,
  },
  {
    id: "d4",
    name: "Ananya Singh",
    initials: "AS",
    avatar: "/abstract-geometric-as.png",
    aum: 31800000,
    clients: 59,
    growth: 18.2,
    rank: 4,
  },
  {
    id: "d5",
    name: "Karthik Reddy",
    initials: "KR",
    avatar: "/abstract-kr.png",
    aum: 29500000,
    clients: 71,
    growth: 11.8,
    rank: 5,
  },
]

// Format currency in Indian format (lakhs, crores)
const formatIndianCurrency = (amount: number): string => {
  const crore = 10000000
  const lakh = 100000

  if (amount >= crore) {
    return `₹${(amount / crore).toFixed(2)} Cr`
  } else if (amount >= lakh) {
    return `₹${(amount / lakh).toFixed(2)} L`
  } else {
    return `₹${amount.toLocaleString("en-IN")}`
  }
}

export function Leaderboards() {
  const [category, setCategory] = useState<LeaderboardCategory>("aum")

  // Sort distributors based on the selected category
  const getSortedDistributors = () => {
    return [...distributors].sort((a, b) => {
      if (category === "aum") return b.aum - a.aum
      if (category === "clients") return b.clients - a.clients
      return b.growth - a.growth
    })
  }

  const sortedDistributors = getSortedDistributors()

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Leaderboards</CardTitle>
            <CardDescription>Top performing distributors this month</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="aum"
          className="space-y-4"
          onValueChange={(value) => setCategory(value as LeaderboardCategory)}
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="aum" className="flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5" />
              <span>AUM</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>Clients</span>
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Growth</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="aum" className="space-y-4 mt-2">
            {sortedDistributors.map((distributor, index) => (
              <div key={distributor.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-xs font-medium">
                    {index + 1}
                  </div>
                  <Avatar className="h-9 w-9">
                    {distributor.avatar && (
                      <AvatarImage src={distributor.avatar || "/placeholder.svg"} alt={distributor.name} />
                    )}
                    <AvatarFallback>{distributor.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{distributor.name}</p>
                    <p className="text-xs text-muted-foreground">{formatIndianCurrency(distributor.aum)} AUM</p>
                  </div>
                </div>
                <Badge variant={index < 3 ? "default" : "outline"} className={index < 3 ? "bg-green-500" : ""}>
                  {index < 3 ? "Top Performer" : `Rank ${index + 1}`}
                </Badge>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="clients" className="space-y-4 mt-2">
            {sortedDistributors.map((distributor, index) => (
              <div key={distributor.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-xs font-medium">
                    {index + 1}
                  </div>
                  <Avatar className="h-9 w-9">
                    {distributor.avatar && (
                      <AvatarImage src={distributor.avatar || "/placeholder.svg"} alt={distributor.name} />
                    )}
                    <AvatarFallback>{distributor.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{distributor.name}</p>
                    <p className="text-xs text-muted-foreground">{distributor.clients} clients</p>
                  </div>
                </div>
                <Badge variant={index < 3 ? "default" : "outline"} className={index < 3 ? "bg-green-500" : ""}>
                  {index < 3 ? "Top Performer" : `Rank ${index + 1}`}
                </Badge>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="growth" className="space-y-4 mt-2">
            {sortedDistributors.map((distributor, index) => (
              <div key={distributor.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-xs font-medium">
                    {index + 1}
                  </div>
                  <Avatar className="h-9 w-9">
                    {distributor.avatar && (
                      <AvatarImage src={distributor.avatar || "/placeholder.svg"} alt={distributor.name} />
                    )}
                    <AvatarFallback>{distributor.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{distributor.name}</p>
                    <p className="text-xs text-muted-foreground">{distributor.growth}% growth</p>
                  </div>
                </div>
                <Badge variant={index < 3 ? "default" : "outline"} className={index < 3 ? "bg-green-500" : ""}>
                  {index < 3 ? "Top Performer" : `Rank ${index + 1}`}
                </Badge>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

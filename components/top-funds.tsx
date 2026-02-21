"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Percent, BarChart3, Users, ChevronDown, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Define fund data structure
type Fund = {
  name: string
  category: string
  aum: string
  returns: {
    oneYear: number
    threeYear: number
    fiveYear: number
  }
  commission: number
}

// Randomized fund data - all funds in a flat array
const allFundsData: Fund[] = [
  // Large Cap
  {
    name: "Axis Bluechip Fund",
    category: "Large Cap",
    aum: "₹25,000 Cr",
    returns: {
      oneYear: 16.8,
      threeYear: 39.5,
      fiveYear: 82.3,
    },
    commission: 1.2,
  },
  {
    name: "HDFC Top 100 Fund",
    category: "Large Cap",
    aum: "₹22,300 Cr",
    returns: {
      oneYear: 18.9,
      threeYear: 41.2,
      fiveYear: 75.8,
    },
    commission: 1.1,
  },
  {
    name: "ICICI Pru Bluechip Fund",
    category: "Large Cap",
    aum: "₹31,200 Cr",
    returns: {
      oneYear: 19.5,
      threeYear: 43.7,
      fiveYear: 79.1,
    },
    commission: 1.3,
  },
  {
    name: "SBI Bluechip Fund",
    category: "Large Cap",
    aum: "₹27,800 Cr",
    returns: {
      oneYear: 17.3,
      threeYear: 38.2,
      fiveYear: 72.5,
    },
    commission: 1.2,
  },
  // Mid Cap
  {
    name: "HDFC Mid-Cap Opportunities",
    category: "Mid Cap",
    aum: "₹30,500 Cr",
    returns: {
      oneYear: 22.7,
      threeYear: 48.3,
      fiveYear: 91.6,
    },
    commission: 1.5,
  },
  {
    name: "Kotak Emerging Equity",
    category: "Mid Cap",
    aum: "₹18,700 Cr",
    returns: {
      oneYear: 24.1,
      threeYear: 51.9,
      fiveYear: 88.4,
    },
    commission: 1.4,
  },
  {
    name: "Axis Midcap Fund",
    category: "Mid Cap",
    aum: "₹15,900 Cr",
    returns: {
      oneYear: 23.5,
      threeYear: 49.8,
      fiveYear: 86.2,
    },
    commission: 1.5,
  },
  {
    name: "DSP Midcap Fund",
    category: "Mid Cap",
    aum: "₹12,400 Cr",
    returns: {
      oneYear: 21.8,
      threeYear: 47.5,
      fiveYear: 84.9,
    },
    commission: 1.4,
  },
  // Small Cap
  {
    name: "SBI Small Cap Fund",
    category: "Small Cap",
    aum: "₹15,200 Cr",
    returns: {
      oneYear: 27.3,
      threeYear: 56.8,
      fiveYear: 105.2,
    },
    commission: 1.8,
  },
  {
    name: "Nippon India Small Cap",
    category: "Small Cap",
    aum: "₹14,500 Cr",
    returns: {
      oneYear: 26.5,
      threeYear: 54.2,
      fiveYear: 102.7,
    },
    commission: 1.7,
  },
  {
    name: "Axis Small Cap Fund",
    category: "Small Cap",
    aum: "₹9,800 Cr",
    returns: {
      oneYear: 28.9,
      threeYear: 58.3,
      fiveYear: 107.8,
    },
    commission: 1.8,
  },
  {
    name: "HDFC Small Cap Fund",
    category: "Small Cap",
    aum: "₹13,600 Cr",
    returns: {
      oneYear: 25.2,
      threeYear: 53.1,
      fiveYear: 99.4,
    },
    commission: 1.7,
  },
  // Value
  {
    name: "ICICI Pru Value Discovery",
    category: "Value",
    aum: "₹22,800 Cr",
    returns: {
      oneYear: 15.7,
      threeYear: 36.9,
      fiveYear: 70.3,
    },
    commission: 1.3,
  },
  {
    name: "Invesco India Contra Fund",
    category: "Value",
    aum: "₹19,600 Cr",
    returns: {
      oneYear: 17.2,
      threeYear: 38.4,
      fiveYear: 73.1,
    },
    commission: 1.2,
  },
  {
    name: "UTI Value Opportunities Fund",
    category: "Value",
    aum: "₹7,900 Cr",
    returns: {
      oneYear: 16.3,
      threeYear: 37.5,
      fiveYear: 71.8,
    },
    commission: 1.3,
  },
  {
    name: "Kotak India EQ Contra Fund",
    category: "Value",
    aum: "₹10,200 Cr",
    returns: {
      oneYear: 18.1,
      threeYear: 39.7,
      fiveYear: 74.5,
    },
    commission: 1.4,
  },
  // Thematic
  {
    name: "SBI Technology Fund",
    category: "Thematic",
    aum: "₹5,600 Cr",
    returns: {
      oneYear: 31.2,
      threeYear: 62.5,
      fiveYear: 115.8,
    },
    commission: 1.9,
  },
  {
    name: "ICICI Pru Pharma Healthcare",
    category: "Thematic",
    aum: "₹4,800 Cr",
    returns: {
      oneYear: 19.8,
      threeYear: 45.3,
      fiveYear: 87.2,
    },
    commission: 1.6,
  },
  {
    name: "Axis Banking & PSU Debt Fund",
    category: "Thematic",
    aum: "₹8,300 Cr",
    returns: {
      oneYear: 8.5,
      threeYear: 24.7,
      fiveYear: 48.3,
    },
    commission: 1.1,
  },
  {
    name: "Nippon India Consumption Fund",
    category: "Thematic",
    aum: "₹3,900 Cr",
    returns: {
      oneYear: 22.4,
      threeYear: 47.8,
      fiveYear: 89.5,
    },
    commission: 1.7,
  },
]

// AUM data for the AUM tab
const aumData = [
  {
    name: "HDFC Mid-Cap Opportunities",
    category: "Mid Cap",
    aum: "₹4.2 Cr",
    commission: 1.5,
    returns: 22.7,
    growth: {
      market: "+₹0.8 Cr",
      clients: "+₹0.6 Cr",
    },
  },
  {
    name: "Axis Bluechip Fund",
    category: "Large Cap",
    aum: "₹3.8 Cr",
    commission: 1.2,
    returns: 16.8,
    growth: {
      market: "+₹0.6 Cr",
      clients: "+₹0.9 Cr",
    },
  },
  {
    name: "SBI Technology Fund",
    category: "Thematic",
    aum: "₹3.5 Cr",
    commission: 1.9,
    returns: 31.2,
    growth: {
      market: "+₹1.1 Cr",
      clients: "+₹0.4 Cr",
    },
  },
  {
    name: "ICICI Pru Value Discovery",
    category: "Value",
    aum: "₹2.9 Cr",
    commission: 1.3,
    returns: 15.7,
    growth: {
      market: "+₹0.4 Cr",
      clients: "+₹0.5 Cr",
    },
  },
  {
    name: "SBI Small Cap Fund",
    category: "Small Cap",
    aum: "₹2.5 Cr",
    commission: 1.8,
    returns: 27.3,
    growth: {
      market: "+₹0.7 Cr",
      clients: "+₹0.3 Cr",
    },
  },
  {
    name: "HDFC Top 100 Fund",
    category: "Large Cap",
    aum: "₹1.8 Cr",
    commission: 1.1,
    returns: 18.9,
    growth: {
      market: "+₹0.3 Cr",
      clients: "+₹0.2 Cr",
    },
  },
  {
    name: "Nippon India Consumption Fund",
    category: "Thematic",
    aum: "₹1.5 Cr",
    commission: 1.7,
    returns: 22.4,
    growth: {
      market: "+₹0.3 Cr",
      clients: "+₹0.2 Cr",
    },
  },
]

// Commission data for the Commission tab
const commissionData = [
  {
    name: "SBI Technology Fund",
    category: "Thematic",
    commission: 1.9,
    returns: 31.2,
    aum: "₹5,600 Cr",
  },
  {
    name: "SBI Small Cap Fund",
    category: "Small Cap",
    commission: 1.8,
    returns: 27.3,
    aum: "₹15,200 Cr",
  },
  {
    name: "Axis Small Cap Fund",
    category: "Small Cap",
    commission: 1.8,
    returns: 28.9,
    aum: "₹9,800 Cr",
  },
  {
    name: "Nippon India Small Cap",
    category: "Small Cap",
    commission: 1.7,
    returns: 26.5,
    aum: "₹14,500 Cr",
  },
  {
    name: "HDFC Small Cap Fund",
    category: "Small Cap",
    commission: 1.7,
    returns: 25.2,
    aum: "₹13,600 Cr",
  },
  {
    name: "Nippon India Consumption Fund",
    category: "Thematic",
    commission: 1.7,
    returns: 22.4,
    aum: "₹3,900 Cr",
  },
  {
    name: "ICICI Pru Pharma Healthcare",
    category: "Thematic",
    commission: 1.6,
    returns: 19.8,
    aum: "₹4,800 Cr",
  },
]

// Group funds by category
const fundsByCategory: Record<string, Fund[]> = {}
const categories = [...new Set(allFundsData.map((fund) => fund.category))]

// Initialize empty arrays for each category
categories.forEach((category) => {
  fundsByCategory[category] = []
})

// Add funds to their respective categories
allFundsData.forEach((fund) => {
  fundsByCategory[fund.category].push(fund)
})

// Top performers (just take the first 5 funds for now)
const topPerformers = [
  // Small Cap with highest returns
  allFundsData.find((fund) => fund.name === "Axis Small Cap Fund")!,
  allFundsData.find((fund) => fund.name === "SBI Technology Fund")!,
  allFundsData.find((fund) => fund.name === "SBI Small Cap Fund")!,
  allFundsData.find((fund) => fund.name === "Nippon India Small Cap")!,
  allFundsData.find((fund) => fund.name === "Kotak Emerging Equity")!,
]

interface TopFundsProps {
  data?: any[]
}

export function TopFunds({ data }: TopFundsProps) {
  // Use the provided data if available, otherwise use default values
  const fundsData = data || allFundsData

  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // Group funds by category
  const fundsByCategory: Record<string, Fund[]> = {}
  const categories = [...new Set(fundsData.map((fund: any) => fund.category))]

  // Initialize empty arrays for each category
  categories.forEach((category) => {
    fundsByCategory[category] = []
  })

  // Add funds to their respective categories
  fundsData.forEach((fund: any) => {
    fundsByCategory[fund.category].push(fund)
  })

  // Top performers (just take the first 5 funds for now)
  const topPerformers = [
    // Small Cap with highest returns
    fundsData.find((fund: any) => fund.name === "Axis Small Cap Fund")!,
    fundsData.find((fund: any) => fund.name === "SBI Technology Fund")!,
    fundsData.find((fund: any) => fund.name === "SBI Small Cap Fund")!,
    fundsData.find((fund: any) => fund.name === "Nippon India Small Cap")!,
    fundsData.find((fund: any) => fund.name === "Kotak Emerging Equity")!,
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#0496ff]">Top Funds</h2>
        </div>
        <Tabs defaultValue="xirr" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="xirr">By Performance</TabsTrigger>
            <TabsTrigger value="commission">Commission</TabsTrigger>
            <TabsTrigger value="aum">Your AUM</TabsTrigger>
          </TabsList>

          <TabsContent value="xirr" className="space-y-6">
            {/* Display top 5 funds overall */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-medium text-[#0496ff] border-b pb-1">Top Performers</h3>
              <div className="space-y-4">
                {topPerformers.map((fund, index) => (
                  <div key={`top-${index}`} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-[#0496ff]" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{fund.name}</h3>
                          <p className="text-xs text-muted-foreground">{fund.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-muted-foreground text-xs">AUM: {fund.aum}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <div className="flex flex-col items-center p-1.5">
                        <span className="text-xs text-muted-foreground">1Y</span>
                        <span className="text-sm font-medium text-green-600">{fund.returns.oneYear}%</span>
                      </div>
                      <div className="flex flex-col items-center p-1.5">
                        <span className="text-xs text-muted-foreground">3Y</span>
                        <span className="text-sm font-medium text-green-600">{fund.returns.threeYear}%</span>
                      </div>
                      <div className="flex flex-col items-center p-1.5">
                        <span className="text-xs text-muted-foreground">5Y</span>
                        <span className="text-sm font-medium text-green-600">{fund.returns.fiveYear}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Display collapsible categories */}
            {categories.map((category) => (
              <div key={category} className="space-y-4 border rounded-md p-3">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  <h3 className="text-sm font-medium text-[#0496ff]">{category}</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {expandedCategories[category] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {expandedCategories[category] && (
                  <div className="space-y-4 pt-2">
                    {fundsByCategory[category].map((fund, index) => (
                      <div key={`${category}-${index}`} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                              <TrendingUp className="h-5 w-5 text-[#0496ff]" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium">{fund.name}</h3>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-muted-foreground text-xs">AUM: {fund.aum}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div className="flex flex-col items-center p-1.5">
                            <span className="text-xs text-muted-foreground">1Y</span>
                            <span className="text-sm font-medium text-green-600">{fund.returns.oneYear}%</span>
                          </div>
                          <div className="flex flex-col items-center p-1.5">
                            <span className="text-xs text-muted-foreground">3Y</span>
                            <span className="text-sm font-medium text-green-600">{fund.returns.threeYear}%</span>
                          </div>
                          <div className="flex flex-col items-center p-1.5">
                            <span className="text-xs text-muted-foreground">5Y</span>
                            <span className="text-sm font-medium text-green-600">{fund.returns.fiveYear}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          {/* Commission Tab */}
          <TabsContent value="commission" className="space-y-6">
            <div className="space-y-6">
              {commissionData.map((item, index) => (
                <div key={`commission-${index}`} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                        <Percent className="h-5 w-5 text-[#0496ff]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">{item.commission}%</div>
                      <p className="text-xs text-muted-foreground">Commission</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline">{item.returns}% Return</Badge>
                    <span className="text-muted-foreground">AUM: {item.aum}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Updated AUM Tab with Growth Breakdown */}
          <TabsContent value="aum" className="space-y-6">
            <div className="space-y-6">
              {aumData.map((item, index) => (
                <div key={`aum-${index}`} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-[#0496ff]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{item.aum}</div>
                      <p className="text-xs text-muted-foreground">Your AUM</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline">{item.commission}% Commission</Badge>
                    <span className="text-muted-foreground">Return: {item.returns}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-green-600 font-medium">{item.growth.market}</span>
                      <span className="text-muted-foreground">(Market)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Users className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-blue-600 font-medium">{item.growth.clients}</span>
                      <span className="text-muted-foreground">(New Clients)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

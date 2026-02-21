"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  TrendingUp,
  BarChart3,
  PieChart,
  Briefcase,
  DollarSign,
  Building,
  ArrowUpRight,
  ArrowDownRight,
  SlidersHorizontal,
  MessageSquare,
} from "lucide-react"
import { InvestmentAIAssistant } from "@/components/investment-ai-assistant"

export default function ExploreInvestmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Research</h1>
          <p className="text-muted-foreground mt-1">
            Explore, compare, and analyze investment products across asset classes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <PieChart className="h-4 w-4 mr-2" />
            Compare
          </Button>
          <Button className="h-9">
            <Briefcase className="h-4 w-4 mr-2" />
            Model Portfolio
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                <TabsTrigger value="fixed-income">Fixed Income</TabsTrigger>
              </TabsList>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search investments..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Market Overview</CardTitle>
                    <CardDescription>Latest market trends and insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Nifty 50</p>
                            <p className="text-xs text-muted-foreground">NSE</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">22,456.80</p>
                          <div className="flex items-center gap-1 text-green-600">
                            <ArrowUpRight className="h-3 w-3" />
                            <p className="text-xs">+1.25%</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Building className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Sensex</p>
                            <p className="text-xs text-muted-foreground">BSE</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">73,890.25</p>
                          <div className="flex items-center gap-1 text-green-600">
                            <ArrowUpRight className="h-3 w-3" />
                            <p className="text-xs">+1.18%</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Bank Nifty</p>
                            <p className="text-xs text-muted-foreground">NSE</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">48,235.60</p>
                          <div className="flex items-center gap-1 text-red-600">
                            <ArrowDownRight className="h-3 w-3" />
                            <p className="text-xs">-0.32%</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Gold</p>
                            <p className="text-xs text-muted-foreground">MCX</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹62,450</p>
                          <div className="flex items-center gap-1 text-green-600">
                            <ArrowUpRight className="h-3 w-3" />
                            <p className="text-xs">+0.85%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Top Performing Categories</CardTitle>
                    <CardDescription>Best performing investment categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-600">MF</Badge>
                          <p className="text-sm font-medium">Small Cap Funds</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <p className="text-sm font-medium">+22.5%</p>
                            <p className="text-xs text-muted-foreground">1Y</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-600">MF</Badge>
                          <p className="text-sm font-medium">Mid Cap Funds</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <p className="text-sm font-medium">+19.8%</p>
                            <p className="text-xs text-muted-foreground">1Y</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">Stock</Badge>
                          <p className="text-sm font-medium">PSU Banks</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <p className="text-sm font-medium">+18.2%</p>
                            <p className="text-xs text-muted-foreground">1Y</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-600">PMS</Badge>
                          <p className="text-sm font-medium">Small & Mid Cap</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <p className="text-sm font-medium">+25.8%</p>
                            <p className="text-xs text-muted-foreground">3Y</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Featured Investment Insights</CardTitle>
                  <CardDescription>Latest research and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <Badge className="mb-2">New</Badge>
                      <h3 className="font-medium text-sm">Mid & Small Cap Outlook 2023-24</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Analysis of growth opportunities in the mid and small cap segment
                      </p>
                      <Button variant="link" className="px-0 h-auto text-xs mt-2">
                        Read more
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-sm">Fixed Income Strategy in Rising Rate Environment</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        How to position your debt portfolio in the current interest rate cycle
                      </p>
                      <Button variant="link" className="px-0 h-auto text-xs mt-2">
                        Read more
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-sm">PMS vs Mutual Funds: A Comparative Analysis</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Which investment vehicle is right for your portfolio?
                      </p>
                      <Button variant="link" className="px-0 h-auto text-xs mt-2">
                        Read more
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mutual-funds" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Mutual Fund Categories</CardTitle>
                  <CardDescription>Explore different types of mutual funds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <TrendingUp className="h-5 w-5 mb-2" />
                      <span>Equity</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <BarChart3 className="h-5 w-5 mb-2" />
                      <span>Debt</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <PieChart className="h-5 w-5 mb-2" />
                      <span>Hybrid</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <DollarSign className="h-5 w-5 mb-2" />
                      <span>Solution-oriented</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Performing Mutual Funds</CardTitle>
                  <CardDescription>Based on 3-year returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Kotak Emerging Equity</h3>
                          <p className="text-xs text-muted-foreground mt-1">Mid Cap | Kotak Mutual Fund</p>
                        </div>
                        <Badge>5★</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">3Y Return</p>
                          <p className="text-sm font-medium text-green-600">39.3%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">5Y Return</p>
                          <p className="text-sm font-medium text-green-600">28.4%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">AUM</p>
                          <p className="text-sm font-medium">₹18,700 Cr</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">SBI Small Cap Fund</h3>
                          <p className="text-xs text-muted-foreground mt-1">Small Cap | SBI Mutual Fund</p>
                        </div>
                        <Badge>5★</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">3Y Return</p>
                          <p className="text-sm font-medium text-green-600">31.2%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">5Y Return</p>
                          <p className="text-sm font-medium text-green-600">21.4%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">AUM</p>
                          <p className="text-sm font-medium">₹15,200 Cr</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stocks" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Stock Screener</CardTitle>
                  <CardDescription>Find stocks based on your criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <TrendingUp className="h-5 w-5 mb-2" />
                      <span>Growth Stocks</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <DollarSign className="h-5 w-5 mb-2" />
                      <span>Dividend Stocks</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <BarChart3 className="h-5 w-5 mb-2" />
                      <span>Value Stocks</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <PieChart className="h-5 w-5 mb-2" />
                      <span>Blue Chip</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Performing Stocks</CardTitle>
                  <CardDescription>Based on 1-year returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Tata Motors</h3>
                          <p className="text-xs text-muted-foreground mt-1">Automobile | Large Cap</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹520.80</p>
                          <div className="flex items-center gap-1 text-green-600 justify-end">
                            <ArrowUpRight className="h-3 w-3" />
                            <p className="text-xs">+45.8%</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">P/E Ratio</p>
                          <p className="text-sm font-medium">32.5</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Market Cap</p>
                          <p className="text-sm font-medium">₹1,75,000 Cr</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Div Yield</p>
                          <p className="text-sm font-medium">0.2%</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Coal India</h3>
                          <p className="text-xs text-muted-foreground mt-1">Mining | Large Cap</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹245.60</p>
                          <div className="flex items-center gap-1 text-green-600 justify-end">
                            <ArrowUpRight className="h-3 w-3" />
                            <p className="text-xs">+32.5%</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">P/E Ratio</p>
                          <p className="text-sm font-medium">8.2</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Market Cap</p>
                          <p className="text-sm font-medium">₹1,51,000 Cr</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Div Yield</p>
                          <p className="text-sm font-medium">8.2%</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alternatives" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Alternative Investments</CardTitle>
                  <CardDescription>Explore PMS, AIF, and other alternatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <Briefcase className="h-5 w-5 mb-2" />
                      <span>PMS</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <Building className="h-5 w-5 mb-2" />
                      <span>AIF</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <DollarSign className="h-5 w-5 mb-2" />
                      <span>REITs & InvITs</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Performing PMS</CardTitle>
                  <CardDescription>Based on 3-year returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Sundaram Emerging Leadership Fund</h3>
                          <p className="text-xs text-muted-foreground mt-1">Small & Mid Cap | Sundaram</p>
                        </div>
                        <Badge>High Risk</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">3Y Return</p>
                          <p className="text-sm font-medium text-green-600">25.8%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">5Y Return</p>
                          <p className="text-sm font-medium text-green-600">21.3%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Min Investment</p>
                          <p className="text-sm font-medium">₹25 Lakhs</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Marcellus Consistent Compounders</h3>
                          <p className="text-xs text-muted-foreground mt-1">Quality | Marcellus</p>
                        </div>
                        <Badge>Moderate Risk</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">3Y Return</p>
                          <p className="text-sm font-medium text-green-600">22.3%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">5Y Return</p>
                          <p className="text-sm font-medium text-green-600">19.8%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Min Investment</p>
                          <p className="text-sm font-medium">₹50 Lakhs</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fixed-income" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Fixed Income Options</CardTitle>
                  <CardDescription>Explore bonds, deposits, and other fixed income instruments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <Building className="h-5 w-5 mb-2" />
                      <span>Corporate Bonds</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <DollarSign className="h-5 w-5 mb-2" />
                      <span>Government Bonds</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <BarChart3 className="h-5 w-5 mb-2" />
                      <span>Fixed Deposits</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col">
                      <TrendingUp className="h-5 w-5 mb-2" />
                      <span>Tax-Free Bonds</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Fixed Income Options</CardTitle>
                  <CardDescription>Based on yield and safety</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Shriram Transport Finance NCD</h3>
                          <p className="text-xs text-muted-foreground mt-1">Corporate Bond | AA+</p>
                        </div>
                        <Badge>3 Years</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Coupon Rate</p>
                          <p className="text-sm font-medium text-green-600">9.1%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">YTM</p>
                          <p className="text-sm font-medium text-green-600">9.05%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Min Investment</p>
                          <p className="text-sm font-medium">₹10,000</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Bajaj Finance FD</h3>
                          <p className="text-xs text-muted-foreground mt-1">Corporate FD | FAAA</p>
                        </div>
                        <Badge>3 Years</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Interest Rate</p>
                          <p className="text-sm font-medium text-green-600">8.05%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Sr. Citizen Rate</p>
                          <p className="text-sm font-medium text-green-600">8.3%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Min Investment</p>
                          <p className="text-sm font-medium">₹25,000</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">ZinniAI Assistant</CardTitle>
                <Badge className="bg-[#0496ff]">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  AI
                </Badge>
              </div>
              <CardDescription>Your personal investment research assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentAIAssistant />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Investment Events</CardTitle>
              <CardDescription>Stay updated with latest events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <Badge className="mb-2">Tomorrow</Badge>
                  <h3 className="font-medium text-sm">RBI Monetary Policy Announcement</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    The RBI will announce its bi-monthly monetary policy decision
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <Badge className="mb-2" variant="outline">
                    May 25
                  </Badge>
                  <h3 className="font-medium text-sm">HDFC Bank Q1 Results</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    HDFC Bank will announce its Q1 FY24 financial results
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <Badge className="mb-2" variant="outline">
                    June 5
                  </Badge>
                  <h3 className="font-medium text-sm">SBI Healthcare Opportunities Fund NFO</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    SBI Mutual Fund launches its new healthcare sector fund
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

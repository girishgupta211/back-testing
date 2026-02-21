"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, TrendingDown } from "lucide-react"

interface ClientInsightsProps {
  filter?: string
  data?: any[]
}

export function ClientInsights({ filter = "all", data }: ClientInsightsProps) {
  // Use the provided data if available, otherwise use the default data
  // const clientsAtRisk = data && filter === "at-risk" ? data : defaultClientsAtRisk;
  // const clientsNeedingUpdates = data && filter === "updates" ? data : defaultClientsNeedingUpdates;
  // const clientsNeedingRebalancing = data && filter === "rebalancing" ? data : defaultClientsNeedingRebalancing;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Client Insights</h2>
          <p className="text-sm text-muted-foreground">Analytics and trends about your client base</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185</div>
            <div className="flex items-center text-xs text-[#0496ff]">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+15 from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. AUM per Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹20.5L</div>
            <div className="flex items-center text-xs text-[#0496ff]">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Client Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97%</div>
            <div className="flex items-center text-xs text-[#0496ff]">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1.02L</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>-3.5% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Demographics</CardTitle>
            <CardDescription>Age and income distribution of clients</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="age">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="age">Age Distribution</TabsTrigger>
                <TabsTrigger value="income">Income Distribution</TabsTrigger>
              </TabsList>
              <TabsContent value="age" className="h-[300px] pt-4">
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-48 h-48 rounded-full border-8 border-primary relative">
                    <div
                      className="absolute inset-0 bg-blue-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 50% 0%, 70% 0%, 85% 15%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-green-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 85% 15%, 100% 50%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-amber-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 100% 50%, 85% 85%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-purple-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 85% 85%, 50% 100%, 15% 85%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-pink-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 15% 85%, 0% 50%, 15% 15%, 50% 0%)" }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>18-25: 5%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>26-35: 25%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span>36-45: 35%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>46-55: 20%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span>56+: 15%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="income" className="h-[300px] pt-4">
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-48 h-48 rounded-full border-8 border-primary relative">
                    <div
                      className="absolute inset-0 bg-blue-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 50% 0%, 60% 0%, 65% 10%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-green-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 65% 10%, 100% 30%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-amber-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 100% 30%, 85% 85%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-purple-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 85% 85%, 30% 100%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-pink-500 rounded-full"
                      style={{ clipPath: "polygon(50% 50%, 30% 100%, 0% 50%, 30% 0%, 50% 0%)" }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>&lt;5L: 10%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>5L-10L: 25%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span>10L-15L: 30%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>15L-25L: 20%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span>&gt;25L: 15%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investment Preferences</CardTitle>
            <CardDescription>Asset allocation preferences of clients</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="w-48 h-48 rounded-full border-8 border-primary relative">
                <div
                  className="absolute inset-0 bg-blue-500 rounded-full"
                  style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)" }}
                ></div>
                <div
                  className="absolute inset-0 bg-green-500 rounded-full"
                  style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 70% 100%)" }}
                ></div>
                <div
                  className="absolute inset-0 bg-amber-500 rounded-full"
                  style={{ clipPath: "polygon(50% 50%, 70% 100%, 30% 100%)" }}
                ></div>
                <div
                  className="absolute inset-0 bg-purple-500 rounded-full"
                  style={{ clipPath: "polygon(50% 50%, 30% 100%, 0% 100%, 0% 0%, 50% 0%)" }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Equity: 45%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Debt: 30%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span>Hybrid: 15%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Others: 10%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Acquisition</CardTitle>
          <CardDescription>Trends in how clients are acquired</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="w-full space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Organic</span>
                  </div>
                  <span>42%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "42%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Referral</span>
                  </div>
                  <span>35%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "35%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span>Social Media</span>
                  </div>
                  <span>15%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: "15%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Events</span>
                  </div>
                  <span>5%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: "5%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span>Other</span>
                  </div>
                  <span>3%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500" style={{ width: "3%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Retention Rate</CardTitle>
          <CardDescription>Monthly client retention rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="w-full space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>January</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "92%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>February</span>
                  <span className="font-medium">93%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "93%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>March</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "95%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>April</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "94%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>May</span>
                  <span className="font-medium">96%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "96%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>June</span>
                  <span className="font-medium">97%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "97%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PieChart, BarChart, LineChart, Calendar, ArrowRight, FileText } from "lucide-react"

export default function ClientDetailPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rahul Sharma</h1>
          <p className="text-sm text-muted-foreground">High-value client since 2018</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="portfolio">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹42,50,000</div>
                <p className="text-xs text-green-500">+15% from last year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹58,75,000</div>
                <p className="text-xs text-green-500">+38.2% overall returns</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Risk Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Moderate</div>
                <p className="text-xs text-amber-500">Portfolio slightly aggressive</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Current portfolio allocation by asset class</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <div className="h-64 w-64 relative flex items-center justify-center">
                <PieChart className="h-full w-full text-muted-foreground" />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-2xl font-bold">₹58.75L</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>Equity allocation by sector</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <BarChart className="h-64 w-full text-muted-foreground" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Portfolio value over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <LineChart className="h-64 w-full text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Tracking progress towards financial objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Retirement</h3>
                    <span className="text-sm text-amber-500">Off Track</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Target: ₹2 Cr by 2038 (15 years)</p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Current: ₹32.5L</span>
                    <span className="text-xs text-muted-foreground">Target: ₹2 Cr</span>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="text-xs">
                      Adjust Plan <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Child's Education</h3>
                    <span className="text-sm text-green-500">On Track</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Target: ₹50L by 2028 (5 years)</p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Current: ₹18.5L</span>
                    <span className="text-xs text-muted-foreground">Target: ₹50L</span>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest investment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">SIP Investment</h3>
                    <span className="text-sm">₹25,000</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">HDFC Mid-Cap Opportunities Fund</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">October 5, 2023</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Lump Sum Investment</h3>
                    <span className="text-sm">₹2,00,000</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Axis Bluechip Fund</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">September 18, 2023</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">SIP Investment</h3>
                    <span className="text-sm">₹25,000</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">HDFC Mid-Cap Opportunities Fund</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">September 5, 2023</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Documents</CardTitle>
              <CardDescription>Important files and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">KYC Documents</h3>
                      <p className="text-sm text-muted-foreground mt-1">Last updated: June 15, 2023</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto text-xs">
                      View
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Risk Assessment Form</h3>
                      <p className="text-sm text-muted-foreground mt-1">Last updated: August 10, 2023</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto text-xs">
                      View
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Investment Policy Statement</h3>
                      <p className="text-sm text-muted-foreground mt-1">Last updated: July 22, 2023</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto text-xs">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

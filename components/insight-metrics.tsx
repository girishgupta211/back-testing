"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowUpRight, Download } from "lucide-react"

const commissionData = [
  { month: "Jan", commission: 2.1, target: 2.0 },
  { month: "Feb", commission: 2.3, target: 2.1 },
  { month: "Mar", commission: 2.2, target: 2.2 },
  { month: "Apr", commission: 2.4, target: 2.3 },
  { month: "May", commission: 2.6, target: 2.4 },
  { month: "Jun", commission: 2.8, target: 2.5 },
  { month: "Jul", commission: 2.9, target: 2.6 },
  { month: "Aug", commission: 3.0, target: 2.7 },
  { month: "Sep", commission: 3.2, target: 2.8 },
  { month: "Oct", commission: 3.3, target: 2.9 },
  { month: "Nov", commission: 3.5, target: 3.0 },
  { month: "Dec", commission: 3.7, target: 3.1 },
]

export function InsightMetrics() {
  const [period, setPeriod] = useState("year")

  return (
    <Card className="shadow-sharp">
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle className="tracking-tight">Business Insights</CardTitle>
          <CardDescription>Overview of your business metrics</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="commission">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="commission" className="text-xs font-medium">
              Commission
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-xs font-medium">
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="commission" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-sharp">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium tracking-tight">Commission Growth</CardTitle>
                  <CardDescription>Monthly commission earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={commissionData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fontFamily: "Inter" }}
                        />
                        <YAxis
                          tickFormatter={(value) => `₹${value}L`}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fontFamily: "Inter" }}
                        />
                        <Tooltip
                          formatter={(value) => [`₹${value}L`, ""]}
                          contentStyle={{
                            borderRadius: "4px",
                            border: "none",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
                            background: "#1a1a1a",
                            color: "#ffffff",
                            fontFamily: "Inter",
                          }}
                        />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontFamily: "Inter", fontSize: 12 }} />
                        <Bar dataKey="commission" name="Commission" fill="#0496ff" radius={[4, 4, 0, 0]} barSize={24} />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target"
                          stroke="#FF8042"
                          strokeWidth={2.5}
                          dot={false}
                          strokeDasharray="5 5"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="shadow-sharp">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium tracking-tight">Commission by Category</CardTitle>
                    <CardDescription>Distribution across asset classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "Equity", value: 45 },
                            { name: "Debt", value: 25 },
                            { name: "Hybrid", value: 20 },
                            { name: "Other", value: 10 },
                          ]}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={true}
                            vertical={false}
                            stroke="rgba(255,255,255,0.1)"
                          />
                          <XAxis
                            type="number"
                            tickFormatter={(value) => `${value}%`}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fontFamily: "Inter" }}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            width={100}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fontFamily: "Inter" }}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, ""]}
                            contentStyle={{
                              borderRadius: "4px",
                              border: "none",
                              boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
                              background: "#1a1a1a",
                              color: "#ffffff",
                              fontFamily: "Inter",
                            }}
                          />
                          <Bar dataKey="value" name="Commission %" fill="#0496ff" radius={[0, 4, 4, 0]} barSize={24} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sharp">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium tracking-tight">Commission by Client Segment</CardTitle>
                    <CardDescription>Distribution across client types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "HNI", value: 75 },
                            { name: "Affluent", value: 66 },
                            { name: "Mass Affluent", value: 38 },
                            { name: "Retail", value: 9 },
                          ]}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={true}
                            vertical={false}
                            stroke="rgba(255,255,255,0.1)"
                          />
                          <XAxis
                            type="number"
                            tickFormatter={(value) => `${value}%`}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fontFamily: "Inter" }}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            width={100}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fontFamily: "Inter" }}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, ""]}
                            contentStyle={{
                              borderRadius: "4px",
                              border: "none",
                              boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
                              background: "#1a1a1a",
                              color: "#ffffff",
                              fontFamily: "Inter",
                            }}
                          />
                          <Bar dataKey="value" name="Commission %" fill="#0496ff" radius={[0, 4, 4, 0]} barSize={24} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sharp">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">₹38.5L</h3>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        85.6%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sharp">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">Total AUM</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">₹12.8Cr</h3>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        68.4%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sharp">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">1,245</h3>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        112.8%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card className="shadow-sharp">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium tracking-tight">Revenue & AUM Growth</CardTitle>
                  <CardDescription>Quarterly performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Q1", revenue: 780000, aum: 62000000 },
                          { name: "Q2", revenue: 920000, aum: 78000000 },
                          { name: "Q3", revenue: 1250000, aum: 98000000 },
                          { name: "Q4", revenue: 1900000, aum: 128000000 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue (₹)" />
                        <Bar yAxisId="right" dataKey="aum" fill="#82ca9d" name="AUM (₹)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

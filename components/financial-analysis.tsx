"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for financial analysis
const performanceData = [
  { month: "Jan", returns: 2.4, benchmark: 1.8 },
  { month: "Feb", returns: -0.8, benchmark: -1.2 },
  { month: "Mar", returns: 3.2, benchmark: 2.5 },
  { month: "Apr", returns: 1.8, benchmark: 1.6 },
  { month: "May", returns: -1.2, benchmark: -0.9 },
  { month: "Jun", returns: 4.5, benchmark: 3.2 },
  { month: "Jul", returns: 2.1, benchmark: 1.7 },
  { month: "Aug", returns: 0.5, benchmark: 0.3 },
  { month: "Sep", returns: -0.3, benchmark: -0.5 },
  { month: "Oct", returns: 3.7, benchmark: 2.8 },
  { month: "Nov", returns: 1.9, benchmark: 1.5 },
  { month: "Dec", returns: 2.8, benchmark: 2.2 },
]

const sectorData = [
  { name: "Technology", allocation: 28 },
  { name: "Financial", allocation: 22 },
  { name: "Healthcare", allocation: 15 },
  { name: "Consumer", allocation: 12 },
  { name: "Industrial", allocation: 10 },
  { name: "Energy", allocation: 8 },
  { name: "Others", allocation: 5 },
]

const riskMetrics = [
  { metric: "Alpha", value: "1.8%", description: "Excess return relative to benchmark" },
  { metric: "Beta", value: "0.92", description: "Volatility relative to market" },
  { metric: "Sharpe Ratio", value: "1.24", description: "Risk-adjusted return" },
  { metric: "Max Drawdown", value: "-8.3%", description: "Largest peak-to-trough decline" },
  { metric: "Volatility", value: "12.7%", description: "Standard deviation of returns" },
]

export function FinancialAnalysis() {
  const [timeframe, setTimeframe] = useState("1y")
  const [analysisType, setAnalysisType] = useState("performance")

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Financial Analysis</CardTitle>
            <CardDescription>Comprehensive analysis of portfolio performance and metrics</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="3y">3 Years</SelectItem>
                <SelectItem value="5y">5 Years</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" className="w-full" onValueChange={setAnalysisType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="pt-4">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, "Return"]} />
                  <Legend />
                  <Line type="monotone" dataKey="returns" stroke="#8884d8" name="Portfolio" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="benchmark" stroke="#82ca9d" name="Benchmark" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Total Return</div>
                  <div className="text-2xl font-bold text-green-600">+18.6%</div>
                  <div className="text-xs text-muted-foreground">vs. +14.2% benchmark</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Annualized Return</div>
                  <div className="text-2xl font-bold">15.2%</div>
                  <div className="text-xs text-muted-foreground">Last 3 years</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Outperformance</div>
                  <div className="text-2xl font-bold text-green-600">+4.4%</div>
                  <div className="text-xs text-muted-foreground">vs. category average</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="allocation" className="pt-4">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                  <Bar dataKey="allocation" fill="#8884d8" name="Sector Allocation" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium">Allocation Insights</div>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>Technology sector is overweight by 5.2% compared to benchmark</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">•</span>
                      <span>Financial sector allocation is in line with market</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>Energy sector is underweight by 3.1% compared to benchmark</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Diversification score: 8.4/10 (well diversified)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="risk" className="pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium mb-4">Key Risk Metrics</div>
                  <div className="space-y-4">
                    {riskMetrics.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.metric}</span>
                          <span className="font-bold">{item.value}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium mb-4">Risk Assessment</div>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm">Overall Risk Level</span>
                        <span className="text-sm font-medium text-amber-600">Moderate</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[60%] rounded-full bg-amber-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        <span>Lower volatility than benchmark</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        <span>Strong risk-adjusted returns (Sharpe ratio)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Moderate drawdown risk</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Some concentration risk in technology sector</span>
                      </div>
                    </div>
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

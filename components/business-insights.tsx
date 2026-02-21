"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUpRight, TrendingUp, Users, PieChartIcon, CalendarIcon } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
} from "recharts"

// Sample data for AUM by period
const aumDataByPeriod = {
  month: {
    currentValue: 188,
    previousValue: 180,
    growthPercent: 4.4,
    growthValue: 8,
    comparisonPeriod: "November",
    data: [
      { day: "1", aum: 180, target: 180 },
      { day: "5", aum: 182, target: 181 },
      { day: "10", aum: 183, target: 182 },
      { day: "15", aum: 184, target: 183 },
      { day: "20", aum: 186, target: 184 },
      { day: "25", aum: 187, target: 185 },
      { day: "30", aum: 188, target: 186 },
    ],
    breakdown: [
      {
        day: "1",
        baseAUM: 180,
        marketGrowth: 0,
        newInvestments: 0,
        total: 180,
      },
      {
        day: "5",
        baseAUM: 180,
        marketGrowth: 1.5,
        newInvestments: 0.5,
        total: 182,
      },
      {
        day: "10",
        baseAUM: 182,
        marketGrowth: 0.5,
        newInvestments: 0.5,
        total: 183,
      },
      {
        day: "15",
        baseAUM: 183,
        marketGrowth: 0.5,
        newInvestments: 0.5,
        total: 184,
      },
      {
        day: "20",
        baseAUM: 184,
        marketGrowth: 1.5,
        newInvestments: 0.5,
        total: 186,
      },
      {
        day: "25",
        baseAUM: 186,
        marketGrowth: 0.5,
        newInvestments: 0.5,
        total: 187,
      },
      {
        day: "30",
        baseAUM: 187,
        marketGrowth: 0.5,
        newInvestments: 0.5,
        total: 188,
      },
    ],
    summary: {
      startingAUM: 180,
      marketGrowth: 5,
      newInvestments: 3,
      currentAUM: 188,
    },
  },
  quarter: {
    currentValue: 188,
    previousValue: 168,
    growthPercent: 11.9,
    growthValue: 20,
    comparisonPeriod: "Q3",
    data: [
      { month: "Oct", aum: 172, target: 170 },
      { month: "Nov", aum: 180, target: 175 },
      { month: "Dec", aum: 188, target: 180 },
    ],
    breakdown: [
      {
        month: "Oct",
        baseAUM: 168,
        marketGrowth: 3,
        newInvestments: 1,
        total: 172,
      },
      {
        month: "Nov",
        baseAUM: 172,
        marketGrowth: 5,
        newInvestments: 3,
        total: 180,
      },
      {
        month: "Dec",
        baseAUM: 180,
        marketGrowth: 6,
        newInvestments: 2,
        total: 188,
      },
    ],
    summary: {
      startingAUM: 168,
      marketGrowth: 14,
      newInvestments: 6,
      currentAUM: 188,
    },
  },
  year: {
    currentValue: 188,
    previousValue: 120,
    growthPercent: 56.7,
    growthValue: 68,
    comparisonPeriod: "last year",
    data: [
      { month: "Jan", aum: 125, target: 120 },
      { month: "Feb", aum: 132, target: 125 },
      { month: "Mar", aum: 130, target: 130 },
      { month: "Apr", aum: 137, target: 135 },
      { month: "May", aum: 145, target: 140 },
      { month: "Jun", aum: 152, target: 145 },
      { month: "Jul", aum: 158, target: 150 },
      { month: "Aug", aum: 162, target: 155 },
      { month: "Sep", aum: 168, target: 160 },
      { month: "Oct", aum: 172, target: 165 },
      { month: "Nov", aum: 180, target: 170 },
      { month: "Dec", aum: 188, target: 175 },
    ],
    breakdown: [
      {
        month: "Jan",
        baseAUM: 120,
        marketGrowth: 3,
        newInvestments: 2,
        total: 125,
      },
      {
        month: "Feb",
        baseAUM: 125,
        marketGrowth: 5,
        newInvestments: 2,
        total: 132,
      },
      {
        month: "Mar",
        baseAUM: 132,
        marketGrowth: -3,
        newInvestments: 1,
        total: 130,
      },
      {
        month: "Apr",
        baseAUM: 130,
        marketGrowth: 4,
        newInvestments: 3,
        total: 137,
      },
      {
        month: "May",
        baseAUM: 137,
        marketGrowth: 6,
        newInvestments: 2,
        total: 145,
      },
      {
        month: "Jun",
        baseAUM: 145,
        marketGrowth: 4,
        newInvestments: 3,
        total: 152,
      },
      {
        month: "Jul",
        baseAUM: 152,
        marketGrowth: 3,
        newInvestments: 3,
        total: 158,
      },
      {
        month: "Aug",
        baseAUM: 158,
        marketGrowth: 2,
        newInvestments: 2,
        total: 162,
      },
      {
        month: "Sep",
        baseAUM: 162,
        marketGrowth: 4,
        newInvestments: 2,
        total: 168,
      },
      {
        month: "Oct",
        baseAUM: 168,
        marketGrowth: 3,
        newInvestments: 1,
        total: 172,
      },
      {
        month: "Nov",
        baseAUM: 172,
        marketGrowth: 5,
        newInvestments: 3,
        total: 180,
      },
      {
        month: "Dec",
        baseAUM: 180,
        marketGrowth: 6,
        newInvestments: 2,
        total: 188,
      },
    ],
    summary: {
      startingAUM: 120,
      marketGrowth: 42,
      newInvestments: 26,
      currentAUM: 188,
    },
  },
  all: {
    currentValue: 188,
    previousValue: 50,
    growthPercent: 276.0,
    growthValue: 138,
    comparisonPeriod: "initial investment",
    data: [
      { year: "2018", aum: 50, target: 50 },
      { year: "2019", aum: 68, target: 65 },
      { year: "2020", aum: 85, target: 80 },
      { year: "2021", aum: 110, target: 100 },
      { year: "2022", aum: 145, target: 130 },
      { year: "2023", aum: 188, target: 160 },
    ],
    breakdown: [
      {
        year: "2018",
        baseAUM: 0,
        marketGrowth: 0,
        newInvestments: 50,
        total: 50,
      },
      {
        year: "2019",
        baseAUM: 50,
        marketGrowth: 8,
        newInvestments: 10,
        total: 68,
      },
      {
        year: "2020",
        baseAUM: 68,
        marketGrowth: 7,
        newInvestments: 10,
        total: 85,
      },
      {
        year: "2021",
        baseAUM: 85,
        marketGrowth: 15,
        newInvestments: 10,
        total: 110,
      },
      {
        year: "2022",
        baseAUM: 110,
        marketGrowth: 25,
        newInvestments: 10,
        total: 145,
      },
      {
        year: "2023",
        baseAUM: 145,
        marketGrowth: 33,
        newInvestments: 10,
        total: 188,
      },
    ],
    summary: {
      startingAUM: 50,
      marketGrowth: 88,
      newInvestments: 50,
      currentAUM: 188,
    },
  },
}

const aumCategoryData = [
  { name: "Equity", value: 45 },
  { name: "Debt", value: 30 },
  { name: "Hybrid", value: 15 },
  { name: "Others", value: 10 },
]

const aumClientSegmentData = [
  { name: "HNI", value: 75 },
  { name: "Affluent", value: 66 },
  { name: "Mass Affluent", value: 38 },
  { name: "Retail", value: 9 },
]

// Client data by period
const clientDataByPeriod = {
  month: {
    totalClients: 221,
    activeClients: 202,
    inactiveClients: 19,
    activeGrowth: 3.1,
    totalGrowth: 2.8,
    inactiveGrowth: 2,
    data: [
      { day: "1", active: 196, inactive: 19, new: 0 },
      { day: "5", active: 197, inactive: 19, new: 1 },
      { day: "10", active: 198, inactive: 19, new: 1 },
      { day: "15", active: 199, inactive: 19, new: 1 },
      { day: "20", active: 200, inactive: 19, new: 1 },
      { day: "25", active: 201, inactive: 19, new: 1 },
      { day: "30", active: 202, inactive: 19, new: 1 },
    ],
    insights: [
      {
        title: "New Client Acquisition",
        description: "You've acquired 6 new clients this month, a 20% increase from last month.",
        type: "positive",
      },
      {
        title: "Inactive Clients Stable",
        description: "No increase in inactive clients this month. Your retention strategies are working.",
        type: "positive",
      },
      {
        title: "Client Engagement Up",
        description: "Client portal logins increased by 15% this month, indicating higher engagement.",
        type: "positive",
      },
    ],
  },
  quarter: {
    totalClients: 221,
    activeClients: 202,
    inactiveClients: 19,
    activeGrowth: 6.3,
    totalGrowth: 5.7,
    inactiveGrowth: 3,
    data: [
      { month: "Oct", active: 190, inactive: 17, new: 4 },
      { month: "Nov", active: 196, inactive: 18, new: 5 },
      { month: "Dec", active: 202, inactive: 19, new: 6 },
    ],
    insights: [
      {
        title: "Client Retention Rate Improving",
        description:
          "Your client retention rate has improved by 5% in the last quarter, indicating stronger client relationships.",
        type: "positive",
      },
      {
        title: "Inactive Clients Increasing",
        description:
          "3 clients became inactive this quarter. Consider reaching out with personalized investment opportunities.",
        type: "warning",
      },
      {
        title: "HNI Client Acquisition",
        description: "You've acquired 3 new HNI clients this quarter, contributing to 8% AUM growth.",
        type: "positive",
      },
    ],
  },
  year: {
    totalClients: 221,
    activeClients: 202,
    inactiveClients: 19,
    activeGrowth: 32.9,
    totalGrowth: 27.7,
    inactiveGrowth: 11,
    data: [
      { month: "Jan", active: 152, inactive: 8, new: 5 },
      { month: "Feb", active: 155, inactive: 9, new: 6 },
      { month: "Mar", active: 158, inactive: 10, new: 8 },
      { month: "Apr", active: 162, inactive: 11, new: 7 },
      { month: "May", active: 166, inactive: 12, new: 9 },
      { month: "Jun", active: 170, inactive: 13, new: 10 },
      { month: "Jul", active: 175, inactive: 14, new: 12 },
      { month: "Aug", active: 180, inactive: 15, new: 11 },
      { month: "Sep", active: 185, inactive: 16, new: 13 },
      { month: "Oct", active: 190, inactive: 17, new: 14 },
      { month: "Nov", active: 196, inactive: 18, new: 15 },
      { month: "Dec", active: 202, inactive: 19, new: 16 },
    ],
    insights: [
      {
        title: "Client Retention Rate Improving",
        description:
          "Your client retention rate has improved by 5% in the last quarter, indicating stronger client relationships.",
        type: "positive",
      },
      {
        title: "Inactive Clients Increasing",
        description:
          "8 clients haven't made any transactions in the last 90 days. Consider reaching out with personalized investment opportunities.",
        type: "warning",
      },
      {
        title: "HNI Client Acquisition",
        description: "You've acquired 3 new HNI clients in the last month, contributing to 15% AUM growth.",
        type: "positive",
      },
    ],
  },
  all: {
    totalClients: 221,
    activeClients: 202,
    inactiveClients: 19,
    activeGrowth: 202,
    totalGrowth: 221,
    inactiveGrowth: 19,
    data: [
      { year: "2018", active: 0, inactive: 0, new: 25 },
      { year: "2019", active: 35, inactive: 5, new: 40 },
      { year: "2020", active: 70, inactive: 8, new: 43 },
      { year: "2021", active: 110, inactive: 10, new: 50 },
      { year: "2022", active: 155, inactive: 15, new: 60 },
      { year: "2023", active: 202, inactive: 19, new: 66 },
    ],
    insights: [
      {
        title: "Consistent Growth",
        description: "You've maintained a consistent client growth rate of 30% year over year since inception.",
        type: "positive",
      },
      {
        title: "Retention Improvement",
        description:
          "Your client retention has improved from 80% in 2018 to 91% in 2023, outperforming industry averages.",
        type: "positive",
      },
      {
        title: "Client Segment Shift",
        description:
          "Your client base has shifted from 10% HNI in 2018 to 35% HNI in 2023, indicating successful upmarket movement.",
        type: "positive",
      },
    ],
  },
}

// Sample data for commission opportunity
const opportunityData = [
  { name: "Current", value: 125000 },
  { name: "Potential", value: 187500 },
]

// Sample data for commission growth
const growthData = [
  { month: "Jan", commission: 42000 },
  { month: "Feb", commission: 45000 },
  { month: "Mar", commission: 48000 },
  { month: "Apr", commission: 51000 },
  { month: "May", commission: 53000 },
  { month: "Jun", commission: 58000 },
  { month: "Jul", commission: 61000 },
  { month: "Aug", commission: 65000 },
  { month: "Sep", commission: 68000 },
  { month: "Oct", commission: 72000 },
  { month: "Nov", commission: 76000 },
  { month: "Dec", commission: 82000 },
]

// Sample data for commission by category
const categoryData = [
  { name: "Equity", value: 45 },
  { name: "Debt", value: 25 },
  { name: "Hybrid", value: 20 },
  { name: "Other", value: 10 },
]

// Colors for category chart
const CATEGORY_COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b"]

// Sample data for commission by client segment
const segmentData = [
  { name: "HNI", value: 125000 },
  { name: "Affluent", value: 85000 },
  { name: "Mass Affluent", value: 45000 },
  { name: "Retail", value: 25000 },
]

// Colors for segment chart
const SEGMENT_COLORS = ["#ef4444", "#f97316", "#3b82f6", "#8b5cf6"]

// Client data
const clientList = [
  {
    id: "c1",
    name: "Rahul Sharma",
    aum: 4500000,
    risk: "Medium",
    status: "Active",
    lastUpdate: "15 days ago",
    dob: "12/05/1980",
    anniversary: "22/11/2005",
    riskProfile: "Moderate",
    acquisitionDate: "10/01/2020",
    goals: [
      { name: "Retirement", onTrack: true },
      { name: "Child's Education", onTrack: false },
    ],
  },
  {
    id: "c2",
    name: "Priya Patel",
    aum: 7800000,
    risk: "Low",
    status: "Active",
    lastUpdate: "7 days ago",
    dob: "03/08/1975",
    anniversary: "15/02/2000",
    riskProfile: "Conservative",
    acquisitionDate: "05/03/2019",
    goals: [
      { name: "Retirement", onTrack: true },
      { name: "Home Purchase", onTrack: true },
    ],
  },
  {
    id: "c3",
    name: "Amit Singh",
    aum: 12500000,
    risk: "High",
    status: "Active",
    lastUpdate: "2 days ago",
    dob: "25/11/1972",
    anniversary: "18/04/1998",
    riskProfile: "Aggressive",
    acquisitionDate: "12/07/2018",
    goals: [
      { name: "Retirement", onTrack: true },
      { name: "Child's Education", onTrack: true },
      { name: "Vacation Home", onTrack: false },
    ],
  },
  {
    id: "c4",
    name: "Neha Gupta",
    aum: 3200000,
    risk: "Medium",
    status: "Inactive",
    lastUpdate: "45 days ago",
    dob: "17/03/1985",
    anniversary: "09/12/2010",
    riskProfile: "Moderate",
    acquisitionDate: "20/09/2021",
    goals: [
      { name: "Retirement", onTrack: false },
      { name: "Car Purchase", onTrack: false },
    ],
  },
  {
    id: "c5",
    name: "Vikram Malhotra",
    aum: 9500000,
    risk: "Low",
    status: "Active",
    lastUpdate: "10 days ago",
    dob: "30/06/1970",
    anniversary: "22/05/1995",
    riskProfile: "Conservative",
    acquisitionDate: "15/04/2017",
    goals: [
      { name: "Retirement", onTrack: true },
      { name: "Child's Marriage", onTrack: true },
    ],
  },
  {
    id: "c6",
    name: "Anjali Desai",
    aum: 6800000,
    risk: "High",
    status: "Inactive",
    lastUpdate: "60 days ago",
    dob: "14/09/1978",
    anniversary: "03/03/2002",
    riskProfile: "Aggressive",
    acquisitionDate: "08/11/2019",
    goals: [
      { name: "Retirement", onTrack: false },
      { name: "Business Expansion", onTrack: false },
    ],
  },
]

// Colors for the pie charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

// Commission projections by period
const commissionProjections = {
  month: {
    current: 82000,
    projected: 88000,
    growth: 7.3,
    ytd: 721000,
  },
  quarter: {
    current: 226000,
    projected: 245000,
    growth: 8.4,
    ytd: 721000,
  },
  year: {
    current: 721000,
    projected: 850000,
    growth: 17.9,
    ytd: 721000,
  },
  all: {
    current: 1850000,
    projected: 2100000,
    growth: 13.5,
    ytd: 721000,
  },
}

interface BusinessInsightsProps {
  data?: any
}

export function BusinessInsights({ data }: BusinessInsightsProps) {
  // Use the provided data if available, otherwise use default values
  const businessMetrics = data || {
    totalAUM: 432000000,
    totalSIP: 8500000,
    monthlyCommission: 1750000,
    yearlyCommission: 21000000,
    aumGrowth: 12.5,
    clientGrowth: 8.2,
    revenueGrowth: 15.3,
    totalClients: 47,
    activeClients: 42,
    inactiveClients: 5,
  }
  const router = useRouter()
  const [period, setPeriod] = useState("year")

  // Get data for the selected period
  const aumData = aumDataByPeriod[period]
  const clientData = clientDataByPeriod[period]
  const commissionData = commissionProjections[period]

  // Calculate total commission for the growth chart
  const totalCommissionForPeriod = growthData.reduce((sum, item) => sum + item.commission, 0)

  // Get the appropriate label for the time unit based on the period
  const getTimeLabel = () => {
    switch (period) {
      case "month":
        return "day"
      case "quarter":
      case "year":
        return "month"
      case "all":
        return "year"
      default:
        return "month"
    }
  }

  return (
    <Card className="shadow-sharp">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Business Insights</h2>
              <p className="text-muted-foreground">Overview of your clients and business performance</p>
            </div>
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
          </div>

          <Tabs defaultValue="aum" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="aum">AUM</TabsTrigger>
              <TabsTrigger value="commissions">Commissions</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
            </TabsList>

            {/* CLIENTS TAB */}
            <TabsContent value="clients" className="space-y-6">
              {/* Clients Overview Card */}
              <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        Client Overview for{" "}
                        {period === "month"
                          ? "This Month"
                          : period === "quarter"
                            ? "This Quarter"
                            : period === "year"
                              ? "This Year"
                              : "All Time"}
                      </h3>
                      <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Clients</p>
                        <h2 className="text-2xl font-semibold">{clientData.totalClients}</h2>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Active Clients</p>
                        <h2 className="text-2xl font-semibold text-emerald-400">{clientData.activeClients}</h2>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Inactive Clients</p>
                        <h2 className="text-2xl font-semibold text-amber-400">{clientData.inactiveClients}</h2>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1: Client Growth */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Client Growth</h3>
                        <div className="h-8 w-8 rounded-full bg-emerald-900/30 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-emerald-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">+{clientData.activeGrowth}%</h2>
                        <p className="text-sm text-emerald-400 font-medium mt-1">Active client growth</p>
                      </div>

                      <div className="h-[120px] -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={clientData.data} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey={getTimeLabel()}
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 0 }}
                              height={0}
                            />
                            <YAxis hide={true} axisLine={false} tickLine={false} />
                            <Tooltip
                              formatter={(value) => [`${value} clients`, ""]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="active"
                              stroke="#10b981"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#colorActive)"
                            />
                            <Line
                              type="monotone"
                              dataKey="active"
                              stroke="#10b981"
                              strokeWidth={2}
                              dot={false}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              animationDuration={1500}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          Your active client base has grown {clientData.activeGrowth}% from{" "}
                          {period === "month"
                            ? "last month"
                            : period === "quarter"
                              ? "last quarter"
                              : period === "year"
                                ? "last year"
                                : "inception"}
                          .
                        </div>
                        <div className="text-xs font-medium">Total Growth: +{clientData.totalGrowth}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: New Client Acquisition */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">New Clients</h3>
                        <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">
                          {period === "month" ? 6 : period === "quarter" ? 15 : period === "year" ? 66 : 221}
                        </h2>
                        <p className="text-sm text-blue-400 font-medium mt-1">New acquisitions</p>
                      </div>

                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={clientData.data} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                            <XAxis
                              dataKey={getTimeLabel()}
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 0 }}
                              height={0}
                            />
                            <YAxis hide={true} axisLine={false} tickLine={false} />
                            <Tooltip
                              formatter={(value) => [`${value} clients`, "New"]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                            />
                            <Bar
                              dataKey="new"
                              fill="#0496ff"
                              radius={[4, 4, 0, 0]}
                              barSize={8}
                              animationDuration={1500}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          You've acquired{" "}
                          {period === "month" ? 6 : period === "quarter" ? 15 : period === "year" ? 66 : 221} new
                          clients in this period, a{" "}
                          {period === "month" ? 20 : period === "quarter" ? 15 : period === "year" ? 30 : 100}% increase
                          from the previous period.
                        </div>
                        <div className="text-xs font-medium">Conversion Rate: 35%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 3: Inactive Clients */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Inactive Clients</h3>
                        <div className="h-8 w-8 rounded-full bg-amber-900/30 flex items-center justify-center">
                          <Users className="h-4 w-4 text-amber-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">{clientData.inactiveClients}</h2>
                        <p className="text-sm text-amber-400 font-medium mt-1">Need attention</p>
                      </div>

                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={clientData.data} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                            <XAxis
                              dataKey={getTimeLabel()}
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 0 }}
                              height={0}
                            />
                            <YAxis hide={true} axisLine={false} tickLine={false} />
                            <Tooltip
                              formatter={(value) => [`${value} clients`, "Inactive"]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="inactive"
                              stroke="#f59e0b"
                              strokeWidth={2}
                              dot={false}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              animationDuration={1500}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {clientData.inactiveClients} clients haven't made any transactions in the last 90 days.
                          Consider reaching out with personalized offers.
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs font-medium mt-2"
                          onClick={() => router.push("/dashboard/clients/inactive")}
                        >
                          View Inactive Clients
                          <ArrowRight className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 4: Client Insights */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Client Insights</h3>
                        <div className="h-8 w-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                          <PieChartIcon className="h-4 w-4 text-purple-400" />
                        </div>
                      </div>

                      <div className="space-y-3 mt-2">
                        {clientData.insights.map((insight, index) => (
                          <div
                            key={index}
                            className={`p-2.5 rounded-lg border flex items-start gap-2.5 ${
                              insight.type === "positive"
                                ? "bg-green-950/20 border-green-800/30"
                                : insight.type === "warning"
                                  ? "bg-amber-950/20 border-amber-800/30"
                                  : "bg-muted/30"
                            }`}
                          >
                            {insight.type === "positive" ? (
                              <ArrowUpRight className="h-4 w-4 text-green-500 mt-0.5" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-amber-500 mt-0.5" />
                            )}
                            <div>
                              <h4 className="text-xs font-medium">{insight.title}</h4>
                              <p className="text-xs mt-0.5 text-muted-foreground leading-tight">
                                {insight.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs font-medium mt-2"
                        onClick={() => router.push("/dashboard/clients")}
                      >
                        View All Clients
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Client List Card */}
              <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium">Client List</h3>
                    <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/clients")}>
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium tracking-tight">Client Name</th>
                          <th className="py-3 px-4 text-right font-medium tracking-tight">AUM</th>
                          <th className="py-3 px-4 text-center font-medium tracking-tight">Risk Profile</th>
                          <th className="py-3 px-4 text-center font-medium tracking-tight">Status</th>
                          <th className="py-3 px-4 text-right font-medium tracking-tight">Last Update</th>
                          <th className="py-3 px-4 text-center font-medium tracking-tight">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientList.slice(0, 5).map((client) => (
                          <tr key={client.id} className="border-b">
                            <td className="py-3 px-4 font-medium tracking-tight">{client.name}</td>
                            <td className="py-3 px-4 text-right">₹{(client.aum / 100000).toFixed(1)}L</td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  client.risk === "High"
                                    ? "bg-red-950/20 text-red-500"
                                    : client.risk === "Medium"
                                      ? "bg-amber-950/20 text-amber-500"
                                      : "bg-green-950/20 text-green-500"
                                }`}
                              >
                                {client.risk}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  client.status === "Active"
                                    ? "bg-green-950/20 text-green-500"
                                    : "bg-red-950/20 text-red-500"
                                }`}
                              >
                                {client.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">{client.lastUpdate}</td>
                            <td className="py-3 px-4 text-center">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs font-medium"
                                onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AUM TAB */}
            <TabsContent value="aum" className="space-y-6">
              {/* Projected AUM Card */}
              <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        AUM Overview for{" "}
                        {period === "month"
                          ? "This Month"
                          : period === "quarter"
                            ? "This Quarter"
                            : period === "year"
                              ? "This Year"
                              : "All Time"}
                      </h3>
                      <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                        <PieChartIcon className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Current AUM</p>
                        <h2 className="text-2xl font-semibold">₹{aumData.currentValue} Cr</h2>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Previous</p>
                        <h2 className="text-2xl font-semibold">₹{aumData.previousValue} Cr</h2>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Growth</p>
                        <h2 className="text-2xl font-semibold text-emerald-400">+{aumData.growthPercent}%</h2>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1: AUM Growth */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">AUM Growth</h3>
                        <div className="h-8 w-8 rounded-full bg-emerald-900/30 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-emerald-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">+{aumData.growthPercent}%</h2>
                        <p className="text-sm text-emerald-400 font-medium mt-1">From {aumData.comparisonPeriod}</p>
                      </div>

                      <div className="h-[120px] -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={aumData.data} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey={getTimeLabel()}
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 0 }}
                              height={0}
                            />
                            <YAxis hide={true} axisLine={false} tickLine={false} />
                            <Tooltip
                              formatter={(value) => [`₹${value} Cr`, "AUM"]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="aum"
                              stroke="#10b981"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#colorAum)"
                            />
                            <Line
                              type="monotone"
                              dataKey="aum"
                              stroke="#10b981"
                              strokeWidth={2}
                              dot={false}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              animationDuration={1500}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          Your AUM has grown {aumData.growthPercent}% from {aumData.comparisonPeriod}, outperforming 78%
                          of distributors in your region.
                        </div>
                        <div className="text-xs font-medium">Growth Value: ₹{aumData.growthValue} Cr</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: AUM Breakdown */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">AUM Breakdown</h3>
                        <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                          <PieChartIcon className="h-4 w-4 text-blue-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">₹{aumData.summary.marketGrowth} Cr</h2>
                        <p className="text-sm text-blue-400 font-medium mt-1">Market Growth</p>
                      </div>

                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <Pie
                              data={[
                                { name: "Market Growth", value: aumData.summary.marketGrowth },
                                { name: "New Investments", value: aumData.summary.newInvestments },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={36}
                              outerRadius={48}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="none"
                              animationDuration={1500}
                            >
                              <Cell fill="#0496ff" opacity={0.9} />
                              <Cell fill="#10b981" opacity={0.9} />
                            </Pie>
                            <Tooltip
                              formatter={(value) => [`₹${value} Cr`, ""]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          Your AUM growth is primarily driven by market performance (₹{aumData.summary.marketGrowth} Cr)
                          with new investments adding ₹{aumData.summary.newInvestments} Cr.
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#0496ff]" />
                            <span className="text-xs">Market: ₹{aumData.summary.marketGrowth} Cr</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                            <span className="text-xs">New: ₹{aumData.summary.newInvestments} Cr</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 3: AUM by Category */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">AUM by Category</h3>
                        <div className="h-8 w-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                          <PieChartIcon className="h-4 w-4 text-purple-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">45%</h2>
                        <p className="text-sm text-purple-400 font-medium mt-1">In equity funds</p>
                      </div>

                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <Pie
                              data={aumCategoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={36}
                              outerRadius={48}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="none"
                              animationDuration={1500}
                            >
                              {aumCategoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.9} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [`${value}%`, ""]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          Your portfolio is well-diversified with 45% in equity, 30% in debt, and 25% in hybrid and
                          other funds.
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {aumCategoryData.map((category, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: COLORS[index % COLORS.length],
                                }}
                              />
                              <span className="text-xs">
                                {category.name}: {category.value}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 4: AUM by Client Segment */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">AUM by Segment</h3>
                        <div className="h-8 w-8 rounded-full bg-amber-900/30 flex items-center justify-center">
                          <Users className="h-4 w-4 text-amber-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">75%</h2>
                        <p className="text-sm text-amber-400 font-medium mt-1">From HNI clients</p>
                      </div>

                      <div className="h-[120px] -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={aumClientSegmentData}
                            layout="vertical"
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                          >
                            <XAxis type="number" hide={true} axisLine={false} tickLine={false} />
                            <YAxis
                              type="category"
                              dataKey="name"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                              width={80}
                            />
                            <Tooltip
                              formatter={(value) => [`${value} Cr`, "AUM"]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                              cursor={{ fill: "rgba(245, 158, 11, 0.05)" }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={8} animationDuration={1500}>
                              {aumClientSegmentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={SEGMENT_COLORS[index % SEGMENT_COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          HNI clients contribute 75 Cr to your AUM. Focus on converting 5 more affluent clients to HNI
                          status.
                        </div>
                        <div className="mt-2">
                          {aumClientSegmentData.map((segment, index) => {
                            // Calculate percentage of total
                            const total = aumClientSegmentData.reduce((sum, item) => sum + item.value, 0)
                            const percentage = ((segment.value / total) * 100).toFixed(1)

                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between text-xs py-1 border-b border-muted last:border-0"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                      backgroundColor: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
                                    }}
                                  />
                                  <span>{segment.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span>{segment.value} Cr</span>
                                  <span className="text-muted-foreground">({percentage}%)</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* COMMISSIONS TAB */}
            <TabsContent value="commissions" className="space-y-6">
              {/* Projected Commission Card */}
              <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        Projected Commission for{" "}
                        {period === "month"
                          ? "This Month"
                          : period === "quarter"
                            ? "This Quarter"
                            : period === "year"
                              ? "This Year"
                              : "All Time"}
                      </h3>
                      <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                        <CalendarIcon className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Previous</p>
                        <h2 className="text-2xl font-semibold">₹{(commissionData.current / 1000).toFixed(1)}K</h2>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Projected</p>
                        <h2 className="text-2xl font-semibold text-emerald-400">
                          ₹{(commissionData.projected / 1000).toFixed(1)}K
                        </h2>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Growth</p>
                        <h2 className="text-2xl font-semibold text-emerald-400">+{commissionData.growth}%</h2>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1: Opportunity to increase commission */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Commission Opportunity</h3>
                        <div className="h-8 w-8 rounded-full bg-emerald-900/30 flex items-center justify-center">
                          <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">₹62.5K</h2>
                        <p className="text-sm text-emerald-400 font-medium mt-1">+50% potential increase</p>
                      </div>

                      <div className="h-[120px] -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={opportunityData} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                            <XAxis
                              dataKey="name"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                            />
                            <YAxis hide={true} axisLine={false} tickLine={false} />
                            <Tooltip
                              formatter={(value) => [`₹${value.toLocaleString()}`, "Commission"]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                              cursor={{ fill: "rgba(4, 150, 255, 0.05)" }}
                            />
                            <Bar
                              dataKey="value"
                              fill="#0496ff"
                              radius={[4, 4, 0, 0]}
                              barSize={40}
                              animationDuration={1500}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-3">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          Shift 20% of AUM to higher commission funds to increase earnings by ₹62.5K annually.
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs font-medium"
                          onClick={() => router.push("/dashboard/commission-optimization")}
                        >
                          View Optimization Details
                          <ArrowRight className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: Commission growth */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Commission Growth</h3>
                        <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-blue-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">+95%</h2>
                        <p className="text-sm text-blue-400 font-medium mt-1">Year-over-year growth</p>
                      </div>

                      <div className="h-[120px] -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={growthData} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey="month"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 0 }}
                              height={0}
                            />
                            <YAxis hide={true} axisLine={false} tickLine={false} />
                            <Tooltip
                              formatter={(value) => [`₹${value.toLocaleString()}`, "Commission"]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="commission"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#colorCommission)"
                            />
                            <Line
                              type="monotone"
                              dataKey="commission"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              dot={false}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              animationDuration={1500}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          Your commission has grown 95% YoY, outperforming 87% of distributors in your region.
                        </div>
                        <div className="text-xs font-medium">
                          Total: ₹{(totalCommissionForPeriod / 1000).toFixed(1)}K
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 3: Commission by category */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Commission by Category</h3>
                        <div className="h-8 w-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                          <PieChartIcon className="h-4 w-4 text-purple-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">45%</h2>
                        <p className="text-sm text-purple-400 font-medium mt-1">From equity funds</p>
                      </div>

                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={36}
                              outerRadius={48}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="none"
                              animationDuration={1500}
                            >
                              {categoryData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                                  opacity={0.9}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [`${value}%`, "Commission"]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          Equity funds generate 45% of your commission. Consider increasing debt allocation for more
                          balanced earnings.
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {categoryData.map((category, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                                }}
                              />
                              <span className="text-xs">
                                {category.name}: {category.value}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 4: Commission by client segment */}
                <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Commission by Segment</h3>
                        <div className="h-8 w-8 rounded-full bg-amber-900/30 flex items-center justify-center">
                          <Users className="h-4 w-4 text-amber-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">₹125K</h2>
                        <p className="text-sm text-amber-400 font-medium mt-1">From HNI clients</p>
                      </div>

                      <div className="h-[120px] -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={segmentData}
                            layout="vertical"
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                          >
                            <XAxis type="number" hide={true} axisLine={false} tickLine={false} />
                            <YAxis
                              type="category"
                              dataKey="name"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                              width={80}
                            />
                            <Tooltip
                              formatter={(value) => [`₹${value.toLocaleString()}`, "Commission"]}
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                borderRadius: "8px",
                                boxShadow: "var(--shadow)",
                                fontSize: "12px",
                                padding: "8px 12px",
                                border: "none",
                              }}
                              cursor={{ fill: "rgba(245, 158, 11, 0.05)" }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={8} animationDuration={1500}>
                              {segmentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={SEGMENT_COLORS[index % SEGMENT_COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          HNI clients generate 45% of your commission. Focus on converting 5 more affluent clients to
                          HNI status.
                        </div>
                        <div className="mt-2">
                          {segmentData.map((segment, index) => {
                            // Calculate percentage of total
                            const total = segmentData.reduce((sum, item) => sum + item.value, 0)
                            const percentage = ((segment.value / total) * 100).toFixed(1)

                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between text-xs py-1 border-b border-muted last:border-0"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                      backgroundColor: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
                                    }}
                                  />
                                  <span>{segment.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span>₹{(segment.value / 1000).toFixed(0)}K</span>
                                  <span className="text-muted-foreground">({percentage}%)</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

export default BusinessInsights

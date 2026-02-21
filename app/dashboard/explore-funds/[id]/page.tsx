"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Info, TrendingUp, DollarSign, ChevronRight, Star, ArrowLeft } from "lucide-react"
// Remove: import { AskZinni, ZinniProvider } from "@/components/ask-zinni"

// Sample fund data - this would typically come from an API or database
const funds = [
  {
    id: "2",
    name: "HDFC Mid-Cap Opportunities",
    category: "Mid Cap",
    amc: "HDFC Mutual Fund",
    manager: "Chirag Setalvad",
    aum: 30500,
    nav: 78.92,
    oneYearReturn: 22.3,
    threeYearReturn: 18.7,
    fiveYearReturn: 15.3,
    expense: 1.9,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderately High",
    benchmark: "Nifty Midcap 150 TRI",
    inceptionDate: "2007-06-25",
    minInvestment: 5000,
    sipMinimum: 500,
    holdings: [
      { name: "Cholamandalam Investment", allocation: 4.2 },
      { name: "Sundaram Finance", allocation: 3.8 },
      { name: "Voltas", allocation: 3.5 },
      { name: "Max Healthcare", allocation: 3.2 },
      { name: "Bharat Forge", allocation: 2.9 },
    ],
    sectorAllocation: [
      { name: "Financial Services", value: 28.5 },
      { name: "Industrial Services", value: 15.2 },
      { name: "Healthcare", value: 12.8 },
      { name: "Consumer Goods", value: 11.5 },
      { name: "Automobile", value: 10.7 },
      { name: "Others", value: 21.3 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 15.2 },
      { name: "Mid Cap", value: 75.5 },
      { name: "Small Cap", value: 9.3 },
    ],
    commission: 1.5,
    rating: 4.5,
  },
  {
    id: "3",
    name: "SBI Small Cap Fund",
    category: "Small Cap",
    amc: "SBI Mutual Fund",
    manager: "R. Srinivasan",
    aum: 15200,
    nav: 102.45,
    oneYearReturn: 25.7,
    threeYearReturn: 22.3,
    fiveYearReturn: 18.9,
    expense: 2.0,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "High",
    benchmark: "Nifty Smallcap 250 TRI",
    inceptionDate: "2009-09-09",
    minInvestment: 5000,
    sipMinimum: 500,
    holdings: [
      { name: "Navin Fluorine", allocation: 5.2 },
      { name: "JK Cement", allocation: 4.8 },
      { name: "Sonata Software", allocation: 4.5 },
      { name: "V-Guard Industries", allocation: 4.2 },
      { name: "Carborundum Universal", allocation: 3.9 },
    ],
    sectorAllocation: [
      { name: "Industrial Manufacturing", value: 22.5 },
      { name: "Chemicals", value: 18.2 },
      { name: "Financial Services", value: 15.8 },
      { name: "Consumer Goods", value: 12.5 },
      { name: "IT", value: 10.7 },
      { name: "Others", value: 20.3 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 5.2 },
      { name: "Mid Cap", value: 25.5 },
      { name: "Small Cap", value: 69.3 },
    ],
    commission: 1.8,
    rating: 4.8,
  },
  {
    id: "4",
    name: "ICICI Pru Value Discovery",
    category: "Value",
    amc: "ICICI Prudential Mutual Fund",
    manager: "Sankaran Naren",
    aum: 22800,
    nav: 210.78,
    oneYearReturn: 16.8,
    threeYearReturn: 14.2,
    fiveYearReturn: 11.5,
    expense: 1.7,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderate",
    benchmark: "Nifty 500 TRI",
    inceptionDate: "2004-08-16",
    minInvestment: 5000,
    sipMinimum: 100,
    holdings: [
      { name: "NTPC", allocation: 6.2 },
      { name: "Coal India", allocation: 5.8 },
      { name: "ITC", allocation: 5.5 },
      { name: "ONGC", allocation: 5.2 },
      { name: "Power Grid Corporation", allocation: 4.9 },
    ],
    sectorAllocation: [
      { name: "Energy", value: 25.5 },
      { name: "Financial Services", value: 18.2 },
      { name: "Consumer Goods", value: 15.8 },
      { name: "Metals", value: 12.5 },
      { name: "Pharma", value: 10.7 },
      { name: "Others", value: 17.3 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 65.2 },
      { name: "Mid Cap", value: 25.5 },
      { name: "Small Cap", value: 9.3 },
    ],
    commission: 1.3,
    rating: 4.2,
  },
  {
    id: "5",
    name: "Kotak Emerging Equity",
    category: "Mid Cap",
    amc: "Kotak Mutual Fund",
    manager: "Pankaj Tibrewal",
    aum: 18700,
    nav: 92.35,
    oneYearReturn: 21.5,
    threeYearReturn: 17.8,
    fiveYearReturn: 14.6,
    expense: 1.8,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderately High",
    benchmark: "Nifty Midcap 150 TRI",
    inceptionDate: "2007-03-30",
    minInvestment: 5000,
    sipMinimum: 500,
    holdings: [
      { name: "Coforge", allocation: 4.5 },
      { name: "Federal Bank", allocation: 4.1 },
      { name: "Persistent Systems", allocation: 3.8 },
      { name: "Tube Investments", allocation: 3.5 },
      { name: "Astral Poly", allocation: 3.2 },
    ],
    sectorAllocation: [
      { name: "Financial Services", value: 26.5 },
      { name: "IT", value: 18.2 },
      { name: "Industrial Manufacturing", value: 15.8 },
      { name: "Consumer Goods", value: 12.5 },
      { name: "Healthcare", value: 10.7 },
      { name: "Others", value: 16.3 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 12.2 },
      { name: "Mid Cap", value: 78.5 },
      { name: "Small Cap", value: 9.3 },
    ],
    commission: 1.4,
    rating: 4.4,
  },
  {
    id: "6",
    name: "Nippon India Small Cap",
    category: "Small Cap",
    amc: "Nippon India Mutual Fund",
    manager: "Samir Rachh",
    aum: 14500,
    nav: 88.75,
    oneYearReturn: 24.8,
    threeYearReturn: 21.5,
    fiveYearReturn: 17.9,
    expense: 1.9,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "High",
    benchmark: "Nifty Smallcap 250 TRI",
    inceptionDate: "2010-09-16",
    minInvestment: 5000,
    sipMinimum: 500,
    holdings: [
      { name: "KPIT Technologies", allocation: 4.8 },
      { name: "Cyient", allocation: 4.5 },
      { name: "Apar Industries", allocation: 4.2 },
      { name: "Kirloskar Oil Engines", allocation: 3.9 },
      { name: "Aarti Industries", allocation: 3.6 },
    ],
    sectorAllocation: [
      { name: "Industrial Manufacturing", value: 24.5 },
      { name: "IT", value: 19.2 },
      { name: "Financial Services", value: 14.8 },
      { name: "Chemicals", value: 13.5 },
      { name: "Consumer Goods", value: 9.7 },
      { name: "Others", value: 18.3 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 3.2 },
      { name: "Mid Cap", value: 22.5 },
      { name: "Small Cap", value: 74.3 },
    ],
    commission: 1.7,
    rating: 4.7,
  },
  {
    id: "7",
    name: "Invesco India Contra Fund",
    category: "Value",
    amc: "Invesco Mutual Fund",
    manager: "Taher Badshah",
    aum: 19600,
    nav: 75.4,
    oneYearReturn: 15.9,
    threeYearReturn: 13.5,
    fiveYearReturn: 10.8,
    expense: 1.8,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderate",
    benchmark: "Nifty 500 TRI",
    inceptionDate: "2007-04-11",
    minInvestment: 5000,
    sipMinimum: 500,
    holdings: [
      { name: "ICICI Bank", allocation: 5.8 },
      { name: "SBI", allocation: 5.2 },
      { name: "Bharti Airtel", allocation: 4.8 },
      { name: "Infosys", allocation: 4.5 },
      { name: "L&T", allocation: 4.2 },
    ],
    sectorAllocation: [
      { name: "Financial Services", value: 28.5 },
      { name: "IT", value: 16.2 },
      { name: "Telecom", value: 12.8 },
      { name: "Industrial Manufacturing", value: 11.5 },
      { name: "Energy", value: 10.7 },
      { name: "Others", value: 20.3 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 62.2 },
      { name: "Mid Cap", value: 28.5 },
      { name: "Small Cap", value: 9.3 },
    ],
    commission: 1.2,
    rating: 4.0,
  },
  {
    id: "8",
    name: "Mirae Asset Large Cap Fund",
    category: "Large Cap",
    amc: "Mirae Asset Mutual Fund",
    manager: "Neelesh Surana",
    aum: 28700,
    nav: 95.6,
    oneYearReturn: 17.8,
    threeYearReturn: 15.5,
    fiveYearReturn: 12.9,
    expense: 1.7,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderate",
    benchmark: "Nifty 50 TRI",
    inceptionDate: "2008-04-04",
    minInvestment: 5000,
    sipMinimum: 500,
    holdings: [
      { name: "HDFC Bank", allocation: 8.8 },
      { name: "ICICI Bank", allocation: 7.2 },
      { name: "Reliance Industries", allocation: 6.8 },
      { name: "Infosys", allocation: 5.5 },
      { name: "TCS", allocation: 4.9 },
    ],
    sectorAllocation: [
      { name: "Financial Services", value: 32.5 },
      { name: "IT", value: 18.2 },
      { name: "Oil & Gas", value: 12.8 },
      { name: "Consumer Goods", value: 10.5 },
      { name: "Automobile", value: 8.7 },
      { name: "Others", value: 17.3 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 88.2 },
      { name: "Mid Cap", value: 10.5 },
      { name: "Small Cap", value: 1.3 },
    ],
    commission: 1.1,
    rating: 4.3,
  },
]

// Performance data for charts
const performanceData = [
  { month: "Jan", fund: 5.2, benchmark: 4.8 },
  { month: "Feb", fund: 3.8, benchmark: 3.2 },
  { month: "Mar", fund: -2.1, benchmark: -2.5 },
  { month: "Apr", fund: 4.5, benchmark: 4.1 },
  { month: "May", fund: 2.3, benchmark: 1.9 },
  { month: "Jun", fund: 1.8, benchmark: 1.5 },
  { month: "Jul", fund: 3.2, benchmark: 2.8 },
  { month: "Aug", fund: -1.5, benchmark: -1.8 },
  { month: "Sep", fund: 4.7, benchmark: 4.2 },
  { month: "Oct", fund: 2.9, benchmark: 2.5 },
  { month: "Nov", fund: 3.5, benchmark: 3.1 },
  { month: "Dec", fund: 4.1, benchmark: 3.7 },
]

// Risk-return data for radar chart
const riskReturnData = [
  { metric: "Return", value: 85 },
  { metric: "Risk", value: 65 },
  { metric: "Sharpe", value: 78 },
  { metric: "Alpha", value: 82 },
  { metric: "Beta", value: 60 },
]

const COLORS = ["#0496ff", "#0088cc", "#006699", "#004466", "#002233"]
const CHART_COLORS = {
  primary: "#0496ff",
  secondary: "#00c6ff",
  tertiary: "#8e24aa",
  benchmark: "#64748b",
  positive: "#10b981",
  negative: "#ef4444",
  grid: "#e2e8f0",
  text: "#64748b",
}

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-md">
        <p className="font-medium text-sm">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-sm">
              {entry.name}: <span className="font-medium">{entry.value}%</span>
            </p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function FundDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [fund, setFund] = useState(null)

  useEffect(() => {
    // Find the fund with the matching ID
    const foundFund = funds.find((f) => f.id === params.id)
    if (foundFund) {
      setFund(foundFund)
    } else {
      // If no fund is found, redirect to the explore funds page
      router.push("/dashboard/explore-funds")
    }
  }, [params.id, router])

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-3 w-3 text-yellow-400" />
          <Star
            className="absolute top-0 left-0 h-3 w-3 fill-yellow-400 text-yellow-400 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>,
      )
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-3 w-3 text-yellow-400" />)
    }

    return <div className="flex">{stars}</div>
  }

  if (!fund) {
    return (
      <div className="flex-1 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading fund details...</h2>
          <p className="text-sm text-muted-foreground mt-2">Please wait while we fetch the fund information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Fund Details</h2>
        <p className="text-sm text-muted-foreground">View detailed information about this mutual fund.</p>
      </div>
      <div className="space-y-4">
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-sm"
          onClick={() => router.push("/dashboard/explore-funds")}
        >
          <ChevronRight className="h-4 w-4 rotate-180" /> Back to funds
        </Button>

        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#0496ff]/10 to-transparent">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{fund.name}</CardTitle>
                <CardDescription className="mt-1">
                  {fund.category} | {fund.amc} | Managed by {fund.manager}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  {renderStars(fund.rating)}
                  <span className="text-sm font-medium">{fund.rating}/5</span>
                </div>
                <Badge className="mt-1 bg-[#0496ff]">{fund.commission}% Commission</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="overview" className="w-full">
              <div className="border-b">
                <div className="px-6">
                  <TabsList className="h-12">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-[#0496ff]/10">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="data-[state=active]:bg-[#0496ff]/10">
                      Performance
                    </TabsTrigger>
                    <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#0496ff]/10">
                      Portfolio
                    </TabsTrigger>
                    <TabsTrigger value="details" className="data-[state=active]:bg-[#0496ff]/10">
                      Details
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="overview" className="p-6 space-y-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-[#0496ff]" />
                        <CardTitle className="text-base">Returns</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">1 Year</span>
                          <span className="text-sm font-medium text-green-600">+{fund.oneYearReturn}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">3 Years</span>
                          <span className="text-sm font-medium text-green-600">+{fund.threeYearReturn}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">5 Years</span>
                          <span className="text-sm font-medium text-green-600">+{fund.fiveYearReturn}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-[#0496ff]" />
                        <CardTitle className="text-base">Fund Size & Costs</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">AUM</span>
                          <span className="text-sm font-medium">₹{fund.aum.toLocaleString()} Cr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">NAV</span>
                          <span className="text-sm font-medium">₹{fund.nav}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Expense Ratio</span>
                          <span className="text-sm font-medium">{fund.expense}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-[#0496ff]" />
                        <CardTitle className="text-base">Key Information</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Risk Rating</span>
                          <span className="text-sm font-medium">{fund.riskRating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Benchmark</span>
                          <span className="text-sm font-medium">{fund.benchmark}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Commission</span>
                          <span className="text-sm font-medium">{fund.commission}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Performance vs Benchmark (1 Year)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorFund" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8} />
                              <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={CHART_COLORS.benchmark} stopOpacity={0.8} />
                              <stop offset="95%" stopColor={CHART_COLORS.benchmark} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                          <XAxis dataKey="month" tick={{ fontSize: 12, fill: CHART_COLORS.text }} />
                          <YAxis tick={{ fontSize: 12, fill: CHART_COLORS.text }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="fund"
                            name={fund.name}
                            stroke={CHART_COLORS.primary}
                            fillOpacity={1}
                            fill="url(#colorFund)"
                            activeDot={{ r: 6 }}
                          />
                          <Area
                            type="monotone"
                            dataKey="benchmark"
                            name="Benchmark"
                            stroke={CHART_COLORS.benchmark}
                            fillOpacity={1}
                            fill="url(#colorBenchmark)"
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Sector Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={fund.sectorAllocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={90}
                            innerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            paddingAngle={2}
                          >
                            {fund.sectorAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Risk-Return Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-center">
                      <ResponsiveContainer width="100%" height={300} className="max-w-md mx-auto">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskReturnData}>
                          <PolarGrid stroke={CHART_COLORS.grid} />
                          <PolarAngleAxis dataKey="metric" tick={{ fill: CHART_COLORS.text, fontSize: 12 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                          <Radar
                            name={fund.name}
                            dataKey="value"
                            stroke={CHART_COLORS.primary}
                            fill={CHART_COLORS.primary}
                            fillOpacity={0.6}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="p-6 space-y-6 mt-0">
                {/* Performance tab content similar to the overview tab */}
                {/* This would include more detailed performance metrics */}
              </TabsContent>

              <TabsContent value="portfolio" className="p-6 space-y-6 mt-0">
                {/* Portfolio tab content */}
                {/* This would include holdings, sector allocation, etc. */}
              </TabsContent>

              <TabsContent value="details" className="p-6 space-y-6 mt-0">
                {/* Details tab content */}
                {/* This would include fund information, investment details, etc. */}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-[#0496ff]/5 to-transparent">
            <Button variant="outline" onClick={() => router.push("/dashboard/explore-funds")} className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Funds
            </Button>
            <Button className="bg-[#0496ff] hover:bg-[#0088cc]">Add to Portfolio</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts"
import { ArrowLeft, DollarSign, HelpCircle, Info, Star, TrendingUp } from "lucide-react"
import { InvestmentAIAssistant } from "@/components/investment-ai-assistant"
import { X } from "lucide-react" // Import the X component

// Import all investment data
import { mutualFunds, nfoData, stocksData, pmsData, aifData, bondsData, depositsData } from "@/data/investment-data"

// Performance data for charts
const performanceData = [
  { month: "Jan", investment: 5.2, benchmark: 4.8 },
  { month: "Feb", investment: 3.8, benchmark: 3.2 },
  { month: "Mar", investment: -2.1, benchmark: -2.5 },
  { month: "Apr", investment: 4.5, benchmark: 4.1 },
  { month: "May", investment: 2.3, benchmark: 1.9 },
  { month: "Jun", investment: 1.8, benchmark: 1.5 },
  { month: "Jul", investment: 3.2, benchmark: 2.8 },
  { month: "Aug", investment: -1.5, benchmark: -1.8 },
  { month: "Sep", investment: 4.7, benchmark: 4.2 },
  { month: "Oct", investment: 2.9, benchmark: 2.5 },
  { month: "Nov", investment: 3.5, benchmark: 3.1 },
  { month: "Dec", investment: 4.1, benchmark: 3.7 },
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

export default function InvestmentDetailPage({ params }: { params: { type: string; id: string } }) {
  const router = useRouter()
  const [investment, setInvestment] = useState<any>(null)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const { type, id } = params

  useEffect(() => {
    // Find the investment with the matching ID based on type
    let foundInvestment = null

    switch (type) {
      case "mutual-funds":
        foundInvestment = mutualFunds.find((item) => item.id === id)
        break
      case "nfo":
        foundInvestment = nfoData.find((item) => item.id === id)
        break
      case "stocks":
        foundInvestment = stocksData.find((item) => item.id === id)
        break
      case "pms":
        foundInvestment = pmsData.find((item) => item.id === id)
        break
      case "aif":
        foundInvestment = aifData.find((item) => item.id === id)
        break
      case "bonds":
        foundInvestment = bondsData.find((item) => item.id === id)
        break
      case "deposits":
        foundInvestment = depositsData.find((item) => item.id === id)
        break
    }

    if (foundInvestment) {
      setInvestment(foundInvestment)
    } else {
      // If no investment is found, redirect to the explore investments page
      router.push("/dashboard/explore-investments")
    }
  }, [type, id, router])

  const renderStars = (rating) => {
    if (!rating) return null

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

  const getTypeLabel = () => {
    switch (type) {
      case "mutual-funds":
        return "Mutual Fund"
      case "nfo":
        return "New Fund Offer"
      case "stocks":
        return "Stock"
      case "pms":
        return "Portfolio Management Service"
      case "aif":
        return "Alternative Investment Fund"
      case "bonds":
        return "Bond"
      case "deposits":
        return "Deposit"
      default:
        return "Investment"
    }
  }

  if (!investment) {
    return (
      <div className="flex-1 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading investment details...</h2>
          <p className="text-sm text-muted-foreground mt-2">Please wait while we fetch the information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{getTypeLabel()} Details</h2>
        <p className="text-sm text-muted-foreground">View detailed information about this investment</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-sm"
            onClick={() => router.push("/dashboard/explore-investments")}
          >
            <ArrowLeft className="h-4 w-4" /> Back to investments
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Ask ZinniAI about this {getTypeLabel()}</span>
          </Button>
        </div>

        {/* AI Assistant Section */}
        {showAIAssistant && (
          <Card className="border shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#0496ff]/10 to-transparent">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">ZinniAI Investment Assistant</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAIAssistant(false)} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Ask me anything about {investment.name} or similar investments</CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentAIAssistant />
            </CardContent>
          </Card>
        )}

        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#0496ff]/10 to-transparent">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{investment.name}</CardTitle>
                <CardDescription className="mt-1">
                  {type === "mutual-funds" &&
                    `${investment.category} | ${investment.amc} | Managed by ${investment.manager}`}
                  {type === "nfo" && `${investment.category} | ${investment.amc} | Managed by ${investment.manager}`}
                  {type === "stocks" && `${investment.sector} | ${investment.ticker}`}
                  {type === "pms" && `${investment.strategy} | Managed by ${investment.manager}`}
                  {type === "aif" && `${investment.category} | Managed by ${investment.manager}`}
                  {type === "bonds" && `${investment.type} | Issued by ${investment.issuer}`}
                  {type === "deposits" && `${investment.type} | ${investment.institution}`}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  {renderStars(investment.rating)}
                  <span className="text-sm font-medium">{investment.rating}/5</span>
                </div>
                {(type === "mutual-funds" || type === "nfo") && (
                  <Badge className="mt-1 bg-[#0496ff]">{investment.commission}% Commission</Badge>
                )}
                {type === "pms" && (
                  <Badge className="mt-1 bg-[#0496ff]">{investment.managementFee}% Management Fee</Badge>
                )}
                {type === "aif" && (
                  <Badge className="mt-1 bg-[#0496ff]">{investment.managementFee}% Management Fee</Badge>
                )}
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
                    {(type === "mutual-funds" || type === "stocks") && (
                      <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#0496ff]/10">
                        Portfolio
                      </TabsTrigger>
                    )}
                    <TabsTrigger value="details" className="data-[state=active]:bg-[#0496ff]/10">
                      Details
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="overview" className="p-6 space-y-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Returns/Performance */}
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-[#0496ff]" />
                        <CardTitle className="text-base">
                          {type === "bonds" ? "Yield" : type === "deposits" ? "Interest" : "Returns"}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {(type === "mutual-funds" || type === "stocks" || type === "pms") && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">1 Year</span>
                              <span
                                className={`text-sm font-medium ${investment.oneYearReturn >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {investment.oneYearReturn >= 0 ? "+" : ""}
                                {investment.oneYearReturn}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">3 Years</span>
                              <span
                                className={`text-sm font-medium ${investment.threeYearReturn >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {investment.threeYearReturn >= 0 ? "+" : ""}
                                {investment.threeYearReturn}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">5 Years</span>
                              <span
                                className={`text-sm font-medium ${investment.fiveYearReturn >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {investment.fiveYearReturn >= 0 ? "+" : ""}
                                {investment.fiveYearReturn}%
                              </span>
                            </div>
                          </>
                        )}

                        {type === "nfo" && (
                          <div className="flex justify-between">
                            <span className="text-sm">Offer Period</span>
                            <span className="text-sm font-medium">{investment.offerPeriod}</span>
                          </div>
                        )}

                        {type === "aif" && (
                          <div className="flex justify-between">
                            <span className="text-sm">Target Return</span>
                            <span className="text-sm font-medium text-green-600">+{investment.targetReturn}%</span>
                          </div>
                        )}

                        {type === "bonds" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Coupon Rate</span>
                              <span className="text-sm font-medium text-green-600">{investment.couponRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">YTM</span>
                              <span className="text-sm font-medium text-green-600">{investment.ytm}%</span>
                            </div>
                          </>
                        )}

                        {type === "deposits" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Interest Rate</span>
                              <span className="text-sm font-medium text-green-600">{investment.interestRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Compounding</span>
                              <span className="text-sm font-medium">{investment.compounding}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 2: Size & Costs */}
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-[#0496ff]" />
                        <CardTitle className="text-base">
                          {type === "mutual-funds"
                            ? "Fund Size & Costs"
                            : type === "stocks"
                              ? "Market Data"
                              : type === "pms" || type === "aif"
                                ? "Investment Terms"
                                : "Investment Details"}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {type === "mutual-funds" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">AUM</span>
                              <span className="text-sm font-medium">₹{investment.aum.toLocaleString()} Cr</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">NAV</span>
                              <span className="text-sm font-medium">₹{investment.nav}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Expense Ratio</span>
                              <span className="text-sm font-medium">{investment.expense}%</span>
                            </div>
                          </>
                        )}

                        {type === "nfo" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Min. Investment</span>
                              <span className="text-sm font-medium">₹{investment.minInvestment.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">SIP Minimum</span>
                              <span className="text-sm font-medium">₹{investment.sipMinimum}</span>
                            </div>
                          </>
                        )}

                        {type === "stocks" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Current Price</span>
                              <span className="text-sm font-medium">₹{investment.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Market Cap</span>
                              <span className="text-sm font-medium">₹{investment.marketCap.toLocaleString()} Cr</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">P/E Ratio</span>
                              <span className="text-sm font-medium">{investment.peRatio}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Dividend Yield</span>
                              <span className="text-sm font-medium">{investment.dividendYield}%</span>
                            </div>
                          </>
                        )}

                        {type === "pms" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Min. Investment</span>
                              <span className="text-sm font-medium">
                                ₹{(investment.minInvestment / 100000).toFixed(1)} Lakh
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Management Fee</span>
                              <span className="text-sm font-medium">{investment.managementFee}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Performance Fee</span>
                              <span className="text-sm font-medium">{investment.performanceFee}</span>
                            </div>
                          </>
                        )}

                        {type === "aif" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Min. Investment</span>
                              <span className="text-sm font-medium">
                                ₹{(investment.minInvestment / 10000000).toFixed(1)} Cr
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Management Fee</span>
                              <span className="text-sm font-medium">{investment.managementFee}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Lock-in Period</span>
                              <span className="text-sm font-medium">{investment.lockInPeriod}</span>
                            </div>
                          </>
                        )}

                        {type === "bonds" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Maturity</span>
                              <span className="text-sm font-medium">{investment.maturity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Min. Investment</span>
                              <span className="text-sm font-medium">₹{investment.minInvestment.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Credit Rating</span>
                              <span className="text-sm font-medium">{investment.creditRating}</span>
                            </div>
                          </>
                        )}

                        {type === "deposits" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Tenure</span>
                              <span className="text-sm font-medium">{investment.tenure}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Min. Amount</span>
                              <span className="text-sm font-medium">₹{investment.minAmount.toLocaleString()}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 3: Key Information */}
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-[#0496ff]" />
                        <CardTitle className="text-base">Key Information</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {type === "mutual-funds" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Risk Rating</span>
                              <span className="text-sm font-medium">{investment.riskRating}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Benchmark</span>
                              <span className="text-sm font-medium">{investment.benchmark}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Commission</span>
                              <span className="text-sm font-medium">{investment.commission}%</span>
                            </div>
                          </>
                        )}

                        {type === "nfo" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Risk Rating</span>
                              <span className="text-sm font-medium">{investment.riskRating}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Benchmark</span>
                              <span className="text-sm font-medium">{investment.benchmark}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Commission</span>
                              <span className="text-sm font-medium">{investment.commission}%</span>
                            </div>
                          </>
                        )}

                        {type === "stocks" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Sector</span>
                              <span className="text-sm font-medium">{investment.sector}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Ticker</span>
                              <span className="text-sm font-medium">{investment.ticker}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Beta</span>
                              <span className="text-sm font-medium">{investment.beta}</span>
                            </div>
                          </>
                        )}

                        {type === "pms" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Strategy</span>
                              <span className="text-sm font-medium">{investment.strategy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Risk Rating</span>
                              <span className="text-sm font-medium">{investment.riskRating}</span>
                            </div>
                          </>
                        )}

                        {type === "aif" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Category</span>
                              <span className="text-sm font-medium">{investment.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Strategy</span>
                              <span className="text-sm font-medium">{investment.strategy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Risk Rating</span>
                              <span className="text-sm font-medium">{investment.riskRating}</span>
                            </div>
                          </>
                        )}

                        {type === "bonds" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Interest Payment</span>
                              <span className="text-sm font-medium">{investment.interestPayment}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Listing Status</span>
                              <span className="text-sm font-medium">{investment.listingStatus}</span>
                            </div>
                          </>
                        )}

                        {type === "deposits" && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm">Premature Withdrawal</span>
                              <span className="text-sm font-medium">{investment.prematureWithdrawal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Tax Status</span>
                              <span className="text-sm font-medium">{investment.taxStatus}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Charts */}
                {(type === "mutual-funds" || type === "stocks" || type === "pms") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Performance vs Benchmark (1 Year)</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <ResponsiveContainer width="100%" height={250}>
                          <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={CHART_COLORS.benchmark} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={CHART_COLORS.benchmark} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                            <XAxis dataKey="month" stroke={CHART_COLORS.text} />
                            <YAxis stroke={CHART_COLORS.text} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="investment"
                              stroke={CHART_COLORS.primary}
                              fillOpacity={1}
                              fill="url(#colorInvestment)"
                            />
                            <Area
                              type="monotone"
                              dataKey="benchmark"
                              stroke={CHART_COLORS.benchmark}
                              fillOpacity={1}
                              fill="url(#colorBenchmark)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Risk-Return Profile</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <ResponsiveContainer width="100%" height={250}>
                          <RadarChart cx="50%" cy="50%" outerRadius={80} data={[investment]}>
                            <PolarGrid stroke={CHART_COLORS.grid} />
                            <PolarAngleAxis dataKey="metric" stroke={CHART_COLORS.text} />
                            <PolarRadiusAxis stroke={CHART_COLORS.text} />
                            <Radar
                              name="Risk-Return"
                              dataKey="value"
                              stroke={CHART_COLORS.primary}
                              fill={CHART_COLORS.primary}
                              fillOpacity={0.6}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="performance" className="p-6 space-y-6 mt-0">
                {/* Performance Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Performance vs Benchmark (Overall)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                          <XAxis dataKey="month" stroke={CHART_COLORS.text} />
                          <YAxis stroke={CHART_COLORS.text} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="investment"
                            stroke={CHART_COLORS.primary}
                            activeDot={{ r: 8 }}
                          />
                          <Line type="monotone" dataKey="benchmark" stroke={CHART_COLORS.benchmark} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Return Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={riskReturnData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill={CHART_COLORS.primary}
                          >
                            {riskReturnData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="p-6 space-y-6 mt-0">
                {/* Portfolio Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Top Holdings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={investment.portfolio}>
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                          <XAxis dataKey="name" stroke={CHART_COLORS.text} />
                          <YAxis stroke={CHART_COLORS.text} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="percentage" fill={CHART_COLORS.primary} />
                        </BarChart>
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
                            data={investment.sectorAllocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill={CHART_COLORS.primary}
                          >
                            {investment.sectorAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="details" className="p-6 space-y-6 mt-0">
                {/* Investment Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Investment Type</span>
                    <span className="text-sm font-medium">{getTypeLabel()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Investment ID</span>
                    <span className="text-sm font-medium">{investment.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Investment Name</span>
                    <span className="text-sm font-medium">{investment.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Investment Rating</span>
                    <div className="flex items-center gap-2">
                      {renderStars(investment.rating)}
                      <span className="text-sm font-medium">{investment.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Investment Description</span>
                    <span className="text-sm font-medium">{investment.description}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

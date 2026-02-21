"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowLeft, CheckCircle2, HelpCircle, Info, Percent, PieChart, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Mail, Share2, Download, Copy, Smartphone, FileText } from "lucide-react"

interface AllocationItem {
  category: string
  current: number
  recommended: number
  difference: number
  color: string
}

interface ClientRebalanceProps {
  client: {
    id: string
    name: string
    avatar: string
    email: string
    phone: string
    portfolioValue: number
    imbalances: {
      category: string
      current: number
      recommended: number
      difference: number
    }[]
    riskProfile: string
    lastRebalanced: string
  }
  onBack: () => void
}

// Add this new interface for rebalancing history data after the existing interfaces
interface RebalancingHistoryItem {
  date: string
  action: string
  reason: string
  capitalBefore: number
  capitalAfter: number
  returnGenerated: number
  alignmentType: "risk" | "market" // Added to indicate if the rebalancing aligns with risk profile or market conditions
  alignmentDetail: string // Added to provide specific details about the alignment
}

export function PortfolioRebalanceView({ client, onBack }: ClientRebalanceProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [showPdfReport, setShowPdfReport] = useState(false)

  // Complete allocation data with colors
  const allocationData: AllocationItem[] = [
    ...client.imbalances,
    // Add other allocations to make the total 100%
    {
      category: "Large Cap",
      current: 30,
      recommended: 35,
      difference: -5,
      color: "bg-blue-500",
    },
    {
      category: "Debt",
      current: 20,
      recommended: 25,
      difference: -5,
      color: "bg-green-500",
    },
    {
      category: "Cash",
      current: 10,
      recommended: 5,
      difference: 5,
      color: "bg-gray-400",
    },
  ].map((item) => ({
    ...item,
    color:
      item.color ||
      (item.category === "Mid Cap"
        ? "bg-purple-500"
        : item.category === "Small Cap"
          ? "bg-pink-500"
          : item.category === "International"
            ? "bg-indigo-500"
            : item.category === "Gold"
              ? "bg-yellow-500"
              : item.category === "Equity"
                ? "bg-red-500"
                : "bg-gray-500"),
  }))

  // Calculate total imbalance
  const totalImbalance = client.imbalances.reduce((sum, item) => sum + Math.abs(item.difference), 0)

  // Determine if rebalancing is recommended
  const isRebalancingRecommended = totalImbalance > 10

  // Calculate buy/sell amounts
  const calculateAmount = (percentage: number) => {
    return ((client.portfolioValue * percentage) / 100).toFixed(0)
  }

  // Generate rebalancing history based on client's risk profile
  const getRebalancingHistory = () => {
    // Base portfolio value for calculations
    const baseValue = client.portfolioValue * 0.7

    if (client.riskProfile === "Aggressive") {
      return [
        {
          date: "Jan 2022",
          action: "Initial Investment",
          reason: "Portfolio setup based on aggressive risk profile",
          capitalBefore: baseValue,
          capitalAfter: baseValue * 1.08,
          returnGenerated: 8.25,
          alignmentType: "risk",
          alignmentDetail: "Allocated 75% to equity to match aggressive risk appetite",
        },
        {
          date: "Jun 2022",
          action: "Market Correction Rebalancing",
          reason: "Tech sector correction created buying opportunity",
          capitalBefore: baseValue * 1.08,
          capitalAfter: baseValue * 1.12,
          returnGenerated: 3.75,
          alignmentType: "market",
          alignmentDetail: "Increased tech exposure during sector correction",
        },
        {
          date: "Dec 2022",
          action: "Year-end Rebalancing",
          reason: "Small-cap outperformance created overweight position",
          capitalBefore: baseValue * 1.12,
          capitalAfter: baseValue * 1.21,
          returnGenerated: 7.85,
          alignmentType: "risk",
          alignmentDetail: "Maintained aggressive stance while reducing small-cap concentration risk",
        },
        {
          date: "Jul 2023",
          action: "Mid-year Rebalancing",
          reason: "International markets underperformance created opportunity",
          capitalBefore: baseValue * 1.21,
          capitalAfter: baseValue * 1.32,
          returnGenerated: 9.15,
          alignmentType: "market",
          alignmentDetail: "Added to international equity during valuation dip",
        },
      ]
    } else if (client.riskProfile === "Moderate") {
      return [
        {
          date: "Jan 2022",
          action: "Initial Investment",
          reason: "Portfolio setup based on moderate risk profile",
          capitalBefore: baseValue,
          capitalAfter: baseValue * 1.05,
          returnGenerated: 5.35,
          alignmentType: "risk",
          alignmentDetail: "Balanced 60/40 equity-debt allocation for moderate risk",
        },
        {
          date: "Aug 2022",
          action: "Volatility Adjustment",
          reason: "Increased market volatility required defensive positioning",
          capitalBefore: baseValue * 1.05,
          capitalAfter: baseValue * 1.09,
          returnGenerated: 3.85,
          alignmentType: "market",
          alignmentDetail: "Added defensive sectors during volatility spike",
        },
        {
          date: "Feb 2023",
          action: "Interest Rate Response",
          reason: "Rising interest rates impacted fixed income allocation",
          capitalBefore: baseValue * 1.09,
          capitalAfter: baseValue * 1.14,
          returnGenerated: 4.65,
          alignmentType: "market",
          alignmentDetail: "Shifted to shorter duration bonds in rising rate environment",
        },
        {
          date: "Oct 2023",
          action: "Annual Rebalancing",
          reason: "Equity outperformance created imbalance in target allocation",
          capitalBefore: baseValue * 1.14,
          capitalAfter: baseValue * 1.22,
          returnGenerated: 6.95,
          alignmentType: "risk",
          alignmentDetail: "Restored 60/40 balance after equity outperformance",
        },
      ]
    } else {
      // Conservative profile
      return [
        {
          date: "Jan 2022",
          action: "Initial Investment",
          reason: "Portfolio setup based on conservative risk profile",
          capitalBefore: baseValue,
          capitalAfter: baseValue * 1.03,
          returnGenerated: 3.15,
          alignmentType: "risk",
          alignmentDetail: "Prioritized capital preservation with 70% fixed income allocation",
        },
        {
          date: "Jul 2022",
          action: "Inflation Protection",
          reason: "Rising inflation threatened fixed income returns",
          capitalBefore: baseValue * 1.03,
          capitalAfter: baseValue * 1.05,
          returnGenerated: 2.25,
          alignmentType: "market",
          alignmentDetail: "Added inflation-protected securities during inflation spike",
        },
        {
          date: "Jan 2023",
          action: "Dividend Focus",
          reason: "Increased dividend allocation for income stability",
          capitalBefore: baseValue * 1.05,
          capitalAfter: baseValue * 1.08,
          returnGenerated: 2.85,
          alignmentType: "risk",
          alignmentDetail: "Enhanced income generation while maintaining conservative stance",
        },
        {
          date: "Sep 2023",
          action: "Quality Upgrade",
          reason: "Economic uncertainty prompted quality focus",
          capitalBefore: baseValue * 1.08,
          capitalAfter: baseValue * 1.12,
          returnGenerated: 3.45,
          alignmentType: "market",
          alignmentDetail: "Shifted to higher quality bonds during credit spread widening",
        },
      ]
    }
  }

  // Get rebalancing history based on client's risk profile
  const rebalancingHistory: RebalancingHistoryItem[] = getRebalancingHistory()

  // Calculate cumulative XIRR based on risk profile
  const cumulativeXIRR = client.riskProfile === "Aggressive" ? 14.25 : client.riskProfile === "Moderate" ? 10.75 : 7.35

  const nonRebalancedXIRR =
    client.riskProfile === "Aggressive" ? 10.15 : client.riskProfile === "Moderate" ? 7.85 : 5.45

  const xirDifference = cumulativeXIRR - nonRebalancedXIRR

  // Update the formatCurrency function to ensure consistent 2 decimal places
  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)}L`
  }

  // Add a new helper function for formatting percentages consistently
  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
              <AvatarFallback>
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{client.name}</h2>
              <p className="text-sm text-muted-foreground">{client.riskProfile} Risk Profile</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Last Rebalanced: {client.lastRebalanced}
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            ₹{(client.portfolioValue / 100000).toFixed(2)}L
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Portfolio Rebalancing</CardTitle>
            <Badge variant={isRebalancingRecommended ? "destructive" : "outline"} className="flex items-center gap-1">
              {isRebalancingRecommended ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
              {isRebalancingRecommended ? "Rebalancing Needed" : "Minor Adjustments"}
            </Badge>
          </div>
          <CardDescription>Adjust asset allocation to match the recommended portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Current vs. Recommended Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-3 text-left font-medium">Asset Class</th>
                        <th className="py-2 px-3 text-right font-medium">Current</th>
                        <th className="py-2 px-3 text-right font-medium">Over/Under</th>
                        <th className="py-2 px-3 text-right font-medium">Ideal Allocation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allocationData.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                              <span>{item.category}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-right">{item.current}%</td>
                          <td className="py-2.5 px-3 text-right">
                            {item.difference !== 0 && (
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  item.difference > 0
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                                }`}
                              >
                                {item.difference > 0 ? "+" : ""}
                                {item.difference}%
                              </Badge>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right font-medium">{item.recommended}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-amber-50 p-3 border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Total Imbalance: {totalImbalance}%</p>
                      <p className="text-xs text-amber-700">
                        {totalImbalance > 10 ? "Significant imbalance detected" : "Minor imbalance detected"}
                      </p>
                    </div>
                  </div>
                </div>

                {client.imbalances.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-3 border ${
                      item.difference > 0 ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {item.difference > 0 ? (
                        <Zap className="h-4 w-4 text-red-600 mt-0.5" />
                      ) : (
                        <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                      )}
                      <div>
                        <p className={`text-sm font-medium ${item.difference > 0 ? "text-red-800" : "text-blue-800"}`}>
                          {item.difference > 0 ? "Overweight" : "Underweight"} {item.category}
                        </p>
                        <p className={`text-xs ${item.difference > 0 ? "text-red-700" : "text-blue-700"}`}>
                          {item.difference > 0
                            ? `Reduce by ${Math.abs(item.difference)}% (₹${calculateAmount(Math.abs(item.difference))})`
                            : `Increase by ${Math.abs(item.difference)}% (₹${calculateAmount(Math.abs(item.difference))})`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="rounded-lg bg-green-50 p-3 border border-green-200">
                  <div className="flex items-start gap-2">
                    <PieChart className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Expected Outcome</p>
                      <p className="text-xs text-green-700">
                        Rebalancing will align with {client.riskProfile.toLowerCase()} risk profile
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setShowConfirmation(true)
                }}
              >
                Generate Rebalancing Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Confirm Rebalancing Plan</DialogTitle>
                <DialogDescription>
                  This will generate a rebalancing plan for {client.name}'s portfolio. You can review and share it with
                  the client.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Percent className="h-4 w-4" /> Summary of Changes
                </h4>
                <div className="space-y-2 text-sm">
                  {client.imbalances.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.category}:</span>
                      <span className={item.difference > 0 ? "text-red-600" : "text-blue-600"}>
                        {item.current}% → {item.recommended}% ({item.difference > 0 ? "-" : "+"}
                        {Math.abs(item.difference)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowConfirmation(false)
                    setShowRecommendations(true)
                    setShowPdfReport(true)
                  }}
                >
                  Confirm & Generate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      {/* Rebalancing History Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Rebalancing History & Impact</CardTitle>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">
              <PieChart className="h-3 w-3" /> Performance Analysis
            </Badge>
          </div>
          <CardDescription>Historical rebalancing actions and their impact on portfolio performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* XIRR Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-sm overflow-hidden bg-green-600">
              <CardContent className="p-5">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs uppercase tracking-wider font-medium text-white/90">With Rebalancing</span>
                  </div>
                  <span className="text-3xl font-bold tracking-tight text-white">
                    {formatPercent(cumulativeXIRR)} <span className="text-sm font-normal text-white/80">XIRR</span>
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm overflow-hidden bg-amber-600">
              <CardContent className="p-5">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded">
                      <AlertTriangle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs uppercase tracking-wider font-medium text-white/90">
                      Without Rebalancing
                    </span>
                  </div>
                  <span className="text-3xl font-bold tracking-tight text-white">
                    {formatPercent(nonRebalancedXIRR)} <span className="text-sm font-normal text-white/80">XIRR</span>
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm overflow-hidden bg-blue-600">
              <CardContent className="p-5">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs uppercase tracking-wider font-medium text-white/90">Value Added</span>
                  </div>
                  <span className="text-3xl font-bold tracking-tight text-white">+{formatPercent(xirDifference)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div className="relative mt-8">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-6">
              {rebalancingHistory.map((item, index) => {
                // Define asset changes based on the rebalancing event
                const assetChanges = {
                  sold:
                    item.alignmentType === "risk"
                      ? client.riskProfile === "Aggressive"
                        ? ["HDFC Liquid Fund", "ICICI Prudential Bond Fund"]
                        : client.riskProfile === "Moderate"
                          ? ["Axis Midcap Fund", "SBI Bluechip Fund"]
                          : ["HDFC Top 100 Fund", "Kotak Emerging Equity Fund"]
                      : item.date.includes("2022")
                        ? ["Axis Focused 25 Fund", "ICICI Prudential Technology Fund"]
                        : ["Nippon India Pharma Fund", "Aditya Birla Sun Life Digital India Fund"],
                  bought:
                    item.alignmentType === "risk"
                      ? client.riskProfile === "Aggressive"
                        ? ["Axis Small Cap Fund", "Parag Parikh Flexi Cap Fund"]
                        : client.riskProfile === "Moderate"
                          ? ["ICICI Prudential Balanced Advantage Fund", "Kotak Equity Hybrid Fund"]
                          : ["HDFC Corporate Bond Fund", "Aditya Birla Sun Life Savings Fund"]
                      : item.date.includes("2022")
                        ? ["Kotak Emerging Equity Fund", "SBI Small Cap Fund"]
                        : ["ICICI Prudential Value Discovery Fund", "Mirae Asset Large Cap Fund"],
                }

                return (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                      {index === 0 ? (
                        <div className="h-3 w-3 bg-white rounded-full"></div>
                      ) : (
                        <div className="text-xs text-white font-bold">{index}</div>
                      )}
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      {/* Header section with date and action */}
                      <div className="p-5 border-b border-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.action}</h4>
                            <p className="text-sm text-gray-500 mt-0.5">{item.date}</p>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-medium">
                            {formatCurrency(item.capitalBefore)} → {formatCurrency(item.capitalAfter)}
                          </Badge>
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="p-5 space-y-4">
                        {/* Reason for rebalancing */}
                        <div className="flex items-start gap-3 pb-3 border-b border-gray-50">
                          <div className="mt-0.5 bg-amber-100 p-1.5 rounded-md">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Reason for Rebalancing</p>
                            <p className="text-sm text-gray-600 mt-1">{item.reason}</p>
                          </div>
                        </div>

                        {/* Asset changes */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Assets sold */}
                          <div className="bg-red-50 rounded-lg p-3">
                            <p className="text-xs font-medium text-red-800 mb-2 uppercase tracking-wide">
                              Assets Reduced
                            </p>
                            <ul className="space-y-1">
                              {assetChanges.sold.map((asset, i) => (
                                <li key={i} className="text-sm text-red-700 flex items-center gap-1.5">
                                  <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                  {asset}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Assets bought */}
                          <div className="bg-green-50 rounded-lg p-3">
                            <p className="text-xs font-medium text-green-800 mb-2 uppercase tracking-wide">
                              Assets Added
                            </p>
                            <ul className="space-y-1">
                              {assetChanges.bought.map((asset, i) => (
                                <li key={i} className="text-sm text-green-700 flex items-center gap-1.5">
                                  <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                  {asset}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Results and alignment */}
                        <div className="flex flex-col space-y-3 pt-3 border-t border-gray-50">
                          {/* Return generated */}
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700 font-medium">Return Generated</span>
                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              +{formatPercent(item.returnGenerated)}
                            </span>
                          </div>

                          {/* Alignment badge */}
                          <div className="flex items-center gap-2 bg-blue-50 p-2.5 rounded-lg">
                            <div className="bg-blue-100 p-1 rounded">
                              {item.alignmentType === "risk" ? (
                                <PieChart className="h-3.5 w-3.5 text-blue-700" />
                              ) : (
                                <Zap className="h-3.5 w-3.5 text-blue-700" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-blue-800">
                                {item.alignmentType === "risk" ? "Risk Profile Alignment" : "Market Condition Response"}
                              </p>
                              <p className="text-xs text-blue-700 mt-0.5">{item.alignmentDetail}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border-0 shadow-sm mt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800 tracking-tight">Rebalancing Impact Analysis</p>
                <p className="text-sm text-blue-700 mt-2 leading-relaxed">
                  Regular portfolio rebalancing has added {formatPercent(xirDifference)} to your XIRR over time. This
                  disciplined approach has helped maintain optimal risk-adjusted returns and prevented portfolio drift.
                  {client.riskProfile === "Aggressive" ? (
                    <span>
                      {" "}
                      The most significant benefit came from the July 2023 rebalancing when we increased international
                      exposure during a valuation dip, aligning with your aggressive risk profile.
                    </span>
                  ) : client.riskProfile === "Moderate" ? (
                    <span>
                      {" "}
                      The most significant benefit came from the October 2023 rebalancing when we restored the 60/40
                      balance after equity outperformance, maintaining your moderate risk profile.
                    </span>
                  ) : (
                    <span>
                      {" "}
                      The most significant benefit came from the September 2023 quality upgrade during economic
                      uncertainty, preserving capital in line with your conservative risk profile.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showRecommendations && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="simple">
              <TabsList className="mb-4">
                <TabsTrigger value="simple">Simple View</TabsTrigger>
                <TabsTrigger value="detailed">Detailed View</TabsTrigger>
              </TabsList>
              <TabsContent value="simple" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-red-700">Reduce Exposure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {client.imbalances
                          .filter((item) => item.difference > 0)
                          .map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm">
                              <span>{item.category}</span>
                              <div>
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  -₹{calculateAmount(Math.abs(item.difference))}
                                </Badge>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-blue-700">Increase Exposure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {client.imbalances
                          .filter((item) => item.difference < 0)
                          .map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm">
                              <span>{item.category}</span>
                              <div>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  +₹{calculateAmount(Math.abs(item.difference))}
                                </Badge>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">Need help explaining this to your client?</p>
                      <p className="text-xs mt-1">
                        Use simple language: "We need to sell some of your mid-cap funds and buy more small-cap funds to
                        maintain the right balance for your risk profile."
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="detailed">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Detailed Rebalancing Steps</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Review current allocation and identify imbalances</li>
                      <li>Calculate the amount to be moved between asset classes</li>
                      <li>Identify specific funds to sell from overweight categories</li>
                      <li>Identify specific funds to buy in underweight categories</li>
                      <li>Execute trades in the most tax-efficient manner</li>
                      <li>Document changes for client communication</li>
                    </ol>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Tax Considerations</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Consider these tax implications when rebalancing:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Short-term capital gains are taxed at income tax rates</li>
                      <li>Long-term capital gains above ₹1 lakh are taxed at 10%</li>
                      <li>Consider selling funds held for more than 12 months when possible</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {showRecommendations && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setShowRecommendations(false)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                  <AvatarFallback>
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{client.name}</h2>
                  <p className="text-sm text-muted-foreground">{client.riskProfile} Risk Profile</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                ₹{(client.portfolioValue / 100000).toFixed(2)}L
              </Badge>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>ZinniAI Rebalancing Recommendations</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1"
                >
                  <Zap className="h-3 w-3" /> AI Optimized
                </Badge>
              </div>
              <CardDescription>Smart recommendations to achieve optimal portfolio balance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Client Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Expected XIRR After Rebalancing:</span>
                        <span className="font-medium text-green-600">{formatPercent(cumulativeXIRR)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current XIRR:</span>
                        <span className="font-medium">{formatPercent(nonRebalancedXIRR)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Improvement:</span>
                        <span className="font-medium text-green-600">+{formatPercent(xirDifference)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Risk Alignment:</span>
                        <span className="font-medium text-green-600">98%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Distributor Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Estimated Commission:</span>
                        <span className="font-medium text-green-600">
                          ₹{((client.portfolioValue * 0.0075) / 100000).toFixed(2)}L
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Trail Commission (Annual):</span>
                        <span className="font-medium">₹{((client.portfolioValue * 0.005) / 100000).toFixed(2)}L</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Client Satisfaction Score:</span>
                        <span className="font-medium text-green-600">High</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Recommended Fund Switches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-3 text-left font-medium">Sell</th>
                          <th className="py-2 px-3 text-right font-medium">Amount</th>
                          <th className="py-2 px-3 text-left font-medium">Buy</th>
                          <th className="py-2 px-3 text-right font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {client.imbalances
                          .filter((i) => i.difference > 0)
                          .map((item, index) => {
                            const buyItem = client.imbalances.find((i) => i.difference < 0)
                            return (
                              <tr key={index} className="border-b">
                                <td className="py-2.5 px-3">
                                  <div className="flex flex-col">
                                    <span>
                                      {item.category === "Mid Cap"
                                        ? "HDFC Mid-Cap Opportunities Fund"
                                        : item.category === "Cash"
                                          ? "HDFC Liquid Fund"
                                          : item.category === "Equity"
                                            ? "ICICI Prudential Bluechip Fund"
                                            : item.category === "Debt"
                                              ? "Kotak Bond Fund"
                                              : item.category === "Small Cap"
                                                ? "Nippon India Small Cap Fund"
                                                : item.category === "International"
                                                  ? "Franklin India Feeder - Franklin U.S. Opportunities Fund"
                                                  : "Axis Focused 25 Fund"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{item.category}</span>
                                  </div>
                                </td>
                                <td className="py-2.5 px-3 text-right text-red-600">
                                  -₹{calculateAmount(Math.abs(item.difference))}
                                </td>
                                <td className="py-2.5 px-3">
                                  <div className="flex flex-col">
                                    <span>
                                      {buyItem?.category === "Mid Cap"
                                        ? "Kotak Emerging Equity Fund"
                                        : buyItem?.category === "Small Cap"
                                          ? "SBI Small Cap Fund"
                                          : buyItem?.category === "Equity"
                                            ? "Mirae Asset Large Cap Fund"
                                            : buyItem?.category === "Debt"
                                              ? "Aditya Birla Sun Life Corporate Bond Fund"
                                              : buyItem?.category === "Gold"
                                                ? "SBI Gold Fund"
                                                : buyItem?.category === "Large Cap"
                                                  ? "Axis Bluechip Fund"
                                                  : "ICICI Prudential Value Discovery Fund"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{buyItem?.category}</span>
                                  </div>
                                </td>
                                <td className="py-2.5 px-3 text-right text-blue-600">
                                  +₹{calculateAmount(Math.abs(item.difference))}
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">ZinniAI Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-purple-50 p-4 border border-purple-200">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-purple-800">Portfolio Analysis</p>
                        <p className="text-sm text-purple-700 mt-1">
                          This rebalancing plan addresses the key imbalances in {client.name}'s portfolio while
                          maintaining the {client.riskProfile.toLowerCase()} risk profile. The recommended changes will
                          improve diversification and potentially enhance returns by{" "}
                          {client.riskProfile === "Aggressive"
                            ? formatPercent(4.1)
                            : client.riskProfile === "Moderate"
                              ? formatPercent(2.9)
                              : formatPercent(1.9)}
                          .
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Tax Efficiency</p>
                        <p className="text-sm text-blue-700 mt-1">
                          The recommended switches minimize tax impact by prioritizing funds held for more than 12
                          months. Estimated tax liability from this rebalancing: ₹
                          {(client.portfolioValue * 0.003).toFixed(0)}.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Client Communication</p>
                        <p className="text-sm text-green-700 mt-1">
                          Suggested explanation: "We're recommending these changes to better align your investments with
                          your financial goals and risk tolerance. These adjustments will help improve your portfolio's
                          potential returns while maintaining appropriate risk levels."
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowRecommendations(false)}>
                  Back to Rebalancing
                </Button>
                <Button>Share with Client</Button>
                <Button variant="default">Implement Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* PDF Report Dialog */}
      {showPdfReport && (
        <Dialog open={showPdfReport} onOpenChange={setShowPdfReport}>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Portfolio Rebalancing Report</DialogTitle>
              <DialogDescription>Detailed rebalancing plan for {client.name}'s portfolio</DialogDescription>
            </DialogHeader>
            <div className="py-4 overflow-y-auto flex-grow">
              <div className="bg-white rounded-lg p-6 text-black">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Portfolio Rebalancing Report</h2>
                    <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold">{client.name}</h3>
                    <p className="text-gray-600">{client.riskProfile} Risk Profile</p>
                    <p className="text-gray-600">Portfolio Value: ₹{(client.portfolioValue / 100000).toFixed(2)}L</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Current vs. Recommended Allocation</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-3 text-left font-medium">Asset Class</th>
                          <th className="py-2 px-3 text-right font-medium">Current</th>
                          <th className="py-2 px-3 text-right font-medium">Recommended</th>
                          <th className="py-2 px-3 text-right font-medium">Change</th>
                          <th className="py-2 px-3 text-right font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allocationData.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2.5 px-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                <span>{item.category}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-right">{item.current}%</td>
                            <td className="py-2.5 px-3 text-right">{item.recommended}%</td>
                            <td className="py-2.5 px-3 text-right">
                              {item.difference !== 0 && (
                                <span className={item.difference > 0 ? "text-red-600" : "text-green-600"}>
                                  {item.difference > 0 ? "+" : ""}
                                  {item.difference}%
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              {item.difference !== 0 && (
                                <span className={item.difference > 0 ? "text-red-600" : "text-green-600"}>
                                  {item.difference > 0 ? "-" : "+"}₹{calculateAmount(Math.abs(item.difference))}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Recommended Fund Switches</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-red-700">Reduce Exposure</h4>
                      <ul className="space-y-2">
                        {client.imbalances
                          .filter((item) => item.difference > 0)
                          .map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm">
                              <span>{item.category}</span>
                              <span className="text-red-700">-₹{calculateAmount(Math.abs(item.difference))}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-green-700">Increase Exposure</h4>
                      <ul className="space-y-2">
                        {client.imbalances
                          .filter((item) => item.difference < 0)
                          .map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm">
                              <span>{item.category}</span>
                              <span className="text-green-700">+₹{calculateAmount(Math.abs(item.difference))}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Expected Outcome</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Expected XIRR After Rebalancing:</span>
                        <span className="font-medium text-green-600">{formatPercent(cumulativeXIRR)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Current XIRR:</span>
                        <span className="font-medium">{formatPercent(nonRebalancedXIRR)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Improvement:</span>
                        <span className="font-medium text-green-600">+{formatPercent(xirDifference)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Risk Alignment:</span>
                        <span className="font-medium text-green-600">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Rebalancing Frequency:</span>
                        <span className="font-medium">Semi-Annual</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Next Review Date:</span>
                        <span className="font-medium">
                          {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl font-semibold mb-4">Advisor Notes</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    This rebalancing plan addresses the key imbalances in {client.name}'s portfolio while maintaining
                    the {client.riskProfile.toLowerCase()} risk profile. The recommended changes will improve
                    diversification and potentially enhance returns by {formatPercent(xirDifference)}.
                  </p>
                  <p className="text-sm text-gray-700">
                    Regular portfolio rebalancing has added {formatPercent(xirDifference)} to the XIRR over time. This
                    disciplined approach helps maintain optimal risk-adjusted returns and prevents portfolio drift.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-2 pt-2 border-t">
              <Button variant="outline" onClick={() => setShowPdfReport(false)}>
                Close
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Report
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Smartphone className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Copy className="h-4 w-4" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    <span>Generate PDF</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

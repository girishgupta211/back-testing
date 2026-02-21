"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Info,
  AlertTriangle,
  Shield,
  Zap,
  CheckCircle2,
  RefreshCw,
  Plus,
  PieChart,
  TrendingUp,
  BarChart3,
  BrainCircuit,
  Sparkles,
  Bot,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample client data with AUM breakdown and commission details
const clientsData = [
  {
    id: "c1",
    name: "Rahul Sharma",
    totalAum: 4500000,
    riskProfile: "Moderate",
    aumBreakdown: {
      equity: { current: 1800000, recommended: 2250000, change: "+25%" },
      debt: { current: 2025000, recommended: 1575000, change: "-22%" },
      hybrid: { current: 675000, recommended: 675000, change: "0%" },
    },
    commissionRates: {
      equity: 0.01,
      debt: 0.005,
      hybrid: 0.0075,
    },
    mismatch: "Low equity allocation for a moderate risk profile",
    recommendedFunds: [
      { name: "HDFC Mid-Cap Opportunities Fund", type: "Equity", action: "Buy", amount: 225000 },
      { name: "Axis Bluechip Fund", type: "Equity", action: "Buy", amount: 225000 },
      { name: "ICICI Prudential Bond Fund", type: "Debt", action: "Sell", amount: 450000 },
    ],
  },
  {
    id: "c2",
    name: "Priya Patel",
    totalAum: 7800000,
    riskProfile: "Conservative",
    aumBreakdown: {
      equity: { current: 2730000, recommended: 3900000, change: "+43%" },
      debt: { current: 3900000, recommended: 2730000, change: "-30%" },
      hybrid: { current: 1170000, recommended: 1170000, change: "0%" },
    },
    commissionRates: {
      equity: 0.01,
      debt: 0.005,
      hybrid: 0.0075,
    },
    mismatch: "Excessive debt allocation despite growth goals",
    recommendedFunds: [
      { name: "SBI Bluechip Fund", type: "Equity", action: "Buy", amount: 585000 },
      { name: "Kotak Emerging Equity Fund", type: "Equity", action: "Buy", amount: 585000 },
      { name: "Aditya Birla Sun Life Corporate Bond Fund", type: "Debt", action: "Sell", amount: 1170000 },
    ],
  },
  {
    id: "c3",
    name: "Amit Singh",
    totalAum: 12500000,
    riskProfile: "Aggressive",
    aumBreakdown: {
      equity: { current: 6250000, recommended: 7500000, change: "+20%" },
      debt: { current: 5000000, recommended: 3750000, change: "-25%" },
      hybrid: { current: 1250000, recommended: 1250000, change: "0%" },
    },
    commissionRates: {
      equity: 0.01,
      debt: 0.005,
      hybrid: 0.0075,
    },
    mismatch: "Insufficient equity for aggressive risk profile",
    recommendedFunds: [
      { name: "Mirae Asset Large Cap Fund", type: "Equity", action: "Buy", amount: 625000 },
      { name: "Axis Small Cap Fund", type: "Equity", action: "Buy", amount: 625000 },
      { name: "HDFC Corporate Bond Fund", type: "Debt", action: "Sell", amount: 1250000 },
    ],
  },
  {
    id: "c4",
    name: "Neha Gupta",
    totalAum: 3200000,
    riskProfile: "Moderate",
    aumBreakdown: {
      equity: { current: 960000, recommended: 1600000, change: "+67%" },
      debt: { current: 1920000, recommended: 1280000, change: "-33%" },
      hybrid: { current: 320000, recommended: 320000, change: "0%" },
    },
    commissionRates: {
      equity: 0.01,
      debt: 0.005,
      hybrid: 0.0075,
    },
    mismatch: "Significant equity underallocation for age and goals",
    recommendedFunds: [
      { name: "ICICI Prudential Bluechip Fund", type: "Equity", action: "Buy", amount: 320000 },
      { name: "SBI Focused Equity Fund", type: "Equity", action: "Buy", amount: 320000 },
      { name: "Kotak Bond Fund", type: "Debt", action: "Sell", amount: 640000 },
    ],
  },
  {
    id: "c5",
    name: "Vikram Malhotra",
    totalAum: 9500000,
    riskProfile: "Conservative",
    aumBreakdown: {
      equity: { current: 2850000, recommended: 4750000, change: "+67%" },
      debt: { current: 5700000, recommended: 3800000, change: "-33%" },
      hybrid: { current: 950000, recommended: 950000, change: "0%" },
    },
    commissionRates: {
      equity: 0.01,
      debt: 0.005,
      hybrid: 0.0075,
    },
    mismatch: "Overweight in debt funds with low returns",
    recommendedFunds: [
      { name: "Axis Focused 25 Fund", type: "Equity", action: "Buy", amount: 950000 },
      { name: "HDFC Top 100 Fund", type: "Equity", action: "Buy", amount: 950000 },
      { name: "ICICI Prudential Bond Fund", type: "Debt", action: "Sell", amount: 1900000 },
    ],
  },
]

// Calculate commission values for each client
const clientsWithCommissions = clientsData.map((client) => {
  // Calculate current commissions
  const currentEquityCommission = client.aumBreakdown.equity.current * client.commissionRates.equity
  const currentDebtCommission = client.aumBreakdown.debt.current * client.commissionRates.debt
  const currentHybridCommission = client.aumBreakdown.hybrid.current * client.commissionRates.hybrid
  const currentTotalCommission = currentEquityCommission + currentDebtCommission + currentHybridCommission

  // Calculate potential commissions
  const potentialEquityCommission = client.aumBreakdown.equity.recommended * client.commissionRates.equity
  const potentialDebtCommission = client.aumBreakdown.debt.recommended * client.commissionRates.debt
  const potentialHybridCommission = client.aumBreakdown.hybrid.recommended * client.commissionRates.hybrid
  const potentialTotalCommission = potentialEquityCommission + potentialDebtCommission + potentialHybridCommission

  // Calculate increase and percentage
  const increase = potentialTotalCommission - currentTotalCommission
  const increasePercentage = Math.round((increase / currentTotalCommission) * 100)

  return {
    ...client,
    commission: {
      current: {
        equity: currentEquityCommission,
        debt: currentDebtCommission,
        hybrid: currentHybridCommission,
        total: currentTotalCommission,
      },
      potential: {
        equity: potentialEquityCommission,
        debt: potentialDebtCommission,
        hybrid: potentialHybridCommission,
        total: potentialTotalCommission,
      },
      increase: increase,
      increasePercentage: increasePercentage,
    },
  }
})

export default function CommissionOptimizationPage() {
  const router = useRouter()
  const [expandedClient, setExpandedClient] = useState<string | null>(null)
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [showDetailReport, setShowDetailReport] = useState(false)
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
  const [planGenerated, setPlanGenerated] = useState(false)
  const [activeTab, setActiveTab] = useState("current")
  const [showRecommendedPlan, setShowRecommendedPlan] = useState(false)

  const toggleClientDetails = (clientId: string) => {
    if (expandedClient === clientId) {
      setExpandedClient(null)
    } else {
      setExpandedClient(clientId)
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`
    } else {
      return `₹${amount.toFixed(0)}`
    }
  }

  const getRiskIcon = (riskProfile: string) => {
    switch (riskProfile) {
      case "Conservative":
        return <Shield className="h-4 w-4 text-green-400" />
      case "Moderate":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />
      case "Aggressive":
        return <Zap className="h-4 w-4 text-red-400" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getRiskColor = (riskProfile: string) => {
    switch (riskProfile) {
      case "Conservative":
        return "text-green-400 border-green-400/30"
      case "Moderate":
        return "text-amber-400 border-amber-400/30"
      case "Aggressive":
        return "text-red-400 border-red-400/30"
      default:
        return "text-muted-foreground"
    }
  }

  const handleGenerateRebalancingPlan = (clientId) => {
    setIsGeneratingPlan(true)

    // If a specific client ID is provided, set it as the client being processed
    if (clientId) {
      setSelectedClient(clientId)
    }

    // Simulate API call
    setTimeout(() => {
      setIsGeneratingPlan(false)
      setPlanGenerated(true)
      setShowRecommendedPlan(true)
    }, 2000)
  }

  const handleViewDetailReport = (clientId: string) => {
    setSelectedClient(clientId)
    setShowDetailReport(true)
    setPlanGenerated(false)
    setShowRecommendedPlan(false)
  }

  const totalCurrentCommission = clientsWithCommissions.reduce(
    (sum, client) => sum + client.commission.current.total,
    0,
  )
  const totalPotentialCommission = clientsWithCommissions.reduce(
    (sum, client) => sum + client.commission.potential.total,
    0,
  )
  const totalIncrease = totalPotentialCommission - totalCurrentCommission
  const totalIncreasePercentage = Math.round((totalIncrease / totalCurrentCommission) * 100)

  const selectedClientData = clientsWithCommissions.find((client) => client.id === selectedClient)

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Commission Optimization</h1>
        </div>
      </div>

      {/* AI Copilot Banner */}
      <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <BrainCircuit className="h-6 w-6 text-blue-400" />
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-0">AI Copilot</Badge>
              </div>
              <h2 className="text-xl font-bold">Intelligent Commission Optimization</h2>
              <p className="text-gray-400 max-w-2xl">
                FinCopilot has analyzed your client portfolios and identified opportunities to increase your commission
                by up to {totalIncreasePercentage}% while better aligning with client risk profiles.
              </p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Sparkles className="h-4 w-4" />
              Apply All Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle>Potential Commission Increase</CardTitle>
          <CardDescription>Optimize your client portfolios to increase your commission earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-muted-foreground">Current Commission</p>
                  <p className="text-2xl font-semibold">{formatCurrency(totalCurrentCommission)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-muted-foreground">Potential Commission</p>
                  <p className="text-2xl font-semibold text-emerald-400">{formatCurrency(totalPotentialCommission)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-muted-foreground">Increase</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-semibold text-emerald-400">{formatCurrency(totalIncrease)}</p>
                    <Badge variant="outline" className="text-emerald-400 border-emerald-400/30">
                      +{totalIncreasePercentage}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-700 bg-gray-800/50">
                  <TableHead>Client Name</TableHead>
                  <TableHead className="text-right">Total AUM</TableHead>
                  <TableHead className="text-center">Risk Profile</TableHead>
                  <TableHead className="text-right">Current Commission</TableHead>
                  <TableHead className="text-right">Potential</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientsWithCommissions.map((client) => (
                  <>
                    <TableRow key={client.id} className="hover:bg-gray-800/50 border-b border-gray-700">
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(client.totalAum)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`${getRiskColor(client.riskProfile)}`}>
                          <span className="flex items-center">
                            {getRiskIcon(client.riskProfile)}
                            <span className="ml-1">{client.riskProfile}</span>
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(client.commission.current.total)}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-emerald-400">
                          {formatCurrency(client.commission.potential.total)} (+{client.commission.increasePercentage}%)
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => toggleClientDetails(client.id)}>
                            {expandedClient === client.id ? "Hide Details" : "View Details"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#0496ff]"
                            onClick={() => handleViewDetailReport(client.id)}
                          >
                            Detailed Report
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedClient === client.id && (
                      <TableRow className="bg-gray-800/30 border-b border-gray-700">
                        <TableCell colSpan={6} className="p-4">
                          <div className="space-y-4">
                            <div className="p-3 rounded-lg border border-amber-800/30 bg-amber-950/20 mb-4">
                              <div className="flex items-start">
                                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                <p className="text-sm">{client.mismatch}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                              {/* Equity allocation */}
                              <div className="space-y-2 p-3 rounded-lg border border-gray-700 bg-gray-800/50">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium">Equity Allocation</span>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="text-xs">Equity funds typically have higher commission rates</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                  <Badge variant="outline" className="text-emerald-400 border-emerald-400/30">
                                    {client.aumBreakdown.equity.change} Recommended
                                  </Badge>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Current: {formatCurrency(client.aumBreakdown.equity.current)}</span>
                                    <span>Target: {formatCurrency(client.aumBreakdown.equity.recommended)}</span>
                                  </div>
                                  <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                      <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-emerald-900/30 text-emerald-400">
                                          Increase
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex h-2 overflow-hidden text-xs bg-gray-700 rounded">
                                      <div
                                        style={{
                                          width: `${(client.aumBreakdown.equity.current / client.totalAum) * 100}%`,
                                        }}
                                        className="bg-gray-600"
                                      ></div>
                                    </div>
                                    <div className="flex h-2 mt-1 overflow-hidden text-xs bg-gray-700 rounded">
                                      <div
                                        style={{
                                          width: `${(client.aumBreakdown.equity.recommended / client.totalAum) * 100}%`,
                                        }}
                                        className="bg-emerald-500/50"
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Debt allocation */}
                              <div className="space-y-2 p-3 rounded-lg border border-gray-700 bg-gray-800/50">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium">Debt Allocation</span>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="text-xs">Debt funds typically have lower commission rates</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                  <Badge variant="outline" className="text-red-400 border-red-400/30">
                                    {client.aumBreakdown.debt.change} Recommended
                                  </Badge>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Current: {formatCurrency(client.aumBreakdown.debt.current)}</span>
                                    <span>Target: {formatCurrency(client.aumBreakdown.debt.recommended)}</span>
                                  </div>
                                  <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                      <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-red-900/30 text-red-400">
                                          Reduce
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex h-2 overflow-hidden text-xs bg-gray-700 rounded">
                                      <div
                                        style={{
                                          width: `${(client.aumBreakdown.debt.current / client.totalAum) * 100}%`,
                                        }}
                                        className="bg-gray-600"
                                      ></div>
                                    </div>
                                    <div className="flex h-2 mt-1 overflow-hidden text-xs bg-gray-700 rounded">
                                      <div
                                        style={{
                                          width: `${(client.aumBreakdown.debt.recommended / client.totalAum) * 100}%`,
                                        }}
                                        className="bg-red-500/50"
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Hybrid allocation */}
                              <div className="space-y-2 p-3 rounded-lg border border-gray-700 bg-gray-800/50">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium">Hybrid Allocation</span>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="text-xs">Hybrid funds have moderate commission rates</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                  <Badge variant="outline" className="text-muted-foreground">
                                    {client.aumBreakdown.hybrid.change} Maintain
                                  </Badge>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Current: {formatCurrency(client.aumBreakdown.hybrid.current)}</span>
                                    <span>Target: {formatCurrency(client.aumBreakdown.hybrid.recommended)}</span>
                                  </div>
                                  <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                      <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-gray-700 text-muted-foreground">
                                          Maintain
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex h-2 overflow-hidden text-xs bg-gray-700 rounded">
                                      <div
                                        style={{
                                          width: `${(client.aumBreakdown.hybrid.current / client.totalAum) * 100}%`,
                                        }}
                                        className="bg-gray-600"
                                      ></div>
                                    </div>
                                    <div className="flex h-2 mt-1 overflow-hidden text-xs bg-gray-700 rounded">
                                      <div
                                        style={{
                                          width: `${(client.aumBreakdown.hybrid.recommended / client.totalAum) * 100}%`,
                                        }}
                                        className="bg-gray-600"
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                              >
                                Schedule Client Meeting
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleGenerateRebalancingPlan(client.id)}
                                disabled={isGeneratingPlan}
                                className="gap-2"
                              >
                                {isGeneratingPlan && selectedClient === client.id ? (
                                  <>
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                  </>
                                ) : planGenerated && selectedClient === client.id && !showRecommendedPlan ? (
                                  <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Plan Generated
                                  </>
                                ) : (
                                  <>
                                    <BrainCircuit className="h-4 w-4" />
                                    Generate AI Proposal
                                  </>
                                )}
                              </Button>
                            </div>

                            {planGenerated && selectedClient === client.id && showRecommendedPlan && (
                              <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-lg font-semibold flex items-center">
                                    <BrainCircuit className="h-5 w-5 mr-2 text-[#0496ff]" />
                                    FinCopilot AI Recommendation
                                  </h3>
                                  <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800/30">
                                    AI Optimized
                                  </Badge>
                                </div>

                                <Card className="bg-gray-800 border-gray-700">
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-base">Recommended Fund Switches</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="border-b border-gray-700">
                                            <th className="py-2 px-3 text-left font-medium">Fund</th>
                                            <th className="py-2 px-3 text-center font-medium">Type</th>
                                            <th className="py-2 px-3 text-center font-medium">Action</th>
                                            <th className="py-2 px-3 text-right font-medium">Amount</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {client.recommendedFunds.map((fund, index) => (
                                            <tr key={index} className="border-b border-gray-700">
                                              <td className="py-2.5 px-3">{fund.name}</td>
                                              <td className="py-2.5 px-3 text-center">
                                                <Badge
                                                  variant="outline"
                                                  className={
                                                    fund.type === "Equity"
                                                      ? "bg-blue-900/20 text-blue-400 border-blue-800/30"
                                                      : fund.type === "Debt"
                                                        ? "bg-amber-900/20 text-amber-400 border-amber-800/30"
                                                        : "bg-green-900/20 text-green-400 border-green-800/30"
                                                  }
                                                >
                                                  {fund.type}
                                                </Badge>
                                              </td>
                                              <td className="py-2.5 px-3 text-center">
                                                <Badge
                                                  variant="outline"
                                                  className={
                                                    fund.action === "Buy"
                                                      ? "bg-emerald-900/20 text-emerald-400 border-emerald-800/30"
                                                      : "bg-red-900/20 text-red-400 border-red-800/30"
                                                  }
                                                >
                                                  {fund.action}
                                                </Badge>
                                              </td>
                                              <td className="py-2.5 px-3 text-right">
                                                <span
                                                  className={
                                                    fund.action === "Buy" ? "text-emerald-400" : "text-red-400"
                                                  }
                                                >
                                                  {fund.action === "Buy" ? "+" : "-"}
                                                  {formatCurrency(fund.amount)}
                                                </span>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </CardContent>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card className="bg-gray-800 border-gray-700">
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-base">Client Benefits</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Expected XIRR After Rebalancing:</span>
                                          <span className="font-medium text-green-400">12.8%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Current XIRR:</span>
                                          <span className="font-medium">10.2%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Improvement:</span>
                                          <span className="font-medium text-green-400">+2.6%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Risk Alignment:</span>
                                          <span className="font-medium text-green-400">98%</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-gray-800 border-gray-700">
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-base">Distributor Benefits</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Commission Increase:</span>
                                          <span className="font-medium text-green-400">
                                            {formatCurrency(client.commission.increase)} (+
                                            {client.commission.increasePercentage}%)
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Current Commission:</span>
                                          <span className="font-medium">
                                            {formatCurrency(client.commission.current.total)}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Potential Commission:</span>
                                          <span className="font-medium text-green-400">
                                            {formatCurrency(client.commission.potential.total)}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Client Satisfaction Score:</span>
                                          <span className="font-medium text-green-400">High</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                <Card className="bg-gray-800 border-gray-700">
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-base">FinCopilot AI Insights</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="rounded-lg bg-blue-900/20 p-4 border border-blue-800/30">
                                      <div className="flex items-start gap-3">
                                        <PieChart className="h-5 w-5 text-blue-400 mt-0.5" />
                                        <div>
                                          <p className="font-medium text-blue-400">Portfolio Analysis</p>
                                          <p className="text-sm text-blue-300 mt-1">
                                            This rebalancing plan addresses the key imbalances in {client.name}'s
                                            portfolio while maintaining the {client.riskProfile.toLowerCase()} risk
                                            profile. The recommended changes will improve diversification and
                                            potentially enhance returns.
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="rounded-lg bg-purple-900/20 p-4 border border-purple-800/30">
                                      <div className="flex items-start gap-3">
                                        <TrendingUp className="h-5 w-5 text-purple-400 mt-0.5" />
                                        <div>
                                          <p className="font-medium text-purple-400">Commission Impact</p>
                                          <p className="text-sm text-purple-300 mt-1">
                                            By increasing equity allocation and reducing debt exposure, your commission
                                            will increase by
                                            {formatCurrency(client.commission.increase)} annually, representing a
                                            {client.commission.increasePercentage}% increase over current levels.
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="rounded-lg bg-green-900/20 p-4 border border-green-800/30">
                                      <div className="flex items-start gap-3">
                                        <BarChart3 className="h-5 w-5 text-green-400 mt-0.5" />
                                        <div>
                                          <p className="font-medium text-green-400">Client Communication</p>
                                          <p className="text-sm text-green-300 mt-1">
                                            Suggested explanation: "We're recommending these changes to better align
                                            your investments with your financial goals and risk tolerance. These
                                            adjustments will help improve your portfolio's potential returns while
                                            maintaining appropriate risk levels."
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <div className="flex justify-end gap-3">
                                  <Button
                                    variant="outline"
                                    onClick={() => setShowRecommendedPlan(false)}
                                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                                  >
                                    Hide Plan
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="gap-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                                  >
                                    <Bot className="h-4 w-4" />
                                    Draft Client Email
                                  </Button>
                                  <Button variant="default" className="gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Implement Changes
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-[#0496ff]" />
              <span>FinCopilot AI Recommendations</span>
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Review the AI-recommended allocation changes for each client</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Schedule meetings with clients to discuss portfolio rebalancing</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>Use the AI-generated personalized proposals that align with client goals</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Implement changes gradually to maintain client comfort and trust</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Report Dialog */}
      {selectedClientData && (
        <Dialog open={showDetailReport} onOpenChange={setShowDetailReport}>
          <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle>Detailed Optimization Report: {selectedClientData.name}</DialogTitle>
              <DialogDescription>Current portfolio analysis and optimization recommendations</DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 bg-gray-800">
                <TabsTrigger value="current" className="data-[state=active]:bg-gray-700">
                  Current Portfolio
                </TabsTrigger>
                <TabsTrigger value="recommended" className="data-[state=active]:bg-gray-700">
                  Recommended Portfolio
                </TabsTrigger>
                <TabsTrigger value="commission" className="data-[state=active]:bg-gray-700">
                  Commission Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Current Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Equity</span>
                          <span className="text-sm font-medium">
                            {Math.round(
                              (selectedClientData.aumBreakdown.equity.current / selectedClientData.totalAum) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(selectedClientData.aumBreakdown.equity.current / selectedClientData.totalAum) * 100}
                          className="h-2 bg-gray-700 [&>div]:bg-blue-500"
                        />

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Debt</span>
                          <span className="text-sm font-medium">
                            {Math.round(
                              (selectedClientData.aumBreakdown.debt.current / selectedClientData.totalAum) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(selectedClientData.aumBreakdown.debt.current / selectedClientData.totalAum) * 100}
                          className="h-2 bg-gray-700 [&>div]:bg-amber-500"
                        />

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Hybrid</span>
                          <span className="text-sm font-medium">
                            {Math.round(
                              (selectedClientData.aumBreakdown.hybrid.current / selectedClientData.totalAum) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(selectedClientData.aumBreakdown.hybrid.current / selectedClientData.totalAum) * 100}
                          className="h-2 bg-gray-700 [&>div]:bg-green-500"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Current Portfolio Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                          <span className="text-sm">Total AUM</span>
                          <span className="font-medium">{formatCurrency(selectedClientData.totalAum)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                          <span className="text-sm">Risk Profile</span>
                          <Badge variant="outline" className={`${getRiskColor(selectedClientData.riskProfile)}`}>
                            <span className="flex items-center">
                              {getRiskIcon(selectedClientData.riskProfile)}
                              <span className="ml-1">{selectedClientData.riskProfile}</span>
                            </span>
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                          <span className="text-sm">Current Commission</span>
                          <span className="font-medium">
                            {formatCurrency(selectedClientData.commission.current.total)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                          <span className="text-sm">Commission Rate</span>
                          <span className="font-medium">
                            {(
                              (selectedClientData.commission.current.total / selectedClientData.totalAum) *
                              100
                            ).toFixed(2)}
                            %
                          </span>
                        </div>
                        <div className="p-3 rounded-lg border border-amber-800/30 bg-amber-950/20 mt-2">
                          <div className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-sm">{selectedClientData.mismatch}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Recommended Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Equity</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">
                              {Math.round(
                                (selectedClientData.aumBreakdown.equity.recommended / selectedClientData.totalAum) *
                                  100,
                              )}
                              %
                            </span>
                            <Badge className="ml-2 bg-emerald-900/20 text-emerald-400 border-emerald-400/30">
                              {selectedClientData.aumBreakdown.equity.change}
                            </Badge>
                          </div>
                        </div>
                        <Progress
                          value={
                            (selectedClientData.aumBreakdown.equity.recommended / selectedClientData.totalAum) * 100
                          }
                          className="h-2 bg-gray-700 [&>div]:bg-emerald-500"
                        />

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Debt</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">
                              {Math.round(
                                (selectedClientData.aumBreakdown.debt.recommended / selectedClientData.totalAum) * 100,
                              )}
                              %
                            </span>
                            <Badge className="ml-2 bg-red-900/20 text-red-400 border-red-400/30">
                              {selectedClientData.aumBreakdown.debt.change}
                            </Badge>
                          </div>
                        </div>
                        <Progress
                          value={(selectedClientData.aumBreakdown.debt.recommended / selectedClientData.totalAum) * 100}
                          className="h-2 bg-gray-700 [&>div]:bg-red-500"
                        />

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Hybrid</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">
                              {Math.round(
                                (selectedClientData.aumBreakdown.hybrid.recommended / selectedClientData.totalAum) *
                                  100,
                              )}
                              %
                            </span>
                            <Badge className="ml-2 bg-gray-700 text-muted-foreground">
                              {selectedClientData.aumBreakdown.hybrid.change}
                            </Badge>
                          </div>
                        </div>
                        <Progress
                          value={
                            (selectedClientData.aumBreakdown.hybrid.recommended / selectedClientData.totalAum) * 100
                          }
                          className="h-2 bg-gray-700 [&>div]:bg-gray-500"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Rebalancing Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg border border-emerald-800/30 bg-emerald-950/20">
                          <div className="flex items-start">
                            <div className="rounded-full w-5 h-5 bg-emerald-900/50 flex items-center justify-center text-emerald-400 mr-2 flex-shrink-0">
                              <Plus className="h-3 w-3" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Increase Equity Allocation</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Add{" "}
                                {formatCurrency(
                                  selectedClientData.aumBreakdown.equity.recommended -
                                    selectedClientData.aumBreakdown.equity.current,
                                )}{" "}
                                to equity funds
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg border border-red-800/30 bg-red-950/20">
                          <div className="flex items-start">
                            <div className="rounded-full w-5 h-5 bg-red-900/50 flex items-center justify-center text-red-400 mr-2 flex-shrink-0">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                              >
                                <path
                                  d="M18 6L6 18M6 6L18 18"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Reduce Debt Allocation</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Reduce debt funds by{" "}
                                {formatCurrency(
                                  selectedClientData.aumBreakdown.debt.current -
                                    selectedClientData.aumBreakdown.debt.recommended,
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg border border-gray-700 bg-gray-800/50">
                          <div className="flex items-start">
                            <div className="rounded-full w-5 h-5 bg-gray-700 flex items-center justify-center text-muted-foreground mr-2 flex-shrink-0">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                              >
                                <path
                                  d="M5 12H19"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Maintain Hybrid Allocation</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Keep hybrid funds at {formatCurrency(selectedClientData.aumBreakdown.hybrid.current)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button
                            className="w-full gap-2"
                            onClick={() => handleGenerateRebalancingPlan(selectedClient)}
                            disabled={isGeneratingPlan}
                          >
                            {isGeneratingPlan ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Generating Rebalancing Plan...
                              </>
                            ) : planGenerated ? (
                              <>
                                <BrainCircuit className="mr-2 h-4 w-4" />
                                View AI Recommended Plan
                              </>
                            ) : (
                              <>
                                <BrainCircuit className="mr-2 h-4 w-4" />
                                Generate AI Proposal
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="commission" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Commission Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                          <span className="text-sm">Current</span>
                          <span className="font-medium">
                            {formatCurrency(selectedClientData.commission.current.total)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                          <span className="text-sm">Potential</span>
                          <span className="font-medium text-emerald-400">
                            {formatCurrency(selectedClientData.commission.potential.total)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2">
                          <span className="text-sm">Increase</span>
                          <div className="flex items-center">
                            <span className="font-medium text-emerald-400">
                              {formatCurrency(selectedClientData.commission.increase)}
                            </span>
                            <Badge className="ml-2 bg-emerald-900/20 text-emerald-400 border-emerald-400/30">
                              +{selectedClientData.commission.increasePercentage}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Asset Class Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="py-2 text-left text-xs font-medium">Asset</th>
                            <th className="py-2 text-right text-xs font-medium">Current</th>
                            <th className="py-2 text-right text-xs font-medium">Potential</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Equity</td>
                            <td className="py-2 text-right">
                              {formatCurrency(selectedClientData.commission.current.equity)}
                            </td>
                            <td className="py-2 text-right text-emerald-400">
                              {formatCurrency(selectedClientData.commission.potential.equity)}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Debt</td>
                            <td className="py-2 text-right">
                              {formatCurrency(selectedClientData.commission.current.debt)}
                            </td>
                            <td className="py-2 text-right text-red-400">
                              {formatCurrency(selectedClientData.commission.potential.debt)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">Hybrid</td>
                            <td className="py-2 text-right">
                              {formatCurrency(selectedClientData.commission.current.hybrid)}
                            </td>
                            <td className="py-2 text-right">
                              {formatCurrency(selectedClientData.commission.potential.hybrid)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Commission Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start">
                      <BrainCircuit className="h-4 w-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm">
                        Rebalancing {selectedClientData.name}'s portfolio to increase equity allocation will boost your
                        annual commission by {formatCurrency(selectedClientData.commission.increase)} (
                        {selectedClientData.commission.increasePercentage}%).
                      </p>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                      <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                        Schedule Meeting
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleGenerateRebalancingPlan(selectedClient)}
                      >
                        <BrainCircuit className="h-4 w-4" />
                        Generate Proposal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

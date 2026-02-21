"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  Filter,
  ArrowUpRight,
  Plus,
  Link2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Smartphone,
  BarChart3,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronRight,
  DollarSign,
  Wallet,
  Calendar,
  Clock,
  User,
  FileBarChart,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts"

// Add code to check for the query parameter and automatically set the correct step
// Add this at the beginning of the PortfolioXray component

// Add this import at the top of the file
import { useSearchParams } from "next/navigation"

// Add client-specific data for different clients
const clientData = {
  "rahul-sharma": {
    name: "Rahul Sharma",
    mobile: "9876543210",
    aadhaar: "1234 5678 9012",
    pan: "ABCDE1234F",
    uan: "123456789012",
    assetAllocationData: [
      { name: "Equity", value: 30, color: "#0496ff", xirr: 12.5, commission: 1.2 },
      { name: "Debt", value: 25, color: "#00C49F", xirr: 7.2, commission: 0.5 },
      { name: "Gold", value: 15, color: "#FFBB28", xirr: 8.0, commission: 0.0 },
      { name: "Real Estate", value: 5, color: "#FF8042", xirr: 9.5, commission: 0.0 },
      { name: "Cash", value: 25, color: "#8884d8", xirr: 3.5, commission: 0.0 },
    ],
    portfolioReturns: {
      "1y": { portfolio: 10.5, benchmark: 12.2 },
      "3y": { portfolio: 9.8, benchmark: 11.5 },
      "5y": { portfolio: 11.2, benchmark: 12.8 },
    },
    totalValue: "₹21,00,000",
    reportDate: "15 Apr 2023",
    fundData: [
      {
        id: "1",
        name: "Axis Bluechip Fund",
        category: "Large Cap",
        currentValue: 250000,
        xirr: 12.5,
        allocation: 15,
        change: 8.2,
        benchmark: "Nifty 50",
        benchmarkReturn: 10.8,
        performance: "Outperforming",
        alternatives: [
          { name: "HDFC Top 100 Fund", xirr: 13.2 },
          { name: "ICICI Pru Bluechip Fund", xirr: 13.0 },
        ],
      },
      {
        id: "2",
        name: "HDFC Mid-Cap Opportunities",
        category: "Mid Cap",
        currentValue: 180000,
        xirr: 14.2,
        allocation: 10,
        change: 12.5,
        benchmark: "Nifty Midcap 150",
        benchmarkReturn: 15.5,
        performance: "Underperforming",
        alternatives: [
          { name: "Kotak Emerging Equity Fund", xirr: 16.8 },
          { name: "Axis Midcap Fund", xirr: 16.2 },
        ],
      },
      {
        id: "3",
        name: "SBI Small Cap Fund",
        category: "Small Cap",
        currentValue: 120000,
        xirr: 16.8,
        allocation: 8,
        change: 15.2,
        benchmark: "Nifty Smallcap 250",
        benchmarkReturn: 14.5,
        performance: "Outperforming",
        alternatives: [],
      },
    ],
    insights: {
      underperforming: true,
      cashDrag: true,
      commissionOpportunity: 31500,
    },
  },
  "priya-patel": {
    name: "Priya Patel",
    mobile: "8765432109",
    aadhaar: "2345 6789 0123",
    pan: "FGHIJ5678K",
    uan: "234567890123",
    assetAllocationData: [
      { name: "Equity", value: 45, color: "#0496ff", xirr: 13.8, commission: 1.2 },
      { name: "Debt", value: 30, color: "#00C49F", xirr: 6.5, commission: 0.5 },
      { name: "Gold", value: 10, color: "#FFBB28", xirr: 7.5, commission: 0.0 },
      { name: "Real Estate", value: 10, color: "#FF8042", xirr: 8.2, commission: 0.0 },
      { name: "Cash", value: 5, color: "#8884d8", xirr: 3.2, commission: 0.0 },
    ],
    portfolioReturns: {
      "1y": { portfolio: 12.8, benchmark: 12.2 },
      "3y": { portfolio: 11.5, benchmark: 10.8 },
      "5y": { portfolio: 13.2, benchmark: 12.5 },
    },
    totalValue: "₹32,50,000",
    reportDate: "22 May 2023",
    fundData: [
      {
        id: "1",
        name: "ICICI Pru Bluechip Fund",
        category: "Large Cap",
        currentValue: 450000,
        xirr: 13.2,
        allocation: 18,
        change: 9.5,
        benchmark: "Nifty 50",
        benchmarkReturn: 10.8,
        performance: "Outperforming",
        alternatives: [],
      },
      {
        id: "2",
        name: "Kotak Emerging Equity Fund",
        category: "Mid Cap",
        currentValue: 380000,
        xirr: 16.5,
        allocation: 15,
        change: 14.2,
        benchmark: "Nifty Midcap 150",
        benchmarkReturn: 15.5,
        performance: "Outperforming",
        alternatives: [],
      },
      {
        id: "3",
        name: "Nippon India Small Cap Fund",
        category: "Small Cap",
        currentValue: 220000,
        xirr: 15.8,
        allocation: 12,
        change: 13.5,
        benchmark: "Nifty Smallcap 250",
        benchmarkReturn: 14.5,
        performance: "Outperforming",
        alternatives: [],
      },
    ],
    insights: {
      underperforming: false,
      cashDrag: false,
      commissionOpportunity: 18200,
    },
  },
  "amit-singh": {
    name: "Amit Singh",
    mobile: "7654321098",
    aadhaar: "3456 7890 1234",
    pan: "KLMNO9012P",
    uan: "345678901234",
    assetAllocationData: [
      { name: "Equity", value: 20, color: "#0496ff", xirr: 11.2, commission: 1.2 },
      { name: "Debt", value: 35, color: "#00C49F", xirr: 7.8, commission: 0.5 },
      { name: "Gold", value: 20, color: "#FFBB28", xirr: 9.2, commission: 0.0 },
      { name: "Real Estate", value: 15, color: "#FF8042", xirr: 8.5, commission: 0.0 },
      { name: "Cash", value: 10, color: "#8884d8", xirr: 3.8, commission: 0.0 },
    ],
    portfolioReturns: {
      "1y": { portfolio: 9.2, benchmark: 11.5 },
      "3y": { portfolio: 8.5, benchmark: 10.2 },
      "5y": { portfolio: 9.8, benchmark: 11.8 },
    },
    totalValue: "₹18,75,000",
    reportDate: "8 Jun 2023",
    fundData: [
      {
        id: "1",
        name: "HDFC Top 100 Fund",
        category: "Large Cap",
        currentValue: 180000,
        xirr: 10.5,
        allocation: 12,
        change: 7.2,
        benchmark: "Nifty 50",
        benchmarkReturn: 10.8,
        performance: "Underperforming",
        alternatives: [
          { name: "Axis Bluechip Fund", xirr: 12.5 },
          { name: "ICICI Pru Bluechip Fund", xirr: 13.0 },
        ],
      },
      {
        id: "2",
        name: "SBI Magnum Midcap Fund",
        category: "Mid Cap",
        currentValue: 150000,
        xirr: 13.5,
        allocation: 8,
        change: 11.2,
        benchmark: "Nifty Midcap 150",
        benchmarkReturn: 15.5,
        performance: "Underperforming",
        alternatives: [
          { name: "Kotak Emerging Equity Fund", xirr: 16.8 },
          { name: "Axis Midcap Fund", xirr: 16.2 },
        ],
      },
      {
        id: "3",
        name: "ICICI Pru Corporate Bond Fund",
        category: "Debt",
        currentValue: 320000,
        xirr: 7.8,
        allocation: 18,
        change: 5.5,
        benchmark: "CRISIL Composite Bond Fund Index",
        benchmarkReturn: 6.8,
        performance: "Outperforming",
        alternatives: [],
      },
    ],
    insights: {
      underperforming: true,
      cashDrag: false,
      commissionOpportunity: 42500,
    },
  },
  "neha-gupta": {
    name: "Neha Gupta",
    mobile: "6543210987",
    aadhaar: "4567 8901 2345",
    pan: "QRSTU3456V",
    uan: "456789012345",
    assetAllocationData: [
      { name: "Equity", value: 55, color: "#0496ff", xirr: 14.5, commission: 1.2 },
      { name: "Debt", value: 20, color: "#00C49F", xirr: 6.8, commission: 0.5 },
      { name: "Gold", value: 5, color: "#FFBB28", xirr: 7.2, commission: 0.0 },
      { name: "Real Estate", value: 5, color: "#FF8042", xirr: 8.8, commission: 0.0 },
      { name: "Cash", value: 15, color: "#8884d8", xirr: 3.5, commission: 0.0 },
    ],
    portfolioReturns: {
      "1y": { portfolio: 11.8, benchmark: 12.2 },
      "3y": { portfolio: 10.5, benchmark: 11.5 },
      "5y": { portfolio: 12.8, benchmark: 12.8 },
    },
    totalValue: "₹42,80,000",
    reportDate: "30 Mar 2023",
    fundData: [
      {
        id: "1",
        name: "Mirae Asset Large Cap Fund",
        category: "Large Cap",
        currentValue: 650000,
        xirr: 13.8,
        allocation: 20,
        change: 10.2,
        benchmark: "Nifty 50",
        benchmarkReturn: 10.8,
        performance: "Outperforming",
        alternatives: [],
      },
      {
        id: "2",
        name: "Axis Midcap Fund",
        category: "Mid Cap",
        currentValue: 580000,
        xirr: 16.2,
        allocation: 18,
        change: 13.8,
        benchmark: "Nifty Midcap 150",
        benchmarkReturn: 15.5,
        performance: "Outperforming",
        alternatives: [],
      },
      {
        id: "3",
        name: "Aditya Birla SL Corporate Bond Fund",
        category: "Debt",
        currentValue: 420000,
        xirr: 6.8,
        allocation: 12,
        change: 4.5,
        benchmark: "CRISIL Composite Bond Fund Index",
        benchmarkReturn: 6.8,
        performance: "Equal",
        alternatives: [],
      },
    ],
    insights: {
      underperforming: false,
      cashDrag: true,
      commissionOpportunity: 28500,
    },
  },
}

// Underperformance breakdown data
const underperformanceBreakdown = {
  "1y": {
    underperformingFunds: 32500,
    cashDrag: 47250,
    otherFactors: 80250,
    total: 160000,
  },
  "3y": {
    underperformingFunds: 105000,
    cashDrag: 135000,
    otherFactors: 210000,
    total: 450000,
  },
  "5y": {
    underperformingFunds: 185000,
    cashDrag: 225000,
    otherFactors: 340000,
    total: 750000,
  },
}

const performanceData = [
  { name: "Jan", equity: 12.5, debt: 6.8, gold: 8.2, benchmark: 10.2 },
  { name: "Feb", equity: 13.2, debt: 6.5, gold: 7.8, benchmark: 10.5 },
  { name: "Mar", equity: 14.8, debt: 7.0, gold: 8.0, benchmark: 11.2 },
  { name: "Apr", equity: 14.2, debt: 7.2, gold: 8.5, benchmark: 11.0 },
  { name: "May", equity: 15.5, debt: 7.0, gold: 9.0, benchmark: 11.8 },
  { name: "Jun", equity: 16.2, debt: 6.9, gold: 8.8, benchmark: 12.0 },
]

const historicalData = [
  { month: "Jul '22", value: 1500000 },
  { month: "Aug '22", value: 1550000 },
  { month: "Sep '22", value: 1520000 },
  { month: "Oct '22", value: 1600000 },
  { month: "Nov '22", value: 1650000 },
  { month: "Dec '22", value: 1700000 },
  { month: "Jan '23", value: 1750000 },
  { month: "Feb '23", value: 1800000 },
  { month: "Mar '23", value: 1850000 },
  { month: "Apr '23", value: 1900000 },
  { month: "May '23", value: 2000000 },
  { month: "Jun '23", value: 2100000 },
]

// Rebalancing plan data
const rebalancingPlanData = [
  {
    type: "Buy",
    assetClass: "Equity",
    fund: "Axis Bluechip Fund",
    amount: 150000,
    commission: 1800,
    expectedReturn: "12.5%",
    rationale: "Increase large cap exposure for stability",
  },
  {
    type: "Buy",
    assetClass: "Equity",
    fund: "SBI Small Cap Fund",
    amount: 120000,
    commission: 1440,
    expectedReturn: "16.8%",
    rationale: "Add small cap exposure for growth",
  },
  {
    type: "Buy",
    assetClass: "Equity",
    fund: "Kotak Emerging Equity Fund",
    amount: 150000,
    commission: 1800,
    expectedReturn: "16.8%",
    rationale: "Replace underperforming mid-cap fund",
  },
  {
    type: "Buy",
    assetClass: "Debt",
    fund: "ICICI Pru Corporate Bond Fund",
    amount: 105000,
    commission: 525,
    expectedReturn: "7.2%",
    rationale: "Increase debt allocation for stability",
  },
  {
    type: "Sell",
    assetClass: "Gold",
    fund: "Gold ETF",
    amount: 105000,
    commission: 0,
    expectedReturn: "8.0%",
    rationale: "Reduce gold allocation to recommended level",
  },
  {
    type: "Sell",
    assetClass: "Cash",
    fund: "Savings Account",
    amount: 420000,
    commission: 0,
    expectedReturn: "3.5%",
    rationale: "Reduce cash drag on portfolio",
  },
]

// Enum for the different steps in the portfolio analysis flow
enum PortfolioStep {
  DASHBOARD = 0,
  SELECT_CLIENT = 1,
  LINK_ASSETS = 2,
  MANUAL_ENTRY = 3,
  ANALYSIS = 4,
  REPORT = 5,
}

export function PortfolioXray() {
  const [selectedClient, setSelectedClient] = useState("rahul-sharma")
  const [timeframe, setTimeframe] = useState("1y")
  const [currentStep, setCurrentStep] = useState<PortfolioStep>(PortfolioStep.DASHBOARD)
  const [linkMethod, setLinkMethod] = useState<"auto" | "manual">("auto")
  const [clientDetails, setClientDetails] = useState({
    name: "",
    mobile: "",
    aadhaar: "",
    pan: "",
    uan: "",
  })
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otp, setOtp] = useState("")
  const [linkedAccounts, setLinkedAccounts] = useState<string[]>([])
  const [assetTypes, setAssetTypes] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [reportTab, setReportTab] = useState("overview")

  const [showUnderperformingDetails, setShowUnderperformingDetails] = useState(false)
  const [showCashRecommendations, setShowCashRecommendations] = useState(false)
  const [showRebalancingPlan, setShowRebalancingPlan] = useState(false)
  const [rebalancingPlanGenerated, setRebalancingPlanGenerated] = useState(false)
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
  const [recentXRays, setRecentXRays] = useState([
    { id: "rahul-sharma", date: "15 Apr 2023" },
    { id: "priya-patel", date: "22 May 2023" },
    { id: "amit-singh", date: "8 Jun 2023" },
    { id: "neha-gupta", date: "30 Mar 2023" },
  ])

  // Add a new state variable for showing/hiding the missed returns breakdown.
  const [showMissedReturnsBreakdown, setShowMissedReturnsBreakdown] = useState(false)

  // Add this code right after all the useState declarations but before any other code
  const searchParams = useSearchParams()
  const startNewXRay = searchParams.get("startNewXRay") === "true"

  // Add this useEffect to automatically set the correct step when the component mounts
  useEffect(() => {
    if (startNewXRay) {
      setCurrentStep(PortfolioStep.LINK_ASSETS)
      setLinkMethod("auto")
    }
  }, [startNewXRay])

  // Calculate overall portfolio performance
  const overallPerformance = 10.5
  const benchmarkPerformance = 12.2
  const isOutperforming = overallPerformance > benchmarkPerformance

  // Function to handle client name field click
  const handleClientNameClick = () => {
    if (selectedClient && clientData[selectedClient]) {
      setClientDetails({
        name: clientData[selectedClient].name,
        mobile: clientData[selectedClient].mobile,
        aadhaar: clientData[selectedClient].aadhaar,
        pan: clientData[selectedClient].pan,
        uan: clientData[selectedClient].uan,
      })
    }
  }

  // Function to handle OTP verification
  const handleSendOTP = () => {
    // In a real app, this would send an OTP to the client's mobile
    setOtpSent(true)
  }

  const handleVerifyOTP = () => {
    // In a real app, this would verify the OTP
    if (otp === "123456") {
      setOtpVerified(true)
      // Simulate finding linked accounts
      setLinkedAccounts([
        "HDFC Bank - XXXX6789",
        "SBI Demat - XXXX4567",
        "Zerodha - ZD1234",
        "CAMS MF - XXXX8901",
        "EPF - UAN XXXX5678",
      ])

      // Simulate finding asset types
      setAssetTypes(["Mutual Funds", "Stocks", "Account Bal", "Fixed Deposits", "EPF"])
    }
  }

  const handleAnalyzePortfolio = () => {
    setIsAnalyzing(true)
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setCurrentStep(PortfolioStep.REPORT)
    }, 2000)
  }

  const handleGenerateRebalancingPlan = () => {
    setIsGeneratingPlan(true)
    // Simulate generating the plan
    setTimeout(() => {
      setIsGeneratingPlan(false)
      setRebalancingPlanGenerated(true)
    }, 1500)
  }

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Portfolio X-Ray</h2>
            <p className="text-sm text-muted-foreground">Comprehensive analysis of client portfolios</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileBarChart className="mr-2 h-5 w-5 text-[#0496ff]" />
                New X-Ray
              </CardTitle>
              <CardDescription>Start a new portfolio analysis</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground mb-4">
                Analyze a client's portfolio to identify opportunities for optimization and increased returns.
              </p>
              <Button
                onClick={() => {
                  setLinkMethod("auto")
                  setCurrentStep(PortfolioStep.LINK_ASSETS)
                }}
                className="w-full"
              >
                Start New X-Ray
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-[#0496ff]" />
                Recent X-Rays
              </CardTitle>
              <CardDescription>View recent portfolio analyses</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                {recentXRays.map((xray) => (
                  <div
                    key={xray.id}
                    className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 cursor-pointer transition-all"
                    onClick={() => {
                      setSelectedClient(xray.id)
                      setCurrentStep(PortfolioStep.REPORT)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-8 w-8 p-1.5 rounded-full bg-[#0496ff]/10 text-[#0496ff]" />
                      <div>
                        <p className="font-medium">{clientData[xray.id].name}</p>
                        <p className="text-xs text-muted-foreground">
                          {xray.date} • {clientData[xray.id].totalValue}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderClientSelection = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select Client</CardTitle>
          <CardDescription>Choose a client to analyze their portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Client</label>
              <Select
                value={selectedClient}
                onValueChange={(value) => {
                  setSelectedClient(value)
                  setCurrentStep(PortfolioStep.LINK_ASSETS)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rahul-sharma">Rahul Sharma</SelectItem>
                  <SelectItem value="priya-patel">Priya Patel</SelectItem>
                  <SelectItem value="amit-singh">Amit Singh</SelectItem>
                  <SelectItem value="neha-gupta">Neha Gupta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(PortfolioStep.DASHBOARD)}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(PortfolioStep.LINK_ASSETS)}>
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderLinkAssets = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Link Client Assets</CardTitle>
          <CardDescription>Choose how you want to link client assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                className={`cursor-pointer transition-all ${linkMethod === "auto" ? "ring-2 ring-[#0496ff]" : "hover:bg-muted/50"}`}
                onClick={() => setLinkMethod("auto")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Link2 className="mr-2 h-5 w-5 text-[#0496ff]" />
                    Automatic Linking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Link client's assets automatically using Aadhaar, PAN, and mobile verification.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${linkMethod === "manual" ? "ring-2 ring-[#0496ff]" : "hover:bg-muted/50"}`}
                onClick={() => setLinkMethod("manual")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Plus className="mr-2 h-5 w-5 text-[#0496ff]" />
                    Manual Entry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Manually add and manage client's assets one by one.</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(PortfolioStep.SELECT_CLIENT)}>
                Back
              </Button>
              <Button
                onClick={() => {
                  if (linkMethod === "auto") {
                    setCurrentStep(PortfolioStep.LINK_ASSETS)
                  } else {
                    setCurrentStep(PortfolioStep.MANUAL_ENTRY)
                  }
                }}
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderAutoLinking = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Automatic Asset Linking</CardTitle>
          <CardDescription>Verify client identity to link their assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Client Name</label>
                <Input
                  placeholder="Enter full name"
                  value={clientDetails.name}
                  onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                  onClick={handleClientNameClick}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mobile Number</label>
                <Input
                  placeholder="Enter 10-digit mobile number"
                  value={clientDetails.mobile}
                  onChange={(e) => setClientDetails({ ...clientDetails, mobile: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Aadhaar Number</label>
                <Input
                  placeholder="Enter 12-digit Aadhaar number"
                  value={clientDetails.aadhaar}
                  onChange={(e) => setClientDetails({ ...clientDetails, aadhaar: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">PAN Number</label>
                <Input
                  placeholder="Enter PAN number"
                  value={clientDetails.pan}
                  onChange={(e) => setClientDetails({ ...clientDetails, pan: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  UAN Number
                  <span className="ml-1 text-xs text-muted-foreground">(Optional, for EPF balance)</span>
                </label>
                <Input
                  placeholder="Enter UAN number"
                  value={clientDetails.uan}
                  onChange={(e) => setClientDetails({ ...clientDetails, uan: e.target.value })}
                />
              </div>
            </div>

            {!otpSent ? (
              <Button
                className="w-full"
                onClick={handleSendOTP}
                disabled={!clientDetails.name || !clientDetails.mobile || !clientDetails.aadhaar || !clientDetails.pan}
              >
                <Smartphone className="mr-2 h-4 w-4" /> Send OTP for Verification
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter OTP sent to {clientDetails.mobile}</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <Button onClick={handleVerifyOTP} disabled={otp.length !== 6}>
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">For demo, use OTP: 123456</p>
                </div>
              </div>
            )}

            {otpVerified && (
              <div className="space-y-4">
                <div className="rounded-md border p-4 bg-zinc-900 border-zinc-800 text-zinc-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-zinc-100">Verification Successful</h3>
                      <p className="text-sm text-zinc-300 mt-1">
                        We've found the following accounts linked to this client:
                      </p>
                      <ul className="mt-2 space-y-1">
                        {linkedAccounts.map((account, index) => (
                          <li key={index} className="text-sm flex items-center gap-2 text-zinc-300">
                            <CheckCircle2 className="h-3 w-3 text-green-400" />
                            {account}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Asset Types Found</h3>
                  <div className="flex flex-wrap gap-2">
                    {assetTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="bg-[#0496ff]/10 text-[#0496ff]">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={handleAnalyzePortfolio}>
                  <BarChart3 className="mr-2 h-4 w-4" /> Analyze Portfolio
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(PortfolioStep.LINK_ASSETS)}>
            Back
          </Button>
          {!otpVerified && (
            <Button variant="outline" onClick={() => setCurrentStep(PortfolioStep.MANUAL_ENTRY)}>
              Switch to Manual Entry
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  const renderManualEntry = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Manual Asset Entry</CardTitle>
          <CardDescription>Add client assets manually</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Tabs defaultValue="mutual-funds">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="fixed-deposits">Fixed Deposits</TabsTrigger>
                <TabsTrigger value="others">Others</TabsTrigger>
              </TabsList>

              <TabsContent value="mutual-funds" className="space-y-4 pt-4">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">Fund Name</th>
                        <th className="py-3 px-4 text-left">Category</th>
                        <th className="py-3 px-4 text-right">Units</th>
                        <th className="py-3 px-4 text-right">Current Value</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientData[selectedClient].fundData.map((fund) => (
                        <tr key={fund.id} className="border-b">
                          <td className="py-3 px-4">{fund.name}</td>
                          <td className="py-3 px-4">{fund.category}</td>
                          <td className="py-3 px-4 text-right">1,250.45</td>
                          <td className="py-3 px-4 text-right">₹{fund.currentValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Mutual Fund
                </Button>
              </TabsContent>

              <TabsContent value="stocks" className="space-y-4 pt-4">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">Stock Name</th>
                        <th className="py-3 px-4 text-left">Ticker</th>
                        <th className="py-3 px-4 text-right">Quantity</th>
                        <th className="py-3 px-4 text-right">Current Value</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Reliance Industries</td>
                        <td className="py-3 px-4">RELIANCE</td>
                        <td className="py-3 px-4 text-right">50</td>
                        <td className="py-3 px-4 text-right">₹125,000</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Infosys</td>
                        <td className="py-3 px-4">INFY</td>
                        <td className="py-3 px-4 text-right">100</td>
                        <td className="py-3 px-4 text-right">₹145,000</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Stock
                </Button>
              </TabsContent>

              <TabsContent value="fixed-deposits" className="space-y-4 pt-4">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">Bank</th>
                        <th className="py-3 px-4 text-left">Type</th>
                        <th className="py-3 px-4 text-right">Principal</th>
                        <th className="py-3 px-4 text-right">Maturity Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">HDFC Bank</td>
                        <td className="py-3 px-4">Fixed Deposit</td>
                        <td className="py-3 px-4 text-right">₹2,00,000</td>
                        <td className="py-3 px-4 text-right">15 Jun 2025</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">SBI</td>
                        <td className="py-3 px-4">Tax Saver FD</td>
                        <td className="py-3 px-4 text-right">₹1,50,000</td>
                        <td className="py-3 px-4 text-right">22 Mar 2027</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Fixed Deposit
                </Button>
              </TabsContent>

              <TabsContent value="others" className="space-y-4 pt-4">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">Asset Type</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-right">Current Value</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">PPF</td>
                        <td className="py-3 px-4">Public Provident Fund</td>
                        <td className="py-3 px-4 text-right">₹5,20,000</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Gold</td>
                        <td className="py-3 px-4">Physical Gold</td>
                        <td className="py-3 px-4 text-right">₹3,50,000</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Other Asset
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(PortfolioStep.LINK_ASSETS)}>
            Back
          </Button>
          <Button onClick={handleAnalyzePortfolio}>
            <BarChart3 className="mr-2 h-4 w-4" /> Analyze Portfolio
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const renderAnalysis = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Analysis</CardTitle>
          <CardDescription>Analyzing client portfolio performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0496ff]"></div>
                <p className="mt-4 text-center text-muted-foreground">Analyzing portfolio performance...</p>
                <div className="w-full max-w-md mt-6">
                  <Progress value={65} className="h-2 [&>div]:bg-[#0496ff]" />
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Fetching asset data
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Calculating returns
                    </li>
                    <li className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#0496ff]" />
                      Comparing with benchmarks
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-4 w-4" />
                      Generating recommendations
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
                <h3 className="mt-4 text-xl font-medium">Analysis Complete</h3>
                <p className="mt-2 text-center text-muted-foreground">
                  We've analyzed the portfolio and generated a detailed report.
                </p>
                <Button className="mt-6" onClick={() => setCurrentStep(PortfolioStep.REPORT)}>
                  <FileText className="mr-2 h-4 w-4" /> View Detailed Report
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (linkMethod === "auto") {
                setCurrentStep(PortfolioStep.LINK_ASSETS)
              } else {
                setCurrentStep(PortfolioStep.MANUAL_ENTRY)
              }
            }}
          >
            Back
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const renderReport = () => {
    const client = clientData[selectedClient]
    const isUnderperforming =
      client.portfolioReturns[timeframe].portfolio < client.portfolioReturns[timeframe].benchmark

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentStep(PortfolioStep.DASHBOARD)}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold">Portfolio X-Ray Report</h2>
              <p className="text-sm text-muted-foreground">Comprehensive analysis of {client.name}'s portfolio</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="3y">3 Years</SelectItem>
                <SelectItem value="5y">5 Years</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>
        </div>

        {/* Performance Summary Card - Now at the top */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              {isUnderperforming ? (
                <>
                  <TrendingDown className="mr-2 h-5 w-5 text-red-400" />
                  <span className="text-red-400">Portfolio is Underperforming</span>
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                  <span className="text-green-400">Portfolio is Outperforming</span>
                </>
              )}
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {isUnderperforming
                ? `Client could have earned ₹${underperformanceBreakdown[timeframe].total.toLocaleString()} more in returns over ${timeframe === "1y" ? "1 year" : timeframe === "3y" ? "3 years" : "5 years"}`
                : `Client has earned ₹${Math.floor(Math.random() * 100000 + 50000).toLocaleString()} more than benchmark over ${timeframe === "1y" ? "1 year" : timeframe === "3y" ? "3 years" : "5 years"}`}
              {isUnderperforming && (
                <Button
                  variant="link"
                  size="sm"
                  className="text-zinc-400 p-0 h-auto text-xs underline hover:text-zinc-300"
                  onClick={() => setShowMissedReturnsBreakdown(!showMissedReturnsBreakdown)}
                >
                  {showMissedReturnsBreakdown ? "Hide breakdown" : "See how"}
                </Button>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="text-sm text-zinc-400">Portfolio Return ({timeframe.toUpperCase()})</div>
                <div className={`text-2xl font-bold mt-1 ${isUnderperforming ? "text-red-400" : "text-green-400"}`}>
                  {client.portfolioReturns[timeframe].portfolio}%
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {timeframe === "1y"
                    ? "Last 12 months"
                    : timeframe === "3y"
                      ? "Annualized 3-year"
                      : "Annualized 5-year"}
                </div>
              </div>
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="text-sm text-zinc-400">Benchmark Return ({timeframe.toUpperCase()})</div>
                <div className="text-2xl font-bold mt-1 text-[#0496ff]">
                  {client.portfolioReturns[timeframe].benchmark}%
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {timeframe === "1y"
                    ? "Last 12 months"
                    : timeframe === "3y"
                      ? "Annualized 3-year"
                      : "Annualized 5-year"}
                </div>
              </div>
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="text-sm text-zinc-400">Total Portfolio Value</div>
                <div className="text-2xl font-bold mt-1">{client.totalValue}</div>
                <div className="text-xs text-zinc-500 mt-1">Current market value</div>
              </div>
            </div>
            {showMissedReturnsBreakdown && isUnderperforming && (
              <div className="mt-4 p-3 rounded-md border border-zinc-800 bg-zinc-950">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">How this is calculated:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Underperforming funds vs benchmarks:</span>
                    <span className="text-zinc-300">
                      ₹{underperformanceBreakdown[timeframe].underperformingFunds.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Cash drag (low-yield cash holdings):</span>
                    <span className="text-zinc-300">
                      ₹{underperformanceBreakdown[timeframe].cashDrag.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Suboptimal asset allocation:</span>
                    <span className="text-zinc-300">
                      ₹{underperformanceBreakdown[timeframe].otherFactors.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-px bg-zinc-800 my-1"></div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-zinc-300">Total missed returns:</span>
                    <span className="text-zinc-100">
                      ₹{underperformanceBreakdown[timeframe].total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    {timeframe === "1y"
                      ? "Based on 1-year performance gap between portfolio and optimal allocation"
                      : timeframe === "3y"
                        ? "Calculated as compounded returns gap over 3 years (annualized difference of " +
                          (
                            (Math.pow(client.portfolioReturns[timeframe].benchmark / 100 + 1, 3) /
                              Math.pow(client.portfolioReturns[timeframe].portfolio / 100 + 1, 3) -
                              1) *
                            100
                          ).toFixed(1) +
                          "%)"
                        : "Calculated as compounded returns gap over 5 years (annualized difference of " +
                          (
                            (Math.pow(client.portfolioReturns[timeframe].benchmark / 100 + 1, 5) /
                              Math.pow(client.portfolioReturns[timeframe].portfolio / 100 + 1, 5) -
                              1) *
                            100
                          ).toFixed(1) +
                          "%)"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Key Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {client.insights.underperforming && (
            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <TrendingDown className="mr-2 h-5 w-5 text-red-400" />
                  Underperforming Funds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300">
                  {client.fundData.filter((fund) => fund.performance === "Underperforming").length} funds are
                  underperforming their benchmarks, costing the client ₹
                  {underperformanceBreakdown[timeframe].underperformingFunds.toLocaleString()} in potential returns.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  onClick={() => setShowUnderperformingDetails(!showUnderperformingDetails)}
                >
                  {showUnderperformingDetails ? "Hide Details" : "View Details"}
                </Button>

                {showUnderperformingDetails && (
                  <div className="mt-4 space-y-3 pt-3 border-t border-zinc-800">
                    <h4 className="text-sm font-medium text-zinc-200">Underperforming Funds Detail</h4>
                    <div className="space-y-2">
                      {client.fundData
                        .filter((fund) => fund.performance === "Underperforming")
                        .map((fund, index) => (
                          <div key={index} className="p-2 rounded border border-zinc-800 bg-zinc-950">
                            <div className="grid grid-cols-1 gap-1">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-medium text-zinc-300 truncate max-w-[70%]">{fund.name}</p>
                                <p className="text-sm text-red-400 whitespace-nowrap">
                                  -₹{Math.floor(Math.random() * 20000 + 5000).toLocaleString()}/year
                                </p>
                              </div>
                              <p className="text-xs text-zinc-400">
                                Underperforming by {(fund.benchmarkReturn - fund.xirr).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {client.insights.cashDrag && (
            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-amber-400" />
                  Cash Overallocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300">
                  {client.assetAllocationData.find((asset) => asset.name === "Cash").value}% of portfolio (₹
                  {Math.floor(
                    (Number.parseInt(client.totalValue.replace(/[^\d]/g, "")) *
                      client.assetAllocationData.find((asset) => asset.name === "Cash").value) /
                      100,
                  ).toLocaleString()}
                  ) is in cash earning only 3.5%. This cash drag costs ₹
                  {underperformanceBreakdown[timeframe].cashDrag.toLocaleString()} in returns.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  onClick={() => setShowCashRecommendations(!showCashRecommendations)}
                >
                  {showCashRecommendations ? "Hide Products" : "Recommend Products"}
                </Button>

                {showCashRecommendations && (
                  <div className="mt-4 space-y-3 pt-3 border-t border-zinc-800">
                    <h4 className="text-sm font-medium text-zinc-200">Recommended Products</h4>
                    <div className="space-y-2">
                      <div className="p-2 rounded border border-zinc-800 bg-zinc-950">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-zinc-300">HDFC Short Term Debt Fund</p>
                            <p className="text-xs text-zinc-400">Low risk, 7.5% expected return</p>
                          </div>
                          <Badge className="bg-blue-900/50 text-blue-300 border-blue-900">Debt</Badge>
                        </div>
                      </div>
                      <div className="p-2 rounded border border-zinc-800 bg-zinc-950">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-zinc-300">Axis Bluechip Fund</p>
                            <p className="text-xs text-zinc-400">Moderate risk, 12.5% expected return</p>
                          </div>
                          <Badge className="bg-blue-900/50 text-blue-300 border-blue-900">Equity</Badge>
                        </div>
                      </div>
                      <div className="p-2 rounded border border-zinc-800 bg-zinc-950">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-zinc-300">ICICI Pru Balanced Advantage</p>
                            <p className="text-xs text-zinc-400">Moderate risk, 10.2% expected return</p>
                          </div>
                          <Badge className="bg-blue-900/50 text-blue-300 border-blue-900">Hybrid</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <TrendingDown className="mr-2 h-5 w-5 text-red-400" />
                Underperforming Stocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-300">
                3 stocks are underperforming their benchmarks, resulting in potential losses of ₹
                {Math.floor(Math.random() * 30000 + 15000).toLocaleString()}.
              </p>
              <div className="mt-4 space-y-2">
                <div className="p-2 rounded border border-zinc-800 bg-zinc-950">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-zinc-300">Reliance Industries</p>
                    <p className="text-sm text-red-400">-4.2%</p>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-zinc-400">Potential loss: ₹8,500</p>
                    <p className="text-xs text-blue-400">Commission: ₹1,200</p>
                  </div>
                </div>
                <div className="p-2 rounded border border-zinc-800 bg-zinc-950">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-zinc-300">HDFC Bank</p>
                    <p className="text-sm text-red-400">-2.8%</p>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-zinc-400">Potential loss: ₹6,200</p>
                    <p className="text-xs text-blue-400">Commission: ₹950</p>
                  </div>
                </div>
                <div className="p-2 rounded border border-zinc-800 bg-zinc-950">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-zinc-300">Infosys</p>
                    <p className="text-sm text-red-400">-3.5%</p>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-zinc-400">Potential loss: ₹7,800</p>
                    <p className="text-xs text-blue-400">Commission: ₹1,050</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-blue-400" />
                Commission Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-300">
                Rebalancing this portfolio could generate ₹{client.insights.commissionOpportunity.toLocaleString()} in
                additional commission while improving client returns.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => setShowRebalancingPlan(!showRebalancingPlan)}
              >
                {showRebalancingPlan ? "Hide Plan" : "Rebalancing Plan"}
              </Button>

              {showRebalancingPlan && (
                <div className="mt-4 space-y-3 pt-3 border-t border-zinc-800">
                  <h4 className="text-sm font-medium text-zinc-200">Commission Breakdown</h4>
                  <div className="space-y-2">
                    <div className="p-2 rounded border border-zinc-800 bg-zinc-950">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-zinc-300">New Equity Investments</p>
                          <p className="text-xs text-zinc-400">₹4,20,000 × 1.2% commission</p>
                        </div>
                        <p className="text-sm text-green-400">+₹25,200</p>
                      </div>
                    </div>
                    <div className="p-2 rounded border border-zinc-800 bg-zinc-950">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-zinc-300">New Debt Investments</p>
                          <p className="text-xs text-zinc-400">₹1,05,000 × 0.6% commission</p>
                        </div>
                        <p className="text-sm text-green-400">+₹6,300</p>
                      </div>
                    </div>
                    <div className="p-2 rounded border border-zinc-800 bg-zinc-950 bg-gradient-to-r from-zinc-950 to-blue-950/20">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-zinc-200">Total Additional Commission</p>
                        </div>
                        <p className="text-sm font-medium text-blue-400">
                          ₹{client.insights.commissionOpportunity.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs value={reportTab} onValueChange={setReportTab} defaultValue="recommendations">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="overview">Commission Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <CardHeader>
                  <CardTitle className="text-base">Commission Opportunity</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Potential earnings from portfolio rebalancing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <DollarSign className="h-8 w-8 text-[#0496ff] mr-3" />
                          <div>
                            <div className="font-medium text-zinc-200">Current Commission</div>
                            <div className="text-sm text-zinc-400">Annual earnings</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-zinc-200">
                          ₹{Math.floor(client.insights.commissionOpportunity * 0.6).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <TrendingUp className="h-8 w-8 text-green-400 mr-3" />
                          <div>
                            <div className="font-medium text-zinc-200">Potential Commission</div>
                            <div className="text-sm text-zinc-400">After rebalancing</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-green-400">
                          ₹{Math.floor(client.insights.commissionOpportunity * 1.6).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ArrowUpRight className="h-8 w-8 text-amber-400 mr-3" />
                          <div>
                            <div className="font-medium text-zinc-200">Additional Earnings</div>
                            <div className="text-sm text-zinc-400">Opportunity</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-amber-400">
                          +₹{client.insights.commissionOpportunity.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Button className="w-full">Generate Commission Plan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Asset Allocation & XIRR</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Current allocation with returns and commission
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-6">
                    <div className="relative w-full h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={client.assetAllocationData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {client.assetAllocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Allocation"]}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                              backgroundColor: "#18181b",
                              color: "#e4e4e7",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="rounded-md border border-zinc-800 bg-zinc-950">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-zinc-800 bg-zinc-900">
                            <th className="py-3 px-4 text-left font-medium text-zinc-300">Asset Class</th>
                            <th className="py-3 px-4 text-right font-medium text-zinc-300">Allocation</th>
                            <th className="py-3 px-4 text-right font-medium text-zinc-300">XIRR</th>
                            <th className="py-3 px-4 text-right font-medium text-zinc-300">Commission</th>
                          </tr>
                        </thead>
                        <tbody>
                          {client.assetAllocationData.map((item, index) => (
                            <tr key={index} className="border-b border-zinc-800">
                              <td className="py-3 px-4 font-medium flex items-center text-zinc-200">
                                <div
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                {item.name}
                              </td>
                              <td className="py-3 px-4 text-right text-zinc-300">{item.value}%</td>
                              <td className="py-3 px-4 text-right text-zinc-300">{item.xirr}%</td>
                              <td className="py-3 px-4 text-right text-zinc-300">
                                {item.commission > 0 ? `${item.commission}%` : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <CardHeader>
                <CardTitle>Top Holdings</CardTitle>
                <CardDescription className="text-zinc-400">Performance analysis of key investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-zinc-800 bg-zinc-950">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900">
                        <th className="py-3 px-4 text-left font-medium text-zinc-300">Asset</th>
                        <th className="py-3 px-4 text-left font-medium text-zinc-300">Category</th>
                        <th className="py-3 px-4 text-right font-medium text-zinc-300">Value</th>
                        <th className="py-3 px-4 text-right font-medium text-zinc-300">Allocation</th>
                        <th className="py-3 px-4 text-right font-medium text-zinc-300">Return</th>
                        <th className="py-3 px-4 text-right font-medium text-zinc-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {client.fundData.map((fund) => (
                        <tr key={fund.id} className="border-b border-zinc-800">
                          <td className="py-3 px-4 font-medium text-zinc-200">{fund.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="border-zinc-700 bg-zinc-800 text-zinc-300">
                              {fund.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right text-zinc-300">₹{fund.currentValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-zinc-300">{fund.allocation}%</td>
                          <td className="py-3 px-4 text-right text-zinc-300">{fund.xirr}%</td>
                          <td className="py-3 px-4 text-right">
                            <Badge
                              className={
                                fund.performance === "Outperforming"
                                  ? "bg-green-900 text-green-300 hover:bg-green-900"
                                  : fund.performance === "Equal"
                                    ? "bg-blue-900 text-blue-300 hover:bg-blue-900"
                                    : "bg-red-900 text-red-300 hover:bg-red-900"
                              }
                            >
                              {fund.performance}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription className="text-zinc-400">Returns compared to benchmarks (1 Year)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#a1a1aa" }} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}%`}
                        tick={{ fill: "#a1a1aa" }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, ""]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                          backgroundColor: "#18181b",
                          color: "#e4e4e7",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="equity"
                        name="Equity"
                        stroke="#0496ff"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="debt"
                        name="Debt"
                        stroke="#00C49F"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="gold"
                        name="Gold"
                        stroke="#FFBB28"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="benchmark"
                        name="Benchmark"
                        stroke="#FF8042"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-zinc-200">Top Performers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-zinc-300 mb-2">Mutual Funds</h4>
                        <div className="space-y-2">
                          {client.fundData
                            .filter((fund) => fund.performance === "Outperforming")
                            .slice(0, 2)
                            .map((fund, index) => (
                              <div
                                key={index}
                                className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 flex justify-between items-center"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-[#0496ff]/20 flex items-center justify-center text-[#0496ff]">
                                    <TrendingUp className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-zinc-200">{fund.name}</div>
                                    <div className="text-xs text-zinc-400">{fund.category}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-green-400">+{fund.xirr}%</div>
                                  <div className="text-xs text-green-400">
                                    +{(fund.xirr - fund.benchmarkReturn).toFixed(1)}% vs benchmark
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-zinc-300 mb-2">Stocks</h4>
                        <div className="space-y-2">
                          <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-[#0496ff]/20 flex items-center justify-center text-[#0496ff]">
                                <TrendingUp className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium text-zinc-200">TCS</div>
                                <div className="text-xs text-zinc-400">IT</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-green-400">+18.5%</div>
                              <div className="text-xs text-green-400">+5.2% vs Nifty IT</div>
                            </div>
                          </div>
                          <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-[#0496ff]/20 flex items-center justify-center text-[#0496ff]">
                                <TrendingUp className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium text-zinc-200">Asian Paints</div>
                                <div className="text-xs text-zinc-400">Consumer</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-green-400">+15.8%</div>
                              <div className="text-xs text-green-400">+3.6% vs Nifty Consumer</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-zinc-200">Underperformers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-zinc-300 mb-2">Mutual Funds</h4>
                        <div className="space-y-2">
                          {client.fundData
                            .filter((fund) => fund.performance === "Underperforming")
                            .slice(0, 2)
                            .map((fund, index) => (
                              <div
                                key={index}
                                className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 flex justify-between items-center"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-red-900 flex items-center justify-center text-red-400">
                                    <TrendingDown className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-zinc-200">{fund.name}</div>
                                    <div className="text-xs text-zinc-400">{fund.category}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-red-400">
                                    -{(fund.benchmarkReturn - fund.xirr).toFixed(1)}% vs benchmark
                                  </div>
                                  <div className="text-xs text-zinc-400">
                                    {fund.xirr}% vs {fund.benchmarkReturn}%
                                  </div>
                                </div>
                              </div>
                            ))}
                          {client.fundData.filter((fund) => fund.performance === "Underperforming").length === 0 && (
                            <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 flex justify-center items-center">
                              <p className="text-sm text-zinc-400">No underperforming funds found</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-zinc-300 mb-2">Stocks</h4>
                        <div className="space-y-2">
                          <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-red-900 flex items-center justify-center text-red-400">
                                <TrendingDown className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium text-zinc-200">Reliance Industries</div>
                                <div className="text-xs text-zinc-400">Energy</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-red-400">-4.2% vs benchmark</div>
                              <div className="text-xs text-zinc-400">8.5% vs 12.7%</div>
                            </div>
                          </div>
                          <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-red-900 flex items-center justify-center text-red-400">
                                <TrendingDown className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium text-zinc-200">HDFC Bank</div>
                                <div className="text-xs text-zinc-400">Banking</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-red-400">-2.8% vs benchmark</div>
                              <div className="text-xs text-zinc-400">9.2% vs 12.0%</div>
                            </div>
                          </div>
                          <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-red-900 flex items-center justify-center text-red-400">
                                <TrendingDown className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium text-zinc-200">Infosys</div>
                                <div className="text-xs text-zinc-400">IT</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-red-400">-3.5% vs benchmark</div>
                              <div className="text-xs text-zinc-400">8.8% vs 12.3%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription className="text-zinc-400">Critical issues requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {client.insights.underperforming && (
                    <div className="p-4 rounded-lg bg-red-900/20 border border-red-900/30">
                      <h3 className="font-medium flex items-center text-red-400">
                        <TrendingDown className="h-5 w-5 mr-2 text-red-400" />
                        Portfolio Underperformance
                      </h3>
                      <p className="text-sm text-zinc-300 mt-1">
                        The portfolio is underperforming its benchmark by{" "}
                        {(
                          client.portfolioReturns[timeframe].benchmark - client.portfolioReturns[timeframe].portfolio
                        ).toFixed(1)}
                        %, resulting in approximately ₹{underperformanceBreakdown[timeframe].total.toLocaleString()}{" "}
                        less in annual returns.
                      </p>
                    </div>
                  )}

                  {client.insights.cashDrag && (
                    <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-900/30">
                      <h3 className="font-medium flex items-center text-amber-400">
                        <Wallet className="h-5 w-5 mr-2 text-amber-400" />
                        Cash Overallocation
                      </h3>
                      <p className="text-sm text-zinc-300 mt-1">
                        {client.assetAllocationData.find((asset) => asset.name === "Cash").value}% of the portfolio (₹
                        {Math.floor(
                          (Number.parseInt(client.totalValue.replace(/[^\d]/g, "")) *
                            client.assetAllocationData.find((asset) => asset.name === "Cash").value) /
                            100,
                        ).toLocaleString()}
                        ) is sitting in cash earning only 3.5% when it could be generating 9-12% in equity investments.
                      </p>
                    </div>
                  )}

                  {client.fundData.filter((fund) => fund.performance === "Underperforming").length > 0 && (
                    <div className="p-4 rounded-lg bg-red-900/20 border border-red-900/30">
                      <h3 className="font-medium flex items-center text-red-400">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                        Underperforming Funds
                      </h3>
                      <p className="text-sm text-zinc-300 mt-1">
                        {client.fundData
                          .filter((fund) => fund.performance === "Underperforming")
                          .map((fund) => fund.name)
                          .join(" and ")}{" "}
                        {client.fundData.filter((fund) => fund.performance === "Underperforming").length > 1
                          ? "are"
                          : "is"}{" "}
                        underperforming{" "}
                        {client.fundData.filter((fund) => fund.performance === "Underperforming").length > 1
                          ? "their"
                          : "its"}{" "}
                        benchmark
                        {client.fundData.filter((fund) => fund.performance === "Underperforming").length > 1 ? "s" : ""}
                        , dragging down overall returns.
                      </p>
                    </div>
                  )}

                  {!client.insights.underperforming &&
                    !client.insights.cashDrag &&
                    client.fundData.filter((fund) => fund.performance === "Underperforming").length === 0 && (
                      <div className="p-4 rounded-lg bg-green-900/20 border border-green-900/30">
                        <h3 className="font-medium flex items-center text-green-400">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                          Well-Balanced Portfolio
                        </h3>
                        <p className="text-sm text-zinc-300 mt-1">
                          This portfolio is well-balanced and performing above benchmarks. Minor optimizations can still
                          increase returns and commission.
                        </p>
                      </div>
                    )}
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <CardHeader>
                  <CardTitle>Zinni Recommended Allocation</CardTitle>
                  <CardDescription className="text-zinc-400">Optimal asset allocation for this client</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-zinc-400">Current Allocation</h4>
                          <div className="mt-2 space-y-2">
                            {client.assetAllocationData.map((asset, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-sm text-zinc-300">{asset.name}</span>
                                <span className="text-sm font-medium text-zinc-200">{asset.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-zinc-400">Recommended Allocation</h4>
                          <div className="mt-2 space-y-2">
                            {client.assetAllocationData.map((asset, index) => {
                              let recommendedValue = asset.value

                              // Adjust values based on insights
                              if (asset.name === "Equity" && client.insights.cashDrag) {
                                recommendedValue += 20
                              } else if (asset.name === "Debt" && client.insights.underperforming) {
                                recommendedValue += 5
                              } else if (asset.name === "Cash") {
                                recommendedValue = 5 // Always recommend 5% cash
                              } else if (asset.name === "Gold" && asset.value > 10) {
                                recommendedValue = 10 // Cap gold at 10%
                              }

                              return (
                                <div key={index} className="flex justify-between items-center">
                                  <span className="text-sm text-zinc-300">{asset.name}</span>
                                  <span
                                    className={`text-sm font-medium ${recommendedValue !== asset.value ? "text-green-400" : "text-zinc-200"}`}
                                  >
                                    {recommendedValue}%
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-lg bg-[#0496ff]/10 border border-[#0496ff]/20">
                    <h3 className="font-medium text-zinc-200">Expected Outcome</h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      Following this recommended allocation could increase annual returns by approximately ₹
                      {Math.floor(Math.random() * 150000 + 100000).toLocaleString()}
                      while maintaining a similar risk profile.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription className="text-zinc-400">Suggested changes to optimize the portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-[#0496ff]/10 border border-[#0496ff]/20">
                    <h3 className="font-medium flex items-center text-zinc-200">
                      <RefreshCw className="h-5 w-5 mr-2 text-[#0496ff]" />
                      Rebalance Asset Allocation
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">Recommended adjustments to optimize returns:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      {client.insights.cashDrag && (
                        <>
                          <li className="flex items-center gap-2 text-zinc-300">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span>
                              Increase Equity allocation from{" "}
                              {client.assetAllocationData.find((asset) => asset.name === "Equity").value}% to{" "}
                              {client.assetAllocationData.find((asset) => asset.name === "Equity").value + 20}% (+₹
                              {Math.floor(
                                Number.parseInt(client.totalValue.replace(/[^\d]/g, "")) * 0.2,
                              ).toLocaleString()}
                              )
                            </span>
                          </li>
                          <li className="flex items-center gap-2 text-zinc-300">
                            <TrendingDown className="h-4 w-4 text-red-400" />
                            <span>
                              Reduce Cash allocation from{" "}
                              {client.assetAllocationData.find((asset) => asset.name === "Cash").value}% to 5% (-₹
                              {Math.floor(
                                (Number.parseInt(client.totalValue.replace(/[^\d]/g, "")) *
                                  (client.assetAllocationData.find((asset) => asset.name === "Cash").value - 5)) /
                                  100,
                              ).toLocaleString()}
                              )
                            </span>
                          </li>
                        </>
                      )}
                      {client.assetAllocationData.find((asset) => asset.name === "Gold").value > 10 && (
                        <li className="flex items-center gap-2 text-zinc-300">
                          <TrendingDown className="h-4 w-4 text-red-400" />
                          <span>
                            Reduce Gold allocation from{" "}
                            {client.assetAllocationData.find((asset) => asset.name === "Gold").value}% to 10% (-₹
                            {Math.floor(
                              (Number.parseInt(client.totalValue.replace(/[^\d]/g, "")) *
                                (client.assetAllocationData.find((asset) => asset.name === "Gold").value - 10)) /
                                100,
                            ).toLocaleString()}
                            )
                          </span>
                        </li>
                      )}
                      {client.insights.underperforming && (
                        <li className="flex items-center gap-2 text-zinc-300">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span>
                            Increase Debt allocation from{" "}
                            {client.assetAllocationData.find((asset) => asset.name === "Debt").value}% to{" "}
                            {client.assetAllocationData.find((asset) => asset.name === "Debt").value + 5}% (+₹
                            {Math.floor(
                              Number.parseInt(client.totalValue.replace(/[^\d]/g, "")) * 0.05,
                            ).toLocaleString()}
                            )
                          </span>
                        </li>
                      )}
                    </ul>
                    <div className="mt-4">
                      {!rebalancingPlanGenerated ? (
                        <Button size="sm" onClick={handleGenerateRebalancingPlan} disabled={isGeneratingPlan}>
                          {isGeneratingPlan ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating Plan...
                            </>
                          ) : (
                            "Generate Rebalancing Plan"
                          )}
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium text-zinc-200">Rebalancing Plan</h4>
                          <div className="rounded-md border border-zinc-800 bg-zinc-950">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-zinc-800 bg-zinc-900">
                                  <th className="py-2 px-3 text-left font-medium text-zinc-300">Action</th>
                                  <th className="py-2 px-3 text-left font-medium text-zinc-300">Fund</th>
                                  <th className="py-2 px-3 text-right font-medium text-zinc-300">Amount</th>
                                  <th className="py-2 px-3 text-right font-medium text-zinc-300">Commission</th>
                                </tr>
                              </thead>
                              <tbody>
                                {rebalancingPlanData.map((item, index) => (
                                  <tr key={index} className="border-b border-zinc-800">
                                    <td className="py-2 px-3">
                                      <Badge
                                        className={
                                          item.type === "Buy"
                                            ? "bg-green-900/50 text-green-300 border-green-900"
                                            : "bg-red-900/50 text-red-300 border-red-900"
                                        }
                                      >
                                        {item.type}
                                      </Badge>
                                    </td>
                                    <td className="py-2 px-3 text-zinc-300">{item.fund}</td>
                                    <td className="py-2 px-3 text-right text-zinc-300">
                                      ₹{item.amount.toLocaleString()}
                                    </td>
                                    <td className="py-2 px-3 text-right text-zinc-300">
                                      {item.commission > 0 ? `₹${item.commission.toLocaleString()}` : "-"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 bg-gradient-to-r from-zinc-950 to-blue-950/20">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 mr-2 text-[#0496ff]" />
                                <span className="text-sm font-medium text-zinc-200">Implementation Timeline</span>
                              </div>
                              <span className="text-sm text-zinc-300">30 days (phased)</span>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button size="sm" className="bg-[#0496ff] hover:bg-[#0496ff]/90">
                              <FileText className="mr-2 h-4 w-4" /> Download Detailed Plan
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {client.fundData.filter((fund) => fund.performance === "Underperforming").length > 0 && (
                    <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-900/30">
                      <h3 className="font-medium flex items-center text-amber-400">
                        <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
                        Replace Underperforming Funds
                      </h3>
                      <p className="text-sm text-zinc-300 mt-1">
                        The following funds are underperforming their benchmarks. Consider replacing them with better
                        alternatives:
                      </p>

                      <div className="mt-4 space-y-4">
                        {client.fundData
                          .filter((fund) => fund.performance === "Underperforming")
                          .map((fund, index) => (
                            <div key={index} className="rounded-md border border-zinc-800 bg-zinc-950">
                              <div className="p-3 border-b border-zinc-800">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-medium text-zinc-200">{fund.name}</h4>
                                    <p className="text-xs text-zinc-400">
                                      {fund.category} | 1Y Return: {fund.xirr}% | Benchmark: {fund.benchmarkReturn}%
                                    </p>
                                  </div>
                                  <Badge variant="outline" className="bg-red-900/50 text-red-300 border-red-900">
                                    Underperforming
                                  </Badge>
                                </div>
                              </div>
                              <div className="p-3">
                                <h4 className="text-sm font-medium text-zinc-300">Recommended Alternatives:</h4>
                                <div className="mt-2 space-y-2">
                                  {fund.alternatives.map((alt, altIndex) => (
                                    <div key={altIndex} className="flex justify-between items-center">
                                      <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-green-900/50 flex items-center justify-center text-green-400">
                                          <TrendingUp className="h-3 w-3" />
                                        </div>
                                        <span className="text-sm text-zinc-300">{alt.name}</span>
                                      </div>
                                      <div className="text-sm font-medium text-green-400">{alt.xirr}%</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-lg bg-green-900/20 border border-green-900/30">
                    <h3 className="font-medium flex items-center text-green-400">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                      Tax Optimization Opportunities
                    </h3>
                    <p className="text-sm text-zinc-300 mt-1">
                      Consider these tax optimization strategies to improve after-tax returns:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span>Invest in ELSS funds to save up to ₹46,800 in taxes under Section 80C</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span>Hold equity investments for more than 1 year to benefit from LTCG tax rate of 10%</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span>Consider debt funds with indexation benefits for long-term debt investments</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                        Generate Tax Optimization Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Implement All Recommendations</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Main render function
  const renderContent = () => {
    switch (currentStep) {
      case PortfolioStep.DASHBOARD:
        return renderDashboard()
      case PortfolioStep.SELECT_CLIENT:
        return renderClientSelection()
      case PortfolioStep.LINK_ASSETS:
        if (linkMethod === "auto") {
          return renderAutoLinking()
        } else {
          return renderManualEntry()
        }
      case PortfolioStep.MANUAL_ENTRY:
        return renderManualEntry()
      case PortfolioStep.ANALYSIS:
        return renderAnalysis()
      case PortfolioStep.REPORT:
        return renderReport()
      default:
        return renderDashboard()
    }
  }

  return <div className="space-y-6">{renderContent()}</div>
}

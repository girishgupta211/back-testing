"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Sparkles,
  Send,
  ArrowRight,
  Loader2,
  Info,
  Calendar,
  User,
  ChevronRight,
  PieChart,
  RefreshCw,
  Globe,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Import the markdown renderer
import { MarkdownRenderer } from "@/components/markdown-renderer"

// Import all the components we might need to display
import { BusinessInsights } from "@/components/business-insights"
import { ClientInsights } from "@/components/client-insights"
import { PortfolioXray } from "@/components/portfolio-xray"
import { TopFunds } from "@/components/top-funds"
import { AumMfdDistribution } from "@/components/aum-mfd-distribution"
import { LeadTracking } from "@/components/lead-tracking"
import { PortfolioRebalanceView } from "@/components/portfolio-rebalance-view"
import { RiskProfiling } from "@/components/risk-profiling"
import { GoalMapping } from "@/components/goal-mapping"
import { NewOffers } from "@/components/new-offers"
import { InvestmentPlanning } from "@/components/investment-planning"
import { RebalancingView } from "@/components/rebalancing-view"
import { ClientsAtRiskView } from "@/components/clients-at-risk-view"
import { CommissionMismatchView } from "@/components/commission-mismatch-view"
import { CommissionMismatchDetails } from "@/components/commission-mismatch-details"
import { ClientMeetingNotes } from "@/components/crm/client-meeting-notes"

// Custom component for today's meetings
const TodaysMeetings = ({ onClientClick }: { onClientClick: (clientId: string) => void }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
          Today's Client Meetings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
          onClick={() => onClientClick("c1")}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/01.png" alt="Vikram Mehta" />
              <AvatarFallback>VM</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Vikram Mehta</p>
              <p className="text-sm text-muted-foreground">Portfolio Review</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">2:00 PM</p>
            <p className="text-sm text-muted-foreground">Zoom Call</p>
          </div>
        </div>

        <div
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
          onClick={() => onClientClick("c2")}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/02.png" alt="Priya Singh" />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Priya Singh</p>
              <p className="text-sm text-muted-foreground">Investment Planning</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">7:00 PM</p>
            <p className="text-sm text-muted-foreground">Third Wave Bellandur</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom component for meeting notes
const MeetingNotesSummary = ({ onClientClick }: { onClientClick: (clientId: string) => void }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <User className="h-4 w-4 mr-2 text-blue-500" />
          Recent Meeting Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => onClientClick("c1")}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium">Vikram Mehta</span>
            </div>
            <Badge variant="outline">Portfolio Review</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Discussed portfolio performance, market volatility, and rebalancing options.
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>10 Dec 2023</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1">
              View Details <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => onClientClick("c2")}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium">Priya Singh</span>
            </div>
            <Badge variant="outline">Financial Planning</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Reviewed retirement goals, education funding, and tax optimization strategies.
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>15 Nov 2023</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1">
              View Details <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom component for HDFC Midcap Fund clients
const HDFCMidcapClients = ({ onClientClick }: { onClientClick: (clientId: string) => void }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <PieChart className="h-4 w-4 mr-2 text-blue-500" />
          Clients with HDFC Midcap Fund
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left">Client Name</th>
                <th className="py-3 px-4 text-right">HDFC Midcap (% of portfolio)</th>
                <th className="py-3 px-4 text-right">Current Value</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">Vikram Mehta</td>
                <td className="py-3 px-4 text-right">15.2%</td>
                <td className="py-3 px-4 text-right">₹4,50,000</td>
                <td className="py-3 px-4 text-center">
                  <Button variant="outline" size="sm" onClick={() => onClientClick("c1")}>
                    View Portfolio
                  </Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">Amit Patel</td>
                <td className="py-3 px-4 text-right">18.5%</td>
                <td className="py-3 px-4 text-right">₹6,00,000</td>
                <td className="py-3 px-4 text-center">
                  <Button variant="outline" size="sm" onClick={() => onClientClick("c3")}>
                    View Portfolio
                  </Button>
                </td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">Priya Singh</td>
                <td className="py-3 px-4 text-right">12.8%</td>
                <td className="py-3 px-4 text-right">₹3,20,000</td>
                <td className="py-3 px-4 text-center">
                  <Button variant="outline" size="sm" onClick={() => onClientClick("c2")}>
                    View Portfolio
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom component for HDFC Midcap Fund alternatives
const HDFCMidcapAlternatives = ({ onViewComparison }: { onViewComparison: () => void }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <RefreshCw className="h-4 w-4 mr-2 text-blue-500" />
          Less Volatile Alternatives to HDFC Midcap Fund
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Parag Parikh Flexi Cap Fund</CardTitle>
              <p className="text-xs text-muted-foreground">Flexi Cap | Lower Volatility</p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">1Y Return</p>
                  <p className="font-medium text-green-600">+17.2%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Volatility</p>
                  <p className="font-medium text-green-600">Low</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk Rating</p>
                  <p className="font-medium">Moderate</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Commission</p>
                  <p className="font-medium text-blue-600">1.65%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">ICICI Balanced Advantage Fund</CardTitle>
              <p className="text-xs text-muted-foreground">Hybrid | Very Low Volatility</p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">1Y Return</p>
                  <p className="font-medium text-green-600">+12.8%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Volatility</p>
                  <p className="font-medium text-green-600">Very Low</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk Rating</p>
                  <p className="font-medium">Low to Moderate</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Commission</p>
                  <p className="font-medium text-blue-600">1.45%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button className="w-full" onClick={onViewComparison}>
          View Detailed Comparison
        </Button>
      </CardContent>
    </Card>
  )
}

// Sample client data for the portfolio rebalance view
const sampleClientData = {
  id: "priya-patel",
  name: "Priya Patel",
  avatar: "/diverse-avatars.png",
  email: "priya.patel@example.com",
  phone: "+91 98765 43210",
  portfolioValue: 2450000,
  riskProfile: "Moderate",
  lastRebalanced: "6 months ago",
  imbalances: [
    { category: "Large Cap", current: 45, recommended: 40, difference: 5 },
    { category: "Mid Cap", current: 15, recommended: 20, difference: -5 },
    { category: "Small Cap", current: 10, recommended: 10, difference: 0 },
    { category: "Debt", current: 25, recommended: 25, difference: 0 },
    { category: "Gold", current: 5, recommended: 5, difference: 0 },
  ],
}

// Comprehensive data for the AI agent to use
const wealthAdvisorData = {
  businessMetrics: {
    totalAUM: 1880000000, // ₹188 Cr (updated)
    totalSIP: 8500000, // ₹85 Lakhs monthly
    monthlyCommission: 1750000, // ₹17.5 Lakhs
    yearlyCommission: 21000000, // ₹2.1 Cr
    aumGrowth: 12.5,
    clientGrowth: 8.2,
    revenueGrowth: 15.3,
    totalClients: 221, // Updated
    activeClients: 205,
    inactiveClients: 16,
  },
  clients: [
    {
      id: "c1",
      name: "Vikram Mehta",
      email: "vikram.mehta@example.com",
      phone: "+91 98765 12345",
      aum: 3245000, // ₹32.45 Lakhs
      sip: 125000, // ₹1.25 Lakhs
      riskProfile: "Aggressive",
      portfolioChange: 8.2,
      lastUpdate: "45 days ago",
      lastRebalanced: "8 months ago",
      goals: [
        { name: "Retirement", target: 50000000, progress: 35, onTrack: true },
        { name: "Child's Education", target: 20000000, progress: 42, onTrack: true },
      ],
      investments: [
        {
          name: "ICICI Prudential Technology Fund",
          category: "Equity",
          allocation: 25,
          amount: "₹8.11 Lakhs",
          xirr: 18.5,
        },
        { name: "Axis Bluechip Fund", category: "Equity", allocation: 20, amount: "₹6.49 Lakhs", xirr: 12.8 },
        { name: "SBI Small Cap Fund", category: "Equity", allocation: 15, amount: "₹4.87 Lakhs", xirr: 16.2 },
        { name: "HDFC Corporate Bond Fund", category: "Debt", allocation: 25, amount: "₹8.11 Lakhs", xirr: 7.5 },
        { name: "Nippon India Gold Savings Fund", category: "Gold", allocation: 15, amount: "₹4.87 Lakhs", xirr: 8.2 },
      ],
    },
    {
      id: "c2",
      name: "Priya Singh",
      email: "priya.singh@example.com",
      phone: "+91 98765 43210",
      aum: 1872000, // ₹18.72 Lakhs
      sip: 75000, // ₹75,000
      riskProfile: "Moderate",
      portfolioChange: 6.5,
      lastUpdate: "82 days ago",
      lastRebalanced: "6 months ago",
      goals: [
        { name: "Home Purchase", target: 15000000, progress: 45, onTrack: true },
        { name: "Retirement", target: 30000000, progress: 28, onTrack: false },
      ],
      investments: [
        { name: "Mirae Asset Large Cap Fund", category: "Equity", allocation: 20, amount: "₹3.74 Lakhs", xirr: 13.2 },
        {
          name: "HDFC Mid-Cap Opportunities Fund",
          category: "Equity",
          allocation: 15,
          amount: "₹2.81 Lakhs",
          xirr: 14.5,
        },
        { name: "Kotak Emerging Equity Fund", category: "Equity", allocation: 10, amount: "₹1.87 Lakhs", xirr: 15.8 },
        {
          name: "Aditya Birla Sun Life Corporate Bond Fund",
          category: "Debt",
          allocation: 40,
          amount: "₹7.49 Lakhs",
          xirr: 6.8,
        },
        { name: "SBI Gold Fund", category: "Gold", allocation: 15, amount: "₹2.81 Lakhs", xirr: 7.9 },
      ],
    },
    {
      id: "c3",
      name: "Amit Patel",
      email: "amit.patel@example.com",
      phone: "+91 98765 67890",
      aum: 1250000, // ₹12.5 Lakhs
      sip: 50000, // ₹50,000
      riskProfile: "Moderate",
      portfolioChange: -18.5,
      lastUpdate: "95 days ago",
      lastRebalanced: "7 months ago",
      riskFactor: "Market Volatility",
      goals: [
        { name: "Retirement", target: 30000000, progress: 15, onTrack: false },
        { name: "Child's Education", target: 15000000, progress: 20, onTrack: false },
      ],
      investments: [
        {
          name: "ICICI Prudential Technology Fund",
          category: "Equity",
          allocation: 35,
          amount: "₹4.38 Lakhs",
          xirr: -12.5,
        },
        {
          name: "SBI Banking & Financial Services Fund",
          category: "Equity",
          allocation: 25,
          amount: "₹3.13 Lakhs",
          xirr: -15.8,
        },
        {
          name: "Aditya Birla Sun Life Digital India Fund",
          category: "Equity",
          allocation: 20,
          amount: "₹2.50 Lakhs",
          xirr: -22.4,
        },
        { name: "HDFC Corporate Bond Fund", category: "Debt", allocation: 15, amount: "₹1.88 Lakhs", xirr: 6.5 },
        { name: "SBI Gold Fund", category: "Gold", allocation: 5, amount: "₹0.63 Lakhs", xirr: 8.2 },
      ],
    },
  ],
  clientsAtRisk: [
    { id: "c1", name: "Vikram Mehta", portfolioChange: -18.5, riskFactor: "Market Volatility", aum: 1250000 },
    {
      id: "c2",
      name: "Priya Singh",
      portfolioChange: -17.2,
      riskFactor: "Sector Concentration",
      aum: 980000,
    },
    { id: "c3", name: "Amit Patel", portfolioChange: -16.8, riskFactor: "Liquidity Risk", aum: 1450000 },
  ],
  clientsNeedingUpdates: [
    { id: "c3", name: "Amit Patel", lastUpdate: "110 days ago", portfolioValue: 1850000 },
    { id: "c1", name: "Vikram Mehta", lastUpdate: "95 days ago", portfolioValue: 1250000 },
    { id: "c2", name: "Priya Singh", lastUpdate: "82 days ago", portfolioValue: 1872000 },
    { id: "c4", name: "Rajesh Kumar", lastUpdate: "75 days ago", portfolioValue: 750000 },
  ],
  clientsNeedingRebalancing: [
    { id: "c1", name: "Vikram Mehta", lastRebalanced: "8 months ago", portfolioValue: 3245000 },
    { id: "c2", name: "Priya Singh", lastRebalanced: "7 months ago", portfolioValue: 1250000 },
    { id: "c3", name: "Amit Patel", lastRebalanced: "6 months ago", portfolioValue: 1872000 },
  ],
  topFunds: [
    { name: "ICICI Prudential Technology Fund", category: "Equity", returns: 22.4, commission: 1.75, aum: 125000000 },
    { name: "Axis Small Cap Fund", category: "Equity", returns: 18.7, commission: 1.7, aum: 95000000 },
    { name: "Parag Parikh Flexi Cap Fund", category: "Equity", returns: 17.2, commission: 1.65, aum: 180000000 },
    { name: "Kotak Emerging Equity Fund", category: "Equity", returns: 16.5, commission: 1.6, aum: 85000000 },
    { name: "HDFC Corporate Bond Fund", category: "Debt", returns: 7.5, commission: 0.8, aum: 210000000 },
  ],
  underperformingFunds: [
    { name: "SBI Banking & Financial Services Fund", category: "Equity", returns: 4.2, commission: 1.5, aum: 45000000 },
    { name: "HDFC Mid-Cap Opportunities Fund", category: "Equity", returns: 5.8, commission: 1.6, aum: 75000000 },
    {
      name: "Aditya Birla Sun Life Corporate Bond Fund",
      category: "Debt",
      returns: 3.2,
      commission: 0.7,
      aum: 65000000,
    },
  ],
  highCommissionFunds: [
    { name: "ICICI Prudential Technology Fund", category: "Equity", returns: 22.4, commission: 1.75, aum: 125000000 },
    { name: "Axis Small Cap Fund", category: "Equity", returns: 18.7, commission: 1.7, aum: 95000000 },
    { name: "Parag Parikh Flexi Cap Fund", category: "Equity", returns: 17.2, commission: 1.65, aum: 180000000 },
  ],
  aumDistribution: {
    assetClasses: [
      { name: "Equity", value: 62 },
      { name: "Debt", value: 28 },
      { name: "Gold", value: 5 },
      { name: "Others", value: 5 },
    ],
    fundHouses: [
      { name: "HDFC Mutual Fund", value: 28 },
      { name: "ICICI Prudential", value: 22 },
      { name: "Axis Mutual Fund", value: 18 },
      { name: "SBI Mutual Fund", value: 15 },
      { name: "Others", value: 17 },
    ],
  },
  commissionMismatches: [
    { fund: "HDFC Top 100 Fund", expected: 12500, received: 10200, difference: 2300, status: "Pending" },
    { fund: "Axis Bluechip Fund", expected: 8500, received: 7200, difference: 1300, status: "Pending" },
    {
      fund: "ICICI Prudential Value Discovery Fund",
      expected: 9800,
      received: 8600,
      difference: 1200,
      status: "Pending",
    },
  ],
  newFundOffers: [
    { name: "HDFC Balanced Advantage Fund", category: "Hybrid", closingDate: "October 25, 2023", commission: 1.5 },
    {
      name: "SBI Healthcare Opportunities Fund",
      category: "Equity",
      closingDate: "November 10, 2023",
      commission: 1.7,
    },
    { name: "Axis Special Situations Fund", category: "Equity", closingDate: "November 5, 2023", commission: 1.65 },
  ],
}

// Type for chat message with custom component
interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  component?: React.ReactNode
  isSearchResult?: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [selectedView, setSelectedView] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Handle client selection for portfolio view
  const handleClientSelection = (clientId: string, preventNavigation = false) => {
    // If preventNavigation is true, don't navigate to client profile
    if (preventNavigation) {
      return
    }
    // Navigate to the client profile page
    router.push(`/dashboard/clients/${clientId}`)
  }

  // Function to call OpenAI API with web search
  const callOpenAIWithWebSearch = async (userMessage: string) => {
    try {
      setLoading(true)

      // Create a message object for the API
      const messages = [
        {
          role: "user",
          content: userMessage,
        },
      ]

      console.log("Sending request to AI search API:", JSON.stringify(messages))

      // Call the API
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}. Details: ${JSON.stringify(data)}`)
      }

      console.log("AI search API response:", JSON.stringify(data))

      // Add the assistant's response to chat messages
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content || "I couldn't find information about that. Please try asking something else.",
        },
      ])
    } catch (error) {
      console.error("Error calling OpenAI API:", error)

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I encountered an error while processing your request. Please try again with a different question.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Function to call the simple API as a fallback
  const callSimpleAIFallback = async (userMessage: string) => {
    try {
      // Create a message object for the API
      const messages = [
        {
          role: "user",
          content: userMessage,
        },
      ]

      // Call the API
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Fallback API call failed with status: ${response.status}`)
      }

      // Add the assistant's response to chat messages
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content || "I couldn't find information about that. Please try asking something else.",
        },
      ])
    } catch (error) {
      console.error("Error calling fallback API:", error)

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting to my knowledge base. Please try again later or ask about your portfolio data instead.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Fix input clearing issue and retain previous views
  // Update the handleSendMessage function to clear input after sending
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Store the message for later use
    const userMessage = message.trim()

    // Add user message to chat messages
    const userMessageId = Date.now().toString()
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ])

    // Clear the input field
    setInput("")

    // Show thinking indicator
    setLoading(true)

    // Handle hardcoded questions
    const lowerMessage = userMessage.toLowerCase()

    // Check if the message matches any of our hardcoded responses
    if (lowerMessage.includes("my aum") || lowerMessage.includes("show me my aum")) {
      const assistantMessage = "Here's your current AUM breakdown. Your total AUM is ₹188 Cr across 221 clients."

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      setActiveComponent("business-insights")
      setActiveComponentProps({ data: wealthAdvisorData.businessMetrics })
      setLoading(false)
    } else if (lowerMessage.includes("payout mismatch") || lowerMessage.includes("commission mismatch")) {
      const assistantMessage =
        "I've found some commission discrepancies with several AMCs. Let me show you the details."

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      setActiveComponent("commission-mismatch-overview")
      setActiveComponentProps({ data: wealthAdvisorData.commissionMismatches })
      setLoading(false)
    } else if (lowerMessage.includes("clients at risk") || lowerMessage.includes("which clients are at risk")) {
      const assistantMessage =
        "I've identified several clients whose portfolios are at risk. Let me show you the details."

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      setActiveComponent("clients-at-risk")
      setActiveComponentProps({ data: wealthAdvisorData.clientsAtRisk })
      setLoading(false)
    } else if (lowerMessage.includes("client meeting")) {
      const assistantMessage = "You have 2 client meetings scheduled for today:"

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      // Also set the component in the right panel
      setActiveComponent("today-meetings")
      setActiveComponentProps({})
      setLoading(false)
    } else if (lowerMessage.includes("meeting note") || lowerMessage.includes("last meetings")) {
      const assistantMessage = "Here are the meeting notes from your recent client meetings:"

      // Create the component to display in chat with custom click handler
      const meetingNotesComponent = (
        <MeetingNotesSummary
          onClientClick={(clientId) => {
            // When clicked, show only that client's meeting notes in the right panel
            setActiveComponent("client-meeting-notes")
            const clientName = wealthAdvisorData.clients.find((c) => c.id === clientId)?.name || "Client"
            setActiveComponentProps({ clientId, clientName })
          }}
        />
      )

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
          component: meetingNotesComponent,
        },
      ])
      setLoading(false)
    } else if (lowerMessage.includes("prepare for meeting")) {
      const assistantMessage = "Here are the meeting notes from your recent client meetings:"

      // Create the component to display in chat with custom click handler
      const meetingNotesComponent = (
        <MeetingNotesSummary
          onClientClick={(clientId) => {
            // When clicked, show only that client's meeting notes in the right panel
            setActiveComponent("client-meeting-notes")
            const clientName = wealthAdvisorData.clients.find((c) => c.id === clientId)?.name || "Client"
            setActiveComponentProps({ clientId, clientName })
          }}
        />
      )

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
          component: meetingNotesComponent,
        },
      ])
      setLoading(false)
    } else if (lowerMessage.includes("need rebalancing")) {
      const assistantMessage =
        "I've identified several clients whose portfolios need rebalancing. Let me show you the details."

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      // Set the component in the right panel without navigation
      setActiveComponent("portfolio-rebalancing")
      setActiveComponentProps({
        data: wealthAdvisorData.clientsNeedingRebalancing,
        preventNavigation: true,
      })
      setLoading(false)
    } else if (lowerMessage.includes("hdfc midcap fund") && lowerMessage.includes("portfolio")) {
      const assistantMessage = "Here are the clients who have HDFC Midcap Fund in their portfolio:"

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      // Also set the component in the right panel
      setActiveComponent("hdfc-midcap-clients")
      setActiveComponentProps({})
      setLoading(false)
    } else if (lowerMessage.includes("replace hdfc midcap") || lowerMessage.includes("less volatile fund")) {
      const assistantMessage = "Here are some less volatile alternatives to HDFC Midcap Fund:"

      // Show component in chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
          component: (
            <HDFCMidcapAlternatives
              onViewComparison={() => {
                setActiveComponent("detailed-fund-comparison")
                setActiveComponentProps({
                  funds: [
                    "Parag Parikh Flexi Cap Fund",
                    "ICICI Balanced Advantage Fund",
                    "HDFC Mid-Cap Opportunities Fund",
                  ],
                })
              }}
            />
          ),
        },
      ])
      setLoading(false)
    } else if (lowerMessage.includes("portfolio x-ray") && lowerMessage.includes("new client")) {
      const assistantMessage = "I'll start the portfolio X-Ray process for a new client."

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      setTimeout(() => {
        router.push("/dashboard/planner?startNewXRay=true")
      }, 1500)
      setLoading(false)
    } else if (lowerMessage.includes("portfolio x-ray") && lowerMessage.includes("rahul")) {
      const client = wealthAdvisorData.clients[0] // Vikram Mehta
      const assistantMessage = "Opening portfolio X-Ray for Rahul Sharma."

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      // Show in right panel
      setActiveComponent("portfolio-xray")
      setActiveComponentProps({ clientId: "c1", clientData: client })
      setLoading(false)
    } else if (lowerMessage.includes("rahul") && lowerMessage.includes("goals")) {
      const assistantMessage = "Let me check if Rahul Sharma's goals are on track."

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      setActiveComponent("client-goals")
      setActiveComponentProps({ clientId: "c1" })
      setLoading(false)
    } else if (lowerMessage.includes("key insights") || lowerMessage.includes("insights for me")) {
      const assistantMessage = "Here are some key insights to optimize your commission earnings."

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        },
      ])

      setActiveComponent("commission-optimization-full")
      setLoading(false)
    } else {
      // For all other queries, use OpenAI with web search
      try {
        await callOpenAIWithWebSearch(userMessage)
      } catch (error) {
        console.error("Error with primary AI service, falling back to simple API:", error)
        await callSimpleAIFallback(userMessage)
      }
    }
  }

  const processAIResponse = (message: any) => {
    // This function is kept for compatibility with the AI SDK
    // Most of the component rendering is now handled in handleSendMessage
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  const navigateToFullDashboard = () => {
    router.push("/dashboard/v300")
  }

  // Update the renderActiveComponent function to include all the new components
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "business-insights":
        return <BusinessInsights data={activeComponentProps?.data} />
      case "client-insights":
        return <ClientInsights filter={activeComponentProps?.filter || "at-risk"} data={activeComponentProps?.data} />
      case "portfolio-xray":
        return (
          <PortfolioXray
            clientId={activeComponentProps?.clientId || "c1"}
            clientData={activeComponentProps?.clientData}
          />
        )
      case "portfolio-rebalance":
        return <PortfolioRebalanceView client={activeComponentProps?.client || sampleClientData} onBack={() => {}} />
      case "portfolio-rebalancing":
        return (
          <RebalancingView
            data={activeComponentProps?.data}
            onSelectClient={(client) => {
              // Don't navigate when rebalancing
              if (activeComponentProps?.preventNavigation) {
                return
              }
              handleClientSelection(client.id)
            }}
          />
        )
      case "clients-at-risk":
        return <ClientsAtRiskView data={activeComponentProps?.data} onViewClient={handleClientSelection} />
      case "commission-mismatch-overview":
        return <CommissionMismatchView data={activeComponentProps?.data} />
      case "lead-tracking":
        return <LeadTracking data={activeComponentProps?.data} />
      case "top-funds":
        return <TopFunds data={activeComponentProps?.data} />
      case "aum-distribution":
        return <AumMfdDistribution data={activeComponentProps?.data} />
      case "risk-profiling":
        return (
          <RiskProfiling
            clientId={activeComponentProps?.clientId || "default"}
            clientData={activeComponentProps?.clientData}
          />
        )
      case "client-goals":
        return (
          <GoalMapping
            clientId={activeComponentProps?.clientId || "default"}
            clientData={activeComponentProps?.clientData}
          />
        )
      case "new-offers":
        return <NewOffers data={activeComponentProps?.data} />
      case "investment-planning":
        return (
          <InvestmentPlanning
            clientId={activeComponentProps?.clientId || "default"}
            clientData={activeComponentProps?.clientData}
          />
        )
      case "hdfc-midcap-alternatives":
        return (
          <HDFCMidcapAlternatives
            onViewComparison={() => {
              setActiveComponent("detailed-fund-comparison")
              setActiveComponentProps({
                funds: [
                  "Parag Parikh Flexi Cap Fund",
                  "ICICI Balanced Advantage Fund",
                  "HDFC Mid-Cap Opportunities Fund",
                ],
              })
            }}
          />
        )
      case "today-meetings":
        return <TodaysMeetings onClientClick={handleClientSelection} />
      case "meeting-notes":
        return <MeetingNotesSummary onClientClick={handleClientSelection} />
      case "hdfc-midcap-clients":
        return <HDFCMidcapClients onClientClick={handleClientSelection} />
      case "commission-optimization-full":
        // Show the full commission optimization view
        return (
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-semibold">Commission Optimization</h1>

            <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <Sparkles className="h-6 w-6 text-blue-400" />
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-0">AI Copilot</Badge>
                    </div>
                    <h2 className="text-xl font-bold">Intelligent Commission Optimization</h2>
                    <p className="text-gray-400 max-w-2xl">
                      FinCopilot has analyzed your client portfolios and identified opportunities to increase your
                      commission by up to 18% while better aligning with client risk profiles.
                    </p>
                  </div>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Sparkles className="h-4 w-4" />
                    Apply All Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">Current Commission</p>
                    <p className="text-2xl font-semibold">₹17.5L</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">Potential Commission</p>
                    <p className="text-2xl font-semibold text-emerald-400">₹20.7L</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">Increase</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-semibold text-emerald-400">₹3.2L</p>
                      <Badge variant="outline" className="text-emerald-400 border-emerald-400/30">
                        +18%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Opportunities</CardTitle>
                <CardDescription>Clients with potential for commission optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">Client Name</th>
                        <th className="py-3 px-4 text-right">Total AUM</th>
                        <th className="py-3 px-4 text-center">Risk Profile</th>
                        <th className="py-3 px-4 text-right">Current Commission</th>
                        <th className="py-3 px-4 text-right">Potential</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Vikram Mehta</td>
                        <td className="py-3 px-4 text-right">₹45.0L</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="outline" className="text-amber-400 border-amber-400/30">
                            Moderate
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">₹45,000</td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-emerald-400">₹54,000 (+20%)</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Priya Singh</td>
                        <td className="py-3 px-4 text-right">₹78.0L</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="outline" className="text-green-400 border-green-400/30">
                            Conservative
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">₹62,400</td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-emerald-400">₹70,200 (+12.5%)</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Amit Patel</td>
                        <td className="py-3 px-4 text-right">₹125.0L</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="outline" className="text-red-400 border-red-400/30">
                            Aggressive
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">₹125,000</td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-emerald-400">₹150,000 (+20%)</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "commission-mismatch":
        return <CommissionMismatchDetails amcId="amc1" onBack={() => {}} />
      case "detailed-fund-comparison":
        // Show detailed fund comparison
        return (
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-semibold">Fund Comparison</h1>

            <Card>
              <CardHeader>
                <CardTitle>Comparing: {activeComponentProps?.funds?.join(", ")}</CardTitle>
                <CardDescription>Detailed comparison of key metrics and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">Metric</th>
                        {activeComponentProps?.funds?.map((fund: string, index: number) => (
                          <th key={index} className="py-3 px-4 text-left">
                            {fund}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Category</td>
                        <td className="py-3 px-4">Flexi Cap</td>
                        <td className="py-3 px-4">Hybrid</td>
                        <td className="py-3 px-4">Mid Cap</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">AMC</td>
                        <td className="py-3 px-4">Parag Parikh</td>
                        <td className="py-3 px-4">ICICI Prudential</td>
                        <td className="py-3 px-4">HDFC</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Fund Manager</td>
                        <td className="py-3 px-4">Rajeev Thakkar</td>
                        <td className="py-3 px-4">S. Naren</td>
                        <td className="py-3 px-4">Chirag Setalvad</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">AUM (₹ Cr)</td>
                        <td className="py-3 px-4">28,500</td>
                        <td className="py-3 px-4">42,800</td>
                        <td className="py-3 px-4">31,200</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Expense Ratio (%)</td>
                        <td className="py-3 px-4">1.65</td>
                        <td className="py-3 px-4">1.45</td>
                        <td className="py-3 px-4">1.60</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Risk Rating</td>
                        <td className="py-3 px-4">Moderate</td>
                        <td className="py-3 px-4">Low to Moderate</td>
                        <td className="py-3 px-4">Moderate-High</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">1Y Return (%)</td>
                        <td className="py-3 px-4 text-green-600">+17.2</td>
                        <td className="py-3 px-4 text-green-600">+12.8</td>
                        <td className="py-3 px-4 text-green-600">+14.5</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">3Y Return (%)</td>
                        <td className="py-3 px-4 text-green-600">+15.8</td>
                        <td className="py-3 px-4 text-green-600">+11.2</td>
                        <td className="py-3 px-4 text-green-600">+13.7</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">5Y Return (%)</td>
                        <td className="py-3 px-4 text-green-600">+14.2</td>
                        <td className="py-3 px-4 text-green-600">+10.5</td>
                        <td className="py-3 px-4 text-green-600">+12.8</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Volatility</td>
                        <td className="py-3 px-4 text-green-600">Low</td>
                        <td className="py-3 px-4 text-green-600">Very Low</td>
                        <td className="py-3 px-4 text-amber-600">Moderate</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Beta</td>
                        <td className="py-3 px-4">0.85</td>
                        <td className="py-3 px-4">0.65</td>
                        <td className="py-3 px-4">1.15</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Sharpe Ratio</td>
                        <td className="py-3 px-4">1.25</td>
                        <td className="py-3 px-4">1.10</td>
                        <td className="py-3 px-4">0.95</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Commission (%)</td>
                        <td className="py-3 px-4 text-blue-600">1.65</td>
                        <td className="py-3 px-4 text-blue-600">1.45</td>
                        <td className="py-3 px-4 text-blue-600">1.60</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "client-profile":
        return (
          <PortfolioXray
            clientId={activeComponentProps?.clientId || "c1"}
            clientData={activeComponentProps?.clientData}
          />
        )
      case "client-meeting-notes":
        // Import the ClientMeetingNotes component at the top of the file
        return (
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-semibold">{activeComponentProps?.clientName}'s Meeting Notes</h1>
            <ClientMeetingNotes
              clientId={activeComponentProps?.clientId || "c1"}
              clientName={activeComponentProps?.clientName || "Client"}
            />
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="max-w-md text-center space-y-4">
              <Sparkles className="h-12 w-12 mx-auto text-primary" />
              <h2 className="text-2xl font-bold">Welcome to ZinniAI</h2>
              <p className="text-muted-foreground">
                Your AI-powered wealth advisor assistant. Ask me anything about your business, clients, or portfolios.
              </p>
            </div>
          </div>
        )
    }
  }

  // Remove the back arrow from the header
  // Update the top navigation section
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="default" className="bg-[#0496ff] hover:bg-[#0496ff]/90">
            <Sparkles className="h-4 w-4 mr-2" /> ZinniAI
          </Button>
          <Button variant="outline" onClick={navigateToFullDashboard}>
            Zinni Dashboard <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left side - Chat interface */}
        <div className="w-full md:w-1/3 border-r flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 ? (
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      Ask me anything about your business, clients, or portfolios. I can help you analyze data, optimize
                      commissions, and take actions.
                    </p>
                  </CardContent>
                </Card>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Try asking:</p>
                  <div className="grid gap-2">
                    {sampleQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-sm"
                        onClick={() => handleSendMessage(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`${message.role === "user" ? "max-w-[80%] bg-primary text-primary-foreground" : "max-w-full w-full bg-muted"} rounded-lg px-4 py-2`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-1 mb-1">
                          {message.isSearchResult ? (
                            <Globe className="h-3 w-3 text-blue-500" />
                          ) : (
                            <Info className="h-3 w-3 text-blue-500" />
                          )}
                          <span className="text-xs font-medium">
                            {message.isSearchResult ? "AI Assistant (Web Search)" : "AI Assistant"}
                          </span>
                        </div>
                      )}

                      {/* Use MarkdownRenderer for assistant messages */}
                      {message.role === "assistant" ? (
                        <MarkdownRenderer content={message.content} />
                      ) : (
                        message.content.split("\n").map((line, i) => (
                          <p key={i} className={i > 0 ? "mt-2" : ""}>
                            {line}
                          </p>
                        ))
                      )}

                      {/* Show component if it exists */}
                      {message.component && <div className="mt-4 w-full">{message.component}</div>}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">ZinniAI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </>
            )}
          </div>

          {/* Custom question input */}
          <div className="p-4 border-t">
            <form onSubmit={handleFormSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Zinni anything..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isThinking}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Right side - Dynamic content */}
        <div className="hidden md:block md:w-2/3 h-full overflow-y-auto">
          <div className="p-6 h-full">{renderActiveComponent()}</div>
        </div>
      </div>
    </div>
  )
}

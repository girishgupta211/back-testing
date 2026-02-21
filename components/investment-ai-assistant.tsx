"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  ChevronRight,
  LineChart,
  MessageSquare,
  PieChart,
  Send,
  TrendingUp,
  Briefcase,
  Search,
  FileText,
  Loader2,
  Info,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Percent,
  Clock,
  BarChart4,
  ArrowUpRight,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  richContent?: React.ReactNode
}

type SuggestedQuestion = {
  text: string
  icon: React.ReactNode
  category: string
}

export function InvestmentAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm ZinniAI, your investment research assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("chat")

  const suggestedQuestions: SuggestedQuestion[] = [
    {
      text: "Compare Parag Parikh Flexicap and ICICI Flexicap over 3 and 5 years",
      icon: <BarChart3 className="h-4 w-4 text-[#0496ff]" />,
      category: "mutual-funds",
    },
    {
      text: "Suggest 3 large & midcap funds with consistent alpha and low volatility",
      icon: <TrendingUp className="h-4 w-4 text-[#0496ff]" />,
      category: "mutual-funds",
    },
    {
      text: "Compare TCS vs Infosys in terms of PE, RoE, and earnings growth",
      icon: <LineChart className="h-4 w-4 text-[#0496ff]" />,
      category: "stocks",
    },
    {
      text: "List 5 high dividend-yield stocks for a 60-year-old investor",
      icon: <DollarSign className="h-4 w-4 text-[#0496ff]" />,
      category: "stocks",
    },
    {
      text: "Suggest PMS products with 3Y IRR >18% and ₹50L minimum investment",
      icon: <Briefcase className="h-4 w-4 text-[#0496ff]" />,
      category: "pms",
    },
    {
      text: "Show top 3 AAA-rated bonds with YTM >7.5% and maturity within 3 years",
      icon: <Percent className="h-4 w-4 text-[#0496ff]" />,
      category: "bonds",
    },
    {
      text: "Create a ₹25k/month SIP-based model portfolio for a 35-year-old investor",
      icon: <PieChart className="h-4 w-4 text-[#0496ff]" />,
      category: "model-portfolios",
    },
    {
      text: "Suggest a laddered bond strategy for ₹15L over the next 5 years",
      icon: <Clock className="h-4 w-4 text-[#0496ff]" />,
      category: "bonds",
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Process the query and generate a response
    setTimeout(() => {
      const response = generateResponse(input)
      setMessages((prev) => [...prev, response])
      setIsLoading(false)
    }, 1500)
  }

  const generateResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase()
    let content = ""
    let richContent: React.ReactNode | undefined = undefined

    // Fund comparison
    if (lowerQuery.includes("compare") && (lowerQuery.includes("flexicap") || lowerQuery.includes("parag parikh"))) {
      content =
        "Here's a comparison between Parag Parikh Flexi Cap Fund and ICICI Prudential Flexicap Fund over 3 and 5 years:"
      richContent = (
        <Card className="mt-3 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Metric</TableHead>
                  <TableHead>Parag Parikh Flexi Cap</TableHead>
                  <TableHead>ICICI Pru Flexicap</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">3Y Return</TableCell>
                  <TableCell className="text-green-600">19.8%</TableCell>
                  <TableCell className="text-green-600">14.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">5Y Return</TableCell>
                  <TableCell className="text-green-600">16.5%</TableCell>
                  <TableCell className="text-green-600">11.5%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Risk (Std Dev - 3Y)</TableCell>
                  <TableCell>14.2%</TableCell>
                  <TableCell>16.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Expense Ratio</TableCell>
                  <TableCell>1.55%</TableCell>
                  <TableCell>1.70%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sharpe Ratio (3Y)</TableCell>
                  <TableCell className="text-green-600">1.2</TableCell>
                  <TableCell className="text-green-600">0.8</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Alpha (3Y)</TableCell>
                  <TableCell className="text-green-600">3.5%</TableCell>
                  <TableCell className="text-green-600">1.2%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )
    }
    // Fund suggestions for moderate risk
    else if (
      (lowerQuery.includes("suggest") && lowerQuery.includes("large & midcap")) ||
      lowerQuery.includes("large and midcap")
    ) {
      content =
        "Here are 3 large & midcap funds with consistent alpha generation and low volatility suitable for a moderate-risk client:"
      richContent = (
        <Card className="mt-3">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">1. Mirae Asset Emerging Bluechip Fund</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">Alpha: 4.2%</Badge>
                    <Badge className="bg-blue-600">Volatility: Low</Badge>
                    <Badge>5★ Rating</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Consistent outperformance with lower drawdowns than peers. Balanced allocation between large caps
                    (65%) and mid caps (35%).
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">2. Kotak Equity Hybrid Fund</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">Alpha: 3.8%</Badge>
                    <Badge className="bg-blue-600">Volatility: Very Low</Badge>
                    <Badge>4★ Rating</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Excellent downside protection with debt component. Tactical allocation between large and mid caps
                    based on market conditions.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">3. Canara Robeco Emerging Equities</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">Alpha: 3.5%</Badge>
                    <Badge className="bg-blue-600">Volatility: Moderate</Badge>
                    <Badge>5★ Rating</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Strong risk-adjusted returns with focus on quality companies. Slightly higher mid-cap allocation
                    (55%) for growth potential.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Recommendation Basis</p>
                  <p className="text-xs text-blue-700 mt-1">
                    These funds were selected based on consistent alpha generation over 3 and 5 years,
                    below-category-average volatility, and strong performance across market cycles.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
    // Stock comparison
    else if (lowerQuery.includes("compare") && lowerQuery.includes("tcs") && lowerQuery.includes("infosys")) {
      content =
        "Here's a comparison between TCS and Infosys in terms of PE, ROE, and earnings growth over the last 5 years:"
      richContent = (
        <Card className="mt-3 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Metric</TableHead>
                  <TableHead>TCS</TableHead>
                  <TableHead>Infosys</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Current P/E</TableCell>
                  <TableCell>28.5</TableCell>
                  <TableCell>24.3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">5Y Avg P/E</TableCell>
                  <TableCell>26.2</TableCell>
                  <TableCell>22.8</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Current ROE</TableCell>
                  <TableCell className="text-green-600">25.8%</TableCell>
                  <TableCell className="text-green-600">27.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">5Y Avg ROE</TableCell>
                  <TableCell className="text-green-600">24.5%</TableCell>
                  <TableCell className="text-green-600">25.3%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">EPS Growth (5Y CAGR)</TableCell>
                  <TableCell className="text-green-600">12.5%</TableCell>
                  <TableCell className="text-green-600">14.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Revenue Growth (5Y CAGR)</TableCell>
                  <TableCell className="text-green-600">9.8%</TableCell>
                  <TableCell className="text-green-600">11.5%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )
    }
    // High dividend stocks
    else if (lowerQuery.includes("dividend") && lowerQuery.includes("60-year")) {
      content = "Here are 5 high dividend-yield stocks suitable for a 60-year-old investor seeking stable income:"
      richContent = (
        <Card className="mt-3">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">1. Power Grid Corporation</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">Dividend Yield: 6.8%</Badge>
                    <Badge className="bg-blue-600">Volatility: Low</Badge>
                    <Badge>Payout Ratio: 55%</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Regulated business model with predictable cash flows and consistent dividend history.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">2. Coal India</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">Dividend Yield: 8.2%</Badge>
                    <Badge className="bg-blue-600">Volatility: Moderate</Badge>
                    <Badge>Payout Ratio: 70%</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Government-backed with strong cash reserves and high dividend payout policy.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">3. ITC Ltd.</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">Dividend Yield: 4.2%</Badge>
                    <Badge className="bg-blue-600">Volatility: Very Low</Badge>
                    <Badge>Payout Ratio: 65%</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Diversified business with strong cash generation and increasing dividend payout ratio.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">4. NTPC</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">Dividend Yield: 5.8%</Badge>
                    <Badge className="bg-blue-600">Volatility: Low</Badge>
                    <Badge>Payout Ratio: 50%</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Stable power generation business with long-term PPAs and consistent dividend history.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">5. Hindustan Zinc</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">Dividend Yield: 7.5%</Badge>
                    <Badge className="bg-blue-600">Volatility: Moderate</Badge>
                    <Badge>Payout Ratio: 80%</Badge>
                  </div>
                  <p className="text-sm mt-2">Cash-rich mining company with strong dividend policy and low debt.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Recommendation Basis</p>
                  <p className="text-xs text-blue-700 mt-1">
                    These stocks were selected based on high dividend yield, low to moderate volatility, sustainable
                    payout ratios, and strong business models suitable for retirees seeking regular income.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
    // PMS suggestions
    else if (lowerQuery.includes("pms") && lowerQuery.includes("18%") && lowerQuery.includes("50l")) {
      content = "Here are PMS products with 3Y IRR >18%, low churn, and ₹50L minimum investment:"
      richContent = (
        <Card className="mt-3">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">1. Marcellus Consistent Compounders</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">3Y IRR: 22.3%</Badge>
                    <Badge className="bg-blue-600">Churn: Very Low (15%)</Badge>
                    <Badge>Min Investment: ₹50L</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Focuses on companies with clean accounting, strong corporate governance, and sustainable competitive
                    advantages.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">2. Sundaram Emerging Leadership</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">3Y IRR: 25.8%</Badge>
                    <Badge className="bg-blue-600">Churn: Low (25%)</Badge>
                    <Badge>Min Investment: ₹50L</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Invests in emerging leaders in mid and small cap space with strong growth potential.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">3. White Oak India Pioneers Equity</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">3Y IRR: 19.5%</Badge>
                    <Badge className="bg-blue-600">Churn: Low (22%)</Badge>
                    <Badge>Min Investment: ₹50L</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Focuses on high-quality businesses with strong moats and reasonable valuations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Important Considerations</p>
                  <p className="text-xs text-blue-700 mt-1">
                    PMS products have higher risk and are suitable for HNI investors. Past performance may not be
                    sustained. Consider lock-in periods, fee structures, and tax implications before investing.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
    // PMS comparison
    else if (lowerQuery.includes("compare") && lowerQuery.includes("white oak") && lowerQuery.includes("marcellus")) {
      content =
        "Here's a comparison between White Oak PMS and Marcellus in terms of strategy, risk-adjusted returns, and portfolio turnover:"
      richContent = (
        <Card className="mt-3 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Metric</TableHead>
                  <TableHead>White Oak India Pioneers</TableHead>
                  <TableHead>Marcellus Consistent Compounders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Investment Strategy</TableCell>
                  <TableCell>Quality + Reasonable Valuation</TableCell>
                  <TableCell>Quality + Clean Accounting</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3Y CAGR</TableCell>
                  <TableCell className="text-green-600">19.5%</TableCell>
                  <TableCell className="text-green-600">22.3%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">5Y CAGR</TableCell>
                  <TableCell className="text-green-600">16.8%</TableCell>
                  <TableCell className="text-green-600">19.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sharpe Ratio (3Y)</TableCell>
                  <TableCell>0.95</TableCell>
                  <TableCell>1.15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Portfolio Turnover</TableCell>
                  <TableCell>22% (Low)</TableCell>
                  <TableCell>15% (Very Low)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Max Drawdown (3Y)</TableCell>
                  <TableCell>-28%</TableCell>
                  <TableCell>-22%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Fee Structure</TableCell>
                  <TableCell>2.0% + 20% profit sharing</TableCell>
                  <TableCell>2.0% + 20% profit sharing</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )
    }
    // AAA-rated bonds
    else if (lowerQuery.includes("aaa") && lowerQuery.includes("bonds") && lowerQuery.includes("7.5%")) {
      content = "Here are the top 3 AAA-rated bonds with YTM >7.5% and maturity within 3 years:"
      richContent = (
        <Card className="mt-3">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">1. HDFC Ltd. Secured NCD Series V</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">YTM: 7.85%</Badge>
                    <Badge className="bg-blue-600">Maturity: 2.5 years</Badge>
                    <Badge>Rating: AAA (CRISIL)</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Secured debenture with quarterly interest payment option. Listed on NSE with good liquidity.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">2. LIC Housing Finance NCD</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">YTM: 7.92%</Badge>
                    <Badge className="bg-blue-600">Maturity: 3 years</Badge>
                    <Badge>Rating: AAA (ICRA)</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Secured bond with annual interest payment. Government-backed housing finance company.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">3. NABARD Tax Free Bonds</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600">YTM: 7.65%</Badge>
                    <Badge className="bg-blue-600">Maturity: 2 years</Badge>
                    <Badge>Rating: AAA (CARE)</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Tax-free interest income. Government-backed agricultural development institution.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Investment Considerations</p>
                  <p className="text-xs text-blue-700 mt-1">
                    These bonds offer the highest safety with AAA ratings while providing yields above 7.5%. Consider
                    tax implications, interest payment frequency, and liquidity needs before investing.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
    // Laddered bond strategy
    else if (lowerQuery.includes("laddered bond") && lowerQuery.includes("15l")) {
      content = "Here's a suggested laddered bond strategy for ₹15L over the next 5 years with low reinvestment risk:"
      richContent = (
        <Card className="mt-3">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Ladder Structure (₹3L in each)</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="flex-1 min-w-[150px] bg-gray-100 p-3 rounded-md">
                      <p className="text-sm font-medium">Year 1: ₹3L</p>
                      <p className="text-xs mt-1">HDFC Bank FD</p>
                      <p className="text-xs text-green-600">7.0% p.a.</p>
                    </div>
                    <div className="flex-1 min-w-[150px] bg-gray-100 p-3 rounded-md">
                      <p className="text-sm font-medium">Year 2: ₹3L</p>
                      <p className="text-xs mt-1">NABARD Bonds</p>
                      <p className="text-xs text-green-600">7.65% p.a.</p>
                    </div>
                    <div className="flex-1 min-w-[150px] bg-gray-100 p-3 rounded-md">
                      <p className="text-sm font-medium">Year 3: ₹3L</p>
                      <p className="text-xs mt-1">LIC Housing NCD</p>
                      <p className="text-xs text-green-600">7.92% p.a.</p>
                    </div>
                    <div className="flex-1 min-w-[150px] bg-gray-100 p-3 rounded-md">
                      <p className="text-sm font-medium">Year 4: ₹3L</p>
                      <p className="text-xs mt-1">NHAI Tax-Free Bond</p>
                      <p className="text-xs text-green-600">7.5% p.a.</p>
                    </div>
                    <div className="flex-1 min-w-[150px] bg-gray-100 p-3 rounded-md">
                      <p className="text-sm font-medium">Year 5: ₹3L</p>
                      <p className="text-xs mt-1">REC Bonds</p>
                      <p className="text-xs text-green-600">8.1% p.a.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Strategy Benefits</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Provides regular liquidity with one instrument maturing each year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Reduces reinvestment risk by spreading investments across different time periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Diversifies across issuers (HDFC, NABARD, LIC, NHAI, REC) to reduce issuer risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Blends taxable and tax-free bonds for tax efficiency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Average yield of approximately 7.63% across the portfolio</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Implementation Approach</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Purchase all bonds now to lock in current yields. As each instrument matures, you can either
                    reinvest at prevailing rates or use the funds as needed. All recommended instruments have AAA
                    ratings for maximum safety.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
    // SIP-based model portfolio
    else if (lowerQuery.includes("25k") && lowerQuery.includes("sip") && lowerQuery.includes("35-year")) {
      content =
        "Here's a ₹25k/month SIP-based model portfolio for a 35-year-old investor aiming for 11-12% long-term IRR:"
      richContent = (
        <Card className="mt-3">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Recommended SIP Allocation (₹25,000/month)</h4>
                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div className="flex h-full">
                      <div className="bg-blue-600 h-full" style={{ width: "35%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">35%</span>
                      </div>
                      <div className="bg-green-500 h-full" style={{ width: "25%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">25%</span>
                      </div>
                      <div className="bg-purple-500 h-full" style={{ width: "15%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">15%</span>
                      </div>
                      <div className="bg-yellow-500 h-full" style={{ width: "15%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">15%</span>
                      </div>
                      <div className="bg-red-500 h-full" style={{ width: "10%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">10%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <p className="text-sm font-medium">Large Cap (35%): ₹8,750/month</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>HDFC Index Fund Nifty 50 - ₹4,375</li>
                        <li>Axis Bluechip Fund - ₹4,375</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <p className="text-sm font-medium">Mid Cap (25%): ₹6,250/month</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>Kotak Emerging Equity Fund - ₹3,125</li>
                        <li>HDFC Mid-Cap Opportunities - ₹3,125</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <p className="text-sm font-medium">Small Cap (15%): ₹3,750/month</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>SBI Small Cap Fund - ₹3,750</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <p className="text-sm font-medium">Flexi Cap (15%): ₹3,750/month</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>Parag Parikh Flexi Cap Fund - ₹3,750</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <p className="text-sm font-medium">International (10%): ₹2,500/month</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>Motilal Oswal S&P 500 Index Fund - ₹2,500</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Expected Outcomes</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <p className="text-sm font-medium text-center">Expected CAGR</p>
                    <p className="text-xl font-bold text-green-600 text-center mt-1">11-12%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <p className="text-sm font-medium text-center">Risk Level</p>
                    <p className="text-xl font-bold text-amber-600 text-center mt-1">Moderately High</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <p className="text-sm font-medium text-center">Time Horizon</p>
                    <p className="text-xl font-bold text-blue-600 text-center mt-1">7+ Years</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Portfolio Strategy</p>
                  <p className="text-xs text-blue-700 mt-1">
                    This portfolio is designed for long-term wealth creation with a growth-oriented approach suitable
                    for a 35-year-old investor. The allocation balances growth (small & mid caps) with stability (large
                    caps) and adds international diversification. Review and rebalance annually to maintain the target
                    allocation.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
    // Lump sum asset allocation
    else if (lowerQuery.includes("50l") && lowerQuery.includes("lump sum") && lowerQuery.includes("moderate risk")) {
      content = "Here's a suggested asset allocation for a ₹50L lump sum with moderate risk tolerance:"
      richContent = (
        <Card className="mt-3">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Recommended Asset Allocation (₹50 Lakhs)</h4>
                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div className="flex h-full">
                      <div className="bg-blue-600 h-full" style={{ width: "30%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">30%</span>
                      </div>
                      <div className="bg-green-500 h-full" style={{ width: "20%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">20%</span>
                      </div>
                      <div className="bg-purple-500 h-full" style={{ width: "15%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">15%</span>
                      </div>
                      <div className="bg-yellow-500 h-full" style={{ width: "25%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">25%</span>
                      </div>
                      <div className="bg-red-500 h-full" style={{ width: "10%" }}>
                        <span className="flex h-full items-center justify-center text-xs text-white">10%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <p className="text-sm font-medium">Large Cap Equity (30%): ₹15L</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>HDFC Top 100 Fund - ₹7.5L</li>
                        <li>Axis Bluechip Fund - ₹7.5L</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <p className="text-sm font-medium">Mid & Small Cap (20%): ₹10L</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>Kotak Emerging Equity Fund - ₹5L</li>
                        <li>SBI Small Cap Fund - ₹5L</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <p className="text-sm font-medium">Hybrid Funds (15%): ₹7.5L</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>ICICI Prudential Balanced Advantage - ₹7.5L</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <p className="text-sm font-medium">Debt (25%): ₹12.5L</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>HDFC Corporate Bond Fund - ₹6.25L</li>
                        <li>Kotak Bond Fund - ₹6.25L</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <p className="text-sm font-medium">Gold (10%): ₹5L</p>
                      </div>
                      <ul className="mt-2 text-xs space-y-1 pl-5">
                        <li>Nippon India Gold ETF - ₹5L</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Investment Approach</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Stagger equity investments over 3-6 months using systematic transfer plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Invest in debt and gold immediately for stability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Review and rebalance portfolio every 6 months</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Expected Outcomes</p>
                  <p className="text-xs text-blue-700 mt-1">
                    This balanced portfolio aims for 9-10% annual returns with moderate volatility. The 65:35
                    equity-to-debt ratio provides growth potential while managing downside risk. Gold adds inflation
                    protection and acts as a hedge during market uncertainty.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    } else {
      content =
        "I understand you're asking about investments. Could you provide more specific details about what you're looking for? I can help with mutual funds, stocks, bonds, deposits, or creating a personalized portfolio."
    }

    return {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: content,
      timestamp: new Date(),
      richContent: richContent,
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>Chat</span>
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            <span>Research</span>
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>Portfolio</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex gap-3 max-w-[90%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className={`h-8 w-8 ${message.role === "user" ? "bg-[#0496ff]" : "bg-gray-200"}`}>
                      <AvatarFallback>{message.role === "user" ? "U" : "AI"}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-[#0496ff] text-white" : "bg-muted"
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.content}</div>
                      {message.richContent && (
                        <div className={message.role === "user" ? "mt-2 text-white" : "mt-2"}>
                          {message.richContent}
                        </div>
                      )}
                      <div
                        className={`text-xs mt-1 ${message.role === "user" ? "text-blue-100" : "text-muted-foreground"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 bg-gray-200">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <div className="flex space-x-2 items-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Analyzing investment data...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {messages.length === 1 && (
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground mb-2">Ask me about:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex items-center justify-start gap-2 h-auto py-2 px-3"
                    onClick={() => handleSuggestedQuestion(question.text)}
                  >
                    {question.icon}
                    <span className="text-xs text-left">{question.text}</span>
                    <ChevronRight className="h-3 w-3 ml-auto" />
                  </Button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
            <Input
              placeholder="Ask about investments, funds, or portfolio advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="research" className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Investment Research Categories</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-[#0496ff]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mutual Funds</h4>
                    <p className="text-xs text-muted-foreground">Research and compare mutual funds</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-[#0496ff]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Stocks</h4>
                    <p className="text-xs text-muted-foreground">Analyze and screen stocks</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-[#0496ff]" />
                  </div>
                  <div>
                    <h4 className="font-medium">PMS & AIF</h4>
                    <p className="text-xs text-muted-foreground">Explore alternative investments</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                    <Percent className="h-5 w-5 text-[#0496ff]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Bonds & Fixed Income</h4>
                    <p className="text-xs text-muted-foreground">Find debt instruments and deposits</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-sm font-medium mt-6">Latest Research Reports</h3>

            <div className="space-y-3">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Mid & Small Cap Outlook 2023-24</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Analysis of growth opportunities in the mid and small cap segment
                      </p>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Published: May 15, 2023</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Fixed Income Strategy in Rising Rate Environment</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        How to position your debt portfolio in the current interest rate cycle
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Published: May 10, 2023</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">PMS vs Mutual Funds: A Comparative Analysis</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Which investment vehicle is right for your portfolio?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Published: May 5, 2023</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Portfolio Tools</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                    <BarChart4 className="h-5 w-5 text-[#0496ff]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Portfolio Analyzer</h4>
                    <p className="text-xs text-muted-foreground">Analyze your current investments</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center">
                    <PieChart className="h-5 w-5 text-[#0496ff]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Model Portfolio Builder</h4>
                    <p className="text-xs text-muted-foreground">Create custom investment portfolios</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-sm font-medium mt-6">Model Portfolios</h3>

            <div className="space-y-3">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Conservative Income Portfolio</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-blue-600">Expected Return: 7-8%</Badge>
                        <Badge className="bg-green-600">Risk: Low</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Designed for retirees and conservative investors seeking stable income with capital
                        preservation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Balanced Growth Portfolio</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-blue-600">Expected Return: 9-10%</Badge>
                        <Badge className="bg-amber-600">Risk: Moderate</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Balanced approach for investors with 5+ year horizon seeking growth with reasonable volatility.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Aggressive Growth Portfolio</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-blue-600">Expected Return: 12-14%</Badge>
                        <Badge className="bg-red-600">Risk: High</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        High-growth strategy for young investors with 10+ year horizon willing to accept volatility.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

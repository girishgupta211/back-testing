"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NFOCarousel } from "@/components/nfo-carousel"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import {
  Info,
  BarChart3,
  PieChartIcon,
  TrendingUp,
  Percent,
  DollarSign,
  FileText,
  ChevronRight,
  Star,
  ArrowLeft,
  X,
  Search,
  Award,
  User,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Sample fund data
const funds = [
  {
    id: "2",
    name: "HDFC Mid-Cap Opportunities",
    category: "Mid Cap",
    amc: "HDFC Mutual Fund",
    manager: "Chirag Setalvad",
    aum: 30500,
    aumGrowth: 12.5,
    nav: 78.92,
    oneYearReturn: 22.3,
    threeYearReturn: 18.7,
    fiveYearReturn: 15.3,
    expense: 1.9,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderately High",
    riskScore: 4,
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
    aumGrowth: 18.2,
    nav: 102.45,
    oneYearReturn: 22.7,
    threeYearReturn: 31.2,
    fiveYearReturn: 21.4,
    expense: 2.0,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "High",
    riskScore: 5,
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
    commission: 1.75,
    rating: 4.8,
  },
  {
    id: "4",
    name: "ICICI Pru Value Discovery",
    category: "Value",
    amc: "ICICI Prudential Mutual Fund",
    manager: "Sankaran Naren",
    aum: 22800,
    aumGrowth: 9.8,
    nav: 210.78,
    oneYearReturn: 16.8,
    threeYearReturn: 14.2,
    fiveYearReturn: 11.5,
    expense: 1.7,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderate",
    riskScore: 3,
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
    aumGrowth: 22.5,
    nav: 92.35,
    oneYearReturn: 28.7,
    threeYearReturn: 39.3,
    fiveYearReturn: 28.4,
    expense: 1.8,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderately High",
    riskScore: 4,
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
    commission: 1.6,
    rating: 4.4,
  },
  {
    id: "6",
    name: "Nippon India Small Cap",
    category: "Small Cap",
    amc: "Nippon India Mutual Fund",
    manager: "Samir Rachh",
    aum: 14500,
    aumGrowth: 15.3,
    nav: 88.75,
    oneYearReturn: 24.8,
    threeYearReturn: 21.5,
    fiveYearReturn: 17.9,
    expense: 1.9,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "High",
    riskScore: 5,
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
    aumGrowth: 11.2,
    nav: 75.4,
    oneYearReturn: 15.9,
    threeYearReturn: 13.5,
    fiveYearReturn: 10.8,
    expense: 1.8,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderate",
    riskScore: 3,
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
    aumGrowth: 8.7,
    nav: 95.6,
    oneYearReturn: 17.8,
    threeYearReturn: 15.5,
    fiveYearReturn: 12.9,
    expense: 1.7,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderate",
    riskScore: 3,
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
  {
    id: "9",
    name: "Axis Bluechip Fund",
    category: "Large Cap",
    amc: "Axis Mutual Fund",
    manager: "Shreyash Devalkar",
    aum: 25000,
    aumGrowth: 10.2,
    nav: 45.75,
    oneYearReturn: 18.5,
    threeYearReturn: 16.2,
    fiveYearReturn: 13.8,
    expense: 1.65,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderate",
    riskScore: 3,
    benchmark: "Nifty 50 TRI",
    inceptionDate: "2009-01-05",
    minInvestment: 5000,
    sipMinimum: 500,
    holdings: [
      { name: "HDFC Bank", allocation: 9.2 },
      { name: "ICICI Bank", allocation: 8.1 },
      { name: "Reliance Industries", allocation: 7.5 },
      { name: "Infosys", allocation: 6.2 },
      { name: "TCS", allocation: 5.8 },
    ],
    sectorAllocation: [
      { name: "Financial Services", value: 35.2 },
      { name: "IT", value: 19.5 },
      { name: "Oil & Gas", value: 13.2 },
      { name: "Consumer Goods", value: 9.8 },
      { name: "Automobile", value: 7.5 },
      { name: "Others", value: 14.8 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 92.5 },
      { name: "Mid Cap", value: 7.5 },
      { name: "Small Cap", value: 0 },
    ],
    commission: 1.2,
    rating: 4.4,
  },
  {
    id: "10",
    name: "Parag Parikh Flexi Cap Fund",
    category: "Flexi Cap",
    amc: "PPFAS Mutual Fund",
    manager: "Rajeev Thakkar",
    aum: 12800,
    aumGrowth: 25.3,
    nav: 56.82,
    oneYearReturn: 21.2,
    threeYearReturn: 19.8,
    fiveYearReturn: 16.5,
    expense: 1.55,
    exitLoad: "2% if redeemed within 1 year, 1% if redeemed within 2 years",
    riskRating: "Moderately High",
    riskScore: 4,
    benchmark: "Nifty 500 TRI",
    inceptionDate: "2013-05-24",
    minInvestment: 5000,
    sipMinimum: 1000,
    holdings: [
      { name: "HDFC Bank", allocation: 7.5 },
      { name: "Amazon.com", allocation: 6.8 },
      { name: "Alphabet", allocation: 6.2 },
      { name: "ITC", allocation: 5.5 },
      { name: "Microsoft", allocation: 5.1 },
    ],
    sectorAllocation: [
      { name: "Financial Services", value: 28.5 },
      { name: "Technology", value: 22.2 },
      { name: "Consumer Goods", value: 15.8 },
      { name: "Automobile", value: 8.5 },
      { name: "Healthcare", value: 7.7 },
      { name: "Others", value: 17.3 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 65.2 },
      { name: "Mid Cap", value: 25.5 },
      { name: "Small Cap", value: 9.3 },
    ],
    commission: 1.4,
    rating: 4.7,
  },
  {
    id: "11",
    name: "HDFC Top 100 Fund",
    category: "Large Cap",
    amc: "HDFC Mutual Fund",
    manager: "Prashant Jain",
    aum: 22300,
    aumGrowth: 7.8,
    nav: 68.45,
    oneYearReturn: 16.9,
    threeYearReturn: 14.8,
    fiveYearReturn: 12.2,
    expense: 1.75,
    exitLoad: "1% if redeemed within 1 year",
    riskRating: "Moderate",
    riskScore: 3,
    benchmark: "Nifty 100 TRI",
    inceptionDate: "2000-10-11",
    minInvestment: 5000,
    sipMinimum: 500,
    holdings: [
      { name: "HDFC Bank", allocation: 9.8 },
      { name: "ICICI Bank", allocation: 8.5 },
      { name: "Reliance Industries", allocation: 7.9 },
      { name: "Larsen & Toubro", allocation: 5.8 },
      { name: "SBI", allocation: 5.2 },
    ],
    sectorAllocation: [
      { name: "Financial Services", value: 38.5 },
      { name: "Energy", value: 15.2 },
      { name: "Construction", value: 10.8 },
      { name: "IT", value: 9.5 },
      { name: "Consumer Goods", value: 8.7 },
      { name: "Others", value: 17.3 },
    ],
    marketCapAllocation: [
      { name: "Large Cap", value: 90.2 },
      { name: "Mid Cap", value: 9.8 },
      { name: "Small Cap", value: 0 },
    ],
    commission: 1.3,
    rating: 4.1,
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

// Sort options
type SortOption = {
  label: string
  value: string
  field: string
  order: "asc" | "desc"
}

const sortOptions: SortOption[] = [
  { label: "1Y XIRR (Highest)", value: "1y_xirr_desc", field: "oneYearReturn", order: "desc" },
  { label: "1Y XIRR (Lowest)", value: "1y_xirr_asc", field: "oneYearReturn", order: "asc" },
  { label: "3Y XIRR (Highest)", value: "3y_xirr_desc", field: "threeYearReturn", order: "desc" },
  { label: "3Y XIRR (Lowest)", value: "3y_xirr_asc", field: "threeYearReturn", order: "asc" },
  { label: "5Y XIRR (Highest)", value: "5y_xirr_desc", field: "fiveYearReturn", order: "desc" },
  { label: "5Y XIRR (Lowest)", value: "5y_xirr_asc", field: "fiveYearReturn", order: "asc" },
  { label: "Commission (Highest)", value: "commission_desc", field: "commission", order: "desc" },
  { label: "Commission (Lowest)", value: "commission_asc", field: "commission", order: "asc" },
  { label: "TER (Highest)", value: "ter_desc", field: "expense", order: "desc" },
  { label: "TER (Lowest)", value: "ter_asc", field: "expense", order: "asc" },
  { label: "AUM (Highest)", value: "aum_desc", field: "aum", order: "desc" },
  { label: "AUM (Lowest)", value: "aum_asc", field: "aum", order: "asc" },
  { label: "AUM Growth (Highest)", value: "aum_growth_desc", field: "aumGrowth", order: "desc" },
  { label: "AUM Growth (Lowest)", value: "aum_growth_asc", field: "aumGrowth", order: "asc" },
]

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

// Risk meter component
const RiskMeter = ({ score }) => {
  const riskLabels = ["Low", "Low to Moderate", "Moderate", "Moderately High", "High"]

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Risk</span>
        <span className="text-xs font-medium">{riskLabels[score - 1]}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden flex">
        <div className={`h-full ${score >= 1 ? "bg-green-500" : "bg-gray-300"}`} style={{ width: "20%" }}></div>
        <div className={`h-full ${score >= 2 ? "bg-blue-500" : "bg-gray-300"}`} style={{ width: "20%" }}></div>
        <div className={`h-full ${score >= 3 ? "bg-yellow-500" : "bg-gray-300"}`} style={{ width: "20%" }}></div>
        <div className={`h-full ${score >= 4 ? "bg-orange-500" : "bg-gray-300"}`} style={{ width: "20%" }}></div>
        <div className={`h-full ${score >= 5 ? "bg-red-500" : "bg-gray-300"}`} style={{ width: "20%" }}></div>
      </div>
    </div>
  )
}

// Top Funds Card component
const TopFundCard = ({ fund, onViewDetails }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base line-clamp-1">{fund.name}</CardTitle>
            <CardDescription className="text-xs">
              {fund.category} | {fund.amc}
            </CardDescription>
          </div>
          <Badge className="bg-[#0496ff]">{fund.commission}% Commission</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-2">
        <RiskMeter score={fund.riskScore} />

        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="text-xs text-muted-foreground">1Y XIRR</p>
            <p className="font-medium text-green-600">+{fund.oneYearReturn}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">3Y XIRR</p>
            <p className="font-medium text-green-600">+{fund.threeYearReturn}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">5Y XIRR</p>
            <p className="font-medium text-green-600">+{fund.fiveYearReturn}%</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Fund Manager:</span>
            <span className="text-xs font-medium">{fund.manager}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Percent className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">TER:</span>
            <span className="text-xs font-medium">{fund.expense}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs text-[#0496ff] hover:text-[#0496ff] hover:bg-[#0496ff]/10"
          onClick={() => onViewDetails(fund)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

// Top Funds by Category component
const TopFundsByCategory = ({ funds, onViewDetails }) => {
  // Get top funds by category
  const getTopFundsByCategory = (category, count = 3) => {
    if (category === "Overall") {
      return [...funds].sort((a, b) => b.fiveYearReturn - a.fiveYearReturn).slice(0, count)
    }

    return [...funds]
      .filter((fund) => fund.category === category)
      .sort((a, b) => b.fiveYearReturn - a.fiveYearReturn)
      .slice(0, count)
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Top Funds by Category</CardTitle>
        <CardDescription>Explore the best performing funds across different categories</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overall">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="large-cap">Large Cap</TabsTrigger>
            <TabsTrigger value="mid-cap">Mid Cap</TabsTrigger>
            <TabsTrigger value="small-cap">Small Cap</TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTopFundsByCategory("Overall").map((fund) => (
                <TopFundCard key={fund.id} fund={fund} onViewDetails={onViewDetails} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="large-cap" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTopFundsByCategory("Large Cap").map((fund) => (
                <TopFundCard key={fund.id} fund={fund} onViewDetails={onViewDetails} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mid-cap" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTopFundsByCategory("Mid Cap").map((fund) => (
                <TopFundCard key={fund.id} fund={fund} onViewDetails={onViewDetails} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="small-cap" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTopFundsByCategory("Small Cap").map((fund) => (
                <TopFundCard key={fund.id} fund={fund} onViewDetails={onViewDetails} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default function ExploreFundsPage() {
  const [selectedFunds, setSelectedFunds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedFund, setSelectedFund] = useState(funds[0])
  const [showAllFunds, setShowAllFunds] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>(sortOptions[0])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearchResults) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSearchResults])

  const filteredFunds = funds
    .filter(
      (fund) =>
        fund.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "all" || fund.category === categoryFilter),
    )
    .sort((a, b) => {
      const field = sortBy.field as keyof typeof a
      if (sortBy.order === "asc") {
        return a[field] > b[field] ? 1 : -1
      } else {
        return a[field] < b[field] ? 1 : -1
      }
    })

  const displayedFunds = showAllFunds ? filteredFunds : filteredFunds.slice(0, 5)

  const toggleFundSelection = (fundId: string) => {
    if (selectedFunds.includes(fundId)) {
      setSelectedFunds(selectedFunds.filter((id) => id !== fundId))
    } else {
      if (selectedFunds.length < 3) {
        setSelectedFunds([...selectedFunds, fundId])
      }
    }
  }

  const compareFunds = selectedFunds.map((id) => funds.find((fund) => fund.id === id)).filter(Boolean)

  // Determine which fund is ZinniRecommended based on AUM growth and commission
  const getZinniRecommendedFund = (funds) => {
    if (funds.length < 2) return null

    // Calculate a score based on commission and AUM growth
    const fundsWithScore = funds.map((fund) => {
      const score = fund.commission * 0.6 + fund.aumGrowth * 0.4

      // Calculate potential earnings over 5 years for a ₹10,000 monthly SIP
      const monthlyInvestment = 10000
      const years = 5
      const months = years * 12

      // Simple calculation for demonstration purposes
      // In reality, this would be more complex with compounding
      const totalInvestment = monthlyInvestment * months
      const averageAUM = totalInvestment * (1 + ((fund.aumGrowth / 100) * years) / 2)
      const annualCommission = averageAUM * (fund.commission / 100)
      const totalCommission = annualCommission * years

      return {
        ...fund,
        score,
        potentialEarnings: totalCommission,
      }
    })

    // Sort by score and return the highest
    return fundsWithScore.sort((a, b) => b.score - a.score)[0]
  }

  const zinniRecommendedFund = getZinniRecommendedFund(compareFunds)

  const handleViewDetails = (fund) => {
    setSelectedFund(fund)
    setShowDetails(true)
    setShowComparison(false)
  }

  const handleCompare = () => {
    if (selectedFunds.length > 1) {
      setShowComparison(true)
      setShowDetails(false)
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchTerm(query)

    if (query.length > 1) {
      const results = funds.filter((fund) => fund.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }

  const handleSelectSearchResult = (fund) => {
    setSearchTerm(fund.name)
    setShowSearchResults(false)
    handleViewDetails(fund)
  }

  const handleSortChange = (value: string) => {
    const option = sortOptions.find((opt) => opt.value === value)
    if (option) {
      setSortBy(option)
    }
  }

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

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Explore Funds</h2>
        <p className="text-sm text-muted-foreground">Research and compare mutual funds</p>
      </div>

      {/* NFO Carousel - Added at the top of the page */}
      <Card className="border shadow-sm overflow-hidden">
        <CardContent className="p-4 md:p-6">
          <NFOCarousel />
        </CardContent>
      </Card>

      {showDetails ? (
        <div className="space-y-4">
          <Button variant="ghost" className="flex items-center gap-1 text-sm" onClick={() => setShowDetails(false)}>
            <ChevronRight className="h-4 w-4 rotate-180" /> Back to funds
          </Button>

          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#0496ff]/10 to-transparent">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedFund.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {selectedFund.category} | {selectedFund.amc} | Managed by {selectedFund.manager}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    {renderStars(selectedFund.rating)}
                    <span className="text-sm font-medium">{selectedFund.rating}/5</span>
                  </div>
                  <Badge className="mt-1 bg-[#0496ff]">{selectedFund.commission}% Commission</Badge>
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
                          <CardTitle className="text-base">Returns (XIRR)</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">1 Year</span>
                            <span className="text-sm font-medium text-green-600">+{selectedFund.oneYearReturn}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">3 Years</span>
                            <span className="text-sm font-medium text-green-600">+{selectedFund.threeYearReturn}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">5 Years</span>
                            <span className="text-sm font-medium text-green-600">+{selectedFund.fiveYearReturn}%</span>
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
                            <span className="text-sm font-medium">₹{selectedFund.aum.toLocaleString()} Cr</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">AUM Growth</span>
                            <span className="text-sm font-medium text-green-600">+{selectedFund.aumGrowth}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">NAV</span>
                            <span className="text-sm font-medium">₹{selectedFund.nav}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Expense Ratio</span>
                            <span className="text-sm font-medium">{selectedFund.expense}%</span>
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
                            <span className="text-sm font-medium">{selectedFund.riskRating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Benchmark</span>
                            <span className="text-sm font-medium">{selectedFund.benchmark}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Commission</span>
                            <span className="text-sm font-medium">{selectedFund.commission}%</span>
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
                              name={selectedFund.name}
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
                              data={selectedFund.sectorAllocation}
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
                              {selectedFund.sectorAllocation.map((entry, index) => (
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
                              name={selectedFund.name}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Returns</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">1 Month</span>
                              <span className="text-sm font-medium text-green-600">+2.8%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-[#0496ff] to-[#00c6ff] h-2 rounded-full"
                                style={{ width: "28%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">3 Months</span>
                              <span className="text-sm font-medium text-green-600">+6.5%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-[#0496ff] to-[#00c6ff] h-2 rounded-full"
                                style={{ width: "65%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">6 Months</span>
                              <span className="text-sm font-medium text-green-600">+10.2%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-[#0496ff] to-[#00c6ff] h-2 rounded-full"
                                style={{ width: "80%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">1 Year</span>
                              <span className="text-sm font-medium text-green-600">+{selectedFund.oneYearReturn}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-[#0496ff] to-[#00c6ff] h-2 rounded-full"
                                style={{ width: `${selectedFund.oneYearReturn * 3}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">3 Years</span>
                              <span className="text-sm font-medium text-green-600">
                                +{selectedFund.threeYearReturn}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-[#0496ff] to-[#00c6ff] h-2 rounded-full"
                                style={{ width: `${selectedFund.threeYearReturn * 3}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">5 Years</span>
                              <span className="text-sm font-medium text-green-600">
                                +{selectedFund.fiveYearReturn}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-[#0496ff] to-[#00c6ff] h-2 rounded-full"
                                style={{ width: `${selectedFund.fiveYearReturn * 3}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Risk Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Volatility</span>
                              <span className="text-sm font-medium">Medium</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Sharpe Ratio</span>
                              <span className="text-sm font-medium">1.8</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Alpha</span>
                              <span className="text-sm font-medium">2.5</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div className="bg-[#0496ff] h-2 rounded-full" style={{ width: "70%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Beta</span>
                              <span className="text-sm font-medium">0.85</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div className="bg-[#0496ff] h-2 rounded-full" style={{ width: "55%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Standard Deviation</span>
                              <span className="text-sm font-medium">12.4%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Benchmark Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">1 Year</span>
                              <span className="text-sm font-medium text-green-600">+3.2%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Outperformed benchmark by 3.2%</p>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">3 Years</span>
                              <span className="text-sm font-medium text-green-600">+5.8%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Outperformed benchmark by 5.8%</p>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">5 Years</span>
                              <span className="text-sm font-medium text-green-600">+4.5%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Outperformed benchmark by 4.5%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Historical Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                          <XAxis dataKey="month" tick={{ fontSize: 12, fill: CHART_COLORS.text }} />
                          <YAxis tick={{ fontSize: 12, fill: CHART_COLORS.text }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="fund"
                            name={selectedFund.name}
                            stroke={CHART_COLORS.primary}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 1 }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: CHART_COLORS.primary }}
                          />
                          <Line
                            type="monotone"
                            dataKey="benchmark"
                            name="Benchmark"
                            stroke={CHART_COLORS.benchmark}
                            strokeDasharray="5 5"
                            dot={{ r: 3, strokeWidth: 1 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="portfolio" className="p-6 space-y-6 mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Top Holdings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="rounded-md overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/50">
                                <th className="py-3 px-4 text-left font-medium">Company</th>
                                <th className="py-3 px-4 text-right font-medium">Allocation</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedFund.holdings.map((holding, index) => (
                                <tr
                                  key={index}
                                  className={`border-b hover:bg-muted/20 transition-colors ${
                                    index < selectedFund.holdings.length - 1 ? "border-b" : ""
                                  }`}
                                >
                                  <td className="py-3 px-4">{holding.name}</td>
                                  <td className="py-3 px-4 text-right font-medium">{holding.allocation}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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
                              data={selectedFund.sectorAllocation}
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
                              {selectedFund.sectorAllocation.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Market Cap Allocation</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart
                            data={selectedFund.marketCapAllocation}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: CHART_COLORS.text }} />
                            <YAxis tick={{ fontSize: 12, fill: CHART_COLORS.text }} />
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Bar dataKey="value" name="Allocation" radius={[4, 4, 0, 0]}>
                              {selectedFund.marketCapAllocation.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Portfolio Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg border hover:border-[#0496ff]/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <PieChartIcon className="h-4 w-4 text-[#0496ff]" />
                                <span className="font-medium">Diversification Score</span>
                              </div>
                              <span className="font-medium">8.5/10</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Well-diversified across sectors and companies
                            </p>
                          </div>

                          <div className="p-4 rounded-lg border hover:border-[#0496ff]/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-[#0496ff]" />
                                <span className="font-medium">Concentration Risk</span>
                              </div>
                              <span className="font-medium">Low</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Top 5 holdings constitute 37.8% of the portfolio
                            </p>
                          </div>

                          <div className="p-4 rounded-lg border hover:border-[#0496ff]/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Percent className="h-4 w-4 text-[#0496ff]" />
                                <span className="font-medium">Portfolio Turnover</span>
                              </div>
                              <span className="font-medium">32%</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Moderate turnover indicating balanced approach
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="p-6 space-y-6 mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Fund Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Fund Name</span>
                            <span className="text-sm font-medium">{selectedFund.name}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">AMC</span>
                            <span className="text-sm font-medium">{selectedFund.amc}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Category</span>
                            <span className="text-sm font-medium">{selectedFund.category}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Fund Manager</span>
                            <span className="text-sm font-medium">{selectedFund.manager}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Inception Date</span>
                            <span className="text-sm font-medium">{selectedFund.inceptionDate}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Benchmark</span>
                            <span className="text-sm font-medium">{selectedFund.benchmark}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">AUM</span>
                            <span className="text-sm font-medium">₹{selectedFund.aum.toLocaleString()} Cr</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">AUM Growth (YoY)</span>
                            <span className="text-sm font-medium text-green-600">+{selectedFund.aumGrowth}%</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">NAV</span>
                            <span className="text-sm font-medium">₹{selectedFund.nav}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Investment Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Minimum Investment</span>
                            <span className="text-sm font-medium">₹{selectedFund.minInvestment}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">SIP Minimum</span>
                            <span className="text-sm font-medium">₹{selectedFund.sipMinimum}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Expense Ratio</span>
                            <span className="text-sm font-medium">{selectedFund.expense}%</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Exit Load</span>
                            <span className="text-sm font-medium">{selectedFund.exitLoad}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Risk Rating</span>
                            <span className="text-sm font-medium">{selectedFund.riskRating}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Commission</span>
                            <span className="text-sm font-medium">{selectedFund.commission}%</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Settlement Cycle</span>
                            <span className="text-sm font-medium">T+2 days</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-sm text-muted-foreground">Lock-in Period</span>
                            <span className="text-sm font-medium">None</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 justify-start hover:bg-[#0496ff]/10 transition-colors"
                        >
                          <FileText className="h-4 w-4 text-[#0496ff]" />
                          <span>Factsheet</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 justify-start hover:bg-[#0496ff]/10 transition-colors"
                        >
                          <FileText className="h-4 w-4 text-[#0496ff]" />
                          <span>SID Document</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 justify-start hover:bg-[#0496ff]/10 transition-colors"
                        >
                          <FileText className="h-4 w-4 text-[#0496ff]" />
                          <span>KIM Document</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-[#0496ff]/5 to-transparent">
              <Button variant="outline" onClick={() => setShowDetails(false)} className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Funds
              </Button>
              <Button className="bg-[#0496ff] hover:bg-[#0088cc]">Add to Portfolio</Button>
            </CardFooter>
          </Card>
        </div>
      ) : showComparison ? (
        <div className="space-y-4">
          <Button variant="ghost" className="flex items-center gap-1 text-sm" onClick={() => setShowComparison(false)}>
            <ChevronRight className="h-4 w-4 rotate-180" /> Back to funds
          </Button>

          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#0496ff]/10 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Fund Comparison</CardTitle>
                  <CardDescription>Comparing {compareFunds.length} selected funds</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowComparison(false)} className="gap-1">
                  <X className="h-4 w-4" />
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fund Details</th>
                      {compareFunds.map((fund) => (
                        <th key={fund.id} className="text-left py-3 px-4 min-w-[200px]">
                          {zinniRecommendedFund && zinniRecommendedFund.id === fund.id && (
                            <div className="mb-2 flex justify-center">
                              <Badge className="bg-[#0496ff] text-white flex items-center gap-1 px-3 py-1">
                                <Award className="h-3.5 w-3.5 mr-1" />
                                ZinniRecommended
                              </Badge>
                            </div>
                          )}
                          <div
                            className={`${zinniRecommendedFund && zinniRecommendedFund.id === fund.id ? "border-[#0496ff] border rounded-md p-2" : ""}`}
                          >
                            <div className="font-medium">{fund.name}</div>
                            <div className="text-sm text-muted-foreground">{fund.category}</div>
                            <div className="flex items-center gap-1 mt-1">
                              {renderStars(fund.rating)}
                              <span className="text-xs">{fund.rating}/5</span>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">AMC</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4">
                          {fund.amc}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">Fund Manager</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4">
                          {fund.manager}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">AUM</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4">
                          ₹{fund.aum.toLocaleString()} Cr
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">AUM Growth (YoY)</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4 text-green-600">
                          +{fund.aumGrowth}%
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">NAV</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4">
                          ₹{fund.nav}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">1 Year XIRR</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4 text-green-600">
                          +{fund.oneYearReturn}%
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">3 Year XIRR</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4 text-green-600">
                          +{fund.threeYearReturn}%
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">5 Year XIRR</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4 text-green-600">
                          +{fund.fiveYearReturn}%
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">Expense Ratio (TER)</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4">
                          {fund.expense}%
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">Risk Rating</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4">
                          {fund.riskRating}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">Commission</td>
                      {compareFunds.map((fund) => (
                        <td
                          key={fund.id}
                          className={`py-3 px-4 font-medium ${zinniRecommendedFund && zinniRecommendedFund.id === fund.id ? "text-green-600" : "text-[#0496ff]"}`}
                        >
                          {fund.commission}%
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">Minimum Investment</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4">
                          ₹{fund.minInvestment}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">SIP Minimum</td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="py-3 px-4">
                          ₹{fund.sipMinimum}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {zinniRecommendedFund && (
                <div className="mt-6 p-4 bg-gray-900 border border-[#0496ff]/40 rounded-lg text-white">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-[#0496ff] mt-0.5" />
                    <div className="w-full">
                      <p className="font-medium text-[#0496ff]">ZinniRecommended: {zinniRecommendedFund.name}</p>
                      <p className="text-sm text-gray-300 mt-1">
                        This fund is recommended based on its potential for higher commission over time due to strong
                        AUM growth ({zinniRecommendedFund.aumGrowth}%) and competitive commission rate (
                        {zinniRecommendedFund.commission}%).
                      </p>
                      <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-700">
                        <p className="text-sm font-medium text-gray-100">
                          Commission Earnings Comparison (₹10,000 monthly SIP over 5 years):
                        </p>
                        <div className="mt-3 space-y-3">
                          {compareFunds.map((fund) => {
                            // Calculate earnings using 5-year XIRR for each fund
                            const monthlyInvestment = 10000
                            const years = 5
                            const months = years * 12

                            // Calculate future value using the fund's 5-year return rate
                            const annualRate = fund.fiveYearReturn / 100
                            const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1

                            // Calculate future value of SIP using compound interest formula for regular payments
                            const futureValue =
                              monthlyInvestment *
                              ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
                              (1 + monthlyRate)

                            // Calculate commission on the final portfolio value
                            const annualCommission = futureValue * (fund.commission / 100)

                            // Format as Indian currency
                            const formattedCommission = new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 0,
                            }).format(annualCommission)

                            // Calculate difference if this is not the recommended fund
                            let difference = 0
                            let percentDifference = 0

                            if (zinniRecommendedFund.id !== fund.id) {
                              // Calculate the recommended fund's commission using the same method
                              const recommendedAnnualRate = zinniRecommendedFund.fiveYearReturn / 100
                              const recommendedMonthlyRate = Math.pow(1 + recommendedAnnualRate, 1 / 12) - 1

                              const recommendedFutureValue =
                                monthlyInvestment *
                                ((Math.pow(1 + recommendedMonthlyRate, months) - 1) / recommendedMonthlyRate) *
                                (1 + recommendedMonthlyRate)

                              const recommendedCommission =
                                recommendedFutureValue * (zinniRecommendedFund.commission / 100)

                              difference = recommendedCommission - annualCommission
                              percentDifference = (difference / annualCommission) * 100
                            }

                            const formattedDifference = new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 0,
                            }).format(Math.abs(difference))

                            return (
                              <div
                                key={fund.id}
                                className={`p-2 rounded ${zinniRecommendedFund.id === fund.id ? "bg-[#0496ff]/20 border border-[#0496ff]/30" : "bg-gray-700/50"}`}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{fund.name}</span>
                                  <span
                                    className={`text-sm font-medium ${zinniRecommendedFund.id === fund.id ? "text-[#0496ff]" : "text-gray-200"}`}
                                  >
                                    {formattedCommission}
                                  </span>
                                </div>

                                {zinniRecommendedFund.id !== fund.id && difference !== 0 && (
                                  <div className="mt-1 flex justify-end">
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded ${difference > 0 ? "bg-red-900/50 text-red-300" : "bg-green-900/50 text-green-300"}`}
                                    >
                                      {difference > 0
                                        ? `${formattedDifference} less (${percentDifference.toFixed(1)}% lower)`
                                        : `${formattedDifference} more (${Math.abs(percentDifference).toFixed(1)}% higher)`}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-700">
                          <p className="text-xs text-gray-400">
                            <span className="font-medium text-gray-300">Calculation Method:</span> Based on a ₹10,000
                            monthly SIP for 5 years, using each fund's 5-year XIRR (
                            {compareFunds.map((f) => `${f.name}: ${f.fiveYearReturn}%`).join(", ")}) to calculate the
                            final portfolio value. Commission is calculated as a percentage of the final portfolio value
                            using each fund's commission rate (
                            {compareFunds.map((f) => `${f.name}: ${f.commission}%`).join(", ")}).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-[#0496ff]/5 to-transparent">
              <Button variant="outline" onClick={() => setShowComparison(false)} className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Funds
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Download Comparison</Button>
                <Button className="bg-[#0496ff] hover:bg-[#0088cc]">Add to Portfolio</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-4 w-full">
              <div className="relative w-full md:w-80">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search funds..."
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>

                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                    {searchResults.map((fund) => (
                      <div
                        key={fund.id}
                        className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                        onClick={() => handleSelectSearchResult(fund)}
                      >
                        <div className="font-medium">{fund.name}</div>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-xs text-muted-foreground">
                            {fund.category} | {fund.amc}
                          </div>
                          <div className="text-xs text-green-600">+{fund.oneYearReturn}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort dropdown */}
              <Select value={sortBy.value} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>XIRR</SelectLabel>
                    <SelectItem value="1y_xirr_desc">1Y XIRR (Highest)</SelectItem>
                    <SelectItem value="1y_xirr_asc">1Y XIRR (Lowest)</SelectItem>
                    <SelectItem value="3y_xirr_desc">3Y XIRR (Highest)</SelectItem>
                    <SelectItem value="3y_xirr_asc">3Y XIRR (Lowest)</SelectItem>
                    <SelectItem value="5y_xirr_desc">5Y XIRR (Highest)</SelectItem>
                    <SelectItem value="5y_xirr_asc">5Y XIRR (Lowest)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Commission</SelectLabel>
                    <SelectItem value="commission_desc">Commission (Highest)</SelectItem>
                    <SelectItem value="commission_asc">Commission (Lowest)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Other</SelectLabel>
                    <SelectItem value="ter_desc">TER (Highest)</SelectItem>
                    <SelectItem value="ter_asc">TER (Lowest)</SelectItem>
                    <SelectItem value="aum_desc">AUM (Highest)</SelectItem>
                    <SelectItem value="aum_asc">AUM (Lowest)</SelectItem>
                    <SelectItem value="aum_growth_desc">AUM Growth (Highest)</SelectItem>
                    <SelectItem value="aum_growth_asc">AUM Growth (Lowest)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Compare button moved to top */}
              {selectedFunds.length > 1 && (
                <Button onClick={handleCompare} className="bg-[#0496ff] hover:bg-[#0088cc]">
                  Compare ({selectedFunds.length})
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedFunds.map((fund) => (
              <Card
                key={fund.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedFunds.includes(fund.id) ? "border-[#0496ff]" : "border-border"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-base line-clamp-1">{fund.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {fund.category} | {fund.amc}
                      </CardDescription>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedFunds.includes(fund.id)}
                      onChange={() => toggleFundSelection(fund.id)}
                      className="h-4 w-4 rounded border-gray-300 text-[#0496ff] focus:ring-[#0496ff]"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </CardHeader>
                <CardContent className="pb-2" onClick={() => handleViewDetails(fund)}>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">1Y XIRR</p>
                      <p className="font-medium text-green-600">+{fund.oneYearReturn}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">3Y XIRR</p>
                      <p className="font-medium text-green-600">+{fund.threeYearReturn}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">5Y XIRR</p>
                      <p className="font-medium text-green-600">+{fund.fiveYearReturn}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">AUM</p>
                      <p className="font-medium">₹{fund.aum.toLocaleString()} Cr</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">AUM Growth</p>
                      <p className="font-medium text-green-600">+{fund.aumGrowth}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Commission</p>
                      <p className="font-medium text-[#0496ff]">{fund.commission}%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(fund.rating)}
                    <span className="text-xs">{fund.rating}/5</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#0496ff] hover:text-[#0496ff] hover:bg-[#0496ff]/10"
                    onClick={() => handleViewDetails(fund)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center">
            {!showAllFunds && filteredFunds.length > 5 && (
              <Button variant="outline" onClick={() => setShowAllFunds(true)}>
                Show All Funds ({filteredFunds.length})
              </Button>
            )}
            {showAllFunds && (
              <Button variant="outline" onClick={() => setShowAllFunds(false)}>
                Show Less
              </Button>
            )}
          </div>

          {/* Top Funds by Category Section */}
          <TopFundsByCategory funds={funds} onViewDetails={handleViewDetails} />
        </div>
      )}
    </div>
  )
}

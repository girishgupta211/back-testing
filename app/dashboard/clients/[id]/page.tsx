"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ClientUpdate } from "@/components/client-update"
import {
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Area,
} from "recharts"

import {
  ArrowLeft,
  FileText,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Percent,
  ChevronRight,
  BarChart3,
  Clock,
  Wallet,
  Shield,
  Users,
  Phone,
  Mail,
  PieChart,
  ArrowUpRight,
  Target,
  Briefcase,
  LineChartIcon,
  Info,
  Landmark,
  BarChart2,
  Layers,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { ClientMeetingNotes } from "@/components/crm/client-meeting-notes"

// Mock clients data that matches the clients at risk page
const clientsData = {
  c1: {
    id: "c1",
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "+91 98765 43210",
    joinDate: "10 Feb 2022",
    aum: "₹12,50,000",
    aumValue: 1250000,
    sipAmount: "₹25,000",
    sipValue: 25000,
    riskProfile: "Aggressive",
    portfolioChange: -18.5,
    goals: [
      {
        name: "Retirement",
        target: "₹3 Cr",
        timeline: "25 years",
        progress: 22,
        onTrack: false,
        expectedGrowth: 14.5,
        requiredSip: "₹35,000",
        currentSip: "₹25,000",
        projectedData: [
          { year: 2023, current: 27.5, projected: 27.5 },
          { year: 2024, current: 31.2, projected: 35.5 },
          { year: 2025, current: 35.4, projected: 45.8 },
          { year: 2026, current: 40.1, projected: 58.2 },
          { year: 2027, current: 45.5, projected: 72.5 },
          { year: 2028, current: 51.6, projected: 89.3 },
        ],
      },
      {
        name: "Child's Education",
        target: "₹75 Lakhs",
        timeline: "15 years",
        progress: 30,
        onTrack: true,
        expectedGrowth: 12.2,
        requiredSip: "₹15,000",
        projectedData: [
          { year: 2023, current: 22.5, projected: 22.5 },
          { year: 2024, current: 25.3, projected: 25.8 },
          { year: 2025, current: 28.4, projected: 29.5 },
          { year: 2026, current: 31.9, projected: 33.7 },
          { year: 2027, current: 35.8, projected: 38.5 },
          { year: 2028, current: 40.2, projected: 44.0 },
        ],
      },
    ],
    investments: [
      {
        name: "HDFC Mid-Cap Opportunities Fund",
        category: "Equity",
        amount: "₹4,50,000",
        amountValue: 450000,
        returns: "+10.5%",
        allocation: 36,
        status: "Performing",
        color: "#0496ff",
        change30d: -12.2,
        sip: "₹10,000",
        riskCategory: "Moderate-High",
        xirr: 13.2,
        historical: [
          { month: "Jul", value: 450000 },
          { month: "Aug", value: 440000 },
          { month: "Sep", value: 435000 },
          { month: "Oct", value: 420000 },
          { month: "Nov", value: 410000 },
          { month: "Dec", value: 450000 },
        ],
      },
      {
        name: "Axis Small Cap Fund",
        category: "Equity",
        amount: "₹3,00,000",
        amountValue: 300000,
        returns: "+15.8%",
        allocation: 24,
        status: "Underperforming",
        color: "#f97316",
        change30d: -22.5,
        sip: "₹8,000",
        riskCategory: "High",
        xirr: 16.8,
        historical: [
          { month: "Jul", value: 320000 },
          { month: "Aug", value: 310000 },
          { month: "Sep", value: 290000 },
          { month: "Oct", value: 270000 },
          { month: "Nov", value: 280000 },
          { month: "Dec", value: 300000 },
        ],
      },
      {
        name: "SBI Focused Equity Fund",
        category: "Equity",
        amount: "₹5,00,000",
        amountValue: 500000,
        returns: "+9.2%",
        allocation: 40,
        status: "Performing",
        color: "#4ade80",
        change30d: -15.5,
        sip: "₹7,000",
        riskCategory: "Moderate-High",
        xirr: 11.8,
        historical: [
          { month: "Jul", value: 520000 },
          { month: "Aug", value: 510000 },
          { month: "Sep", value: 490000 },
          { month: "Oct", value: 480000 },
          { month: "Nov", value: 490000 },
          { month: "Dec", value: 500000 },
        ],
      },
    ],
    riskFactor: "Market Volatility",
    lastContact: "15 days ago",
    transactions: [
      {
        date: "15 Dec 2023",
        type: "SIP",
        fund: "HDFC Mid-Cap Opportunities Fund",
        amount: "₹10,000",
        status: "Completed",
      },
      { date: "15 Dec 2023", type: "SIP", fund: "Axis Small Cap Fund", amount: "₹8,000", status: "Completed" },
      { date: "15 Dec 2023", type: "SIP", fund: "SBI Focused Equity Fund", amount: "₹7,000", status: "Completed" },
      {
        date: "15 Nov 2023",
        type: "SIP",
        fund: "HDFC Mid-Cap Opportunities Fund",
        amount: "₹10,000",
        status: "Completed",
      },
      { date: "15 Nov 2023", type: "SIP", fund: "Axis Small Cap Fund", amount: "₹8,000", status: "Completed" },
      { date: "15 Nov 2023", type: "SIP", fund: "SBI Focused Equity Fund", amount: "₹7,000", status: "Completed" },
      {
        date: "10 Nov 2023",
        type: "Redemption",
        fund: "HDFC Mid-Cap Opportunities Fund",
        amount: "₹50,000",
        status: "Completed",
      },
      {
        date: "15 Oct 2023",
        type: "SIP",
        fund: "HDFC Mid-Cap Opportunities Fund",
        amount: "₹10,000",
        status: "Completed",
      },
      { date: "15 Oct 2023", type: "SIP", fund: "Axis Small Cap Fund", amount: "₹8,000", status: "Completed" },
      { date: "15 Oct 2023", type: "SIP", fund: "SBI Focused Equity Fund", amount: "₹7,000", status: "Completed" },
    ],
    documents: [
      { name: "PAN Card", date: "10 Feb 2022", type: "KYC" },
      { name: "Aadhaar Card", date: "10 Feb 2022", type: "KYC" },
      { name: "Bank Statement", date: "15 Mar 2022", type: "Banking" },
      { name: "Investment Agreement", date: "20 Feb 2022", type: "Legal" },
    ],
    performanceData: [
      { month: "Jul", portfolio: 0, benchmark: 0 },
      { month: "Aug", portfolio: -2, benchmark: -1 },
      { month: "Sep", portfolio: -5, benchmark: -3 },
      { month: "Oct", portfolio: -10, benchmark: -6 },
      { month: "Nov", portfolio: -15, benchmark: -8 },
      { month: "Dec", portfolio: -18.5, benchmark: -10 },
    ],
    assetAllocation: [
      { name: "Large Cap", value: 40 },
      { name: "Mid Cap", value: 35 },
      { name: "Small Cap", value: 25 },
    ],
    sectorExposure: [
      { name: "Financial Services", value: 30 },
      { name: "IT", value: 25 },
      { name: "Consumer Goods", value: 15 },
      { name: "Healthcare", value: 10 },
      { name: "Auto", value: 10 },
      { name: "Others", value: 10 },
    ],
  },
  c2: {
    id: "c2",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 87654 32109",
    joinDate: "5 Mar 2022",
    aum: "₹8,50,000",
    aumValue: 850000,
    sipAmount: "₹18,000",
    sipValue: 18000,
    riskProfile: "Moderate",
    portfolioChange: -15.2,
    goals: [
      {
        name: "Retirement",
        target: "₹1.5 Cr",
        timeline: "20 years",
        progress: 25,
        onTrack: true,
        expectedGrowth: 11.5,
        requiredSip: "₹18,000",
        projectedData: [
          { year: 2023, current: 25.0, projected: 25.0 },
          { year: 2024, current: 28.5, projected: 28.5 },
          { year: 2025, current: 32.5, projected: 32.5 },
          { year: 2026, current: 37.0, projected: 37.0 },
          { year: 2027, current: 42.0, projected: 42.0 },
          { year: 2028, current: 47.5, projected: 47.5 },
        ],
      },
      {
        name: "Home Purchase",
        target: "₹60 Lakhs",
        timeline: "8 years",
        progress: 35,
        onTrack: false,
        expectedGrowth: 9.2,
        requiredSip: "₹22,000",
        currentSip: "₹15,000",
        projectedData: [
          { year: 2023, current: 35.0, projected: 35.0 },
          { year: 2024, current: 38.5, projected: 42.0 },
          { year: 2025, current: 42.5, projected: 50.5 },
          { year: 2026, current: 47.0, projected: 60.0 },
          { year: 2027, current: 52.0, projected: 70.5 },
          { year: 2028, current: 57.5, projected: 82.0 },
        ],
      },
    ],
    investments: [
      {
        name: "ICICI Prudential Value Discovery Fund",
        category: "Equity",
        amount: "₹3,50,000",
        amountValue: 350000,
        returns: "+8.5%",
        allocation: 41,
        status: "Underperforming",
        color: "#f97316",
        change30d: -18.3,
        sip: "₹8,000",
        riskCategory: "Moderate-High",
        xirr: 9.2,
        historical: [
          { month: "Jul", value: 380000 },
          { month: "Aug", value: 370000 },
          { month: "Sep", value: 360000 },
          { month: "Oct", value: 340000 },
          { month: "Nov", value: 330000 },
          { month: "Dec", value: 350000 },
        ],
      },
      {
        name: "Kotak Corporate Bond Fund",
        category: "Debt",
        amount: "₹2,00,000",
        amountValue: 200000,
        returns: "+6.2%",
        allocation: 24,
        status: "Performing",
        color: "#a3e635",
        change30d: -2.8,
        sip: "₹5,000",
        riskCategory: "Low",
        xirr: 7.5,
        historical: [
          { month: "Jul", value: 200000 },
          { month: "Aug", value: 201000 },
          { month: "Sep", value: 202000 },
          { month: "Oct", value: 201000 },
          { month: "Nov", value: 199000 },
          { month: "Dec", value: 200000 },
        ],
      },
      {
        name: "Mirae Asset Large Cap Fund",
        category: "Equity",
        amount: "₹3,00,000",
        amountValue: 300000,
        returns: "+10.2%",
        allocation: 35,
        status: "Performing",
        color: "#4ade80",
        change30d: -12.5,
        sip: "₹5,000",
        riskCategory: "Moderate",
        xirr: 12.8,
        historical: [
          { month: "Jul", value: 320000 },
          { month: "Aug", value: 315000 },
          { month: "Sep", value: 310000 },
          { month: "Oct", value: 300000 },
          { month: "Nov", value: 290000 },
          { month: "Dec", value: 300000 },
        ],
      },
    ],
    riskFactor: "Sector Concentration",
    lastContact: "22 days ago",
    transactions: [
      {
        date: "15 Dec 2023",
        type: "SIP",
        fund: "ICICI Prudential Value Discovery Fund",
        amount: "₹8,000",
        status: "Completed",
      },
      { date: "15 Dec 2023", type: "SIP", fund: "Kotak Corporate Bond Fund", amount: "₹5,000", status: "Completed" },
      { date: "15 Dec 2023", type: "SIP", fund: "Mirae Asset Large Cap Fund", amount: "₹5,000", status: "Completed" },
      {
        date: "15 Nov 2023",
        type: "SIP",
        fund: "ICICI Prudential Value Discovery Fund",
        amount: "₹8,000",
        status: "Completed",
      },
      { date: "15 Nov 2023", type: "SIP", fund: "Kotak Corporate Bond Fund", amount: "₹5,000", status: "Completed" },
      { date: "15 Nov 2023", type: "SIP", fund: "Mirae Asset Large Cap Fund", amount: "₹5,000", status: "Completed" },
      {
        date: "15 Oct 2023",
        type: "SIP",
        fund: "ICICI Prudential Value Discovery Fund",
        amount: "₹8,000",
        status: "Completed",
      },
      { date: "15 Oct 2023", type: "SIP", fund: "Kotak Corporate Bond Fund", amount: "₹5,000", status: "Completed" },
      { date: "15 Oct 2023", type: "SIP", fund: "Mirae Asset Large Cap Fund", amount: "₹5,000", status: "Completed" },
      {
        date: "15 Sep 2023",
        type: "SIP",
        fund: "ICICI Prudential Value Discovery Fund",
        amount: "₹8,000",
        status: "Completed",
      },
    ],
    documents: [
      { name: "PAN Card", date: "5 Mar 2022", type: "KYC" },
      { name: "Aadhaar Card", date: "5 Mar 2022", type: "KYC" },
      { name: "Bank Statement", date: "10 Mar 2022", type: "Banking" },
      { name: "Investment Agreement", date: "15 Mar 2022", type: "Legal" },
    ],
    performanceData: [
      { month: "Jul", portfolio: 0, benchmark: 0 },
      { month: "Aug", portfolio: -2, benchmark: -1 },
      { month: "Sep", portfolio: -4, benchmark: -3 },
      { month: "Oct", portfolio: -8, benchmark: -6 },
      { month: "Nov", portfolio: -12, benchmark: -8 },
      { month: "Dec", portfolio: -15.2, benchmark: -10 },
    ],
    assetAllocation: [
      { name: "Large Cap", value: 35 },
      { name: "Mid Cap", value: 30 },
      { name: "Small Cap", value: 10 },
      { name: "Debt", value: 25 },
    ],
    sectorExposure: [
      { name: "Financial Services", value: 25 },
      { name: "IT", value: 20 },
      { name: "Consumer Goods", value: 15 },
      { name: "Healthcare", value: 10 },
      { name: "Auto", value: 5 },
      { name: "Others", value: 25 },
    ],
  },
  c3: {
    id: "c3",
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 76543 21098",
    joinDate: "20 Jan 2022",
    aum: "₹18,50,000",
    aumValue: 1850000,
    sipAmount: "₹40,000",
    sipValue: 40000,
    riskProfile: "Aggressive",
    portfolioChange: -12.8,
    goals: [
      {
        name: "Retirement",
        target: "₹4 Cr",
        timeline: "22 years",
        progress: 28,
        onTrack: true,
        expectedGrowth: 13.5,
        requiredSip: "₹40,000",
        projectedData: [
          { year: 2023, current: 28.0, projected: 28.0 },
          { year: 2024, current: 32.0, projected: 32.0 },
          { year: 2025, current: 36.5, projected: 36.5 },
          { year: 2026, current: 41.5, projected: 41.5 },
          { year: 2027, current: 47.0, projected: 47.0 },
          { year: 2028, current: 53.5, projected: 53.5 },
        ],
      },
      {
        name: "Child's Education",
        target: "₹1 Cr",
        timeline: "12 years",
        progress: 32,
        onTrack: true,
        expectedGrowth: 12.2,
        requiredSip: "₹20,000",
        projectedData: [
          { year: 2023, current: 32.0, projected: 32.0 },
          { year: 2024, current: 36.0, projected: 36.0 },
          { year: 2025, current: 40.5, projected: 40.5 },
          { year: 2026, current: 45.5, projected: 45.5 },
          { year: 2027, current: 51.0, projected: 51.0 },
          { year: 2028, current: 57.5, projected: 57.5 },
        ],
      },
      {
        name: "Vacation Home",
        target: "₹1.2 Cr",
        timeline: "15 years",
        progress: 15,
        onTrack: false,
        expectedGrowth: 10.5,
        requiredSip: "₹25,000",
        currentSip: "₹15,000",
        projectedData: [
          { year: 2023, current: 15.0, projected: 15.0 },
          { year: 2024, current: 17.0, projected: 20.0 },
          { year: 2025, current: 19.5, projected: 25.5 },
          { year: 2026, current: 22.0, projected: 32.0 },
          { year: 2027, current: 25.0, projected: 39.0 },
          { year: 2028, current: 28.5, projected: 47.0 },
        ],
      },
    ],
    investments: [
      {
        name: "Axis Bluechip Fund",
        category: "Equity",
        amount: "₹5,00,000",
        amountValue: 500000,
        returns: "+11.8%",
        allocation: 27,
        status: "Performing",
        color: "#4ade80",
        change30d: -8.5,
        sip: "₹10,000",
        riskCategory: "Moderate",
        xirr: 12.8,
        historical: [
          { month: "Jul", value: 520000 },
          { month: "Aug", value: 515000 },
          { month: "Sep", value: 510000 },
          { month: "Oct", value: 505000 },
          { month: "Nov", value: 495000 },
          { month: "Dec", value: 500000 },
        ],
      },
      {
        name: "SBI Small Cap Fund",
        category: "Equity",
        amount: "₹4,50,000",
        amountValue: 450000,
        returns: "+16.2%",
        allocation: 24,
        status: "Outperforming",
        color: "#22c55e",
        change30d: -10.2,
        sip: "₹12,000",
        riskCategory: "High",
        xirr: 17.5,
        historical: [
          { month: "Jul", value: 480000 },
          { month: "Aug", value: 475000 },
          { month: "Sep", value: 470000 },
          { month: "Oct", value: 460000 },
          { month: "Nov", value: 455000 },
          { month: "Dec", value: 450000 },
        ],
      },
      {
        name: "HDFC Mid-Cap Opportunities Fund",
        category: "Equity",
        amount: "₹6,00,000",
        amountValue: 600000,
        returns: "+13.5%",
        allocation: 32,
        status: "Performing",
        color: "#0496ff",
        change30d: -14.2,
        sip: "₹15,000",
        riskCategory: "Moderate-High",
        xirr: 14.2,
        historical: [
          { month: "Jul", value: 650000 },
          { month: "Aug", value: 640000 },
          { month: "Sep", value: 630000 },
          { month: "Oct", value: 620000 },
          { month: "Nov", value: 610000 },
          { month: "Dec", value: 600000 },
        ],
      },
      {
        name: "ICICI Prudential Corporate Bond Fund",
        category: "Debt",
        amount: "₹3,00,000",
        amountValue: 300000,
        returns: "+7.5%",
        allocation: 16,
        status: "Performing",
        color: "#a3e635",
        change30d: -2.5,
        sip: "₹3,000",
        riskCategory: "Low",
        xirr: 8.2,
        historical: [
          { month: "Jul", value: 300000 },
          { month: "Aug", value: 301000 },
          { month: "Sep", value: 302000 },
          { month: "Oct", value: 301000 },
          { month: "Nov", value: 299000 },
          { month: "Dec", value: 300000 },
        ],
      },
    ],
    riskFactor: "Market Volatility",
    lastContact: "10 days ago",
    transactions: [
      { date: "15 Dec 2023", type: "SIP", fund: "Axis Bluechip Fund", amount: "₹10,000", status: "Completed" },
      { date: "15 Dec 2023", type: "SIP", fund: "SBI Small Cap Fund", amount: "₹12,000", status: "Completed" },
      {
        date: "15 Dec 2023",
        type: "SIP",
        fund: "HDFC Mid-Cap Opportunities Fund",
        amount: "₹15,000",
        status: "Completed",
      },
      {
        date: "15 Dec 2023",
        type: "SIP",
        fund: "ICICI Prudential Corporate Bond Fund",
        amount: "₹3,000",
        status: "Completed",
      },
      { date: "15 Nov 2023", type: "SIP", fund: "Axis Bluechip Fund", amount: "₹10,000", status: "Completed" },
      { date: "15 Nov 2023", type: "SIP", fund: "SBI Small Cap Fund", amount: "₹12,000", status: "Completed" },
      {
        date: "15 Nov 2023",
        type: "SIP",
        fund: "HDFC Mid-Cap Opportunities Fund",
        amount: "₹15,000",
        status: "Completed",
      },
      {
        date: "15 Nov 2023",
        type: "SIP",
        fund: "ICICI Prudential Corporate Bond Fund",
        amount: "₹3,000",
        status: "Completed",
      },
      { date: "15 Oct 2023", type: "SIP", fund: "Axis Bluechip Fund", amount: "₹10,000", status: "Completed" },
      { date: "15 Oct 2023", type: "SIP", fund: "SBI Small Cap Fund", amount: "₹12,000", status: "Completed" },
    ],
    documents: [
      { name: "PAN Card", date: "20 Jan 2022", type: "KYC" },
      { name: "Aadhaar Card", date: "20 Jan 2022", type: "KYC" },
      { name: "Bank Statement", date: "25 Jan 2022", type: "Banking" },
      { name: "Investment Agreement", date: "1 Feb 2022", type: "Legal" },
    ],
    performanceData: [
      { month: "Jul", portfolio: 0, benchmark: 0 },
      { month: "Aug", portfolio: -1.5, benchmark: -1 },
      { month: "Sep", portfolio: -3.5, benchmark: -3 },
      { month: "Oct", portfolio: -7, benchmark: -6 },
      { month: "Nov", portfolio: -10, benchmark: -8 },
      { month: "Dec", portfolio: -12.8, benchmark: -10 },
    ],
    assetAllocation: [
      { name: "Large Cap", value: 27 },
      { name: "Mid Cap", value: 32 },
      { name: "Small Cap", value: 24 },
      { name: "Debt", value: 17 },
    ],
    sectorExposure: [
      { name: "Financial Services", value: 28 },
      { name: "IT", value: 22 },
      { name: "Consumer Goods", value: 18 },
      { name: "Healthcare", value: 12 },
      { name: "Auto", value: 8 },
      { name: "Others", value: 12 },
    ],
  },
  // Default client for fallback
  default: {
    id: "default",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    joinDate: "15 Jan 2023",
    aum: "₹42,50,000",
    aumValue: 4250000,
    sipAmount: "₹35,000",
    sipValue: 35000,
    riskProfile: "Moderate",
    portfolioChange: -11.5,
    goals: [
      {
        name: "Retirement",
        target: "₹2 Cr",
        timeline: "20 years",
        progress: 35,
        onTrack: true,
        expectedGrowth: 12.5,
        requiredSip: "₹25,000",
        projectedData: [
          { year: 2023, current: 35.0, projected: 35.0 },
          { year: 2024, current: 39.5, projected: 39.5 },
          { year: 2025, current: 44.5, projected: 44.5 },
          { year: 2026, current: 50.0, projected: 50.0 },
          { year: 2027, current: 56.5, projected: 56.5 },
          { year: 2028, current: 63.5, projected: 63.5 },
        ],
      },
      {
        name: "Child's Education",
        target: "₹50 Lakhs",
        timeline: "10 years",
        progress: 45,
        onTrack: false,
        expectedGrowth: 10.2,
        requiredSip: "₹15,000",
        currentSip: "₹10,000",
        projectedData: [
          { year: 2023, current: 45.0, projected: 45.0 },
          { year: 2024, current: 49.5, projected: 52.0 },
          { year: 2025, current: 54.5, projected: 60.0 },
          { year: 2026, current: 60.0, projected: 69.0 },
          { year: 2027, current: 66.0, projected: 79.0 },
          { year: 2028, current: 72.5, projected: 90.0 },
        ],
      },
      {
        name: "Home Purchase",
        target: "₹80 Lakhs",
        timeline: "5 years",
        progress: 60,
        onTrack: true,
        expectedGrowth: 9.8,
        requiredSip: "₹35,000",
        projectedData: [
          { year: 2023, current: 60.0, projected: 60.0 },
          { year: 2024, current: 66.0, projected: 66.0 },
          { year: 2025, current: 72.5, projected: 72.5 },
          { year: 2026, current: 79.5, projected: 79.5 },
          { year: 2027, current: 87.0, projected: 87.0 },
          { year: 2028, current: 95.5, projected: 95.5 },
        ],
      },
    ],
    investments: [
      {
        name: "HDFC Mid-Cap Opportunities Fund",
        category: "Equity",
        amount: "₹12,50,000",
        amountValue: 1250000,
        returns: "+12.5%",
        allocation: 30,
        status: "Performing",
        color: "#0496ff",
        change30d: -8.2,
        sip: "₹15,000",
        riskCategory: "Moderate-High",
        xirr: 14.2,
        historical: [
          { month: "Jul", value: 1300000 },
          { month: "Aug", value: 1280000 },
          { month: "Sep", value: 1270000 },
          { month: "Oct", value: 1260000 },
          { month: "Nov", value: 1240000 },
          { month: "Dec", value: 1250000 },
        ],
      },
      {
        name: "Axis Bluechip Fund",
        category: "Equity",
        amount: "₹10,00,000",
        amountValue: 1000000,
        returns: "+9.8%",
        allocation: 25,
        status: "Performing",
        color: "#4ade80",
        change30d: -5.5,
        sip: "₹10,000",
        riskCategory: "Moderate",
        xirr: 11.8,
        historical: [
          { month: "Jul", value: 1050000 },
          { month: "Aug", value: 1040000 },
          { month: "Sep", value: 1030000 },
          { month: "Oct", value: 1020000 },
          { month: "Nov", value: 1010000 },
          { month: "Dec", value: 1000000 },
        ],
      },
      {
        name: "SBI Small Cap Fund",
        category: "Equity",
        amount: "₹8,00,000",
        amountValue: 800000,
        returns: "+15.2%",
        allocation: 20,
        status: "Outperforming",
        color: "#22c55e",
        change30d: -4.2,
        sip: "₹5,000",
        riskCategory: "High",
        xirr: 16.5,
        historical: [
          { month: "Jul", value: 820000 },
          { month: "Aug", value: 815000 },
          { month: "Sep", value: 810000 },
          { month: "Oct", value: 805000 },
          { month: "Nov", value: 795000 },
          { month: "Dec", value: 800000 },
        ],
      },
      {
        name: "ICICI Prudential Value Discovery Fund",
        category: "Equity",
        amount: "₹5,00,000",
        amountValue: 500000,
        returns: "+8.5%",
        allocation: 10,
        status: "Underperforming",
        color: "#f97316",
        change30d: -15.3,
        sip: "₹0",
        riskCategory: "Moderate-High",
        xirr: 9.2,
        historical: [
          { month: "Jul", value: 550000 },
          { month: "Aug", value: 540000 },
          { month: "Sep", value: 530000 },
          { month: "Oct", value: 520000 },
          { month: "Nov", value: 510000 },
          { month: "Dec", value: 500000 },
        ],
      },
      {
        name: "Kotak Corporate Bond Fund",
        category: "Debt",
        amount: "₹7,00,000",
        amountValue: 700000,
        returns: "+6.2%",
        allocation: 15,
        status: "Performing",
        color: "#a3e635",
        change30d: -2.8,
        sip: "₹5,000",
        riskCategory: "Low",
        xirr: 7.5,
        historical: [
          { month: "Jul", value: 700000 },
          { month: "Aug", value: 702000 },
          { month: "Sep", value: 704000 },
          { month: "Oct", value: 702000 },
          { month: "Nov", value: 698000 },
          { month: "Dec", value: 700000 },
        ],
      },
    ],
    riskFactor: "Market Volatility",
    lastContact: "15 days ago",
    transactions: [
      {
        date: "15 Dec 2023",
        type: "SIP",
        fund: "HDFC Mid-Cap Opportunities Fund",
        amount: "₹15,000",
        status: "Completed",
      },
      { date: "15 Dec 2023", type: "SIP", fund: "Axis Bluechip Fund", amount: "₹10,000", status: "Completed" },
      { date: "15 Dec 2023", type: "SIP", fund: "SBI Small Cap Fund", amount: "₹5,000", status: "Completed" },
      { date: "15 Dec 2023", type: "SIP", fund: "Kotak Corporate Bond Fund", amount: "₹5,000", status: "Completed" },
      {
        date: "15 Nov 2023",
        type: "SIP",
        fund: "HDFC Mid-Cap Opportunities Fund",
        amount: "₹15,000",
        status: "Completed",
      },
      { date: "15 Nov 2023", type: "SIP", fund: "Axis Bluechip Fund", amount: "₹10,000", status: "Completed" },
      { date: "15 Nov 2023", type: "SIP", fund: "SBI Small Cap Fund", amount: "₹5,000", status: "Completed" },
      { date: "15 Nov 2023", type: "SIP", fund: "Kotak Corporate Bond Fund", amount: "₹5,000", status: "Completed" },
      {
        date: "15 Oct 2023",
        type: "SIP",
        fund: "HDFC Mid-Cap Opportunities Fund",
        amount: "₹15,000",
        status: "Completed",
      },
      { date: "15 Oct 2023", type: "SIP", fund: "Axis Bluechip Fund", amount: "₹10,000", status: "Completed" },
    ],
    documents: [
      { name: "PAN Card", date: "15 Jan 2023", type: "KYC" },
      { name: "Aadhaar Card", date: "15 Jan 2023", type: "KYC" },
      { name: "Bank Statement", date: "20 Jan 2023", type: "Banking" },
      { name: "Investment Agreement", date: "25 Jan 2023", type: "Legal" },
    ],
    performanceData: [
      { month: "Jul", portfolio: 0, benchmark: 0 },
      { month: "Aug", portfolio: -1.5, benchmark: -1 },
      { month: "Sep", portfolio: -3, benchmark: -3 },
      { month: "Oct", portfolio: -6, benchmark: -6 },
      { month: "Nov", portfolio: -9, benchmark: -8 },
      { month: "Dec", portfolio: -11.5, benchmark: -10 },
    ],
    assetAllocation: [
      { name: "Large Cap", value: 25 },
      { name: "Mid Cap", value: 30 },
      { name: "Small Cap", value: 20 },
      { name: "Debt", value: 25 },
    ],
    sectorExposure: [
      { name: "Financial Services", value: 30 },
      { name: "IT", value: 20 },
      { name: "Consumer Goods", value: 15 },
      { name: "Healthcare", value: 15 },
      { name: "Auto", value: 10 },
      { name: "Others", value: 10 },
    ],
  },
}

// Colors for the charts
const COLORS = ["#0496ff", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

// Fix the chart rendering issues by adding error handling and simplifying the charts
// Replace all chart components with safer implementations that include error handling

// For the portfolio performance chart in the key metrics section:
const renderPerformanceChart = (data: any[]) => {
  if (!data || data.length === 0)
    return (
      <div className="h-[80px] flex items-center justify-center text-xs text-muted-foreground">No data available</div>
    )

  try {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
          <YAxis hide={true} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value: any) => [`${value}%`, ""]}
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
            dataKey="portfolio"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  } catch (error) {
    console.error("Error rendering performance chart:", error)
    return (
      <div className="h-[80px] flex items-center justify-center text-xs text-muted-foreground">
        Chart rendering error
      </div>
    )
  }
}

// For the asset allocation pie chart:
const renderAssetAllocationChart = (data: any[]) => {
  if (!data || data.length === 0)
    return (
      <div className="h-[120px] flex items-center justify-center text-xs text-muted-foreground">No data available</div>
    )

  try {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={36}
            outerRadius={48}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.9} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any) => [`${value}%`, ""]}
            contentStyle={{
              backgroundColor: "var(--background)",
              borderRadius: "8px",
              boxShadow: "var(--shadow)",
              fontSize: "12px",
              padding: "8px 12px",
              border: "none",
            }}
          />
        </RePieChart>
      </ResponsiveContainer>
    )
  } catch (error) {
    console.error("Error rendering asset allocation chart:", error)
    return (
      <div className="h-[120px] flex items-center justify-center text-xs text-muted-foreground">
        Chart rendering error
      </div>
    )
  }
}

// For the investment historical chart:
const renderInvestmentChart = (data: any[], color: string) => {
  if (!data || data.length === 0)
    return (
      <div className="h-[80px] flex items-center justify-center text-xs text-muted-foreground">No data available</div>
    )

  try {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
          <YAxis hide={true} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value: any) => [`₹${(value).toLocaleString()}`, "Value"]}
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
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  } catch (error) {
    console.error("Error rendering investment chart:", error)
    return (
      <div className="h-[80px] flex items-center justify-center text-xs text-muted-foreground">
        Chart rendering error
      </div>
    )
  }
}

// For the sector exposure pie chart:
const renderSectorExposureChart = (data: any[]) => {
  if (!data || data.length === 0)
    return (
      <div className="h-[200px] flex items-center justify-center text-xs text-muted-foreground">No data available</div>
    )

  try {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.9} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any) => [`${value}%`, ""]}
            contentStyle={{
              backgroundColor: "var(--background)",
              borderRadius: "8px",
              boxShadow: "var(--shadow)",
              fontSize: "12px",
              padding: "8px 12px",
              border: "none",
            }}
          />
        </RePieChart>
      </ResponsiveContainer>
    )
  } catch (error) {
    console.error("Error rendering sector exposure chart:", error)
    return (
      <div className="h-[200px] flex items-center justify-center text-xs text-muted-foreground">
        Chart rendering error
      </div>
    )
  }
}

// For the goal projection chart:
const renderGoalProjectionChart = (data: any[], onTrack: boolean) => {
  if (!data || data.length === 0)
    return (
      <div className="h-[150px] flex items-center justify-center text-xs text-muted-foreground">No data available</div>
    )

  try {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value: any) => [`${value}%`, ""]}
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
            dataKey="current"
            name="Current Path"
            stroke="#0496ff"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 1 }}
          />
          {!onTrack && (
            <Line
              type="monotone"
              dataKey="projected"
              name="Required Path"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6, strokeWidth: 1 }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    )
  } catch (error) {
    console.error("Error rendering goal projection chart:", error)
    return (
      <div className="h-[150px] flex items-center justify-center text-xs text-muted-foreground">
        Chart rendering error
      </div>
    )
  }
}

// For the AUM chart with area
const renderAumChart = (data: any[]) => {
  if (!data || data.length === 0)
    return (
      <div className="h-[80px] flex items-center justify-center text-xs text-muted-foreground">No data available</div>
    )

  try {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 0 }} height={0} />
          <YAxis hide={true} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value: any) => [`${value}%`, "Portfolio"]}
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
            dataKey="portfolio"
            stroke="#ef4444"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPortfolio)"
          />
        </LineChart>
      </ResponsiveContainer>
    )
  } catch (error) {
    console.error("Error rendering AUM chart:", error)
    return (
      <div className="h-[80px] flex items-center justify-center text-xs text-muted-foreground">
        Chart rendering error
      </div>
    )
  }
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [clientData, setClientData] = useState(clientsData.default)
  const [activeTab, setActiveTab] = useState("portfolio")

  // Load the correct client data based on the ID parameter
  useEffect(() => {
    const id = params.id
    if (id && clientsData[id as keyof typeof clientsData]) {
      setClientData(clientsData[id as keyof typeof clientsData])
    } else {
      // Fallback to default if client ID not found
      setClientData(clientsData.default)
    }
  }, [params.id])

  // Calculate average XIRR for the client
  const calculateAverageXIRR = () => {
    if (!clientData.investments.length) return 0

    const totalAmount = clientData.investments.reduce((sum, inv) => {
      return sum + inv.amountValue
    }, 0)

    const weightedXIRR = clientData.investments.reduce((sum, inv) => {
      return sum + inv.xirr * inv.amountValue
    }, 0)

    return (weightedXIRR / totalAmount).toFixed(1)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header with Back Button and Client Name */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/clients">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{clientData.name}</h1>
            <p className="text-sm text-muted-foreground">Client since {clientData.joinDate}</p>
          </div>
        </div>
        <Button onClick={() => setIsUpdateOpen(true)} className="bg-primary hover:bg-primary/90 rounded-md shadow-md">
          <FileText className="mr-2 h-4 w-4" />
          Generate Portfolio Update
        </Button>
      </div>

      {/* Client Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Info Card */}
        <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Client Information</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">{clientData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">{clientData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Last contact: {clientData.lastContact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm">Risk Profile: {clientData.riskProfile}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Risk Factor: {clientData.riskFactor}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border/50">
              <Badge variant="destructive" className="flex items-center gap-1 px-3 py-1 w-full justify-center">
                <TrendingDown className="h-3.5 w-3.5 mr-0.5" />
                Portfolio Drop: {Math.abs(clientData.portfolioChange)}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* AUM Card */}
        <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Assets Under Management</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-green-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-3xl font-semibold">{clientData.aum}</h2>
              <p className="text-sm text-destructive flex items-center mt-1">
                <TrendingDown className="h-4 w-4 mr-1" />
                {clientData.portfolioChange}% (30 days)
              </p>
            </div>

            <div className="h-[80px] -mx-2">{renderAumChart(clientData.performanceData)}</div>

            <div className="pt-3 border-t border-border/50">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Monthly SIP</span>
                <span className="text-sm font-medium">{clientData.sipAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Performance Card */}
        <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Portfolio Performance</CardTitle>
              <div className="h-8 w-8 rounded-full bg-amber-900/30 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-amber-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-3xl font-semibold">{calculateAverageXIRR()}% XIRR</h2>
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <BarChart3 className="h-4 w-4 mr-1" />
                Weighted average return
              </p>
            </div>

            <div className="h-[80px] -mx-2">{renderPerformanceChart(clientData.performanceData)}</div>

            <div className="pt-3 border-t border-border/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <span className="text-xs">Portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
                  <span className="text-xs">Benchmark</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Section */}
      <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Portfolio Alert</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                The portfolio has dropped by {Math.abs(clientData.portfolioChange)}% in the last 30 days, which is
                significantly higher than the market average drop of 10%. This requires immediate attention.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-destructive/20 bg-destructive/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Main Contributors to Drop</CardTitle>
                  </CardHeader>
                  <CardContent className="py-3">
                    <ul className="space-y-2">
                      {clientData.investments
                        .sort((a, b) => a.change30d - b.change30d)
                        .slice(0, 2)
                        .map((inv, idx) => (
                          <li key={idx} className="flex items-center justify-between text-sm">
                            <span>{inv.name.split(" ").slice(0, 3).join(" ")}</span>
                            <span className="text-destructive">{inv.change30d}%</span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-destructive/20 bg-destructive/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Recommended Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="py-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">•</span>
                        <span>Review allocation in underperforming funds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">•</span>
                        <span>Consider rebalancing to more stable funds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">•</span>
                        <span>Schedule portfolio review call</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <Tabs defaultValue="portfolio" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-border">
          <TabsList className="bg-transparent h-12 w-full justify-start rounded-none p-0 mb-[-1px]">
            <TabsTrigger
              value="portfolio"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground px-4 h-12"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground px-4 h-12"
            >
              Goals
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground px-4 h-12"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground px-4 h-12"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="meeting-notes"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground px-4 h-12"
            >
              Meeting Notes
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6 mt-6">
          {/* Portfolio Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asset Allocation Card */}
            <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Asset Allocation</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <PieChart className="h-4 w-4 text-purple-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-[120px]">{renderAssetAllocationChart(clientData.assetAllocation)}</div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  {clientData.assetAllocation.map((category, index) => (
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

                <div className="pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {clientData.riskProfile} risk profile with{" "}
                      {clientData.assetAllocation.some((a) => a.name === "Debt") ? "balanced" : "aggressive"} allocation
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sector Exposure Card */}
            <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Sector Exposure</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-blue-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-[120px]">{renderSectorExposureChart(clientData.sectorExposure)}</div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  {clientData.sectorExposure.slice(0, 4).map((sector, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="text-xs">
                        {sector.name}: {sector.value}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-xs text-muted-foreground">
                      {clientData.sectorExposure[0].value + clientData.sectorExposure[1].value}% concentration in top 2
                      sectors
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Metrics */}
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Portfolio Metrics</CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center">
                  <BarChart2 className="h-4 w-4 text-green-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border border-border shadow-sm bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Average XIRR</span>
                    </div>
                    <p className="text-2xl font-semibold">{calculateAverageXIRR()}%</p>
                  </CardContent>
                </Card>
                <Card className="border border-border shadow-sm bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Avg. Holding Period</span>
                    </div>
                    <p className="text-2xl font-semibold">1.8 yrs</p>
                  </CardContent>
                </Card>
                <Card className="border border-border shadow-sm bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Equity:Debt Ratio</span>
                    </div>
                    <p className="text-2xl font-semibold">
                      {clientData.investments.some((inv) => inv.category === "Debt") ? "85:15" : "100:0"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-border shadow-sm bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Total Monthly SIP</span>
                    </div>
                    <p className="text-2xl font-semibold">{clientData.sipAmount}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Investment Allocation */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium tracking-tight">Investment Allocation</h2>
              <Badge variant="outline" className="bg-secondary/50 font-extralight">
                {clientData.investments.length} Funds
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {clientData.investments.map((investment, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80"
                >
                  <CardHeader className="pb-3 border-b border-border/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-medium">{investment.name}</CardTitle>
                        <CardDescription>{investment.category}</CardDescription>
                      </div>
                      <Badge
                        className={cn(
                          investment.status === "Outperforming"
                            ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                            : investment.status === "Underperforming"
                              ? "bg-orange-500/20 text-orange-500 hover:bg-orange-500/30"
                              : "bg-primary/20 text-primary hover:bg-primary/30",
                        )}
                      >
                        {investment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                        <p className="font-medium">{investment.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Allocation</p>
                        <p className="font-medium">{investment.allocation}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Monthly SIP</p>
                        <p className="font-medium">{investment.sip}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Risk Category</p>
                        <p className="font-medium">{investment.riskCategory}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">XIRR</p>
                        <p className="font-medium">{investment.xirr}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">30-Day Change</p>
                        <p
                          className={`font-medium ${investment.change30d >= 0 ? "text-green-500" : "text-destructive"}`}
                        >
                          {investment.change30d}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 h-[80px] -mx-2">
                      {renderInvestmentChart(investment.historical, investment.color)}
                    </div>
                  </CardContent>
                  {(investment.status === "Underperforming" || investment.status === "Outperforming") && (
                    <CardFooter className="bg-muted/50 py-3 px-4 border-t border-border/30">
                      {investment.status === "Underperforming" && (
                        <div className="w-full flex items-center gap-2 text-xs text-orange-500">
                          <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                          <span>Underperforming category average by 2.3%. Consider rebalancing.</span>
                        </div>
                      )}
                      {investment.status === "Outperforming" && (
                        <div className="w-full flex items-center gap-2 text-xs text-green-500">
                          <CheckCircle className="h-3 w-3 flex-shrink-0" />
                          <span>Outperforming category average by 3.1%. Good performance.</span>
                        </div>
                      )}
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6 mt-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium tracking-tight">Financial Goals</h2>
              <Badge variant="outline" className="bg-secondary/50 font-extralight">
                {clientData.goals.length} Goals
              </Badge>
            </div>

            <div className="space-y-6">
              {clientData.goals.map((goal, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80"
                >
                  <CardHeader className="pb-3 border-b border-border/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-medium">{goal.name}</CardTitle>
                        <CardDescription>
                          Target: {goal.target} in {goal.timeline}
                        </CardDescription>
                      </div>
                      <Badge
                        className={cn(
                          goal.onTrack
                            ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                            : "bg-destructive/20 text-destructive hover:bg-destructive/30",
                        )}
                      >
                        {goal.onTrack ? "On Track" : "Off Track"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">Progress</span>
                          <span className="font-medium text-primary">{goal.progress}%</span>
                        </div>
                        <Progress
                          value={goal.progress}
                          className="h-2"
                          indicatorClassName={goal.onTrack ? "bg-primary" : "bg-destructive"}
                        />
                      </div>

                      <div className="h-[150px]">{renderGoalProjectionChart(goal.projectedData, goal.onTrack)}</div>

                      <div className="grid grid-cols-2 gap-4">
                        <Card className="border border-border bg-muted/50">
                          <CardContent className="p-3">
                            <p className="text-xs text-muted-foreground mb-1">Expected Growth</p>
                            <p className="font-medium">{goal.expectedGrowth}% p.a.</p>
                          </CardContent>
                        </Card>
                        <Card className="border border-border bg-muted/50">
                          <CardContent className="p-3">
                            <p className="text-xs text-muted-foreground mb-1">Required Monthly SIP</p>
                            <p className="font-medium">{goal.requiredSip}</p>
                          </CardContent>
                        </Card>
                      </div>

                      {!goal.onTrack && goal.currentSip && (
                        <div className="p-4 border border-destructive/20 bg-destructive/10 rounded-lg">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-destructive mb-1">Goal at Risk</p>
                              <p className="text-xs text-muted-foreground">
                                Current SIP of {goal.currentSip} is insufficient. Increase monthly contribution by ₹
                                {Number.parseInt(goal.requiredSip.replace(/[^\d]/g, "")) -
                                  Number.parseInt(goal.currentSip.replace(/[^\d]/g, ""))}
                                to get back on track.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 py-3 px-4 border-t border-border/30">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium">
                          Target Completion: {2023 + Number.parseInt(goal.timeline.split(" ")[0])}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6 mt-6">
          {/* Recent Transactions */}
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
                <Button variant="outline" size="sm" className="text-xs font-medium">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 text-muted-foreground font-light">Date</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-light">Type</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-light">Fund</th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-light">Amount</th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-light">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientData.transactions.map((transaction, index) => (
                      <tr key={index} className="border-b border-border/30 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-foreground font-extralight">{transaction.date}</td>
                        <td className="py-3 px-4 text-foreground font-extralight">{transaction.type}</td>
                        <td className="py-3 px-4 text-foreground font-extralight">
                          {transaction.fund.split(" ").slice(0, 3).join(" ")}
                        </td>
                        <td className="text-right py-3 px-4 text-foreground font-extralight">{transaction.amount}</td>
                        <td className="text-right py-3 px-4">
                          <Badge className="bg-green-900/60 text-green-300 border-0 font-extralight">
                            {transaction.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Summary */}
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Transaction Summary</CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <Landmark className="h-4 w-4 text-blue-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-border bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-muted-foreground">Total Investments</p>
                    </div>
                    <p className="text-xl font-medium">₹{clientData.sipValue * 6}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <LineChartIcon className="h-4 w-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Monthly SIP</p>
                    </div>
                    <p className="text-xl font-medium">{clientData.sipAmount}</p>
                    <p className="text-xs text-muted-foreground mt-1">Across {clientData.investments.length} funds</p>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="h-4 w-4 text-amber-500" />
                      <p className="text-xs text-muted-foreground">Redemptions</p>
                    </div>
                    <p className="text-xl font-medium">₹50,000</p>
                    <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-blue-800/30 bg-blue-950/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-500 mb-1">SIP Consistency</p>
                      <p className="text-xs text-muted-foreground">
                        {clientData.name} has maintained consistent SIPs for 6+ months, demonstrating good investment
                        discipline. Consider suggesting a SIP step-up of 10% annually to accelerate goal achievement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6 mt-6">
          {/* Client Documents */}
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Client Documents</CardTitle>
                <Button variant="outline" size="sm" className="text-xs font-medium">
                  Upload New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {clientData.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border border-border/30 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-light text-foreground">{doc.name}</p>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-muted-foreground font-extralight">Uploaded on {doc.date}</p>
                        <Badge variant="outline" className="text-xs font-extralight">
                          {doc.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs font-medium">
                    <span className="mr-1">View</span>
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Document Status */}
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-background to-background/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Document Status</CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-green-800/30 bg-green-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-500 mb-1">KYC Status: Complete</p>
                        <p className="text-xs text-muted-foreground">
                          All required KYC documents are up-to-date and verified. No action needed.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-green-800/30 bg-green-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-500 mb-1">Nomination: Registered</p>
                        <p className="text-xs text-muted-foreground">
                          Nomination details have been registered and confirmed for all investments.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-amber-800/30 bg-amber-950/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-500 mb-1">Document Renewal</p>
                      <p className="text-xs text-muted-foreground">
                        Income proof document will need renewal in 45 days. Consider reminding the client to prepare
                        will need renewal in 45 days. Consider reminding the client to prepare updated income
                        documentation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="meeting-notes" className="space-y-6 mt-6">
          <ClientMeetingNotes clientId={params.id} clientName={clientData.name} />
        </TabsContent>
      </Tabs>

      <ClientUpdate
        clientId={params.id}
        clientName={clientData.name}
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
      />
    </div>
  )
}

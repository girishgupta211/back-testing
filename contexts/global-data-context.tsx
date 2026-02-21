"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"

// Define types for our global data
export type GlobalDataContextType = {
  // Business metrics
  totalAUM: number
  totalClients: number
  totalSIP: number
  monthlyCommission: number
  yearlyCommission: number

  // Client data
  clients: any[]
  clientsAtRisk: any[]
  clientsNeedingUpdates: any[]

  // Compliance data
  pendingComplianceTasks: any[]
  upcomingDeadlines: any[]

  // KYC data
  pendingKYC: any[]
  expiringKYC: any[]

  // Fund data
  topPerformingFunds: any[]
  underperformingFunds: any[]
  highCommissionFunds: any[]

  // Business insights
  businessGrowth: {
    aumGrowth: number
    clientGrowth: number
    revenueGrowth: number
  }

  // Alerts and notifications
  alerts: any[]

  // Last updated timestamp
  lastUpdated: Date
}

// Create the context with default values
const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined)

// Sample data for the global context
const sampleGlobalData: GlobalDataContextType = {
  totalAUM: 125000000, // ₹12.5 Cr
  totalClients: 47,
  totalSIP: 850000, // ₹8.5 Lakhs monthly
  monthlyCommission: 175000, // ₹1.75 Lakhs
  yearlyCommission: 2100000, // ₹21 Lakhs

  clients: [
    {
      id: "c1",
      name: "Vikram Mehta",
      aum: "₹12,50,000",
      aumValue: 1250000,
      riskProfile: "Aggressive",
      portfolioChange: -18.5,
    },
    {
      id: "c2",
      name: "Priya Singh",
      aum: "₹8,50,000",
      aumValue: 850000,
      riskProfile: "Moderate",
      portfolioChange: -15.2,
    },
    {
      id: "c3",
      name: "Amit Patel",
      aum: "₹18,50,000",
      aumValue: 1850000,
      riskProfile: "Aggressive",
      portfolioChange: -12.8,
    },
    // More clients would be here
  ],

  clientsAtRisk: [
    { id: "c1", name: "Vikram Mehta", portfolioChange: -18.5, riskFactor: "Market Volatility" },
    { id: "c5", name: "Ananya Desai", portfolioChange: -17.2, riskFactor: "Sector Concentration" },
    { id: "c8", name: "Rajiv Sharma", portfolioChange: -16.8, riskFactor: "Liquidity Risk" },
  ],

  clientsNeedingUpdates: [
    { id: "c1", name: "Vikram Mehta", lastUpdate: "95 days ago", portfolioValue: 1250000 },
    { id: "c2", name: "Priya Singh", lastUpdate: "82 days ago", portfolioValue: 850000 },
    { id: "c3", name: "Amit Patel", lastUpdate: "110 days ago", portfolioValue: 1850000 },
    { id: "c4", name: "Neha Gupta", lastUpdate: "75 days ago", portfolioValue: 750000 },
    { id: "c5", name: "Rajesh Kumar", lastUpdate: "88 days ago", portfolioValue: 2250000 },
  ],

  pendingComplianceTasks: [
    { id: "t1", title: "Quarterly GST Filing", dueDate: "April 20, 2023", status: "urgent", type: "gst" },
    { id: "t2", title: "ARN Renewal", dueDate: "May 15, 2023", status: "upcoming", type: "arn" },
    { id: "t3", title: "AMFI Certification Renewal", dueDate: "June 30, 2023", status: "upcoming", type: "amfi" },
  ],

  upcomingDeadlines: [
    { id: "d1", title: "SEBI Annual Compliance Report", dueDate: "July 10, 2023", daysRemaining: 45 },
    { id: "d2", title: "RIA Half-Yearly Compliance", dueDate: "October 31, 2023", daysRemaining: 158 },
  ],

  pendingKYC: [
    { id: "k1", clientName: "Rahul Sharma", documentType: "Address Proof", expiryDate: "3 days" },
    { id: "k2", clientName: "Priya Patel", documentType: "PAN Verification", expiryDate: "5 days" },
  ],

  expiringKYC: [
    { id: "k3", clientName: "Amit Verma", documentType: "Income Proof", expiryDate: "15 days" },
    { id: "k4", clientName: "Sneha Reddy", documentType: "Address Proof", expiryDate: "22 days" },
  ],

  topPerformingFunds: [
    { id: "f1", name: "SBI Small Cap Fund", returns: 22.7, commission: 1.75 },
    { id: "f2", name: "Nippon India Small Cap", returns: 24.8, commission: 1.7 },
    { id: "f3", name: "Kotak Small Cap Fund", returns: 21.5, commission: 1.65 },
  ],

  underperformingFunds: [
    { id: "f8", name: "ICICI Prudential Value Discovery Fund", returns: -2.5, commission: 1.2 },
    { id: "f9", name: "HDFC Top 100 Fund", returns: -1.8, commission: 1.3 },
  ],

  highCommissionFunds: [
    { id: "f1", name: "SBI Small Cap Fund", returns: 22.7, commission: 1.75 },
    { id: "f2", name: "Nippon India Small Cap", returns: 24.8, commission: 1.7 },
    { id: "f4", name: "Kotak Emerging Equity", returns: 18.5, commission: 1.6 },
  ],

  businessGrowth: {
    aumGrowth: 12.5,
    clientGrowth: 8.2,
    revenueGrowth: 15.3,
  },

  alerts: [
    {
      id: "a1",
      type: "compliance",
      title: "GST Filing Due",
      description: "Quarterly GST filing due in 5 days",
      priority: "high",
    },
    {
      id: "a2",
      type: "client",
      title: "Portfolio Updates Needed",
      description: "5 clients need portfolio updates",
      priority: "medium",
    },
    {
      id: "a3",
      type: "kyc",
      title: "KYC Renewals",
      description: "2 clients have KYC documents expiring soon",
      priority: "high",
    },
  ],

  lastUpdated: new Date(),
}

// Provider component
export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const [globalData, setGlobalData] = useState<GlobalDataContextType>(sampleGlobalData)

  // In a real application, you would fetch this data from your API
  useEffect(() => {
    // Simulate API fetch
    const fetchGlobalData = async () => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/global-data')
      // const data = await response.json()
      // setGlobalData(data)

      // For now, we'll just use our sample data
      setGlobalData(sampleGlobalData)
    }

    fetchGlobalData()

    // Set up a refresh interval (e.g., every 5 minutes)
    const intervalId = setInterval(fetchGlobalData, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  return <GlobalDataContext.Provider value={globalData}>{children}</GlobalDataContext.Provider>
}

// Custom hook to use the global data context
export const useGlobalData = () => {
  const context = useContext(GlobalDataContext)
  if (context === undefined) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider")
  }
  return context
}

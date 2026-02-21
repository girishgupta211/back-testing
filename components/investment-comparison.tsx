"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Info, BarChart3, PieChart } from "lucide-react"
import { compareInvestments, type ComparisonParams } from "@/services/investment-query-service"

interface InvestmentComparisonProps {
  type: "mutual-fund" | "stock" | "pms" | "aif" | "bond" | "deposit"
  ids: string[]
  title?: string
  description?: string
}

export function InvestmentComparison({ type, ids, title, description }: InvestmentComparisonProps) {
  const [comparisonData, setComparisonData] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Get comparison data based on the type and IDs
    const params: ComparisonParams = {
      type,
      ids,
      metrics: [], // Empty array to get all metrics
    }

    const data = compareInvestments(params)
    setComparisonData(data)
  }, [type, ids])

  if (comparisonData.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center">
          <p>Loading comparison data...</p>
        </CardContent>
      </Card>
    )
  }

  // Determine which metrics to show based on the investment type
  const getMetricGroups = () => {
    switch (type) {
      case "mutual-fund":
        return {
          overview: ["category", "amc", "aum", "expense", "riskRating", "rating"],
          performance: ["oneYearReturn", "threeYearReturn", "fiveYearReturn", "alpha3Year", "beta", "sharpeRatio"],
          portfolio: ["portfolioTurnover", "topHoldings", "sectorAllocation", "marketCapAllocation"],
        }
      case "stock":
        return {
          overview: ["sector", "marketCap", "price", "beta", "rating"],
          performance: ["oneYearReturn", "threeYearReturn", "fiveYearReturn", "dividendYield"],
          fundamentals: ["peRatio", "pbRatio", "roe", "roa", "debtToEquity", "profitMargin"],
        }
      case "pms":
        return {
          overview: ["strategy", "manager", "minInvestment", "managementFee", "performanceFee", "riskRating"],
          performance: [
            "oneYearReturn",
            "threeYearReturn",
            "fiveYearReturn",
            "alpha3Year",
            "sharpeRatio",
            "maxDrawdown",
          ],
          portfolio: ["portfolioTurnover", "topHoldings", "sectorAllocation", "marketCapAllocation"],
        }
      case "bond":
        return {
          overview: ["type", "issuer", "creditRating", "maturity", "minInvestment", "listingStatus"],
          returns: ["couponRate", "ytm", "interestPayment", "taxStatus"],
          risk: ["modifiedDuration", "convexity", "spreadOverG_Sec", "securityType", "seniority"],
        }
      case "deposit":
        return {
          overview: ["type", "institution", "tenure", "minAmount", "rating"],
          returns: ["interestRate", "seniorCitizenRate", "compounding", "interestPayout"],
          features: ["prematureWithdrawal", "autoRenewal", "loanAgainstDeposit", "taxStatus", "depositInsurance"],
        }
      default:
        return {
          overview: [],
          performance: [],
          details: [],
        }
    }
  }

  const metricGroups = getMetricGroups()
  const metricLabels: Record<string, string> = {
    // Common
    category: "Category",
    rating: "Rating",

    // Mutual Funds
    amc: "AMC",
    aum: "AUM (₹ Cr)",
    expense: "Expense Ratio (%)",
    riskRating: "Risk Rating",
    oneYearReturn: "1Y Return (%)",
    threeYearReturn: "3Y Return (%)",
    fiveYearReturn: "5Y Return (%)",
    alpha3Year: "Alpha - 3Y (%)",
    beta: "Beta",
    sharpeRatio: "Sharpe Ratio",
    portfolioTurnover: "Portfolio Turnover (%)",

    // Stocks
    sector: "Sector",
    marketCap: "Market Cap (₹ Cr)",
    price: "Price (₹)",
    dividendYield: "Dividend Yield (%)",
    peRatio: "P/E Ratio",
    pbRatio: "P/B Ratio",
    roe: "ROE (%)",
    roa: "ROA (%)",
    debtToEquity: "Debt/Equity",
    profitMargin: "Profit Margin (%)",

    // PMS
    strategy: "Strategy",
    manager: "Fund Manager",
    minInvestment: "Min Investment (₹)",
    managementFee: "Management Fee (%)",
    performanceFee: "Performance Fee",
    maxDrawdown: "Max Drawdown (%)",

    // Bonds
    type: "Type",
    issuer: "Issuer",
    creditRating: "Credit Rating",
    maturity: "Maturity",
    couponRate: "Coupon Rate (%)",
    ytm: "YTM (%)",
    interestPayment: "Interest Payment",
    taxStatus: "Tax Status",
    modifiedDuration: "Modified Duration",
    convexity: "Convexity",
    spreadOverG_Sec: "Spread over G-Sec (bps)",
    securityType: "Security Type",
    seniority: "Seniority",
    listingStatus: "Listing Status",

    // Deposits
    institution: "Institution",
    tenure: "Tenure",
    minAmount: "Min Amount (₹)",
    interestRate: "Interest Rate (%)",
    seniorCitizenRate: "Sr. Citizen Rate (%)",
    compounding: "Compounding",
    interestPayout: "Interest Payout",
    prematureWithdrawal: "Premature Withdrawal",
    autoRenewal: "Auto Renewal",
    loanAgainstDeposit: "Loan Against Deposit",
    depositInsurance: "Deposit Insurance",
  }

  // Helper function to format values based on the metric
  const formatValue = (metric: string, value: any) => {
    if (value === undefined || value === null) return "-"

    if (typeof value === "number") {
      if (
        [
          "oneYearReturn",
          "threeYearReturn",
          "fiveYearReturn",
          "alpha3Year",
          "expense",
          "dividendYield",
          "roe",
          "roa",
          "profitMargin",
          "interestRate",
          "seniorCitizenRate",
          "couponRate",
          "ytm",
        ].includes(metric)
      ) {
        return (
          <span className={value >= 0 ? "text-green-600" : "text-red-600"}>
            {value >= 0 ? "+" : ""}
            {value.toFixed(2)}%
          </span>
        )
      }

      if (["aum", "marketCap"].includes(metric)) {
        return `₹${(value / 1000).toFixed(2)}K Cr`
      }

      if (["minInvestment", "minAmount"].includes(metric)) {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`
        if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`
        return `₹${value.toLocaleString()}`
      }

      if (["price"].includes(metric)) {
        return `₹${value.toFixed(2)}`
      }

      if (["rating"].includes(metric)) {
        return `${value.toFixed(1)}★`
      }

      if (["portfolioTurnover"].includes(metric)) {
        return `${value.toFixed(1)}%`
      }

      if (
        ["beta", "sharpeRatio", "peRatio", "pbRatio", "debtToEquity", "modifiedDuration", "convexity"].includes(metric)
      ) {
        return value.toFixed(2)
      }

      if (["spreadOverG_Sec"].includes(metric)) {
        return `${value} bps`
      }

      return value.toString()
    }

    if (typeof value === "boolean") {
      return value ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />
    }

    return value
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || `${comparisonData.length} ${type.replace("-", " ")} Comparison`}</CardTitle>
        <CardDescription>{description || "Compare key metrics and performance"}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="flex items-center gap-1"
              disabled={!metricGroups.performance && !metricGroups.returns}
            >
              <BarChart3 className="h-4 w-4" />
              <span>{type === "bond" || type === "deposit" ? "Returns" : "Performance"}</span>
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="flex items-center gap-1"
              disabled={
                !metricGroups.portfolio && !metricGroups.fundamentals && !metricGroups.risk && !metricGroups.features
              }
            >
              <PieChart className="h-4 w-4" />
              <span>
                {type === "mutual-fund" || type === "pms"
                  ? "Portfolio"
                  : type === "stock"
                    ? "Fundamentals"
                    : type === "bond"
                      ? "Risk"
                      : "Features"}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Metric</TableHead>
                  {comparisonData.map((item) => (
                    <TableHead key={item.id}>{item.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {metricGroups.overview.map((metric) => (
                  <TableRow key={metric}>
                    <TableCell className="font-medium">{metricLabels[metric] || metric}</TableCell>
                    {comparisonData.map((item) => (
                      <TableCell key={`${item.id}-${metric}`}>{formatValue(metric, item[metric])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent
            value="performance"
            className="space-y-4"
            hidden={!metricGroups.performance && !metricGroups.returns}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Metric</TableHead>
                  {comparisonData.map((item) => (
                    <TableHead key={item.id}>{item.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {(metricGroups.performance || metricGroups.returns)?.map((metric) => (
                  <TableRow key={metric}>
                    <TableCell className="font-medium">{metricLabels[metric] || metric}</TableCell>
                    {comparisonData.map((item) => (
                      <TableCell key={`${item.id}-${metric}`}>{formatValue(metric, item[metric])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent
            value="details"
            className="space-y-4"
            hidden={
              !metricGroups.portfolio && !metricGroups.fundamentals && !metricGroups.risk && !metricGroups.features
            }
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Metric</TableHead>
                  {comparisonData.map((item) => (
                    <TableHead key={item.id}>{item.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {(
                  metricGroups.portfolio ||
                  metricGroups.fundamentals ||
                  metricGroups.risk ||
                  metricGroups.features
                )?.map((metric) => (
                  <TableRow key={metric}>
                    <TableCell className="font-medium">{metricLabels[metric] || metric}</TableCell>
                    {comparisonData.map((item) => (
                      <TableCell key={`${item.id}-${metric}`}>{formatValue(metric, item[metric])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

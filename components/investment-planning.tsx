"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Star, Filter, Info, AlertCircle, Lightbulb } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

// Client profiles with their recommended risk levels and goals
const clientProfiles = {
  "rahul-sharma": {
    name: "Rahul Sharma",
    recommendedRisk: 3, // Moderate
    recommendedHorizon: "long",
    monthlyInvestmentMin: 20000,
    goals: ["Retirement", "Children's Education"],
    taxBracket: "30",
  },
  "priya-patel": {
    name: "Priya Patel",
    recommendedRisk: 4, // High
    recommendedHorizon: "long",
    monthlyInvestmentMin: 15000,
    goals: ["Wealth Creation", "Property Purchase"],
    taxBracket: "20",
  },
  "amit-singh": {
    name: "Amit Singh",
    recommendedRisk: 2, // Low
    recommendedHorizon: "medium",
    monthlyInvestmentMin: 30000,
    goals: ["Retirement", "Tax Saving"],
    taxBracket: "30",
  },
  "neha-gupta": {
    name: "Neha Gupta",
    recommendedRisk: 5, // Very High
    recommendedHorizon: "long",
    monthlyInvestmentMin: 25000,
    goals: ["Early Retirement", "International Travel"],
    taxBracket: "20",
  },
}

const recommendedFunds = [
  {
    id: "1",
    name: "Axis Bluechip Fund",
    category: "Large Cap",
    rating: 5,
    returns: { "1y": 15.2, "3y": 12.8, "5y": 14.5 },
    risk: "Moderate",
    expense: 1.2,
    aum: 25000,
    selected: true,
    allocation: 15,
  },
  {
    id: "2",
    name: "HDFC Mid-Cap Opportunities",
    category: "Mid Cap",
    rating: 4,
    returns: { "1y": 22.3, "3y": 15.6, "5y": 16.2 },
    risk: "High",
    expense: 1.5,
    aum: 30500,
    selected: true,
    allocation: 10,
  },
  {
    id: "3",
    name: "SBI Small Cap Fund",
    category: "Small Cap",
    rating: 4,
    returns: { "1y": 25.7, "3y": 18.2, "5y": 19.5 },
    risk: "Very High",
    expense: 1.8,
    aum: 15200,
    selected: true,
    allocation: 10,
  },
  {
    id: "4",
    name: "ICICI Pru Corporate Bond Fund",
    category: "Debt",
    rating: 5,
    returns: { "1y": 7.2, "3y": 8.1, "5y": 7.8 },
    risk: "Low",
    expense: 0.6,
    aum: 22800,
    selected: true,
    allocation: 25,
  },
  {
    id: "5",
    name: "Nippon India Gold Savings Fund",
    category: "Gold",
    rating: 4,
    returns: { "1y": 8.2, "3y": 9.5, "5y": 10.2 },
    risk: "Moderate",
    expense: 0.9,
    aum: 12500,
    selected: true,
    allocation: 10,
  },
  {
    id: "6",
    name: "Franklin India Feeder - Franklin U.S. Opportunities Fund",
    category: "International",
    rating: 4,
    returns: { "1y": 18.5, "3y": 14.2, "5y": 15.8 },
    risk: "High",
    expense: 1.3,
    aum: 8500,
    selected: true,
    allocation: 5,
  },
  {
    id: "7",
    name: "Kotak Emerging Equity Fund",
    category: "Mid Cap",
    rating: 5,
    returns: { "1y": 24.1, "3y": 16.8, "5y": 17.5 },
    risk: "High",
    expense: 1.6,
    aum: 18200,
    selected: false,
    allocation: 0,
  },
  {
    id: "8",
    name: "Aditya Birla Sun Life Corporate Bond Fund",
    category: "Debt",
    rating: 4,
    returns: { "1y": 6.8, "3y": 7.5, "5y": 7.2 },
    risk: "Low",
    expense: 0.5,
    aum: 20500,
    selected: false,
    allocation: 0,
  },
]

const assetAllocationData = [
  { name: "Equity", value: 45, color: "#0496ff" },
  { name: "Debt", value: 30, color: "#00C49F" },
  { name: "Gold", value: 15, color: "#FFBB28" },
  { name: "Others", value: 10, color: "#FF8042" },
]

const returnComparisonData = [
  { name: "1Y", portfolio: 12.5, benchmark: 10.2 },
  { name: "3Y", portfolio: 14.2, benchmark: 12.8 },
  { name: "5Y", portfolio: 15.8, benchmark: 13.5 },
]

export function InvestmentPlanning() {
  const [selectedClient, setSelectedClient] = useState("rahul-sharma")
  const [selectedFunds, setSelectedFunds] = useState(recommendedFunds.filter((fund) => fund.selected))
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000)
  const [riskLevel, setRiskLevel] = useState(3)
  const [activeTab, setActiveTab] = useState("parameters")

  const [expectedReturn, setExpectedReturn] = useState(12.5)
  const [projectedValue, setProjectedValue] = useState(52.3)
  const [taxEfficiencyScore, setTaxEfficiencyScore] = useState(85)
  const [taxBracket, setTaxBracket] = useState("30")
  const [investmentHorizon, setInvestmentHorizon] = useState("long")

  // State for Zinni Insights
  const [insights, setInsights] = useState<{
    show: boolean
    type: "risk" | "investment" | "horizon" | "tax" | "general"
    message: string
  }>({ show: false, type: "general", message: "" })

  // Update client profile when selected client changes
  useEffect(() => {
    const profile = clientProfiles[selectedClient as keyof typeof clientProfiles]
    if (profile) {
      setRiskLevel(profile.recommendedRisk)
      setInvestmentHorizon(profile.recommendedHorizon)
      setTaxBracket(profile.taxBracket)
      // Don't automatically set the monthly investment to give user flexibility
    }
  }, [selectedClient])

  useEffect(() => {
    // Calculate expected return based on risk level and investment horizon
    const baseReturn = 7 + riskLevel * 1.5
    const horizonMultiplier = investmentHorizon === "short" ? 0.8 : investmentHorizon === "medium" ? 1 : 1.2
    const calculatedReturn = baseReturn * horizonMultiplier
    setExpectedReturn(Number.parseFloat(calculatedReturn.toFixed(1)))

    // Calculate projected value based on monthly investment, expected return, and investment horizon
    const years = investmentHorizon === "short" ? 3 : investmentHorizon === "medium" ? 5 : 10
    const monthlyRate = calculatedReturn / 100 / 12
    const months = years * 12
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    setProjectedValue(Number.parseFloat((futureValue / 100000).toFixed(1)))

    // Calculate tax efficiency score based on tax bracket and investment allocation
    const baseTaxEfficiency = 90 - Number.parseInt(taxBracket)
    const riskAdjustment = riskLevel <= 2 ? 5 : riskLevel >= 4 ? -5 : 0
    const calculatedScore = Math.min(100, Math.max(50, baseTaxEfficiency + riskAdjustment))
    setTaxEfficiencyScore(calculatedScore)

    // Check for misalignments and generate insights
    const profile = clientProfiles[selectedClient as keyof typeof clientProfiles]
    if (profile) {
      // Check risk level mismatch
      if (Math.abs(riskLevel - profile.recommendedRisk) >= 2) {
        setInsights({
          show: true,
          type: "risk",
          message:
            riskLevel > profile.recommendedRisk
              ? `The selected risk level is significantly higher than ${profile.name}'s risk tolerance. Consider reducing risk to better align with their comfort level.`
              : `The selected risk level may be too conservative for ${profile.name}'s financial goals. A slightly higher risk tolerance could improve long-term returns.`,
        })
        return
      }

      // Check investment amount
      if (monthlyInvestment < profile.monthlyInvestmentMin) {
        setInsights({
          show: true,
          type: "investment",
          message: `The current monthly investment of ₹${monthlyInvestment.toLocaleString()} may be insufficient to meet ${profile.name}'s ${profile.goals.join(" and ")} goals. Consider increasing to at least ₹${profile.monthlyInvestmentMin.toLocaleString()}.`,
        })
        return
      }

      // Check investment horizon mismatch
      if (profile.recommendedHorizon === "long" && investmentHorizon === "short") {
        setInsights({
          show: true,
          type: "horizon",
          message: `${profile.name}'s goals require a longer investment horizon. Short-term investments may not provide sufficient growth to meet their ${profile.goals.join(" and ")} goals.`,
        })
        return
      }

      // Check tax bracket optimization
      if (Number.parseInt(taxBracket) >= 20 && taxEfficiencyScore < 70) {
        setInsights({
          show: true,
          type: "tax",
          message: `Given ${profile.name}'s tax bracket, the current investment mix could be more tax-efficient. Consider tax-saving mutual funds or debt instruments with indexation benefits.`,
        })
        return
      }

      // If no specific issues, clear insights
      setInsights({ show: false, type: "general", message: "" })
    }
  }, [monthlyInvestment, riskLevel, investmentHorizon, taxBracket, selectedClient])

  const handleFundSelection = (id: string, checked: boolean) => {
    if (checked) {
      const fundToAdd = recommendedFunds.find((fund) => fund.id === id)
      if (fundToAdd) {
        setSelectedFunds([...selectedFunds, { ...fundToAdd, selected: true }])
      }
    } else {
      setSelectedFunds(selectedFunds.filter((fund) => fund.id !== id))
    }
  }

  const handleAllocationChange = (id: string, allocation: number) => {
    setSelectedFunds(selectedFunds.map((fund) => (fund.id === id ? { ...fund, allocation } : fund)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Investment Planning</h2>
          <p className="text-sm text-muted-foreground">Create and manage investment plans for clients</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rahul-sharma">Rahul Sharma</SelectItem>
              <SelectItem value="priya-patel">Priya Patel</SelectItem>
              <SelectItem value="amit-singh">Amit Singh</SelectItem>
              <SelectItem value="neha-gupta">Neha Gupta</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export Plan
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="parameters">Investment Parameters</TabsTrigger>
          <TabsTrigger value="funds">Fund Selection</TabsTrigger>
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="parameters" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Parameters</CardTitle>
              <CardDescription>Adjust the parameters to customize the investment plan</CardDescription>
            </CardHeader>
            <CardContent>
              {insights.show && (
                <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800">Zinni Insight</p>
                    <p className="text-amber-700 mt-1">{insights.message}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Monthly Investment: ₹{monthlyInvestment.toLocaleString()}</Label>
                    </div>
                    <Slider
                      min={5000}
                      max={100000}
                      step={1000}
                      value={[monthlyInvestment]}
                      onValueChange={(value) => setMonthlyInvestment(value[0])}
                      className="[&>span]:bg-[#0496ff]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>
                        Risk Level:{" "}
                        {riskLevel === 1
                          ? "Very Low"
                          : riskLevel === 2
                            ? "Low"
                            : riskLevel === 3
                              ? "Moderate"
                              : riskLevel === 4
                                ? "High"
                                : "Very High"}
                      </Label>
                    </div>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[riskLevel]}
                      onValueChange={(value) => setRiskLevel(value[0])}
                      className="[&>span]:bg-[#0496ff]"
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-[#0496ff]/10 border border-[#0496ff]/20 flex items-start gap-3">
                    <Info className="h-5 w-5 text-[#0496ff] mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Investment Strategy</p>
                      <p className="text-muted-foreground mt-1">
                        Based on your risk profile (
                        {riskLevel === 1
                          ? "Very Low"
                          : riskLevel === 2
                            ? "Low"
                            : riskLevel === 3
                              ? "Moderate"
                              : riskLevel === 4
                                ? "High"
                                : "Very High"}
                        ), we recommend a{" "}
                        {riskLevel <= 2 ? "conservative" : riskLevel === 3 ? "balanced" : "growth-oriented"} approach
                        with a mix of
                        {riskLevel <= 2
                          ? " stable, income-generating"
                          : riskLevel === 3
                            ? " growth-oriented and stable"
                            : " high-growth"}{" "}
                        investments. This strategy aims for{" "}
                        {riskLevel <= 2
                          ? "capital preservation and steady income"
                          : riskLevel === 3
                            ? "long-term capital appreciation while managing volatility"
                            : "maximum long-term growth potential"}
                        .
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block">Investment Horizon</Label>
                    <Select value={investmentHorizon} onValueChange={setInvestmentHorizon}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select horizon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short Term (0-3 years)</SelectItem>
                        <SelectItem value="medium">Medium Term (3-7 years)</SelectItem>
                        <SelectItem value="long">Long Term (7+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Tax Bracket</Label>
                    <Select value={taxBracket} onValueChange={setTaxBracket}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax bracket" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10%</SelectItem>
                        <SelectItem value="20">20%</SelectItem>
                        <SelectItem value="30">30%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Expected Annual Return</div>
                      <div className="text-lg font-bold text-[#0496ff]">{expectedReturn}%</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Projected Value (
                        {investmentHorizon === "short" ? "3" : investmentHorizon === "medium" ? "5" : "10"} years)
                      </div>
                      <div className="text-lg font-bold">₹{projectedValue}L</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm font-medium">Tax Efficiency Score</div>
                      <div className="text-lg font-bold text-green-600">{taxEfficiencyScore}/100</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setActiveTab("funds")}>Continue to Fund Selection</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="funds" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div>
                <CardTitle>Recommended Funds</CardTitle>
                <CardDescription>Optimized selection based on client's risk profile and goals</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-2 text-left">Select</th>
                      <th className="py-3 px-2 text-left">Fund Name</th>
                      <th className="py-3 px-2 text-left">Category</th>
                      <th className="py-3 px-2 text-center">Rating</th>
                      <th className="py-3 px-2 text-right">1Y Return</th>
                      <th className="py-3 px-2 text-right">Risk</th>
                      <th className="py-3 px-2 text-right">Expense</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendedFunds.map((fund) => (
                      <tr key={fund.id} className="border-b">
                        <td className="py-3 px-2">
                          <Checkbox
                            checked={selectedFunds.some((f) => f.id === fund.id)}
                            onCheckedChange={(checked) => handleFundSelection(fund.id, checked as boolean)}
                          />
                        </td>
                        <td className="py-3 px-2 font-medium">{fund.name}</td>
                        <td className="py-3 px-2">
                          <Badge variant="outline">{fund.category}</Badge>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <div className="flex justify-center">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < fund.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`}
                                />
                              ))}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right text-green-600">{fund.returns["1y"]}%</td>
                        <td className="py-3 px-2 text-right">{fund.risk}</td>
                        <td className="py-3 px-2 text-right">{fund.expense}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Important Note</p>
                  <p className="text-amber-700 mt-1">
                    Past performance is not indicative of future results. Please review the fund documents carefully
                    before investing. The recommended funds are based on your risk profile and investment goals.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("parameters")}>
                Back to Parameters
              </Button>
              <Button onClick={() => setActiveTab("allocation")}>Continue to Asset Allocation</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Allocation</CardTitle>
                  <CardDescription>Monthly investment: ₹{monthlyInvestment.toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={selectedFunds} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            height={60}
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                          />
                          <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Allocation"]}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Bar dataKey="allocation" fill="#0496ff" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      {selectedFunds.map((fund) => (
                        <div key={fund.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{fund.name}</span>
                            <div className="flex items-center gap-2">
                              <span>₹{Math.round((monthlyInvestment * fund.allocation) / 100).toLocaleString()}</span>
                              <span className="text-muted-foreground">({fund.allocation}%)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Slider
                              min={0}
                              max={100}
                              step={5}
                              value={[fund.allocation]}
                              onValueChange={(value) => handleAllocationChange(fund.id, value[0])}
                              className="[&>span]:bg-[#0496ff]"
                            />
                            <span className="text-sm w-12 text-right">{fund.allocation}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Investment Plan</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Distribution across asset classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetAllocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {assetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Allocation"]}
                          contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {assetAllocationData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">
                          {item.name}: {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expected Returns</CardTitle>
                  <CardDescription>Compared to benchmark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={returnComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, ""]}
                          contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                        />
                        <Legend />
                        <Bar dataKey="portfolio" name="Your Portfolio" fill="#0496ff" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="benchmark" name="Benchmark" fill="#FF8042" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
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

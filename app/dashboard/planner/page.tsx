"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioXray } from "@/components/portfolio-xray"
import { RiskProfiling } from "@/components/risk-profiling"
import { GoalMapping } from "@/components/goal-mapping"
import { InvestmentPlanning } from "@/components/investment-planning"
import { BarChartIcon as ChartBar, Target, TrendingUp, BarChart3 } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function PlannerPage() {
  const [activeTab, setActiveTab] = useState("portfolio")

  const searchParams = useSearchParams()
  const startNewXRay = searchParams.get("startNewXRay") === "true"

  useEffect(() => {
    if (startNewXRay) {
      setActiveTab("portfolio")
    }
  }, [startNewXRay])

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Financial Planner</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Comprehensive tools to analyze and plan your clients' financial future
        </p>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 h-auto p-1 bg-muted/50">
          <TabsTrigger
            value="portfolio"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <ChartBar className="h-4 w-4" />
            <span className="hidden sm:inline">Portfolio X-ray</span>
            <span className="sm:hidden">Portfolio</span>
          </TabsTrigger>
          <TabsTrigger
            value="risk"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Risk Profiling</span>
            <span className="sm:hidden">Risk</span>
          </TabsTrigger>
          <TabsTrigger
            value="goals"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Goal Mapping</span>
            <span className="sm:hidden">Goals</span>
          </TabsTrigger>
          <TabsTrigger
            value="investment"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Investment Planning</span>
            <span className="sm:hidden">Invest</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="mt-6 space-y-0">
          <PortfolioXray />
        </TabsContent>

        <TabsContent value="risk" className="mt-6 space-y-0">
          <RiskProfiling />
        </TabsContent>

        <TabsContent value="goals" className="mt-6 space-y-0">
          <GoalMapping />
        </TabsContent>

        <TabsContent value="investment" className="mt-6 space-y-0">
          <InvestmentPlanning />
        </TabsContent>
      </Tabs>
    </div>
  )
}

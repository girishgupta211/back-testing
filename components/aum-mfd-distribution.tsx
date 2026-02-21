"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowUpRight, BarChart3, PieChartIcon, TrendingUp, Users } from "lucide-react"

const aumData = [
  { slab: "<10 Crores", totalMfdAum: 5, distributors: 75.0, pricing: 25 },
  { slab: "10-50 Crores", totalMfdAum: 30, distributors: 14.5, pricing: 15 },
  { slab: "50-200 Crores", totalMfdAum: 50, distributors: 10.0, pricing: 10 },
  { slab: "250-500 Crores", totalMfdAum: 8, distributors: 0.4, pricing: 5 },
  { slab: ">500 Crores", totalMfdAum: 7, distributors: 0.1, pricing: 5 },
]

const planData = {
  distributors: 1000,
  distributorsOver50Cr: 100,
  totalAum: 8400,
  aumLarge: 7500,
  aumSmall: 1350,
  revenueTotal: 9.0,
  revenueLarge: 5.6,
  revenueSmall: 3.4,
  newSmallMfds: 900,
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function AumMfdDistribution() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">AUM/MFD Distribution - 2035</CardTitle>
          <CardDescription>Projected distribution of assets under management across different slabs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* AUM Distribution Chart */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">AUM Distribution</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>% of Total MFD AUM</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={aumData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                      <XAxis dataKey="slab" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Total MFD AUM"]}
                        labelStyle={{ fontWeight: "bold" }}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Bar dataKey="totalMfdAum" fill="#3b82f6">
                        {aumData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Distributor Distribution Chart */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Distributor Distribution</CardTitle>
                  <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>% of Distributors by AUM Slab</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={aumData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="distributors"
                        nameKey="slab"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {aumData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Distributors"]}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Chart */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Proposed Pricing</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Basis Points (bps) by AUM Slab</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={aumData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                      <XAxis dataKey="slab" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                      <YAxis tickFormatter={(value) => `${value} bps`} />
                      <Tooltip
                        formatter={(value) => [`${value} bps`, "Pricing"]}
                        labelStyle={{ fontWeight: "bold" }}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Bar dataKey="pricing" fill="#10b981">
                        {aumData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 18 Months Plan Summary */}
            <Card>
              <CardHeader className="bg-muted/50 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">18 Months Plan</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Key metrics and projections</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    title="Total Distributors"
                    value={planData.distributors}
                    icon={<Users className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="Distributors >50 Cr"
                    value={planData.distributorsOver50Cr}
                    icon={<Users className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="Total AUM (Crores)"
                    value={`₹${planData.totalAum.toLocaleString()}`}
                    icon={<BarChart3 className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="New/Small MFDs"
                    value={planData.newSmallMfds}
                    icon={<Users className="h-4 w-4" />}
                  />
                  <MetricCard
                    title="Total Revenue"
                    value={`₹${planData.revenueTotal} Cr`}
                    icon={<TrendingUp className="h-4 w-4" />}
                    className="col-span-2 bg-blue-50 dark:bg-blue-950"
                  />
                </div>

                <div className="mt-4 rounded-lg border bg-card p-4">
                  <h4 className="mb-2 font-medium">Revenue Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Large MFDs (avg 7.5 bps)</span>
                      <span className="font-medium">₹{planData.revenueLarge} Cr</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Small MFDs (avg 25 bps)</span>
                      <span className="font-medium">₹{planData.revenueSmall} Cr</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(planData.revenueLarge / planData.revenueTotal) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({ title, value, icon, className = "" }) {
  return (
    <div className={`flex items-center justify-between rounded-lg border bg-card p-3 ${className}`}>
      <div>
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
      <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
    </div>
  )
}

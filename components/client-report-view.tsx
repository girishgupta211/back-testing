"use client"

import { format } from "date-fns"
import { Download, Printer, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ClientReportViewProps {
  clientName: string
  date: Date
  period: "weekly" | "monthly"
  data: any
  onPrint: () => void
  onDownload: () => void
  onShare: () => void
}

export function ClientReportView({
  clientName,
  date,
  period,
  data,
  onPrint,
  onDownload,
  onShare,
}: ClientReportViewProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Report Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Portfolio Update: {clientName}</h1>
          <p className="text-muted-foreground">
            {period === "weekly" ? "Weekly" : "Monthly"} Report • {format(date, "PPP")}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onPrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-6">
        {/* Section 1: Summary & Risk Profile */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-1">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Risk Profile</h3>
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant={
                    data.riskProfile === "Conservative"
                      ? "outline"
                      : data.riskProfile === "Moderate"
                        ? "secondary"
                        : "default"
                  }
                >
                  {data.riskProfile}
                </Badge>
                <span className="text-sm font-medium">{data.riskScore}/100</span>
              </div>
              <Progress value={data.riskScore} className="h-2" />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Goals Summary</h3>
              <div className="space-y-3">
                {data.goals.map((goal: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: goal.onTrack ? "#10b981" : "#ef4444" }}
                      />
                      <span className="text-sm">{goal.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={(goal.current / goal.target) * 100} className="h-2 w-24" />
                      <span className="text-xs font-medium">{Math.round((goal.current / goal.target) * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 2: SIPs Performance */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">SIP Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-xs">
                    <th className="text-left py-2 px-2 font-medium">Fund</th>
                    <th className="text-right py-2 px-2 font-medium">Monthly</th>
                    <th className="text-right py-2 px-2 font-medium">Current Value</th>
                    <th className="text-right py-2 px-2 font-medium">Returns</th>
                    <th className="text-right py-2 px-2 font-medium">vs Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sips.map((sip: any, index: number) => (
                    <tr key={index} className="border-b text-xs">
                      <td className="py-2 px-2">{sip.name}</td>
                      <td className="text-right py-2 px-2">₹{sip.amount.toLocaleString()}</td>
                      <td className="text-right py-2 px-2">₹{sip.currentValue.toLocaleString()}</td>
                      <td
                        className={cn(
                          "text-right py-2 px-2 font-medium",
                          sip.returns > 10 ? "text-green-600" : sip.returns < 8 ? "text-red-600" : "text-amber-600",
                        )}
                      >
                        {sip.returns.toFixed(1)}%
                      </td>
                      <td
                        className={cn(
                          "text-right py-2 px-2",
                          sip.returns > sip.benchmark ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {(sip.returns - sip.benchmark).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Key Insights */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Key Insights</h3>
                <Badge variant="outline">Goal Status</Badge>
              </div>
              <p className="text-sm mb-3">{data.insights.goalAchievement}</p>

              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-red-600">Risks</h4>
                <h4 className="text-sm font-medium text-green-600">Positives</h4>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-xs border-l-2 border-red-500 pl-2">{data.insights.risks}</div>
                <div className="text-xs border-l-2 border-green-500 pl-2">{data.insights.positives}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Recommendations</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">Rebalancing</h4>
                  <p className="text-xs">{data.recommendations.rebalancing}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Tax Harvesting</h4>
                  <p className="text-xs">{data.recommendations.taxHarvesting}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t pt-4 mt-6 text-xs text-muted-foreground">
          <p>
            This report is generated based on market data as of {format(date, "PPP")}. Past performance is not
            indicative of future returns.
          </p>
          <p className="mt-1">For any queries, please contact your financial advisor.</p>
        </div>
      </div>
    </div>
  )
}

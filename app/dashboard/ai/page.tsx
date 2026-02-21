"use client"

import { useState } from "react"
import { ZinniAIDashboard } from "@/components/zinni-ai/dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Sparkles, Zap, ArrowRight, Bot, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react"
import { ComplianceCard } from "@/components/zinni-ai/compliance-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

export default function AIPage() {
  const [activeDialog, setActiveDialog] = useState<string | null>(null)
  const [actionTaken, setActionTaken] = useState<Record<string, boolean>>({})
  const [processingAction, setProcessingAction] = useState<string | null>(null)
  const [aiInsights, setAiInsights] = useState({
    priorityActions: 5,
    recommendations: 3,
    complianceItems: 1,
  })
  const { toast } = useToast()

  const handleOpenDialog = (dialogId: string) => {
    setActiveDialog(dialogId)
  }

  const handleCloseDialog = () => {
    setActiveDialog(null)
  }

  const simulateAiProcessing = (action: string, successMessage: string) => {
    setProcessingAction(action)

    // Simulate AI processing time
    setTimeout(() => {
      setProcessingAction(null)
      setActionTaken((prev) => ({ ...prev, [action]: true }))

      // Show success toast
      toast({
        title: "Action completed",
        description: successMessage,
        variant: "default",
      })

      // Update counters for relevant actions
      if (action.includes("kyc") || action.includes("rebalance") || action.includes("tax")) {
        setAiInsights((prev) => ({ ...prev, priorityActions: Math.max(0, prev.priorityActions - 1) }))
      } else if (action.includes("commission") || action.includes("segmentation") || action.includes("funds")) {
        setAiInsights((prev) => ({ ...prev, recommendations: Math.max(0, prev.recommendations - 1) }))
      } else if (action.includes("compliance")) {
        setAiInsights((prev) => ({ ...prev, complianceItems: Math.max(0, prev.complianceItems - 1) }))
      }
    }, 2500)
  }

  const handleAction = (action: string) => {
    const actionMessages = {
      optimize: "Optimization plan created successfully. You can now view detailed recommendations for each client.",
      kyc: "KYC renewal process initiated for all 5 clients. Automated emails sent with pre-filled forms.",
      rebalance: "Portfolio rebalancing analysis completed. 12 clients identified for rebalancing opportunities.",
      tax: "Tax-loss harvesting opportunities identified across 8 client portfolios, potentially saving ₹2.4L in taxes.",
      commission: "Commission optimization plan created. Potential to increase revenue by ₹45,000 annually.",
      segmentation:
        "Client segmentation analysis completed. New segments created based on investment goals and risk profiles.",
      funds: "New fund recommendations generated based on client portfolios and market conditions.",
      operational: "Operational efficiency analysis completed. 5 automation opportunities identified.",
      retention: "Client retention strategies analyzed. Personalized engagement plans created for at-risk clients.",
      growth: "Business growth opportunities identified. Targeting a 22% AUM increase over the next 12 months.",
      compliance: "Compliance check completed. All regulatory requirements are up to date.",
    }

    simulateAiProcessing(action, actionMessages[action as keyof typeof actionMessages])
  }

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-[#0496ff]" /> Zinni AI Hub
          </h2>
          <p className="text-sm text-muted-foreground">Your intelligent assistant for mutual fund distribution</p>
        </div>
      </div>

      {/* AI Copilot Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <BrainCircuit className="h-6 w-6 text-blue-400" />
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-0">Zinni AI</Badge>
              </div>
              <h2 className="text-2xl font-bold">Welcome to your financial advisory assistant</h2>
              <p className="text-gray-400 max-w-2xl">
                Your AI assistant has analyzed your portfolio and found {aiInsights.recommendations} optimization
                opportunities and {aiInsights.priorityActions} client actions that need attention.
              </p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog("insights")}>
              <Sparkles className="h-4 w-4" />
              View AI Insights
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-base">Priority Actions</CardTitle>
              </div>
              <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-0">
                {aiInsights.priorityActions} Actions
              </Badge>
            </div>
            <CardDescription>AI-detected tasks requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-2 rounded-md bg-amber-900/20 border border-amber-900/30">
                <span className="text-sm">Client KYC renewals due</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-amber-400"
                  onClick={() => handleOpenDialog("kyc")}
                  disabled={actionTaken["kyc"]}
                >
                  {actionTaken["kyc"] ? "Completed" : "Review"}
                </Button>
              </li>
              <li className="flex items-center justify-between p-2 rounded-md bg-gray-800">
                <span className="text-sm">Portfolio rebalancing needed</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => handleOpenDialog("rebalance")}
                  disabled={actionTaken["rebalance"]}
                >
                  {actionTaken["rebalance"] ? "Completed" : "View"}
                </Button>
              </li>
              <li className="flex items-center justify-between p-2 rounded-md bg-gray-800">
                <span className="text-sm">Tax-loss harvesting opportunity</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => handleOpenDialog("tax")}
                  disabled={actionTaken["tax"]}
                >
                  {actionTaken["tax"] ? "Completed" : "View"}
                </Button>
              </li>
            </ul>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3 text-xs gap-1"
              onClick={() => handleOpenDialog("allActions")}
            >
              View all actions <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-base">AI Recommendations</CardTitle>
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-0">
                {aiInsights.recommendations} New
              </Badge>
            </div>
            <CardDescription>Personalized insights for your practice</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-2 rounded-md bg-purple-900/20 border border-purple-900/30">
                <span className="text-sm">Commission optimization available</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-purple-400"
                  onClick={() => handleOpenDialog("commission")}
                  disabled={actionTaken["commission"]}
                >
                  {actionTaken["commission"] ? "Optimized" : "Optimize"}
                </Button>
              </li>
              <li className="flex items-center justify-between p-2 rounded-md bg-gray-800">
                <span className="text-sm">Client segmentation opportunity</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => handleOpenDialog("segmentation")}
                  disabled={actionTaken["segmentation"]}
                >
                  {actionTaken["segmentation"] ? "Completed" : "View"}
                </Button>
              </li>
              <li className="flex items-center justify-between p-2 rounded-md bg-gray-800">
                <span className="text-sm">New fund recommendations</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => handleOpenDialog("funds")}
                  disabled={actionTaken["funds"]}
                >
                  {actionTaken["funds"] ? "Reviewed" : "View"}
                </Button>
              </li>
            </ul>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3 text-xs gap-1"
              onClick={() => handleOpenDialog("allRecommendations")}
            >
              View all recommendations <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <ComplianceCard />
      </div>

      {/* AI Capabilities Banner */}
      <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-400" />
                <h3 className="font-medium">Operational Efficiency</h3>
              </div>
              <p className="text-sm text-gray-400">Automate routine tasks and reduce operational overhead</p>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-blue-800 bg-blue-900/30 hover:bg-blue-900/50 text-blue-400"
                onClick={() => handleAction("operational")}
                disabled={processingAction === "operational" || actionTaken["operational"]}
              >
                {processingAction === "operational" ? (
                  <>
                    Analyzing... <Sparkles className="h-3 w-3 ml-1 animate-pulse" />
                  </>
                ) : actionTaken["operational"] ? (
                  <>
                    View Analysis <ArrowRight className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Explore features <ArrowRight className="h-3 w-3" />
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <h3 className="font-medium">Client Retention</h3>
              </div>
              <p className="text-sm text-gray-400">Proactive insights to strengthen client relationships</p>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-purple-800 bg-purple-900/30 hover:bg-purple-900/50 text-purple-400"
                onClick={() => handleAction("retention")}
                disabled={processingAction === "retention" || actionTaken["retention"]}
              >
                {processingAction === "retention" ? (
                  <>
                    Analyzing... <Sparkles className="h-3 w-3 ml-1 animate-pulse" />
                  </>
                ) : actionTaken["retention"] ? (
                  <>
                    View Strategies <ArrowRight className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    View strategies <ArrowRight className="h-3 w-3" />
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                <h3 className="font-medium">Business Growth</h3>
              </div>
              <p className="text-sm text-gray-400">Identify opportunities to increase AUM and commissions</p>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-amber-800 bg-amber-900/30 hover:bg-amber-900/50 text-amber-400"
                onClick={() => handleAction("growth")}
                disabled={processingAction === "growth" || actionTaken["growth"]}
              >
                {processingAction === "growth" ? (
                  <>
                    Analyzing... <Sparkles className="h-3 w-3 ml-1 animate-pulse" />
                  </>
                ) : actionTaken["growth"] ? (
                  <>
                    View Opportunities <ArrowRight className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Discover insights <ArrowRight className="h-3 w-3" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insight of the Day */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              <CardTitle>AI Insight of the Day</CardTitle>
            </div>
            <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-0">New</Badge>
          </div>
          <CardDescription>Personalized recommendation based on your practice data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-amber-900/20 border border-amber-900/30 rounded-lg">
            <h3 className="font-medium mb-2">Commission Optimization Opportunity</h3>
            <p className="text-sm text-gray-300 mb-4">
              Zinni AI has detected that 18 of your clients have suboptimal asset allocation that is reducing your
              potential commission by approximately ₹45,000 annually. By rebalancing these portfolios, you can increase
              your revenue while better aligning with client risk profiles.
            </p>
            <div className="flex justify-end">
              <Button
                size="sm"
                className="gap-1 bg-amber-700 hover:bg-amber-800"
                onClick={() => handleOpenDialog("commission")}
                disabled={actionTaken["commission"]}
              >
                {actionTaken["commission"] ? (
                  <>
                    View Optimization Plan <ArrowRight className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    View Opportunity <ArrowRight className="h-3 w-3" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ZinniAIDashboard />

      {/* Dialogs */}
      <Dialog
        open={activeDialog === "commission"}
        onOpenChange={() => activeDialog === "commission" && handleCloseDialog()}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Commission Optimization Opportunity</DialogTitle>
            <DialogDescription>AI-detected opportunities to increase your commission revenue</DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Potential Additional Commission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">₹45,000</div>
                    <p className="text-xs text-muted-foreground">Annually</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Clients Affected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">Out of 47 total clients</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Implementation Effort</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-400">Medium</div>
                    <p className="text-xs text-muted-foreground">Est. 2-3 hours total</p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-gray-800 border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Optimization Strategy</h3>
                <p className="text-sm mb-4">
                  Zinni AI has analyzed your client portfolios and identified opportunities to optimize asset allocation
                  while maintaining or improving risk-adjusted returns. These changes would result in higher commission
                  structures based on your current agreements with AMCs.
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Debt to Equity Rebalancing</h4>
                      <Badge className="bg-green-500/20 text-green-400 border-0">+₹18,000</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      8 clients have suboptimal debt-equity ratios. Adjusting these would increase your commission while
                      better aligning with their risk profiles.
                    </p>
                  </div>

                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Fund House Diversification</h4>
                      <Badge className="bg-green-500/20 text-green-400 border-0">+₹15,000</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      6 clients have concentrated positions in low-commission fund houses. Diversifying to equivalent
                      funds with higher commissions would benefit both parties.
                    </p>
                  </div>

                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">SIP Optimization</h4>
                      <Badge className="bg-green-500/20 text-green-400 border-0">+₹12,000</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      12 clients could benefit from restructuring their SIPs to funds with similar performance but
                      higher trail commission structures.
                    </p>
                  </div>
                </div>
              </div>

              {actionTaken["optimize"] ? (
                <div className="p-4 bg-green-900/20 border border-green-900/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <h4 className="font-medium text-green-400">Action Plan Created</h4>
                  </div>
                  <p className="text-sm mb-3">
                    Zinni AI has created a detailed action plan for optimizing your client portfolios:
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Client-specific rebalancing recommendations generated</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Email templates for client communication prepared</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Implementation schedule created based on priority</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button className="gap-1">
                      View Detailed Plan <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button
                    className="gap-1"
                    onClick={() => handleAction("optimize")}
                    disabled={processingAction === "optimize"}
                  >
                    {processingAction === "optimize" ? (
                      <>
                        Creating Plan... <Sparkles className="h-4 w-4 ml-1 animate-pulse" />
                      </>
                    ) : (
                      <>
                        Create Optimization Plan <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "kyc"} onOpenChange={() => activeDialog === "kyc" && handleCloseDialog()}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Client KYC Renewals</DialogTitle>
            <DialogDescription>Clients requiring KYC updates or renewals</DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Clients Requiring Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-400">5</div>
                    <p className="text-xs text-muted-foreground">Out of 47 total clients</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Urgent Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-400">2</div>
                    <p className="text-xs text-muted-foreground">Expiring within 7 days</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Compliance Risk</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-400">Medium</div>
                    <p className="text-xs text-muted-foreground">Potential AMFI penalties</p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-gray-800 border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Clients Requiring KYC Updates</h3>

                <div className="space-y-3">
                  <div className="p-3 bg-red-900/20 border border-red-900/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <h4 className="text-sm font-medium">Rahul Sharma</h4>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border-0">Urgent</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Address proof expired. KYC validity ends in 3 days.
                    </p>
                  </div>

                  <div className="p-3 bg-red-900/20 border border-red-900/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <h4 className="text-sm font-medium">Priya Patel</h4>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border-0">Urgent</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      PAN card details need verification. KYC validity ends in 5 days.
                    </p>
                  </div>

                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-400" />
                        <h4 className="text-sm font-medium">Amit Verma</h4>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400 border-0">Soon</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Income proof update required. KYC validity ends in 15 days.
                    </p>
                  </div>
                </div>
              </div>

              {actionTaken["kyc"] ? (
                <div className="p-4 bg-green-900/20 border border-green-900/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <h4 className="font-medium text-green-400">KYC Renewal Process Initiated</h4>
                  </div>
                  <p className="text-sm mb-3">Zinni AI has initiated the KYC renewal process for all clients:</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Personalized emails sent to all 5 clients</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Pre-filled KYC forms generated for each client</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Follow-up reminders scheduled</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button className="gap-1">
                      Track KYC Status <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button className="gap-1" onClick={() => handleAction("kyc")} disabled={processingAction === "kyc"}>
                    {processingAction === "kyc" ? (
                      <>
                        Initiating Process... <Sparkles className="h-4 w-4 ml-1 animate-pulse" />
                      </>
                    ) : (
                      <>
                        Initiate KYC Renewal Process <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rebalance Dialog */}
      <Dialog
        open={activeDialog === "rebalance"}
        onOpenChange={() => activeDialog === "rebalance" && handleCloseDialog()}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Portfolio Rebalancing Opportunities</DialogTitle>
            <DialogDescription>AI-detected portfolio rebalancing needs across your client base</DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Clients Needing Rebalancing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-400">12</div>
                    <p className="text-xs text-muted-foreground">Out of 47 total clients</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Potential Return Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">1.8%</div>
                    <p className="text-xs text-muted-foreground">Average risk-adjusted</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Risk Alignment Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-400">8</div>
                    <p className="text-xs text-muted-foreground">Clients with misaligned risk</p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-gray-800 border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Rebalancing Opportunities</h3>
                <p className="text-sm mb-4">
                  Zinni AI has analyzed your client portfolios and identified opportunities to rebalance based on market
                  conditions, risk profiles, and performance metrics. These recommendations aim to improve returns while
                  maintaining appropriate risk levels.
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Equity Overweight Correction</h4>
                      <Badge className="bg-amber-500/20 text-amber-400 border-0">5 Clients</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      These clients have equity allocations exceeding their risk profiles by 15-25%. Rebalancing would
                      reduce potential drawdown risk.
                    </p>
                  </div>

                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Sector Concentration Risk</h4>
                      <Badge className="bg-amber-500/20 text-amber-400 border-0">7 Clients</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      These clients have over 30% exposure to a single sector, creating concentration risk.
                      Diversification would improve risk-adjusted returns.
                    </p>
                  </div>

                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Underperforming Fund Replacement</h4>
                      <Badge className="bg-amber-500/20 text-amber-400 border-0">9 Clients</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      These clients hold funds that have consistently underperformed their benchmarks. Replacing with
                      better alternatives could improve returns.
                    </p>
                  </div>
                </div>
              </div>

              {actionTaken["rebalance"] ? (
                <div className="p-4 bg-green-900/20 border border-green-900/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <h4 className="font-medium text-green-400">Rebalancing Analysis Complete</h4>
                  </div>
                  <p className="text-sm mb-3">
                    Zinni AI has created detailed rebalancing plans for all affected clients:
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Client-specific rebalancing recommendations generated</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Before/after risk-return analysis completed</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Client communication templates prepared</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button className="gap-1">
                      View Rebalancing Plans <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button
                    className="gap-1"
                    onClick={() => handleAction("rebalance")}
                    disabled={processingAction === "rebalance"}
                  >
                    {processingAction === "rebalance" ? (
                      <>
                        Analyzing Portfolios... <Sparkles className="h-4 w-4 ml-1 animate-pulse" />
                      </>
                    ) : (
                      <>
                        Generate Rebalancing Plans <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tax-Loss Harvesting Dialog */}
      <Dialog open={activeDialog === "tax"} onOpenChange={() => activeDialog === "tax" && handleCloseDialog()}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Tax-Loss Harvesting Opportunities</DialogTitle>
            <DialogDescription>AI-detected tax optimization opportunities for your clients</DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Clients With Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">8</div>
                    <p className="text-xs text-muted-foreground">Out of 47 total clients</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Potential Tax Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">₹2.4L</div>
                    <p className="text-xs text-muted-foreground">Total estimated</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Implementation Timeframe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-400">30 days</div>
                    <p className="text-xs text-muted-foreground">For optimal results</p>
                  </CardContent>
                </Card>
              </div>

              {actionTaken["tax"] ? (
                <div className="p-4 bg-green-900/20 border border-green-900/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <h4 className="font-medium text-green-400">Tax-Loss Harvesting Analysis Complete</h4>
                  </div>
                  <p className="text-sm mb-3">Zinni AI has identified specific tax-loss harvesting opportunities:</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-sm">Rajesh Mehta</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-0">₹42,500 savings</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended to sell underperforming mid-cap funds and replace with similar alternatives after 30
                        days.
                      </p>
                    </div>

                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-sm">Priya Sharma</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-0">₹38,200 savings</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Opportunity to harvest losses in international funds while maintaining global exposure.
                      </p>
                    </div>

                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">View all 8 client opportunities</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button className="gap-1">
                      Download Tax Strategy Report <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-800 border-gray-700 rounded-lg">
                  <h3 className="font-medium mb-2">Tax-Loss Harvesting Strategy</h3>
                  <p className="text-sm mb-4">
                    Zinni AI can analyze your client portfolios to identify tax-loss harvesting opportunities. This
                    strategy involves selling investments that have experienced losses to offset capital gains tax
                    liability.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <h4 className="text-sm font-medium">How It Works</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        The AI will identify investments with unrealized losses that can be sold to offset capital
                        gains, then recommend similar alternative investments to maintain the desired asset allocation.
                      </p>
                    </div>

                    <div className="p-3 bg-gray-700 rounded-lg">
                      <h4 className="text-sm font-medium">Benefits</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        • Reduce clients' tax liability
                        <br />• Improve after-tax returns
                        <br />• Demonstrate additional value to clients
                        <br />• Opportunity to update portfolio with better-performing funds
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button className="gap-1" onClick={() => handleAction("tax")} disabled={processingAction === "tax"}>
                      {processingAction === "tax" ? (
                        <>
                          Analyzing Tax Opportunities... <Sparkles className="h-4 w-4 ml-1 animate-pulse" />
                        </>
                      ) : (
                        <>
                          Analyze Tax-Loss Harvesting Opportunities <ArrowRight className="h-3 w-3" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

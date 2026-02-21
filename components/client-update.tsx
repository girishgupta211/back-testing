"use client"

import { useState, useRef } from "react"
import { format } from "date-fns"
import { CalendarIcon, Share, Mail, Download, Copy, Send, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ClientReportView } from "./client-report-view"
import { CheckCircle2, AlertTriangle, AlertCircle, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ClientUpdateProps {
  clientId: string
  clientName: string
  isOpen: boolean
  onClose: () => void
  clientData: any
  mode: "kyc" | "portfolio"
}

export function ClientUpdate(props: ClientUpdateProps) {
  const { clientId, clientData, mode } = props
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly")
  const [isGenerated, setIsGenerated] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("detailed")

  // Mock data for the client
  // const clientData = {
  //   riskProfile: "Moderate",
  //   riskScore: 65,
  //   goals: [
  //     { name: "Retirement", target: 10000000, current: 3500000, timeline: "15 years", onTrack: true },
  //     { name: "Child Education", target: 5000000, current: 1200000, timeline: "8 years", onTrack: false },
  //     { name: "Home Purchase", target: 8000000, current: 2000000, timeline: "5 years", onTrack: true },
  //   ],
  //   sips: [
  //     {
  //       name: "HDFC Mid-Cap Opportunities Fund",
  //       amount: 15000,
  //       startDate: "2020-05-15",
  //       currentValue: 580000,
  //       returns: 12.5,
  //       benchmark: 10.2,
  //     },
  //     {
  //       name: "Axis Bluechip Fund",
  //       amount: 10000,
  //       startDate: "2019-08-22",
  //       currentValue: 420000,
  //       returns: 9.8,
  //       benchmark: 10.5,
  //     },
  //     {
  //       name: "SBI Small Cap Fund",
  //       amount: 5000,
  //       startDate: "2021-01-10",
  //       currentValue: 120000,
  //       returns: 15.2,
  //       benchmark: 12.1,
  //     },
  //     {
  //       name: "ICICI Prudential Value Discovery Fund",
  //       amount: 8000,
  //       startDate: "2020-11-05",
  //       currentValue: 210000,
  //       returns: 8.5,
  //       benchmark: 10.0,
  //     },
  //   ],
  //   insights: {
  //     marketCommentary:
  //       "The market has shown volatility in the past month due to global economic concerns and domestic policy changes. However, the long-term outlook remains positive with expected GDP growth of 6-7% in the coming fiscal year.",
  //     goalAchievement:
  //       "Based on current investment patterns and market projections, you are on track to meet 2 out of 3 financial goals. The Child Education goal requires attention with a potential shortfall of approximately ₹800,000 at the current rate.",
  //     risks:
  //       "Your portfolio has a slight overexposure to mid-cap stocks which may increase volatility. Additionally, the fixed income portion is underweight compared to your risk profile recommendation.",
  //     positives:
  //       "Your disciplined SIP approach has yielded consistent returns above inflation. The diversification across fund categories has provided good risk-adjusted returns in the past year.",
  //   },
  //   recommendations: {
  //     rebalancing:
  //       "Consider reducing mid-cap exposure by 5% and increasing large-cap allocation to align with your risk profile. This can be achieved by redirecting ₹5,000 from SBI Small Cap Fund to Axis Bluechip Fund.",
  //     taxHarvesting:
  //       "There is an opportunity to harvest tax losses from ICICI Prudential Value Discovery Fund and reinvest in a similar fund after 30 days to maintain market exposure while booking the loss.",
  //     additionalSuggestions:
  //       "Increase your SIP amount for Child Education goal by ₹3,000 per month to bridge the projected shortfall. Consider adding a debt component to your portfolio to reduce overall volatility.",
  //   },
  // }

  // Refs for editable content
  const marketCommentaryRef = useRef<HTMLTextAreaElement>(null)
  const goalAchievementRef = useRef<HTMLTextAreaElement>(null)
  const risksRef = useRef<HTMLTextAreaElement>(null)
  const positivesRef = useRef<HTMLTextAreaElement>(null)
  const rebalancingRef = useRef<HTMLTextAreaElement>(null)
  const taxHarvestingRef = useRef<HTMLTextAreaElement>(null)
  const additionalSuggestionsRef = useRef<HTMLTextAreaElement>(null)

  const handleGenerate = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsGenerated(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleSaveEdits = () => {
    // In a real app, you would save the edited content to your backend
    setIsEditing(false)
  }

  const handleShare = (method: string) => {
    // In a real app, implement sharing functionality based on the method
    console.log(`Sharing via ${method}`)
    // For demonstration purposes, show an alert
    alert(`Report shared via ${method}`)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("Downloading PDF...")
  }

  if (mode === "kyc") {
    return (
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-[#0496ff]" />
            KYC Documentation Status
          </CardTitle>
          <CardDescription className="text-sm">Overview of client KYC documentation status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border p-5 bg-green-50 dark:bg-green-950/30 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/70 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0 shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-300 text-lg">
                  42 Clients with Complete KYC
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 leading-relaxed">
                  All documentation is up-to-date and verified
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-5 bg-amber-50 dark:bg-amber-950/30 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/70 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0 shadow-sm">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-lg">
                  3 Clients with Expiring Documents
                </h3>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-2 leading-relaxed">
                  These clients have documents that will expire within 60 days
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Amit Verma - PAN Card</span>
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                    >
                      Expires in 45 days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Priya Patel - Address Proof</span>
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                    >
                      Expires in 60 days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Rajiv Sharma - Income Proof</span>
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                    >
                      Expires in 15 days
                    </Badge>
                  </div>
                </div>
                <Button className="mt-4" variant="outline">
                  Send Renewal Reminders
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-5 bg-red-50 dark:bg-red-950/30 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/70 flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0 shadow-sm">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-300 text-lg">2 New Clients Requiring KYC</h3>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2 leading-relaxed">
                  These clients need to complete their initial KYC process
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Neha Gupta</span>
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                      Pending
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Sanjay Kumar</span>
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                      Pending
                    </Badge>
                  </div>
                </div>
                <Button className="mt-4">Start KYC Process</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog open={props.isOpen} onOpenChange={(open) => !open && props.onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Client Portfolio Update</DialogTitle>
          <DialogDescription>Generate a detailed portfolio update for {props.clientName}</DialogDescription>
        </DialogHeader>

        {!isGenerated ? (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="period">Update Period</Label>
                <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
                  <SelectTrigger id="period">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="date" variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button className="w-full" onClick={handleGenerate} disabled={!date || isLoading}>
              {isLoading ? "Generating..." : "Generate Update"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {period === "weekly" ? "Weekly" : "Monthly"} Update: {date && format(date, "PPP")}
              </h3>

              <div className="flex items-center space-x-4">
                {viewMode === "detailed" && (
                  <div className="flex items-center space-x-2">
                    <Switch id="edit-mode" checked={isEditing} onCheckedChange={setIsEditing} />
                    <Label htmlFor="edit-mode">Edit Mode</Label>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === "detailed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("detailed")}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Detailed
                  </Button>
                  <Button
                    variant={viewMode === "compact" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("compact")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleShare("email")}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("download")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
                      <Send className="h-4 w-4 mr-2" />
                      WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("copy")}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {viewMode === "detailed" ? (
              <Accordion type="single" collapsible className="w-full">
                {/* Section 1: Risk Profile and Goals */}
                <AccordionItem value="section-1">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span className="text-lg font-medium">Risk Profile & Goals</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Risk Profile</CardTitle>
                          <CardDescription>Client's risk tolerance assessment</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Risk Category:</span>
                              <Badge
                                variant={
                                  clientData.riskProfile === "Conservative"
                                    ? "outline"
                                    : clientData.riskProfile === "Moderate"
                                      ? "secondary"
                                      : "default"
                                }
                              >
                                {clientData.riskProfile}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Risk Score</span>
                                <span>{clientData.riskScore}/100</span>
                              </div>
                              <Progress value={clientData.riskScore} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Financial Goals</CardTitle>
                          <CardDescription>Progress towards defined goals</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {clientData.goals.map((goal, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{goal.name}</span>
                                  <Badge variant={goal.onTrack ? "success" : "destructive"}>
                                    {goal.onTrack ? "On Track" : "Needs Attention"}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Target: ₹{(goal.target / 100000).toFixed(1)} Lakhs • Timeline: {goal.timeline}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span>Current: ₹{(goal.current / 100000).toFixed(1)} Lakhs</span>
                                    <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                                  </div>
                                  <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Section 2: SIPs and Performance */}
                <AccordionItem value="section-2">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span className="text-lg font-medium">SIPs & Performance</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardHeader>
                        <CardTitle>Ongoing SIPs</CardTitle>
                        <CardDescription>Performance of systematic investments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-3 px-2">Fund Name</th>
                                <th className="text-right py-3 px-2">Monthly SIP</th>
                                <th className="text-right py-3 px-2">Start Date</th>
                                <th className="text-right py-3 px-2">Current Value</th>
                                <th className="text-right py-3 px-2">Returns</th>
                                <th className="text-right py-3 px-2">vs Benchmark</th>
                              </tr>
                            </thead>
                            <tbody>
                              {clientData.sips.map((sip, index) => (
                                <tr key={index} className="border-b">
                                  <td className="py-3 px-2">{sip.name}</td>
                                  <td className="text-right py-3 px-2">₹{sip.amount.toLocaleString()}</td>
                                  <td className="text-right py-3 px-2">
                                    {new Date(sip.startDate).toLocaleDateString()}
                                  </td>
                                  <td className="text-right py-3 px-2">₹{sip.currentValue.toLocaleString()}</td>
                                  <td
                                    className={cn(
                                      "text-right py-3 px-2 font-medium",
                                      sip.returns > 10
                                        ? "text-green-600"
                                        : sip.returns < 8
                                          ? "text-red-600"
                                          : "text-amber-600",
                                    )}
                                  >
                                    {sip.returns.toFixed(1)}%
                                  </td>
                                  <td
                                    className={cn(
                                      "text-right py-3 px-2",
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
                  </AccordionContent>
                </AccordionItem>

                {/* Section 3: Commentary and Insights */}
                <AccordionItem value="section-3">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span className="text-lg font-medium">Commentary & Insights</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Market Commentary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isEditing ? (
                            <Textarea
                              ref={marketCommentaryRef}
                              defaultValue={clientData.insights.marketCommentary}
                              className="min-h-[100px]"
                            />
                          ) : (
                            <p>{clientData.insights.marketCommentary}</p>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Goal Achievement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isEditing ? (
                            <Textarea
                              ref={goalAchievementRef}
                              defaultValue={clientData.insights.goalAchievement}
                              className="min-h-[100px]"
                            />
                          ) : (
                            <p>{clientData.insights.goalAchievement}</p>
                          )}
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-red-600">Risks</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {isEditing ? (
                              <Textarea
                                ref={risksRef}
                                defaultValue={clientData.insights.risks}
                                className="min-h-[100px]"
                              />
                            ) : (
                              <p>{clientData.insights.risks}</p>
                            )}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-green-600">Positives</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {isEditing ? (
                              <Textarea
                                ref={positivesRef}
                                defaultValue={clientData.insights.positives}
                                className="min-h-[100px]"
                              />
                            ) : (
                              <p>{clientData.insights.positives}</p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Section 4: Recommendations */}
                <AccordionItem value="section-4">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span className="text-lg font-medium">Recommendations</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Portfolio Rebalancing</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isEditing ? (
                            <Textarea
                              ref={rebalancingRef}
                              defaultValue={clientData.recommendations.rebalancing}
                              className="min-h-[100px]"
                            />
                          ) : (
                            <p>{clientData.recommendations.rebalancing}</p>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Tax Harvesting Opportunities</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isEditing ? (
                            <Textarea
                              ref={taxHarvestingRef}
                              defaultValue={clientData.recommendations.taxHarvesting}
                              className="min-h-[100px]"
                            />
                          ) : (
                            <p>{clientData.recommendations.taxHarvesting}</p>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Additional Suggestions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isEditing ? (
                            <Textarea
                              ref={additionalSuggestionsRef}
                              defaultValue={clientData.recommendations.additionalSuggestions}
                              className="min-h-[100px]"
                            />
                          ) : (
                            <p>{clientData.recommendations.additionalSuggestions}</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <ClientReportView
                clientName={props.clientName}
                date={date || new Date()}
                period={period}
                data={clientData}
                onPrint={handlePrint}
                onDownload={handleDownload}
                onShare={() => handleShare("email")}
              />
            )}

            {viewMode === "detailed" && isEditing && (
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdits}>Save Changes</Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

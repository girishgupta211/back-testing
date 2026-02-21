"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  MessageSquare,
  BarChart,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  FileCheck,
  Receipt,
  BadgeCheck,
  FileWarning,
  Bell,
  CalendarClock,
  Zap,
  Lightbulb,
  Megaphone,
  Users,
  PieChart,
  BarChart3,
  LineChart,
  Landmark,
  Building,
  BookOpen,
  Briefcase,
  HelpCircle,
  ArrowLeft,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

type ComplianceItem = {
  id: string
  title: string
  description: string
  dueDate: string
  status: "pending" | "upcoming" | "completed" | "overdue"
  type: "gst" | "arn" | "ria" | "amfi" | "sebi" | "rbi"
  priority: "high" | "medium" | "low"
}

type AIInsight = {
  id: string
  title: string
  description: string
  category: "compliance" | "business" | "client" | "market"
  actionable: boolean
}

export function ZinniAIDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("compliance")
  const [selectedCompliance, setSelectedCompliance] = useState<ComplianceItem | null>(null)
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null)

  // Sample compliance items
  const complianceItems: ComplianceItem[] = [
    {
      id: "c1",
      title: "Quarterly GST Filing",
      description: "File GSTR-1 and GSTR-3B for Q2 (July-September)",
      dueDate: "October 20, 2023",
      status: "pending",
      type: "gst",
      priority: "high",
    },
    {
      id: "c2",
      title: "ARN Renewal",
      description: "Renew AMFI Registration Number (ARN-12345)",
      dueDate: "March 15, 2024",
      status: "upcoming",
      type: "arn",
      priority: "medium",
    },
    {
      id: "c3",
      title: "AMFI Certification",
      description: "Complete mandatory 15 CPE credits for AMFI certification",
      dueDate: "December 31, 2023",
      status: "upcoming",
      type: "amfi",
      priority: "medium",
    },
    {
      id: "c4",
      title: "Commission Disclosure",
      description: "Submit commission disclosure report to SEBI",
      dueDate: "November 30, 2023",
      status: "upcoming",
      type: "sebi",
      priority: "high",
    },
    {
      id: "c5",
      title: "Client KYC Updates",
      description: "Update KYC for 5 clients with expired documentation",
      dueDate: "October 31, 2023",
      status: "pending",
      type: "sebi",
      priority: "high",
    },
  ]

  // Sample AI insights
  const aiInsights: AIInsight[] = [
    {
      id: "i1",
      title: "New SEBI Circular on Commission Disclosure",
      description:
        "SEBI has issued a new circular (SEBI/HO/IMD/DF2/CIR/P/2023/121) requiring enhanced disclosure of commission structures. This affects your practice and requires action by November 30.",
      category: "compliance",
      actionable: true,
    },
    {
      id: "i2",
      title: "Client Portfolio Risk Alert",
      description:
        "3 of your clients have portfolios with over 40% allocation to mid and small cap stocks, which exceeds their risk profile. Consider rebalancing these portfolios.",
      category: "client",
      actionable: true,
    },
    {
      id: "i3",
      title: "Business Growth Opportunity",
      description:
        "Based on your client demographics, there's an opportunity to increase AUM by 15% through targeted retirement planning services for clients aged 45-55.",
      category: "business",
      actionable: true,
    },
    {
      id: "i4",
      title: "Market Trend Analysis",
      description:
        "Recent market trends show increasing interest in debt funds due to rising interest rates. Consider reviewing your recommendations strategy.",
      category: "market",
      actionable: false,
    },
  ]

  // Filter compliance items by status
  const urgentItems = complianceItems.filter((item) => item.status === "pending" || item.status === "overdue")
  const upcomingItems = complianceItems.filter((item) => item.status === "upcoming")

  const handleComplianceClick = (item: ComplianceItem) => {
    setSelectedCompliance(item)
  }

  const handleInsightClick = (insight: AIInsight) => {
    setSelectedInsight(insight)
  }

  const closeComplianceDialog = () => {
    setSelectedCompliance(null)
  }

  const closeInsightDialog = () => {
    setSelectedInsight(null)
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()} aria-label="Go back">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 h-auto p-1">
          <TabsTrigger value="compliance" className="py-2">
            <FileCheck className="h-4 w-4 mr-2" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="insights" className="py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="tools" className="py-2">
            <Zap className="h-4 w-4 mr-2" />
            AI Tools
          </TabsTrigger>
        </TabsList>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Urgent Compliance Items */}
            <Card className="border-red-500/20 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Urgent Compliance Items</CardTitle>
                  <Badge variant="destructive" className="font-normal">
                    {urgentItems.length} Items
                  </Badge>
                </div>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {urgentItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border border-red-500/20 bg-red-500/5 rounded-lg cursor-pointer hover:bg-red-500/10 transition-colors"
                    onClick={() => handleComplianceClick(item)}
                  >
                    <div className="flex items-start gap-3">
                      {item.type === "gst" && <Receipt className="h-5 w-5 text-red-500 flex-shrink-0" />}
                      {item.type === "arn" && <BadgeCheck className="h-5 w-5 text-red-500 flex-shrink-0" />}
                      {item.type === "amfi" && <BookOpen className="h-5 w-5 text-red-500 flex-shrink-0" />}
                      {item.type === "sebi" && <FileWarning className="h-5 w-5 text-red-500 flex-shrink-0" />}
                      {item.type === "ria" && <Briefcase className="h-5 w-5 text-red-500 flex-shrink-0" />}
                      {item.type === "rbi" && <Landmark className="h-5 w-5 text-red-500 flex-shrink-0" />}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs font-normal",
                              item.status === "overdue" && "border-red-500/50 text-red-500",
                              item.status === "pending" && "border-amber-500/50 text-amber-500",
                            )}
                          >
                            {item.status === "overdue" ? "Overdue" : "Due Soon"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Due: {item.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full text-xs gap-1">
                  View All Compliance Items
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            {/* Upcoming Compliance Items */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Upcoming Requirements</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    {upcomingItems.length} Items
                  </Badge>
                </div>
                <CardDescription>Plan ahead for these compliance items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {upcomingItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleComplianceClick(item)}
                  >
                    <div className="flex items-start gap-3">
                      {item.type === "gst" && <Receipt className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                      {item.type === "arn" && <BadgeCheck className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                      {item.type === "amfi" && <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                      {item.type === "sebi" && <FileWarning className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                      {item.type === "ria" && <Briefcase className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                      {item.type === "rbi" && <Landmark className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <Badge variant="outline" className="text-xs font-normal">
                            Upcoming
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Due: {item.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full text-xs gap-1">
                  View Compliance Calendar
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Compliance Intelligence */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Compliance Intelligence</CardTitle>
              <CardDescription>AI-powered compliance assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-muted/50 shadow-none">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <FileCheck className="h-5 w-5 text-green-500" />
                      </div>
                      <h3 className="font-medium text-sm">Document Generation</h3>
                      <p className="text-xs text-muted-foreground">Auto-generate compliance documents and forms</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                        Generate Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 shadow-none">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="font-medium text-sm">Regulatory Updates</h3>
                      <p className="text-xs text-muted-foreground">Stay informed about SEBI, AMFI, and RBI updates</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                        View Updates
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 shadow-none">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <CalendarClock className="h-5 w-5 text-purple-500" />
                      </div>
                      <h3 className="font-medium text-sm">Certification Tracker</h3>
                      <p className="text-xs text-muted-foreground">
                        Track AMFI, NISM, and other certification deadlines
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                        View Certifications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AI Insights */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">AI-Generated Insights</CardTitle>
                <CardDescription>Personalized insights based on your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                      insight.category === "compliance" && "border-blue-500/20 bg-blue-500/5",
                      insight.category === "client" && "border-green-500/20 bg-green-500/5",
                      insight.category === "business" && "border-purple-500/20 bg-purple-500/5",
                      insight.category === "market" && "border-amber-500/20 bg-amber-500/5",
                    )}
                    onClick={() => handleInsightClick(insight)}
                  >
                    <div className="flex items-start gap-3">
                      {insight.category === "compliance" && (
                        <FileWarning className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      )}
                      {insight.category === "client" && <Users className="h-5 w-5 text-green-500 flex-shrink-0" />}
                      {insight.category === "business" && (
                        <BarChart3 className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      )}
                      {insight.category === "market" && <LineChart className="h-5 w-5 text-amber-500 flex-shrink-0" />}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{insight.title}</h4>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs font-normal",
                              insight.category === "compliance" && "border-blue-500/50 text-blue-500",
                              insight.category === "client" && "border-green-500/50 text-green-500",
                              insight.category === "business" && "border-purple-500/50 text-purple-500",
                              insight.category === "market" && "border-amber-500/50 text-amber-500",
                            )}
                          >
                            {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                        {insight.actionable && (
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm" className="text-xs h-7">
                              Take Action
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full text-xs gap-1">
                  View All Insights
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            {/* AI Recommendations */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">AI Recommendations</CardTitle>
                <CardDescription>Actionable suggestions to improve your practice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#0496ff]/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-4 w-4 text-[#0496ff]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Optimize Client Segmentation</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your client base can be segmented more effectively based on investment goals and risk profiles.
                        This could increase your service efficiency by 25%.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 text-xs h-7">
                        View Segmentation Plan
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#0496ff]/20 flex items-center justify-center flex-shrink-0">
                      <Megaphone className="h-4 w-4 text-[#0496ff]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Enhance Digital Presence</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your social media engagement is 40% below industry average. We've created a content calendar to
                        boost your online visibility and lead generation.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 text-xs h-7">
                        View Content Plan
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#0496ff]/20 flex items-center justify-center flex-shrink-0">
                      <PieChart className="h-4 w-4 text-[#0496ff]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Diversify Product Offerings</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        85% of your AUM is in equity mutual funds. Adding alternative investments could improve client
                        portfolio performance and increase your revenue streams.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 text-xs h-7">
                        Explore Alternatives
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Intelligence */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Business Intelligence</CardTitle>
              <CardDescription>AI-powered business analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-muted/50 shadow-none">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Users className="h-5 w-5 text-green-500" />
                      </div>
                      <h3 className="font-medium text-sm">Client Analysis</h3>
                      <p className="text-xs text-muted-foreground">Identify client patterns and opportunities</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                        View Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 shadow-none">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="font-medium text-sm">Commission Optimization</h3>
                      <p className="text-xs text-muted-foreground">Maximize your earnings with AI recommendations</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                        Optimize Earnings
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 shadow-none">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <BarChart className="h-5 w-5 text-purple-500" />
                      </div>
                      <h3 className="font-medium text-sm">Performance Metrics</h3>
                      <p className="text-xs text-muted-foreground">Track and improve your business KPIs</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
                        View Metrics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Tools Tab */}
        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#0496ff]" />
                  <CardTitle className="text-base font-medium">Content Generator</CardTitle>
                </div>
                <CardDescription>Create marketing content for clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  Generate personalized content for social media, emails, and client communications.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Social Media
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Email Templates
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Market Updates
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0496ff] hover:bg-[#0496ff]/90">Create Content</Button>
              </CardFooter>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#0496ff]" />
                  <CardTitle className="text-base font-medium">KYC Automation</CardTitle>
                </div>
                <CardDescription>Streamline client onboarding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Automate KYC verification, document processing, and compliance checks.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Document Scanning
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Verification
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Compliance
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0496ff] hover:bg-[#0496ff]/90">Process KYC</Button>
              </CardFooter>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[#0496ff]" />
                  <CardTitle className="text-base font-medium">Compliance Assistant</CardTitle>
                </div>
                <CardDescription>Stay compliant with regulations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Get guidance on regulatory requirements, deadlines, and documentation.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    SEBI
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    AMFI
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    RBI
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    GST
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0496ff] hover:bg-[#0496ff]/90">Get Assistance</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Recently Used Tools</CardTitle>
                <CardDescription>Quick access to your favorite tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Client Portfolio Report Generator</h4>
                      <p className="text-xs text-muted-foreground">Last used: 2 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Open
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Market Update Generator</h4>
                      <p className="text-xs text-muted-foreground">Last used: 5 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Open
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <BarChart className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Commission Calculator</h4>
                      <p className="text-xs text-muted-foreground">Last used: 1 week ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Open
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">AI Usage Stats</CardTitle>
                <CardDescription>Your AI tool usage this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-[#0496ff]" />
                      <span className="text-sm">Content Generation</span>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-[#0496ff]" />
                      <span className="text-sm">Compliance Assistance</span>
                    </div>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#0496ff]" />
                      <span className="text-sm">Client Analysis</span>
                    </div>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-[#0496ff]" />
                      <span className="text-sm">Business Intelligence</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarDays, User, DollarSign, AlertTriangle, BarChart3, Info } from "lucide-react"
import { nfoData } from "@/components/nfo-carousel"

export default function NFODetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [nfo, setNfo] = useState(null)

  useEffect(() => {
    // Find the NFO with the matching ID
    const foundNfo = nfoData.find((n) => n.id === params.id)
    if (foundNfo) {
      setNfo(foundNfo)
    } else {
      // If no NFO is found, redirect to the explore funds page
      router.push("/dashboard/explore-funds")
    }
  }, [params.id, router])

  // Calculate days remaining until closing date
  const getDaysRemaining = (closingDate: string) => {
    const today = new Date()
    const closing = new Date(closingDate)
    const diffTime = closing.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (!nfo) {
    return (
      <div className="flex-1 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading NFO details...</h2>
          <p className="text-sm text-muted-foreground mt-2">Please wait while we fetch the NFO information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">New Fund Offer</h2>
        <p className="text-sm text-muted-foreground">View detailed information about this NFO</p>
      </div>

      <div className="space-y-4">
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-sm"
          onClick={() => router.push("/dashboard/explore-funds")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Explore Funds
        </Button>

        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#0496ff]/10 to-transparent">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">{nfo.name}</CardTitle>
                  <Badge className="bg-[#0496ff]/10 text-[#0496ff] hover:bg-[#0496ff]/20">NFO</Badge>
                </div>
                <CardDescription className="mt-1">
                  {nfo.category} | {nfo.amc}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  Closes in {getDaysRemaining(nfo.closingDate)} days
                </span>
                <Badge className="mt-1 bg-[#0496ff]">{nfo.commission}% Commission</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="overview" className="w-full">
              <div className="border-b">
                <div className="px-6">
                  <TabsList className="h-12">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-[#0496ff]/10">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="details" className="data-[state=active]:bg-[#0496ff]/10">
                      Fund Details
                    </TabsTrigger>
                    <TabsTrigger value="strategy" className="data-[state=active]:bg-[#0496ff]/10">
                      Strategy
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="overview" className="p-6 space-y-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-[#0496ff]" />
                        <CardTitle className="text-base">Fund Manager</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{nfo.manager}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Experienced portfolio manager with expertise in {nfo.category.toLowerCase()} investments
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-[#0496ff]" />
                        <CardTitle className="text-base">Investment Details</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Minimum Investment</span>
                          <span className="text-sm font-medium">₹{nfo.minInvestment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">SIP Minimum</span>
                          <span className="text-sm font-medium">₹{nfo.sipMinimum}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Expense Ratio</span>
                          <span className="text-sm font-medium">{nfo.expense}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-[#0496ff]" />
                        <CardTitle className="text-base">Risk & Benchmark</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Risk Rating</span>
                          <span className="text-sm font-medium">{nfo.riskRating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Benchmark</span>
                          <span className="text-sm font-medium">{nfo.benchmark}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Exit Load</span>
                          <span className="text-sm font-medium">{nfo.exitLoad}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Fund Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{nfo.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="p-6 space-y-6 mt-0">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Fund Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Fund Name</span>
                        <span className="text-sm font-medium">{nfo.name}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">AMC</span>
                        <span className="text-sm font-medium">{nfo.amc}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Category</span>
                        <span className="text-sm font-medium">{nfo.category}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Fund Manager</span>
                        <span className="text-sm font-medium">{nfo.manager}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">NFO Closing Date</span>
                        <span className="text-sm font-medium">{nfo.closingDate}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Benchmark</span>
                        <span className="text-sm font-medium">{nfo.benchmark}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Minimum Investment</span>
                        <span className="text-sm font-medium">₹{nfo.minInvestment}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">SIP Minimum</span>
                        <span className="text-sm font-medium">₹{nfo.sipMinimum}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Expense Ratio</span>
                        <span className="text-sm font-medium">{nfo.expense}%</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Exit Load</span>
                        <span className="text-sm font-medium">{nfo.exitLoad}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Risk Rating</span>
                        <span className="text-sm font-medium">{nfo.riskRating}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-sm text-muted-foreground">Commission</span>
                        <span className="text-sm font-medium text-[#0496ff]">{nfo.commission}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="strategy" className="p-6 space-y-6 mt-0">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Investment Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{nfo.investmentStrategy}</p>

                    <div className="mt-6 space-y-4">
                      <div className="p-4 rounded-lg border hover:border-[#0496ff]/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-[#0496ff]" />
                            <span className="font-medium">Investment Objective</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          To generate long-term capital appreciation by investing in a diversified portfolio of equity
                          and equity-related securities.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border hover:border-[#0496ff]/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-[#0496ff]" />
                            <span className="font-medium">Asset Allocation</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Equity & Equity related instruments: 80-100%
                          <br />
                          Debt and Money Market Instruments: 0-20%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-[#0496ff]/5 to-transparent">
            <Button variant="outline" onClick={() => router.push("/dashboard/explore-funds")} className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Funds
            </Button>
            <Button className="bg-[#0496ff] hover:bg-[#0088cc]">Subscribe to NFO</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

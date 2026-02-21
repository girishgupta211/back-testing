"use client"

import { useState } from "react"
import {
  CreditCard,
  Download,
  FileText,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Percent,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useGlobalData } from "@/contexts/global-data-context"

export default function BillingPage() {
  const router = useRouter()
  const [expandedInvoice, setExpandedInvoice] = useState<number | null>(null)
  const { totalAUM } = useGlobalData()

  // Calculate monthly fee based on 10bps (0.10%) of AUM
  // For annual, we calculate 10bps of AUM per month for 12 months
  const bpsRate = 0.001 // 10 basis points = 0.10%
  const monthlyFee = Math.round((totalAUM * bpsRate) / 12)
  const formattedMonthlyFee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(monthlyFee)

  const annualFee = monthlyFee * 12
  const formattedAnnualFee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(annualFee)

  const toggleInvoice = (index: number) => {
    setExpandedInvoice(expandedInvoice === index ? null : index)
  }

  // Updated invoices to reflect AUM-based billing
  const invoices = [
    { id: "INV-2023-0042", date: "01 Apr 2023", amount: formattedMonthlyFee, status: "paid", aum: "₹12.5 Cr" },
    { id: "INV-2023-0041", date: "01 Mar 2023", amount: formattedMonthlyFee, status: "paid", aum: "₹12.2 Cr" },
    { id: "INV-2023-0040", date: "01 Feb 2023", amount: "₹12,200", status: "paid", aum: "₹12.2 Cr" },
    { id: "INV-2023-0039", date: "01 Jan 2023", amount: "₹12,000", status: "paid", aum: "₹12.0 Cr" },
    { id: "INV-2022-0038", date: "01 Dec 2022", amount: "₹11,800", status: "paid", aum: "₹11.8 Cr" },
  ]

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">AUM-Based Billing Plan</CardTitle>
                  <CardDescription>Your next billing date is May 1, 2023</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Current AUM</div>
                <div className="text-xl font-bold">₹{(totalAUM / 10000000).toFixed(1)} Cr</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Billing Rate</div>
                <div className="text-xl font-bold flex items-center">
                  <span>10 bps</span>
                  <span className="text-sm font-normal text-muted-foreground ml-2">(0.10% of AUM annually)</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Monthly Fee</div>
                <div className="text-xl font-bold">{formattedMonthlyFee}</div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Your plan includes:</h3>
                <ul className="space-y-1">
                  {[
                    "Unlimited client onboarding",
                    "Advanced portfolio analytics",
                    "Commission tracking & reporting",
                    "Client risk profiling",
                    "Investment planning tools",
                    "Priority support",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button className="w-full sm:w-auto">
                <TrendingUp className="h-4 w-4 mr-2" />
                View AUM Growth
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Percent className="h-4 w-4 mr-2" />
                Billing Calculator
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-14 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium">•••• •••• •••• 4242</div>
                    <div className="text-xs text-muted-foreground">Expires 12/2025</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {invoices.map((invoice, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    onClick={() => toggleInvoice(index)}
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium">{invoice.id}</div>
                        <div className="text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {invoice.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-4">
                        <div className="font-medium">{invoice.amount}</div>
                        <Badge
                          variant="outline"
                          className={
                            invoice.status === "paid"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                          }
                        >
                          {invoice.status === "paid" ? (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </div>
                      {expandedInvoice === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {expandedInvoice === index && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm">
                          <div className="font-medium">Billing Period</div>
                          <div className="text-muted-foreground">01 Apr 2023 - 30 Apr 2023</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>AUM for Billing Period</span>
                          <span>{invoice.aum}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rate (10 bps annually)</span>
                          <span>0.10%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Monthly Fee (AUM × 10bps ÷ 12)</span>
                          <span>{invoice.amount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax (18% GST)</span>
                          <span>
                            ₹
                            {Math.round(Number.parseInt(invoice.amount.replace(/[^\d]/g, "")) * 0.18).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>
                            ₹
                            {Math.round(Number.parseInt(invoice.amount.replace(/[^\d]/g, "")) * 1.18).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

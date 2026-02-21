"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, FileText } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for AMC details
const amcDetails = {
  amc1: {
    name: "Axis Mutual Fund",
    schemes: [
      {
        id: "scheme1",
        name: "Axis Bluechip Fund",
        category: "Equity",
        aum: "₹2,45,000",
        promisedRate: "1.25%",
        actualRate: "0.85%",
        promisedAmount: 3062.5,
        actualAmount: 2082.5,
        difference: 980.0,
      },
      {
        id: "scheme2",
        name: "Axis Midcap Fund",
        category: "Equity",
        aum: "₹3,80,000",
        promisedRate: "1.50%",
        actualRate: "0.95%",
        promisedAmount: 5700.0,
        actualAmount: 3610.0,
        difference: 2090.0,
      },
      {
        id: "scheme3",
        name: "Axis Dynamic Bond Fund",
        category: "Debt",
        aum: "₹7,85,000",
        promisedRate: "1.20%",
        actualRate: "0.80%",
        promisedAmount: 9420.0,
        actualAmount: 6280.0,
        difference: 3140.0,
      },
    ],
    totalPromised: 18182.5,
    totalActual: 11972.5,
    totalDifference: 6210.0,
  },
  amc2: {
    name: "HDFC Mutual Fund",
    schemes: [
      {
        id: "scheme4",
        name: "HDFC Top 100 Fund",
        category: "Equity",
        aum: "₹4,25,000",
        promisedRate: "1.35%",
        actualRate: "1.00%",
        promisedAmount: 5737.5,
        actualAmount: 4250.0,
        difference: 1487.5,
      },
      {
        id: "scheme5",
        name: "HDFC Corporate Bond Fund",
        category: "Debt",
        aum: "₹6,50,000",
        promisedRate: "1.10%",
        actualRate: "0.75%",
        promisedAmount: 7150.0,
        actualAmount: 4875.0,
        difference: 2275.0,
      },
    ],
    totalPromised: 12887.5,
    totalActual: 9125.0,
    totalDifference: 3762.5,
  },
  amc3: {
    name: "SBI Mutual Fund",
    schemes: [
      {
        id: "scheme6",
        name: "SBI Bluechip Fund",
        category: "Equity",
        aum: "₹5,15,000",
        promisedRate: "1.30%",
        actualRate: "1.05%",
        promisedAmount: 6695.0,
        actualAmount: 5407.5,
        difference: 1287.5,
      },
    ],
    totalPromised: 6695.0,
    totalActual: 5407.5,
    totalDifference: 1287.5,
  },
  amc4: {
    name: "ICICI Prudential",
    schemes: [
      {
        id: "scheme7",
        name: "ICICI Pru Bluechip Fund",
        category: "Equity",
        aum: "₹3,75,000",
        promisedRate: "1.40%",
        actualRate: "1.10%",
        promisedAmount: 5250.0,
        actualAmount: 4125.0,
        difference: 1125.0,
      },
      {
        id: "scheme8",
        name: "ICICI Pru Value Discovery",
        category: "Equity",
        aum: "₹2,90,000",
        promisedRate: "1.45%",
        actualRate: "1.15%",
        promisedAmount: 4205.0,
        actualAmount: 3335.0,
        difference: 870.0,
      },
      {
        id: "scheme9",
        name: "ICICI Pru Liquid Fund",
        category: "Debt",
        aum: "₹8,50,000",
        promisedRate: "0.90%",
        actualRate: "0.65%",
        promisedAmount: 7650.0,
        actualAmount: 5525.0,
        difference: 2125.0,
      },
      {
        id: "scheme10",
        name: "ICICI Pru Balanced Advantage",
        category: "Hybrid",
        aum: "₹4,25,000",
        promisedRate: "1.25%",
        actualRate: "0.95%",
        promisedAmount: 5312.5,
        actualAmount: 4037.5,
        difference: 1275.0,
      },
    ],
    totalPromised: 22417.5,
    totalActual: 17022.5,
    totalDifference: 5395.0,
  },
  amc5: {
    name: "Aditya Birla Sun Life",
    schemes: [
      {
        id: "scheme11",
        name: "ABSL Frontline Equity Fund",
        category: "Equity",
        aum: "₹3,20,000",
        promisedRate: "1.35%",
        actualRate: "1.10%",
        promisedAmount: 4320.0,
        actualAmount: 3520.0,
        difference: 800.0,
      },
      {
        id: "scheme12",
        name: "ABSL Corporate Bond Fund",
        category: "Debt",
        aum: "₹5,75,000",
        promisedRate: "1.00%",
        actualRate: "0.75%",
        promisedAmount: 5750.0,
        actualAmount: 4312.5,
        difference: 1437.5,
      },
    ],
    totalPromised: 10070.0,
    totalActual: 7832.5,
    totalDifference: 2237.5,
  },
}

interface CommissionMismatchDetailsProps {
  amcId: string
  onBack: () => void
}

export function CommissionMismatchDetails({ amcId, onBack }: CommissionMismatchDetailsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [disputeMessage, setDisputeMessage] = useState("")

  const amc = amcDetails[amcId as keyof typeof amcDetails]

  if (!amc) {
    return (
      <div className="text-center p-4">
        <p>AMC details not found</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  const handleRaiseDispute = () => {
    toast({
      title: "Dispute raised successfully",
      description: `Your dispute with ${amc.name} has been submitted.`,
    })
    setIsDialogOpen(false)
    // In a real app, you would send this to your backend
  }

  // Generate default dispute message
  const generateDefaultMessage = () => {
    return `Dear ${amc.name} Team,

I am writing to bring to your attention a discrepancy in the commission payments for the following schemes:

${amc.schemes.map((scheme) => `- ${scheme.name}: Promised rate ${scheme.promisedRate} vs Actual rate ${scheme.actualRate} (Difference: ₹${scheme.difference.toFixed(2)})`).join("\n")}

As per our broker agreement, the total commission due is ₹${amc.totalPromised.toFixed(2)}, but only ₹${amc.totalActual.toFixed(2)} has been paid, resulting in a shortfall of ₹${amc.totalDifference.toFixed(2)}.

I request you to kindly review this matter and process the pending commission at your earliest convenience.

Thank you for your attention to this matter.

Regards,
[Your Name]
Zinnimoney Financial Services`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">{amc.name} - Commission Mismatch Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Promised Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{amc.totalPromised.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">As per broker sheet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Actual Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{amc.totalActual.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Received from AMC</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Difference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ₹{amc.totalDifference.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Pending recovery</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheme-wise Commission Breakdown</CardTitle>
          <CardDescription>Detailed breakdown of commission discrepancies by scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scheme Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>AUM</TableHead>
                <TableHead>Promised Rate</TableHead>
                <TableHead>Actual Rate</TableHead>
                <TableHead>Promised (₹)</TableHead>
                <TableHead>Actual (₹)</TableHead>
                <TableHead>Difference (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {amc.schemes.map((scheme) => (
                <TableRow key={scheme.id}>
                  <TableCell className="font-medium">{scheme.name}</TableCell>
                  <TableCell>{scheme.category}</TableCell>
                  <TableCell>{scheme.aum}</TableCell>
                  <TableCell>{scheme.promisedRate}</TableCell>
                  <TableCell>{scheme.actualRate}</TableCell>
                  <TableCell>{scheme.promisedAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{scheme.actualAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-red-500">
                    {scheme.difference.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setDisputeMessage(generateDefaultMessage())
                  setIsDialogOpen(true)
                }}
              >
                Raise Dispute
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Raise Commission Dispute with {amc.name}</DialogTitle>
                <DialogDescription>Review and edit the message below before sending it to the AMC.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Textarea
                  value={disputeMessage}
                  onChange={(e) => setDisputeMessage(e.target.value)}
                  className="min-h-[300px]"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRaiseDispute}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Dispute
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supporting Documents</CardTitle>
          <CardDescription>Broker agreement and commission structure documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center p-2 border rounded-md">
              <FileText className="h-5 w-5 mr-2" />
              <span className="flex-1">Broker Agreement - {amc.name}.pdf</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center p-2 border rounded-md">
              <FileText className="h-5 w-5 mr-2" />
              <span className="flex-1">Commission Structure - FY 2023-24.xlsx</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center p-2 border rounded-md">
              <FileText className="h-5 w-5 mr-2" />
              <span className="flex-1">Payment Receipt - {amc.name} - Q2 2023.pdf</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

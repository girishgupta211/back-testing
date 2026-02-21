"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { CommissionMismatchDetails } from "@/components/commission-mismatch-details"

// Mock data for AMCs with commission mismatches
const amcMismatches = [
  {
    id: "amc1",
    name: "Axis Mutual Fund",
    totalMismatch: 12450.75,
    schemes: 3,
    status: "Pending",
  },
  {
    id: "amc2",
    name: "HDFC Mutual Fund",
    totalMismatch: 8320.5,
    schemes: 2,
    status: "Pending",
  },
  {
    id: "amc3",
    name: "SBI Mutual Fund",
    totalMismatch: 5670.25,
    schemes: 1,
    status: "Pending",
  },
  {
    id: "amc4",
    name: "ICICI Prudential",
    totalMismatch: 9845.0,
    schemes: 4,
    status: "Pending",
  },
  {
    id: "amc5",
    name: "Aditya Birla Sun Life",
    totalMismatch: 3250.8,
    schemes: 2,
    status: "Pending",
  },
]

export default function CommissionMismatchPage() {
  const [selectedAMC, setSelectedAMC] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Commission Mismatch Alerts</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AMCs with Commission Discrepancies</CardTitle>
          <CardDescription>
            The following AMCs have paid less commission than what was agreed in your broker sheet
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedAMC ? (
            <CommissionMismatchDetails amcId={selectedAMC} onBack={() => setSelectedAMC(null)} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>AMC Name</TableHead>
                  <TableHead>Schemes Affected</TableHead>
                  <TableHead>Total Mismatch (₹)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {amcMismatches.map((amc) => (
                  <TableRow key={amc.id}>
                    <TableCell className="font-medium">{amc.name}</TableCell>
                    <TableCell>{amc.schemes}</TableCell>
                    <TableCell className="text-red-500">
                      ₹{amc.totalMismatch.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        {amc.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => setSelectedAMC(amc.id)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commission Mismatch Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Mismatches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Across all AMCs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">₹39,537.30</div>
                <p className="text-xs text-muted-foreground">Pending recovery</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Disputes Raised</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No disputes raised yet</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Data</CardTitle>
          <CardDescription>Commission mismatch trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly">
            <TabsList className="mb-4">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="h-[200px] flex items-center justify-center border rounded-md">
              <div className="text-center text-muted-foreground flex flex-col items-center">
                <FileText className="h-8 w-8 mb-2" />
                <p>Monthly commission mismatch chart will appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="quarterly" className="h-[200px] flex items-center justify-center border rounded-md">
              <div className="text-center text-muted-foreground flex flex-col items-center">
                <FileText className="h-8 w-8 mb-2" />
                <p>Quarterly commission mismatch chart will appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="yearly" className="h-[200px] flex items-center justify-center border rounded-md">
              <div className="text-center text-muted-foreground flex flex-col items-center">
                <FileText className="h-8 w-8 mb-2" />
                <p>Yearly commission mismatch chart will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

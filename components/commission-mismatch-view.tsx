"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CommissionMismatchDetails } from "@/components/commission-mismatch-details"

interface CommissionMismatchViewProps {
  data: any[]
}

export function CommissionMismatchView({ data }: CommissionMismatchViewProps) {
  const [selectedAMC, setSelectedAMC] = useState<string | null>(null)

  if (selectedAMC) {
    return <CommissionMismatchDetails amcId={selectedAMC} onBack={() => setSelectedAMC(null)} />
  }

  return (
    <div className="flex-1 space-y-6">
      <h1 className="text-2xl font-semibold">Commission Mismatches</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Mismatches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-xs text-muted-foreground">Across multiple AMCs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Difference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">₹4,800</div>
            <p className="text-xs text-muted-foreground">Pending recovery</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Mismatch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2%</div>
            <p className="text-xs text-muted-foreground">Of expected commission</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Mismatch Details</CardTitle>
          <CardDescription>Funds with discrepancies between expected and received commissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">Fund</th>
                  <th className="py-3 px-4 text-right">Expected (₹)</th>
                  <th className="py-3 px-4 text-right">Received (₹)</th>
                  <th className="py-3 px-4 text-right">Difference (₹)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{item.fund}</td>
                    <td className="py-3 px-4 text-right">{item.expected}</td>
                    <td className="py-3 px-4 text-right">{item.received}</td>
                    <td className="py-3 px-4 text-right text-red-500">{item.difference}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="outline" size="sm" onClick={() => setSelectedAMC("amc1")}>
                        Raise Dispute
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

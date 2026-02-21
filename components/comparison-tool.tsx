"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X, Download, BarChart3, TrendingUp, Briefcase, Building, Landmark, PiggyBank } from "lucide-react"
import { mutualFunds, nfos, stocks, pmsProducts, aifProducts, bonds, deposits } from "@/data/investment-data"

type InvestmentType = "mutual-funds" | "nfos" | "stocks" | "pms" | "aif" | "bonds" | "deposits"

type ComparisonItem = {
  id: string
  name: string
  type: InvestmentType
  data: any
}

interface ComparisonToolProps {
  onClose: () => void
}

export function ComparisonTool({ onClose }: ComparisonToolProps) {
  const [selectedType1, setSelectedType1] = useState<InvestmentType>("mutual-funds")
  const [selectedType2, setSelectedType2] = useState<InvestmentType>("mutual-funds")
  const [selectedItem1, setSelectedItem1] = useState("")
  const [selectedItem2, setSelectedItem2] = useState("")
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([])

  const getDataForType = (type: InvestmentType) => {
    switch (type) {
      case "mutual-funds":
        return mutualFunds
      case "nfos":
        return nfos
      case "stocks":
        return stocks
      case "pms":
        return pmsProducts
      case "aif":
        return aifProducts
      case "bonds":
        return bonds
      case "deposits":
        return deposits
      default:
        return []
    }
  }

  const getIconForType = (type: InvestmentType) => {
    switch (type) {
      case "mutual-funds":
        return <BarChart3 className="h-4 w-4" />
      case "nfos":
        return <BarChart3 className="h-4 w-4" />
      case "stocks":
        return <TrendingUp className="h-4 w-4" />
      case "pms":
        return <Briefcase className="h-4 w-4" />
      case "aif":
        return <Building className="h-4 w-4" />
      case "bonds":
        return <Landmark className="h-4 w-4" />
      case "deposits":
        return <PiggyBank className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: InvestmentType) => {
    switch (type) {
      case "mutual-funds":
        return "Mutual Fund"
      case "nfos":
        return "NFO"
      case "stocks":
        return "Stock"
      case "pms":
        return "PMS"
      case "aif":
        return "AIF"
      case "bonds":
        return "Bond"
      case "deposits":
        return "Deposit"
    }
  }

  const addToComparison = () => {
    if (selectedItem1) {
      const data1 = getDataForType(selectedType1).find((item) => item.id === selectedItem1)
      if (data1) {
        setComparisonItems((prev) => [
          ...prev,
          {
            id: `${selectedType1}-${selectedItem1}`,
            name: data1.name,
            type: selectedType1,
            data: data1,
          },
        ])
        setSelectedItem1("")
      }
    }

    if (selectedItem2) {
      const data2 = getDataForType(selectedType2).find((item) => item.id === selectedItem2)
      if (data2) {
        setComparisonItems((prev) => [
          ...prev,
          {
            id: `${selectedType2}-${selectedItem2}`,
            name: data2.name,
            type: selectedType2,
            data: data2,
          },
        ])
        setSelectedItem2("")
      }
    }
  }

  const removeItem = (id: string) => {
    setComparisonItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Get all possible comparison metrics
  const getAllMetrics = () => {
    const metrics = new Set<string>()

    comparisonItems.forEach((item) => {
      Object.keys(item.data).forEach((key) => {
        if (key !== "id" && key !== "name" && key !== "description") {
          if (typeof item.data[key] === "object") {
            Object.keys(item.data[key]).forEach((subKey) => {
              metrics.add(`${key}.${subKey}`)
            })
          } else {
            metrics.add(key)
          }
        }
      })
    })

    return Array.from(metrics)
  }

  // Format metric name for display
  const formatMetricName = (metric: string) => {
    if (metric.includes(".")) {
      const [parent, child] = metric.split(".")
      return `${parent.charAt(0).toUpperCase() + parent.slice(1)} ${child.charAt(0).toUpperCase() + child.slice(1)}`
    }
    return metric.charAt(0).toUpperCase() + metric.slice(1)
  }

  // Get value for a specific metric
  const getMetricValue = (item: ComparisonItem, metric: string) => {
    if (metric.includes(".")) {
      const [parent, child] = metric.split(".")
      return item.data[parent] ? item.data[parent][child] || "-" : "-"
    }
    return item.data[metric] || "-"
  }

  const metrics = getAllMetrics()

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Investment Comparison Tool</CardTitle>
          <CardDescription>Compare different investment products side by side</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Select value={selectedType1} onValueChange={(value) => setSelectedType1(value as InvestmentType)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Investment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mutual-funds">Mutual Funds</SelectItem>
                  <SelectItem value="nfos">NFOs</SelectItem>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="pms">PMS</SelectItem>
                  <SelectItem value="aif">AIF</SelectItem>
                  <SelectItem value="bonds">Bonds</SelectItem>
                  <SelectItem value="deposits">Deposits</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedItem1} onValueChange={setSelectedItem1}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  {getDataForType(selectedType1).map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Select value={selectedType2} onValueChange={(value) => setSelectedType2(value as InvestmentType)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Investment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mutual-funds">Mutual Funds</SelectItem>
                  <SelectItem value="nfos">NFOs</SelectItem>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="pms">PMS</SelectItem>
                  <SelectItem value="aif">AIF</SelectItem>
                  <SelectItem value="bonds">Bonds</SelectItem>
                  <SelectItem value="deposits">Deposits</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedItem2} onValueChange={setSelectedItem2}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  {getDataForType(selectedType2).map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button onClick={addToComparison} disabled={!selectedItem1 && !selectedItem2}>
          Add to Comparison
        </Button>

        {comparisonItems.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Comparison Results</h3>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    {comparisonItems.map((item) => (
                      <TableHead key={item.id} className="min-w-[150px]">
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.name}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            {getIconForType(item.type)}
                            <span className="ml-1">{getTypeLabel(item.type)}</span>
                          </div>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics.map((metric) => (
                    <TableRow key={metric}>
                      <TableCell className="font-medium">{formatMetricName(metric)}</TableCell>
                      {comparisonItems.map((item) => (
                        <TableCell key={`${item.id}-${metric}`}>{getMetricValue(item, metric)}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

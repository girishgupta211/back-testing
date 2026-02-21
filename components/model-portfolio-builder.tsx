"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { X, Download, PieChart, BarChart3, ArrowRight, Check } from "lucide-react"

interface ModelPortfolioBuilderProps {
  onClose: () => void
}

export function ModelPortfolioBuilder({ onClose }: ModelPortfolioBuilderProps) {
  const [step, setStep] = useState(1)
  const [riskProfile, setRiskProfile] = useState("moderate")
  const [investmentAmount, setInvestmentAmount] = useState("1000000")
  const [investmentHorizon, setInvestmentHorizon] = useState("5")
  const [equityAllocation, setEquityAllocation] = useState(60)
  const [debtAllocation, setDebtAllocation] = useState(30)
  const [alternativesAllocation, setAlternativesAllocation] = useState(10)

  // Sample portfolio recommendations based on risk profile
  const portfolioRecommendations = {
    conservative: {
      equity: [
        { id: "mf1", name: "HDFC Balanced Advantage Fund", allocation: 15, type: "Hybrid" },
        { id: "mf3", name: "Axis Bluechip Fund", allocation: 10, type: "Large Cap" },
        { id: "mf7", name: "SBI Equity Hybrid Fund", allocation: 10, type: "Hybrid" },
      ],
      debt: [
        { id: "bond1", name: "SBI Dynamic Bond Fund", allocation: 20, type: "Dynamic Bond" },
        { id: "bond3", name: "HDFC Corporate Bond Fund", allocation: 20, type: "Corporate Bond" },
        { id: "deposit1", name: "HDFC Bank Fixed Deposit", allocation: 15, type: "Fixed Deposit" },
      ],
      alternatives: [{ id: "gold1", name: "SBI Gold Fund", allocation: 10, type: "Gold" }],
    },
    moderate: {
      equity: [
        { id: "mf2", name: "Mirae Asset Large Cap Fund", allocation: 15, type: "Large Cap" },
        { id: "mf4", name: "Kotak Emerging Equity Fund", allocation: 15, type: "Mid Cap" },
        { id: "mf6", name: "Parag Parikh Flexi Cap Fund", allocation: 15, type: "Flexi Cap" },
        { id: "stock1", name: "HDFC Bank Ltd", allocation: 10, type: "Banking" },
        { id: "stock3", name: "Infosys Ltd", allocation: 5, type: "IT" },
      ],
      debt: [
        { id: "bond2", name: "Kotak Bond Fund", allocation: 15, type: "Income" },
        { id: "bond4", name: "Axis Banking & PSU Debt Fund", allocation: 15, type: "Banking & PSU" },
      ],
      alternatives: [
        { id: "aif1", name: "Blume Ventures Fund", allocation: 5, type: "Venture Capital" },
        { id: "gold1", name: "SBI Gold Fund", allocation: 5, type: "Gold" },
      ],
    },
    aggressive: {
      equity: [
        { id: "mf4", name: "Kotak Emerging Equity Fund", allocation: 20, type: "Mid Cap" },
        { id: "mf5", name: "Axis Small Cap Fund", allocation: 15, type: "Small Cap" },
        { id: "stock2", name: "Reliance Industries Ltd", allocation: 10, type: "Energy" },
        { id: "stock4", name: "Tata Motors Ltd", allocation: 10, type: "Auto" },
        { id: "stock5", name: "Zomato Ltd", allocation: 10, type: "Consumer Tech" },
      ],
      debt: [{ id: "bond5", name: "ICICI Credit Risk Fund", allocation: 15, type: "Credit Risk" }],
      alternatives: [
        { id: "aif1", name: "Blume Ventures Fund", allocation: 10, type: "Venture Capital" },
        { id: "aif2", name: "Chiratae Ventures India Fund", allocation: 10, type: "Venture Capital" },
      ],
    },
  }

  const handleAllocationChange = (type: string, value: number) => {
    const total = 100

    if (type === "equity") {
      const remaining = total - value - alternativesAllocation
      setEquityAllocation(value)
      setDebtAllocation(Math.max(0, remaining))
    } else if (type === "debt") {
      const remaining = total - value - equityAllocation
      setDebtAllocation(value)
      setAlternativesAllocation(Math.max(0, remaining))
    } else if (type === "alternatives") {
      const remaining = total - value - equityAllocation
      setAlternativesAllocation(value)
      setDebtAllocation(Math.max(0, remaining))
    }
  }

  const getCurrentPortfolio = () => {
    return portfolioRecommendations[riskProfile as keyof typeof portfolioRecommendations]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Model Portfolio Builder</CardTitle>
          <CardDescription>Create a personalized investment portfolio</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Investment Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="investment-amount">Investment Amount (₹)</Label>
                    <Input
                      id="investment-amount"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="investment-horizon">Investment Horizon (Years)</Label>
                    <Select value={investmentHorizon} onValueChange={setInvestmentHorizon}>
                      <SelectTrigger id="investment-horizon">
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 year</SelectItem>
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="15">15+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Risk Profile</Label>
                  <RadioGroup value={riskProfile} onValueChange={setRiskProfile}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="conservative" id="conservative" />
                      <Label htmlFor="conservative">Conservative</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="aggressive" id="aggressive" />
                      <Label htmlFor="aggressive">Aggressive</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Equity ({equityAllocation}%)</Label>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency((Number.parseInt(investmentAmount) * equityAllocation) / 100)}
                    </span>
                  </div>
                  <Slider
                    value={[equityAllocation]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleAllocationChange("equity", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Debt ({debtAllocation}%)</Label>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency((Number.parseInt(investmentAmount) * debtAllocation) / 100)}
                    </span>
                  </div>
                  <Slider
                    value={[debtAllocation]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleAllocationChange("debt", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Alternatives ({alternativesAllocation}%)</Label>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency((Number.parseInt(investmentAmount) * alternativesAllocation) / 100)}
                    </span>
                  </div>
                  <Slider
                    value={[alternativesAllocation]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleAllocationChange("alternatives", value[0])}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recommended Portfolio</h3>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <Tabs defaultValue="allocation">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="allocation">
                  <PieChart className="mr-2 h-4 w-4" />
                  Allocation
                </TabsTrigger>
                <TabsTrigger value="instruments">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Instruments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="allocation" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Equity</CardTitle>
                      <CardDescription>{equityAllocation}%</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatCurrency((Number.parseInt(investmentAmount) * equityAllocation) / 100)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Debt</CardTitle>
                      <CardDescription>{debtAllocation}%</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatCurrency((Number.parseInt(investmentAmount) * debtAllocation) / 100)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Alternatives</CardTitle>
                      <CardDescription>{alternativesAllocation}%</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatCurrency((Number.parseInt(investmentAmount) * alternativesAllocation) / 100)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-2">Portfolio Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        This {riskProfile} portfolio is designed for a {investmentHorizon}-year investment horizon
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        Expected annual returns:{" "}
                        {riskProfile === "conservative" ? "8-10%" : riskProfile === "moderate" ? "10-14%" : "14-18%"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        Recommended rebalancing frequency: {riskProfile === "conservative" ? "Annual" : "Semi-annual"}
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="instruments" className="space-y-6 pt-4">
                {equityAllocation > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Equity ({equityAllocation}%)</h4>
                    <div className="space-y-2">
                      {getCurrentPortfolio().equity.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.type}</div>
                          </div>
                          <div className="text-right">
                            <div>{item.allocation}%</div>
                            <div className="text-xs text-muted-foreground">
                              {formatCurrency((Number.parseInt(investmentAmount) * item.allocation) / 100)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {debtAllocation > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Debt ({debtAllocation}%)</h4>
                    <div className="space-y-2">
                      {getCurrentPortfolio().debt.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.type}</div>
                          </div>
                          <div className="text-right">
                            <div>{item.allocation}%</div>
                            <div className="text-xs text-muted-foreground">
                              {formatCurrency((Number.parseInt(investmentAmount) * item.allocation) / 100)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {alternativesAllocation > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Alternatives ({alternativesAllocation}%)</h4>
                    <div className="space-y-2">
                      {getCurrentPortfolio().alternatives.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.type}</div>
                          </div>
                          <div className="text-right">
                            <div>{item.allocation}%</div>
                            <div className="text-xs text-muted-foreground">
                              {formatCurrency((Number.parseInt(investmentAmount) * item.allocation) / 100)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 1 ? (
          <>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => setStep(2)}>
              Generate Portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={onClose}>Save Portfolio</Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

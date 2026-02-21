"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash, Check, X, Home, Car, GraduationCap, Heart, Plane, Target } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface Goal {
  id: string
  name: string
  icon: string
  targetAmount: number
  duration: number
  inflation: number
  expectedReturn: number
  currentSavings: number
  requiredSip: number
  progress: number
  probability: number
  currentXirr: number
  riskProfile: string
}

const initialGoals: Goal[] = [
  {
    id: "1",
    name: "Home Purchase",
    icon: "home",
    targetAmount: 5000000,
    duration: 5,
    inflation: 6,
    expectedReturn: 12,
    currentSavings: 1000000,
    requiredSip: 52000,
    progress: 20,
    probability: 75,
    currentXirr: 10.5,
    riskProfile: "Aggressive",
  },
  {
    id: "2",
    name: "Child's Education",
    icon: "education",
    targetAmount: 2500000,
    duration: 10,
    inflation: 8,
    expectedReturn: 12,
    currentSavings: 500000,
    requiredSip: 12000,
    progress: 15,
    probability: 82,
    currentXirr: 11.2,
    riskProfile: "Moderate",
  },
  {
    id: "3",
    name: "Retirement",
    icon: "retirement",
    targetAmount: 10000000,
    duration: 20,
    inflation: 6,
    expectedReturn: 12,
    currentSavings: 2000000,
    requiredSip: 15000,
    progress: 10,
    probability: 68,
    currentXirr: 9.8,
    riskProfile: "Moderate",
  },
]

const projectionData = [
  { year: "2024", amount: 1500000, target: 5000000 },
  { year: "2025", amount: 2100000, target: 5000000 },
  { year: "2026", amount: 2800000, target: 5000000 },
  { year: "2027", amount: 3600000, target: 5000000 },
  { year: "2028", amount: 4500000, target: 5000000 },
  { year: "2029", amount: 5000000, target: 5000000 },
]

const goalInvestments = {
  "1": [
    {
      id: "inv1",
      name: "HDFC Top 100 Fund",
      category: "Equity",
      allocation: 25,
      currentValue: 250000,
      expectedReturn: 12,
      currentReturn: 10.2,
      status: "underperforming",
      commission: 2500,
      alternatives: [
        { name: "Axis Bluechip Fund", expectedReturn: 13.5, commission: 2800 },
        { name: "ICICI Prudential Bluechip Fund", expectedReturn: 12.8, commission: 2600 },
      ],
    },
    {
      id: "inv2",
      name: "SBI Small Cap Fund",
      category: "Equity",
      allocation: 15,
      currentValue: 150000,
      expectedReturn: 14,
      currentReturn: 16.5,
      status: "outperforming",
      commission: 1800,
      alternatives: [],
    },
    {
      id: "inv3",
      name: "Kotak Corporate Bond Fund",
      category: "Debt",
      allocation: 40,
      currentValue: 400000,
      expectedReturn: 8,
      currentReturn: 7.8,
      status: "on-track",
      commission: 1200,
      alternatives: [],
    },
    {
      id: "inv4",
      name: "Nippon India Liquid Fund",
      category: "Liquid",
      allocation: 20,
      currentValue: 200000,
      expectedReturn: 6,
      currentReturn: 5.5,
      status: "rebalance",
      commission: 600,
      alternatives: [
        { name: "ICICI Prudential Short Term Fund", expectedReturn: 7.2, commission: 900 },
        { name: "Aditya Birla Sun Life Corporate Bond Fund", expectedReturn: 7.5, commission: 950 },
      ],
    },
  ],
  "2": [
    {
      id: "inv5",
      name: "Mirae Asset Emerging Bluechip",
      category: "Equity",
      allocation: 30,
      currentValue: 150000,
      expectedReturn: 14,
      currentReturn: 15.2,
      status: "outperforming",
      commission: 1800,
      alternatives: [],
    },
    {
      id: "inv6",
      name: "Axis Midcap Fund",
      category: "Equity",
      allocation: 20,
      currentValue: 100000,
      expectedReturn: 13,
      currentReturn: 11.5,
      status: "underperforming",
      commission: 1200,
      alternatives: [{ name: "HDFC Mid-Cap Opportunities Fund", expectedReturn: 14.2, commission: 1350 }],
    },
    {
      id: "inv7",
      name: "ICICI Prudential Corporate Bond Fund",
      category: "Debt",
      allocation: 50,
      currentValue: 250000,
      expectedReturn: 8,
      currentReturn: 8.2,
      status: "on-track",
      commission: 750,
      alternatives: [],
    },
  ],
  "3": [
    {
      id: "inv8",
      name: "SBI Equity Hybrid Fund",
      category: "Hybrid",
      allocation: 40,
      currentValue: 800000,
      expectedReturn: 10,
      currentReturn: 9.5,
      status: "on-track",
      commission: 2400,
      alternatives: [],
    },
    {
      id: "inv9",
      name: "Parag Parikh Flexi Cap Fund",
      category: "Equity",
      allocation: 30,
      currentValue: 600000,
      expectedReturn: 12,
      currentReturn: 8.5,
      status: "underperforming",
      commission: 1800,
      alternatives: [
        { name: "Kotak Flexicap Fund", expectedReturn: 12.5, commission: 1950 },
        { name: "DSP Flexicap Fund", expectedReturn: 11.8, commission: 1850 },
      ],
    },
    {
      id: "inv10",
      name: "Aditya Birla Sun Life Corporate Bond Fund",
      category: "Debt",
      allocation: 30,
      currentValue: 600000,
      expectedReturn: 7,
      currentReturn: 7.2,
      status: "on-track",
      commission: 1200,
      alternatives: [],
    },
  ],
}

export function GoalMapping() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedClient, setSelectedClient] = useState("rahul-sharma")
  const [activeGoal, setActiveGoal] = useState<string>("1")
  const [activeTab, setActiveTab] = useState<string>("overview")

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal({ ...goal })
    setIsEditing(true)
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const handleSaveGoal = () => {
    if (selectedGoal) {
      if (isEditing) {
        setGoals(goals.map((g) => (g.id === selectedGoal.id ? selectedGoal : g)))
      } else {
        setGoals([...goals, { ...selectedGoal, id: Date.now().toString() }])
      }
      setSelectedGoal(null)
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setSelectedGoal(null)
    setIsEditing(false)
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-5 w-5" />
      case "car":
        return <Car className="h-5 w-5" />
      case "education":
        return <GraduationCap className="h-5 w-5" />
      case "retirement":
        return <Heart className="h-5 w-5" />
      case "vacation":
        return <Plane className="h-5 w-5" />
      default:
        return <Target className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Goal Mapping</h2>
          <p className="text-sm text-muted-foreground">Define and track financial goals for clients</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rahul-sharma">Rahul Sharma</SelectItem>
              <SelectItem value="priya-patel">Priya Patel</SelectItem>
              <SelectItem value="amit-singh">Amit Singh</SelectItem>
              <SelectItem value="neha-gupta">Neha Gupta</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setSelectedGoal({
                id: "",
                name: "",
                icon: "home",
                targetAmount: 0,
                duration: 5,
                inflation: 6,
                expectedReturn: 12,
                currentSavings: 0,
                requiredSip: 0,
                progress: 0,
                probability: 70,
                currentXirr: 0,
                riskProfile: "Moderate",
              })
              setIsEditing(false)
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Goal
          </Button>
        </div>
      </div>

      {selectedGoal ? (
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Goal" : "Add New Goal"}</CardTitle>
            <CardDescription>Define the parameters for this financial goal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-name">What is your goal?</Label>
                  <Input
                    id="goal-name"
                    value={selectedGoal.name}
                    onChange={(e) => setSelectedGoal({ ...selectedGoal, name: e.target.value })}
                    placeholder="e.g., Home Purchase, Child's Education"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal-icon">Goal Type</Label>
                  <Select
                    value={selectedGoal.icon}
                    onValueChange={(value) => {
                      const inflationRates = {
                        home: 6,
                        education: 8,
                        retirement: 6,
                        car: 5,
                        vacation: 4,
                      }
                      const targetAmounts = {
                        home: 5000000,
                        education: 2500000,
                        retirement: 10000000,
                        car: 1000000,
                        vacation: 500000,
                      }
                      setSelectedGoal({
                        ...selectedGoal,
                        icon: value,
                        inflation: inflationRates[value as keyof typeof inflationRates] || 6,
                        targetAmount: targetAmounts[value as keyof typeof targetAmounts] || 0,
                      })
                    }}
                  >
                    <SelectTrigger id="goal-icon">
                      <SelectValue placeholder="Select goal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home Purchase</SelectItem>
                      <SelectItem value="car">Car Purchase</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="vacation">Vacation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount (₹)</Label>
                  <Input
                    id="target-amount"
                    type="number"
                    value={selectedGoal.targetAmount}
                    onChange={(e) => setSelectedGoal({ ...selectedGoal, targetAmount: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-savings">Current Savings (₹)</Label>
                  <Input
                    id="current-savings"
                    type="number"
                    value={selectedGoal.currentSavings}
                    onChange={(e) => setSelectedGoal({ ...selectedGoal, currentSavings: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="duration">Duration (Years): {selectedGoal.duration}</Label>
                  </div>
                  <Slider
                    id="duration"
                    min={1}
                    max={30}
                    step={1}
                    value={[selectedGoal.duration]}
                    onValueChange={(value) => {
                      // Adjust expected return based on duration
                      let expectedReturn = 12
                      let riskProfile = "Moderate"

                      if (value[0] <= 3) {
                        expectedReturn = 8
                        riskProfile = "Conservative"
                      } else if (value[0] <= 7) {
                        expectedReturn = 10
                        riskProfile = "Moderate"
                      } else {
                        expectedReturn = 14
                        riskProfile = "Aggressive"
                      }

                      setSelectedGoal({
                        ...selectedGoal,
                        duration: value[0],
                        expectedReturn,
                        riskProfile,
                      })
                    }}
                  />
                </div>

                <div className="p-4 rounded-lg border bg-muted/30 space-y-3 mt-2">
                  <div className="text-sm font-medium">Recommended Strategy</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Inflation Rate</p>
                      <p className="font-medium">{selectedGoal.inflation}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected XIRR</p>
                      <p className="font-medium">{selectedGoal.expectedReturn}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Risk Profile</p>
                      <p className="font-medium">{selectedGoal.riskProfile}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly SIP</p>
                      <p className="font-medium">
                        ₹
                        {Math.round(
                          ((selectedGoal.targetAmount - selectedGoal.currentSavings) / (selectedGoal.duration * 12)) *
                            1.5,
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between font-medium">
                    <span>Required Monthly SIP:</span>
                    <span className="text-xl">
                      ₹
                      {Math.round(
                        ((selectedGoal.targetAmount - selectedGoal.currentSavings) / (selectedGoal.duration * 12)) *
                          1.5,
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleSaveGoal}>
              <Check className="h-4 w-4 mr-2" /> {isEditing ? "Update Goal" : "Add Goal"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Goals Overview</TabsTrigger>
            <TabsTrigger value="details">Goal Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`transition-all hover:shadow-md ${activeGoal === goal.id ? "ring-2 ring-[#0496ff]" : ""}`}
                >
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#0496ff]/10 flex items-center justify-center text-[#0496ff]">
                          {getIconComponent(goal.icon)}
                        </div>
                        <div>
                          <CardTitle className="text-base">{goal.name}</CardTitle>
                          <CardDescription className="mt-0.5">
                            ₹{(goal.targetAmount / 100000).toFixed(1)}L by {new Date().getFullYear() + goal.duration}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditGoal(goal)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteGoal(goal.id)
                          }}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium">Progress</span>
                          <span className="font-medium text-[#0496ff]">{goal.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${goal.progress}%`,
                              background: `linear-gradient(90deg, #0496ff ${Math.min(100, goal.progress * 0.7)}%, #0496ff ${Math.min(100, goal.progress * 1.3)}%)`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <div className="bg-muted/30 p-2.5 rounded-lg">
                          <p className="text-xs text-muted-foreground">Probability</p>
                          <p className="font-semibold text-sm mt-0.5">
                            {goal.probability < 50 ? (
                              <span className="text-red-500">{goal.probability}%</span>
                            ) : goal.probability < 75 ? (
                              <span className="text-amber-500">{goal.probability}%</span>
                            ) : (
                              <span className="text-green-500">{goal.probability}%</span>
                            )}
                          </p>
                        </div>
                        <div className="bg-muted/30 p-2.5 rounded-lg">
                          <p className="text-xs text-muted-foreground">Monthly SIP</p>
                          <p className="font-semibold text-sm mt-0.5">₹{goal.requiredSip.toLocaleString()}</p>
                        </div>
                        <div className="bg-muted/30 p-2.5 rounded-lg">
                          <p className="text-xs text-muted-foreground">Expected XIRR</p>
                          <p className="font-semibold text-sm mt-0.5">{goal.expectedReturn}%</p>
                        </div>
                        <div className="bg-muted/30 p-2.5 rounded-lg">
                          <p className="text-xs text-muted-foreground">Current XIRR</p>
                          <p className="font-semibold text-sm mt-0.5">
                            {goal.currentXirr < goal.expectedReturn - 2 ? (
                              <span className="text-red-500">{goal.currentXirr}%</span>
                            ) : goal.currentXirr < goal.expectedReturn ? (
                              <span className="text-amber-500">{goal.currentXirr}%</span>
                            ) : (
                              <span className="text-green-500">{goal.currentXirr}%</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => {
                        setActiveGoal(goal.id)
                        setActiveTab("details")
                      }}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Goal Summary</CardTitle>
                <CardDescription>Overview of all financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm text-muted-foreground">Total Goals</div>
                    <div className="text-2xl font-bold mt-1">{goals.length}</div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm text-muted-foreground">Total Target</div>
                    <div className="text-2xl font-bold mt-1">
                      ₹{(goals.reduce((sum, goal) => sum + goal.targetAmount, 0) / 10000000).toFixed(2)}Cr
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm text-muted-foreground">Current Savings</div>
                    <div className="text-2xl font-bold mt-1">
                      ₹{(goals.reduce((sum, goal) => sum + goal.currentSavings, 0) / 100000).toFixed(1)}L
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm text-muted-foreground">Monthly SIP</div>
                    <div className="text-2xl font-bold mt-1">
                      ₹{goals.reduce((sum, goal) => sum + goal.requiredSip, 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Goal Projection</CardTitle>
                  <CardDescription>
                    {goals.find((g) => g.id === activeGoal)?.name || "Select a goal to view details"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={projectionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} />
                        <YAxis tickFormatter={(value) => `₹${value / 100000}L`} axisLine={false} tickLine={false} />
                        <Tooltip
                          formatter={(value) => [`₹${(value as number).toLocaleString()}`, ""]}
                          contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          name="Projected Amount"
                          stroke="#0496ff"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target Amount"
                          stroke="#FF8042"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Investments</CardTitle>
                  <CardDescription>Performance tracking and rebalancing opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left">Investment</th>
                          <th className="py-3 px-4 text-left">Category</th>
                          <th className="py-3 px-4 text-right">Allocation</th>
                          <th className="py-3 px-4 text-right">Current Value</th>
                          <th className="py-3 px-4 text-right">Expected XIRR</th>
                          <th className="py-3 px-4 text-right">Current XIRR</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-right">Commission</th>
                        </tr>
                      </thead>
                      <tbody>
                        {goalInvestments[activeGoal as keyof typeof goalInvestments]?.map((investment) => (
                          <tr key={investment.id} className="border-b">
                            <td className="py-3 px-4 font-medium">{investment.name}</td>
                            <td className="py-3 px-4">{investment.category}</td>
                            <td className="py-3 px-4 text-right">{investment.allocation}%</td>
                            <td className="py-3 px-4 text-right">₹{investment.currentValue.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">{investment.expectedReturn}%</td>
                            <td className="py-3 px-4 text-right">
                              {investment.status === "underperforming" ? (
                                <span className="text-red-500">{investment.currentReturn}%</span>
                              ) : investment.status === "outperforming" ? (
                                <span className="text-green-500">{investment.currentReturn}%</span>
                              ) : (
                                <span>{investment.currentReturn}%</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {investment.status === "on-track" ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  On Track
                                </span>
                              ) : investment.status === "underperforming" ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Underperforming
                                </span>
                              ) : investment.status === "outperforming" ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Outperforming
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  Needs Rebalancing
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">₹{investment.commission.toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/30">
                          <td className="py-3 px-4 font-medium" colSpan={3}>
                            Total
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            ₹
                            {goalInvestments[activeGoal as keyof typeof goalInvestments]
                              ?.reduce((sum, inv) => sum + inv.currentValue, 0)
                              .toLocaleString()}
                          </td>
                          <td className="py-3 px-4" colSpan={3}></td>
                          <td className="py-3 px-4 text-right font-medium">
                            ₹
                            {goalInvestments[activeGoal as keyof typeof goalInvestments]
                              ?.reduce((sum, inv) => sum + inv.commission, 0)
                              .toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Suggested changes to improve goal achievement probability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {goalInvestments[activeGoal as keyof typeof goalInvestments]
                      ?.filter((inv) => inv.status === "underperforming" || inv.status === "rebalance")
                      .map((investment) => (
                        <div key={`rec-${investment.id}`} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{investment.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {investment.status === "underperforming"
                                  ? `Currently underperforming with ${investment.currentReturn}% vs expected ${investment.expectedReturn}%`
                                  : `Consider rebalancing to optimize returns`}
                              </p>
                            </div>
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                investment.status === "underperforming"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {investment.status === "underperforming" ? "Underperforming" : "Rebalance"}
                            </span>
                          </div>

                          <div className="mt-4">
                            <h5 className="text-sm font-medium mb-2">Recommended Alternatives:</h5>
                            <div className="space-y-2">
                              {investment.alternatives.map((alt, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                                  <div>
                                    <p className="font-medium">{alt.name}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      Expected XIRR: {alt.expectedReturn}%
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-muted-foreground">Commission</p>
                                    <p className="text-sm font-medium">₹{alt.commission.toLocaleString()}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" className="mr-2">
                              Compare
                            </Button>
                            <Button size="sm">Switch Investment</Button>
                          </div>
                        </div>
                      ))}

                    {goalInvestments[activeGoal as keyof typeof goalInvestments]?.filter(
                      (inv) => inv.status === "underperforming" || inv.status === "rebalance",
                    ).length === 0 && (
                      <div className="p-6 text-center border rounded-lg bg-muted/30">
                        <p className="text-muted-foreground">
                          All investments are performing well. No changes recommended at this time.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Year-by-Year Projection</CardTitle>
                  <CardDescription>Detailed breakdown of expected growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left">Year</th>
                          <th className="py-3 px-4 text-right">Projected Amount</th>
                          <th className="py-3 px-4 text-right">Target Amount</th>
                          <th className="py-3 px-4 text-right">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectionData.map((data, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">{data.year}</td>
                            <td className="py-3 px-4 text-right">₹{data.amount.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">₹{data.target.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">{Math.round((data.amount / data.target) * 100)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

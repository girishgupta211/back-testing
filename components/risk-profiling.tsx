"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { AlertCircle, CheckCircle2, HelpCircle, Info } from "lucide-react"

const riskQuestions = [
  {
    question: "How would you react if your investments lost 20% of their value in a short period?",
    options: [
      { value: "1", label: "I would sell immediately to prevent further losses" },
      { value: "2", label: "I would be concerned and might consider selling some investments" },
      { value: "3", label: "I would hold my investments and wait for recovery" },
      { value: "4", label: "I would see it as an opportunity to invest more" },
    ],
  },
  {
    question: "What is your primary investment goal?",
    options: [
      { value: "1", label: "Preserving capital with minimal risk" },
      { value: "2", label: "Generating steady income" },
      { value: "3", label: "Achieving balanced growth with moderate risk" },
      { value: "4", label: "Maximizing long-term growth potential" },
    ],
  },
  {
    question: "How long do you plan to hold your investments before needing the funds?",
    options: [
      { value: "1", label: "Less than 3 years" },
      { value: "2", label: "3-5 years" },
      { value: "3", label: "5-10 years" },
      { value: "4", label: "More than 10 years" },
    ],
  },
  {
    question: "Which statement best describes your investment knowledge?",
    options: [
      { value: "1", label: "I have very limited knowledge about investments" },
      { value: "2", label: "I understand the basics but rely on professional advice" },
      { value: "3", label: "I have good knowledge and follow market trends" },
      { value: "4", label: "I am very knowledgeable and actively manage my investments" },
    ],
  },
  {
    question: "How would you allocate your investments if given the choice?",
    options: [
      { value: "1", label: "Mostly in safe, low-return investments" },
      { value: "2", label: "A mix of safe investments and some growth-oriented options" },
      { value: "3", label: "Primarily growth-oriented with some safer options" },
      { value: "4", label: "Almost entirely in high-risk, high-potential investments" },
    ],
  },
]

const riskProfiles = {
  conservative: {
    title: "Conservative",
    description:
      "A conservative investor prioritizes capital preservation over growth. They prefer stable, low-risk investments and are uncomfortable with significant market fluctuations. This profile is suitable for short-term goals or investors nearing retirement.",
    allocation: [
      { name: "Equity", value: 20, color: "#0496ff" },
      { name: "Debt", value: 60, color: "#00C49F" },
      { name: "Gold", value: 10, color: "#FFBB28" },
      { name: "Cash", value: 10, color: "#8884d8" },
    ],
  },
  moderate: {
    title: "Moderate",
    description:
      "A moderate investor seeks a balance between growth and security. They can tolerate some market volatility for the potential of higher returns. This profile is suitable for medium-term goals with a time horizon of 5-10 years.",
    allocation: [
      { name: "Equity", value: 50, color: "#0496ff" },
      { name: "Debt", value: 35, color: "#00C49F" },
      { name: "Gold", value: 10, color: "#FFBB28" },
      { name: "Cash", value: 5, color: "#8884d8" },
    ],
  },
  aggressive: {
    title: "Aggressive",
    description:
      "An aggressive investor prioritizes growth potential over stability. They can tolerate significant market volatility and are comfortable with higher risk for the possibility of higher returns. This profile is suitable for long-term goals with a time horizon of 10+ years.",
    allocation: [
      { name: "Equity", value: 75, color: "#0496ff" },
      { name: "Debt", value: 15, color: "#00C49F" },
      { name: "Gold", value: 5, color: "#FFBB28" },
      { name: "Cash", value: 5, color: "#8884d8" },
    ],
  },
}

export function RiskProfiling() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [riskScore, setRiskScore] = useState<number | null>(null)
  const [riskProfile, setRiskProfile] = useState<"conservative" | "moderate" | "aggressive" | null>(null)
  const [selectedClient, setSelectedClient] = useState("rahul-sharma")

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value })
  }

  const handleNext = () => {
    if (currentStep < riskQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate risk score
      const score = Object.values(answers).reduce((total, value) => total + Number.parseInt(value), 0)
      setRiskScore(score)

      // Determine risk profile
      if (score <= 10) {
        setRiskProfile("conservative")
      } else if (score <= 15) {
        setRiskProfile("moderate")
      } else {
        setRiskProfile("aggressive")
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setRiskScore(null)
    setRiskProfile(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Risk Profiling</h2>
          <p className="text-sm text-muted-foreground">Assess client risk tolerance and recommend asset allocation</p>
        </div>
        <div>
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
        </div>
      </div>

      {riskScore === null ? (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Risk Assessment Questionnaire</CardTitle>
            <CardDescription>
              Question {currentStep + 1} of {riskQuestions.length}
            </CardDescription>
            <Progress
              value={(currentStep / (riskQuestions.length - 1)) * 100}
              className="mt-2 bg-muted [&>div]:bg-[#0496ff]"
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0496ff]/10 text-[#0496ff]">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{riskQuestions[currentStep].question}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select the option that best describes your preference
                  </p>
                </div>
              </div>

              <RadioGroup value={answers[currentStep]} onValueChange={handleAnswer} className="mt-6 space-y-3">
                {riskQuestions[currentStep].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem value={option.value} id={`option-${index}`} className="mt-0.5" />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={!answers[currentStep]}>
              {currentStep === riskQuestions.length - 1 ? "Submit" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0496ff]/10 text-[#0496ff]">
                    <Info className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <CardTitle>Risk Profile Results</CardTitle>
                  <CardDescription>Based on the assessment questionnaire</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <span className="font-medium">Risk Score:</span>
                <span className="text-lg font-bold">{riskScore} out of 20</span>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-[#0496ff]/10 border border-[#0496ff]/20">
                <CheckCircle2 className="h-5 w-5 text-[#0496ff]" />
                <div>
                  <div className="font-semibold">
                    Your Risk Profile: {riskProfile && riskProfiles[riskProfile].title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {riskProfile && riskProfiles[riskProfile].description}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Important Considerations</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                  <li>Risk profiles should be reviewed periodically as financial situations change</li>
                  <li>This assessment is a starting point for discussion, not a definitive recommendation</li>
                  <li>Individual investments may have different risk characteristics than the overall portfolio</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleReset} variant="outline" className="w-full">
                Restart Assessment
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Asset Allocation</CardTitle>
              <CardDescription>Based on {riskProfile && riskProfiles[riskProfile].title} risk profile</CardDescription>
            </CardHeader>
            <CardContent>
              {riskProfile && (
                <div className="space-y-6">
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={riskProfiles[riskProfile].allocation}
                        margin={{ top: 5, right: 30, bottom: 5, left: 20 }}
                        barSize={30}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis
                          type="number"
                          domain={[0, 100]}
                          tickFormatter={(value) => `${value}%`}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Allocation"]}
                          contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {riskProfiles[riskProfile].allocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {riskProfiles[riskProfile].allocation.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.value}% allocation</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply to Investment Plan</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

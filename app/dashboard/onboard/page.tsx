"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Check,
  ChevronRight,
  User,
  CreditCard,
  CheckCircle2,
  Shield,
  ExternalLink,
  ArrowLeft,
  PartyPopper,
} from "lucide-react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

export default function OnboardPage() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(50)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const nextStep = () => {
    const newStep = step + 1
    setStep(newStep)
    setProgress(newStep * 50)
  }

  const prevStep = () => {
    const newStep = step - 1
    if (newStep < 1) {
      router.push("/dashboard")
    } else {
      setStep(newStep)
      setProgress(newStep * 50)
    }
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  const completeOnboarding = () => {
    // Trigger enhanced confetti with brand color
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Use brand color #0496ff as primary color with some complementary colors
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#0496ff", "#0496ff", "#0496ff", "#ffffff", "#e0f2ff"],
        shapes: ["circle", "square"],
      })

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#0496ff", "#0496ff", "#0496ff", "#ffffff", "#e0f2ff"],
        shapes: ["circle", "square"],
      })
    }, 250)

    // Show success message
    setShowSuccess(true)

    // Automatically redirect after 5 seconds
    setTimeout(() => {
      setShowSuccess(false)
      router.push("/dashboard")
    }, 5000)
  }

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6 font-sans">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="flex items-center gap-1 shadow-sm" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Client Onboarding</h2>
          <p className="text-sm text-muted-foreground">Complete the digital KYC process to onboard a new client</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-gray-100 dark:bg-gray-800" />
          <div className="flex justify-between mt-4 text-sm">
            <div className={`flex flex-col items-center ${step >= 1 ? "text-[#0496ff]" : "text-muted-foreground"}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-[#0496ff] text-white shadow-md" : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : "1"}
              </div>
              <span className="mt-2 font-medium">Basic Info & CKYC</span>
            </div>
            <div className={`flex flex-col items-center ${step >= 2 ? "text-[#0496ff]" : "text-muted-foreground"}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-[#0496ff] text-white shadow-md" : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                "2"
              </div>
              <span className="mt-2 font-medium">Bank Details</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="h-5 w-5 text-[#0496ff]" />
                Basic Information & CKYC
              </CardTitle>
              <CardDescription className="text-sm">Enter client details and verify through DigiLocker</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-medium">
                    First Name
                  </Label>
                  <Input id="firstName" placeholder="Enter first name" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-medium">
                    Last Name
                  </Label>
                  <Input id="lastName" placeholder="Enter last name" className="h-11" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="font-medium">
                  Mobile Number
                </Label>
                <Input id="mobile" placeholder="Enter 10-digit mobile number" className="h-11" />
              </div>

              <div className="rounded-lg border p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-[#0496ff] dark:bg-blue-900/50 flex-shrink-0 shadow-sm">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 text-lg">
                      CKYC Verification via DigiLocker
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 mb-4 leading-relaxed">
                      Complete KYC verification securely by connecting to DigiLocker. This will fetch verified documents
                      directly from government sources.
                    </p>
                    <Button className="flex items-center gap-2 h-10 px-4 shadow-sm">
                      Connect to DigiLocker <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-5 mt-4 shadow-sm">
                <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Documents to be fetched from DigiLocker
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Checkbox id="aadhaar" className="mr-3 h-5 w-5" defaultChecked disabled />
                    <label htmlFor="aadhaar" className="text-sm font-medium">
                      Aadhaar Card (for identity verification)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="pan" className="mr-3 h-5 w-5" defaultChecked disabled />
                    <label htmlFor="pan" className="text-sm font-medium">
                      PAN Card (for income tax verification)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="address" className="mr-3 h-5 w-5" defaultChecked disabled />
                    <label htmlFor="address" className="text-sm font-medium">
                      Address Proof
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Note: All documents will be securely fetched with client's consent. No physical documents needed.
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Checkbox id="consent" className="h-5 w-5" />
                <label
                  htmlFor="consent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I confirm that I have the client's consent to fetch their KYC documents from DigiLocker.
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={goToDashboard} className="shadow-sm">
                Back
              </Button>
              <Button onClick={nextStep} className="shadow-sm">
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CreditCard className="h-5 w-5 text-[#0496ff]" />
                Bank Account Details
              </CardTitle>
              <CardDescription className="text-sm">Add bank account for transactions and redemptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="accountType" className="font-medium">
                  Account Type
                </Label>
                <RadioGroup defaultValue="savings" className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="savings" id="savings" className="h-5 w-5" />
                    <Label htmlFor="savings" className="font-medium">
                      Savings Account
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="current" id="current" className="h-5 w-5" />
                    <Label htmlFor="current" className="font-medium">
                      Current Account
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="bankName" className="font-medium">
                    Bank Name
                  </Label>
                  <Select>
                    <SelectTrigger id="bankName" className="h-11">
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="font-medium">
                    Account Number
                  </Label>
                  <Input id="accountNumber" placeholder="Enter account number" className="h-11" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="ifsc" className="font-medium">
                    IFSC Code
                  </Label>
                  <Input id="ifsc" placeholder="Enter IFSC code" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountHolder" className="font-medium">
                    Account Holder Name
                  </Label>
                  <Input id="accountHolder" placeholder="Enter account holder name" className="h-11" />
                </div>
              </div>

              {/* Updated Penny Drop Verification with better dark mode support */}
              <div className="rounded-lg border p-5 bg-amber-50 dark:bg-amber-950/30 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/70 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0 shadow-sm">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-lg">
                      Penny Drop Verification
                    </h3>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mt-2 leading-relaxed">
                      We'll verify the bank account by transferring ₹1 to the account and confirming the account
                      holder's name.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Checkbox id="bankTerms" className="h-5 w-5" />
                <label
                  htmlFor="bankTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I confirm that the bank account details provided are accurate and belong to the client.
                </label>
              </div>

              {/* Updated Client Ready section with better dark mode support */}
              <div className="rounded-lg border p-5 bg-green-50 dark:bg-green-950/30 mt-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/70 flex items-center justify-center text-green-600 dark:text-green-400 shadow-sm">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-300 text-lg">
                      Client Ready for Onboarding
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400 leading-relaxed">
                      Complete the process to onboard the client to the platform
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={prevStep} className="shadow-sm">
                Back
              </Button>
              <Button onClick={completeOnboarding} className="shadow-sm">
                Complete Onboarding
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* Enhanced Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl border border-[#0496ff] dark:border-[#0496ff]/50">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-[#0496ff]/10 dark:bg-[#0496ff]/20 flex items-center justify-center text-[#0496ff] mb-6 shadow-md">
                <PartyPopper className="h-10 w-10" />
              </div>

              <h1 className="text-4xl font-extrabold text-[#0496ff] mb-2 tracking-tight">SUCCESS!</h1>

              <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>

              <p className="text-lg mb-6">Your client has been successfully onboarded to the platform.</p>

              <div className="text-sm text-muted-foreground mb-8">
                You will be redirected to the dashboard in a few seconds.
              </div>

              <Button
                className="w-full h-12 text-lg font-medium shadow-md bg-[#0496ff] hover:bg-[#0496ff]/90"
                onClick={() => {
                  setShowSuccess(false)
                  router.push("/dashboard")
                }}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

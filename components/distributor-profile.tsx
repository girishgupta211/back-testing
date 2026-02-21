"use client"

import { useState } from "react"
import { Edit, X, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { MobileBusinessCard } from "./mobile-business-card"

export function DistributorProfile() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggleEdit = () => setIsEditing(!isEditing)

  const profileData = {
    name: "Vikram Mehta",
    email: "vikram.mehta@zinnimoney.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    company: "Zinnimoney Financial Services",
    role: "Financial Advisor",
    certifications: ["AMFI Registered", "CFP", "NISM-Series-V-A"],
    aum: "₹187.5 Cr",
    clients: 142,
    returns: "16.8%",
    experience: "12+ years",
  }

  const shareProfile = (method: "whatsapp" | "email" | "copy") => {
    const profileText = `
${profileData.name}
${profileData.role}
${profileData.company}
${profileData.email}
${profileData.phone}
${profileData.location}

AUM: ${profileData.aum}
Clients: ${profileData.clients}
XIRR: ${profileData.returns}
Experience: ${profileData.experience}
  `.trim()

    if (method === "whatsapp") {
      // WhatsApp sharing
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(profileText)}`
      window.open(whatsappUrl, "_blank")
      toast({
        title: "Sharing via WhatsApp",
        description: "Opening WhatsApp to share your digital card",
      })
    } else if (method === "email") {
      // Email sharing
      const emailUrl = `mailto:?subject=${encodeURIComponent(`${profileData.name}'s Contact Information`)}&body=${encodeURIComponent(profileText)}`
      window.location.href = emailUrl
      toast({
        title: "Sharing via Email",
        description: "Opening your email client to share your digital card",
      })
    } else if (method === "copy") {
      // Copy to clipboard
      navigator.clipboard.writeText(profileText)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "Contact information copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <p className="text-sm text-muted-foreground">Digital Card</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => shareProfile("whatsapp")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4 text-green-600"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M12 17a5 5 0 0 1-5-5v-1a5 5 0 0 1 10 0v1a5 5 0 0 1-5 5Z" />
                </svg>
                WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareProfile("email")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4 text-blue-600"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Gmail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareProfile("copy")}>
                {copied ? <Check className="mr-2 h-4 w-4 text-green-600" /> : <Copy className="mr-2 h-4 w-4" />}
                Copy to Clipboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant={isEditing ? "destructive" : "outline"} size="sm" onClick={toggleEdit}>
            {isEditing ? (
              <>
                <X className="mr-2 h-4 w-4" /> Cancel
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <MobileBusinessCard />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Top-performing financial advisor with {profileData.experience} of industry experience. Currently
                managing <span className="font-semibold">{profileData.aum}</span> in assets for{" "}
                <span className="font-semibold">{profileData.clients}</span> clients with an average XIRR of{" "}
                <span className="font-semibold">{profileData.returns}</span>. Specializing in mutual funds, retirement
                planning, and wealth management with a client retention rate of 96%. Recognized in the top 10% of
                advisors for AUM growth for 3 consecutive years.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profileData.aum}</div>
                  <div className="text-sm text-muted-foreground">Assets Under Management</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{profileData.clients}</div>
                  <div className="text-sm text-muted-foreground">Active Clients</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{profileData.returns}</div>
                  <div className="text-sm text-muted-foreground">Average XIRR</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full text-blue-700 dark:text-blue-400 text-sm">
                  Mutual Funds
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full text-green-700 dark:text-green-400 text-sm">
                  Retirement Planning
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full text-purple-700 dark:text-purple-400 text-sm">
                  Tax Planning
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full text-amber-700 dark:text-amber-400 text-sm">
                  SIP Investments
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full text-red-700 dark:text-red-400 text-sm">
                  Portfolio Rebalancing
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full text-indigo-700 dark:text-indigo-400 text-sm">
                  Wealth Management
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

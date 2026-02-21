"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import {
  AlertCircle,
  Briefcase,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  FileText,
  FlameIcon as Fire,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Tag,
  Upload,
  UserPlus,
  Users,
} from "lucide-react"

// Common connection type
interface CommonConnection {
  id: string
  name: string
  avatar: string
  position: string
  category: "HNI" | "Retail" | "Corporate" | "Business Owner"
  aum: string
  relationship: "Strong" | "Medium" | "Weak"
}

// Lead type with common connections
interface Lead {
  id: string
  name: string
  avatar: string
  position: string
  platform: "linkedin" | "instagram"
  status: "new" | "contacted" | "qualified"
  commonConnections: number
  isHot: boolean
  lastActivity: string
  tags: string[]
  notes: string
  email?: string
  phone?: string
  company?: string
  location?: string
  interests?: string[]
  connections?: CommonConnection[]
}

// Sample data for leads
const sampleLeads: Lead[] = [
  {
    id: "1",
    name: "Vikram Mehta",
    avatar: "/avatars/01.png",
    position: "CFO at TechCorp India",
    platform: "linkedin",
    status: "new",
    commonConnections: 3,
    isHot: true,
    lastActivity: "2 hours ago",
    tags: ["HNI", "Tech"],
    notes: "Showed interest in tax-saving mutual funds",
    email: "vikram.mehta@techcorp.com",
    phone: "+91 98765 43210",
    company: "TechCorp India",
    location: "Mumbai, Maharashtra",
    interests: ["Tax Planning", "Equity Funds", "Retirement Planning"],
    connections: [
      {
        id: "c1",
        name: "Rajiv Sharma",
        avatar: "/avatars/03.png",
        position: "CEO at DigiSolutions",
        category: "HNI",
        aum: "₹1.2 Cr",
        relationship: "Strong",
      },
      {
        id: "c2",
        name: "Priya Malhotra",
        avatar: "/avatars/04.png",
        position: "Director at GlobalTech",
        category: "HNI",
        aum: "₹85 L",
        relationship: "Medium",
      },
      {
        id: "c3",
        name: "Sanjay Gupta",
        avatar: "/avatars/05.png",
        position: "VP Finance at InfoSys",
        category: "Corporate",
        aum: "₹45 L",
        relationship: "Weak",
      },
    ],
  },
  {
    id: "2",
    name: "Priya Singh",
    avatar: "/avatars/02.png",
    position: "Director at Global Finance",
    platform: "linkedin",
    status: "contacted",
    commonConnections: 2,
    isHot: true,
    lastActivity: "1 day ago",
    tags: ["HNI", "Finance"],
    notes: "Looking for retirement planning options",
    email: "priya.singh@globalfinance.com",
    phone: "+91 87654 32109",
    company: "Global Finance",
    location: "Bangalore, Karnataka",
    interests: ["Retirement Planning", "Debt Funds", "SIPs"],
    connections: [
      {
        id: "c4",
        name: "Amit Kapoor",
        avatar: "/avatars/01.png",
        position: "Managing Director at FinServ",
        category: "HNI",
        aum: "₹1.5 Cr",
        relationship: "Strong",
      },
      {
        id: "c5",
        name: "Neha Reddy",
        avatar: "/avatars/02.png",
        position: "CFO at TechSolutions",
        category: "Corporate",
        aum: "₹65 L",
        relationship: "Medium",
      },
    ],
  },
  {
    id: "3",
    name: "Amit Patel",
    avatar: "/avatars/03.png",
    position: "Entrepreneur",
    platform: "instagram",
    status: "new",
    commonConnections: 0,
    isHot: false,
    lastActivity: "3 days ago",
    tags: ["Business Owner"],
    notes: "",
    email: "amit.patel@gmail.com",
    phone: "+91 76543 21098",
    company: "Patel Enterprises",
    location: "Ahmedabad, Gujarat",
    interests: ["Business Expansion", "Tax Planning"],
  },
  {
    id: "4",
    name: "Neha Gupta",
    avatar: "/avatars/04.png",
    position: "HR Manager at InfoTech",
    platform: "linkedin",
    status: "qualified",
    commonConnections: 1,
    isHot: false,
    lastActivity: "5 days ago",
    tags: ["Corporate"],
    notes: "Interested in SIPs for her team",
    email: "neha.gupta@infotech.com",
    phone: "+91 65432 10987",
    company: "InfoTech",
    location: "Pune, Maharashtra",
    interests: ["SIPs", "Employee Benefits", "Tax Planning"],
    connections: [
      {
        id: "c6",
        name: "Rahul Verma",
        avatar: "/avatars/05.png",
        position: "CTO at InfoTech",
        category: "Corporate",
        aum: "₹55 L",
        relationship: "Strong",
      },
    ],
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    avatar: "/avatars/05.png",
    position: "Senior Engineer",
    platform: "instagram",
    status: "new",
    commonConnections: 4,
    isHot: true,
    lastActivity: "1 week ago",
    tags: ["Tech"],
    notes: "",
    email: "rajesh.kumar@gmail.com",
    phone: "+91 54321 09876",
    company: "TechSolutions",
    location: "Hyderabad, Telangana",
    interests: ["Equity Funds", "SIPs", "International Funds"],
    connections: [
      {
        id: "c7",
        name: "Suresh Menon",
        avatar: "/avatars/01.png",
        position: "Engineering Manager at TechSolutions",
        category: "Retail",
        aum: "₹35 L",
        relationship: "Strong",
      },
      {
        id: "c8",
        name: "Anita Desai",
        avatar: "/avatars/02.png",
        position: "Product Manager at TechSolutions",
        category: "Retail",
        aum: "₹28 L",
        relationship: "Medium",
      },
      {
        id: "c9",
        name: "Vikrant Sharma",
        avatar: "/avatars/03.png",
        position: "CEO at DevTech",
        category: "Business Owner",
        aum: "₹95 L",
        relationship: "Medium",
      },
      {
        id: "c10",
        name: "Meera Patel",
        avatar: "/avatars/04.png",
        position: "Director at InnovateTech",
        category: "HNI",
        aum: "₹1.1 Cr",
        relationship: "Weak",
      },
    ],
  },
]

// Sample campaign templates
const campaignTemplates = [
  {
    id: "1",
    name: "Retirement Planning",
    description: "Target professionals looking to secure their retirement",
    platform: "linkedin",
    targetAudience: "Professionals aged 40-55",
    goals: ["Retirement Planning", "Long-term Investment"],
  },
  {
    id: "2",
    name: "Tax Saving",
    description: "Promote tax-saving investment options",
    platform: "linkedin",
    targetAudience: "Working professionals",
    goals: ["Tax Planning", "ELSS Funds"],
  },
  {
    id: "3",
    name: "Wealth Creation",
    description: "Target young professionals for early investment habits",
    platform: "instagram",
    targetAudience: "Professionals aged 25-35",
    goals: ["Wealth Creation", "SIP"],
  },
  {
    id: "4",
    name: "HNI Services",
    description: "Premium investment services for high net worth individuals",
    platform: "linkedin",
    targetAudience: "CXOs, Business Owners",
    goals: ["Portfolio Management", "Wealth Management"],
  },
]

// Sample AI-generated content
const sampleContent = {
  linkedin: {
    post: `Are you prepared for your retirement? 🤔

Many professionals focus on their careers but neglect planning for their golden years.

At Zinnimoney, we help you create a personalized retirement roadmap that ensures financial security when you need it most.

✅ Customized retirement plans
✅ Tax-efficient investment strategies
✅ Regular portfolio reviews

DM me to schedule a free consultation and take the first step toward a worry-free retirement.

#RetirementPlanning #FinancialFreedom #MutualFunds #Investment`,
    message: `Hi {first_name},

I noticed we share connections in the finance industry. I specialize in helping professionals like you create personalized retirement plans that maximize returns while minimizing tax implications.

Would you be interested in a quick 15-minute call to discuss how I might help you secure your financial future?

Best regards,
{your_name};`,
  },
  instagram: {
    post: `
📊 Smart investing doesn't have to be complicated!

Start your wealth creation journey today with as little as ₹500 per month.

Swipe to learn how systematic investment plans can help you achieve your financial goals! 👉

#WealthCreation #SIP #MutualFunds #FinancialFreedom`,
    caption: `Building wealth is a marathon, not a sprint. The key is consistency and starting early.

As a financial advisor, I've helped hundreds of young professionals transform their financial future through disciplined investing.

DM me to learn how you can start your wealth creation journey today!

#InvestmentAdvice #FinancialPlanning #MutualFunds #SIP`,
  },
}

export default function LeadGeneration() {
  const [platform, setPlatform] = useState("linkedin")
  const [campaignStep, setCampaignStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    goal: "",
    targetAudience: "",
    budget: "1000",
    duration: "30",
  })
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("create")
  const [leads, setLeads] = useState(sampleLeads)
  const [leadFilter, setLeadFilter] = useState("all")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle")
  const [uploadStats, setUploadStats] = useState<{
    total: number
    existing: number
    connections: number
    highValue: number
  } | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showLeadDetailsDialog, setShowLeadDetailsDialog] = useState(false)
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false)
  const [newLead, setNewLead] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    platform: "linkedin",
    tags: [] as string[],
    notes: "",
  })

  const [editingContent, setEditingContent] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState<{
    post?: string
    message?: string
    caption?: string
  }>({})

  // Add these new state variables after the other useState declarations
  const [isPosting, setIsPosting] = useState<{
    linkedin: boolean
    instagram: boolean
  }>({ linkedin: false, instagram: false })
  const [postSuccess, setPostSuccess] = useState<{
    linkedin: boolean
    instagram: boolean
  }>({ linkedin: false, instagram: false })

  // Function to handle template selection
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = campaignTemplates.find((t) => t.id === templateId)
    if (template) {
      setCampaignDetails({
        ...campaignDetails,
        name: template.name,
        goal: template.goals[0],
        targetAudience: template.targetAudience,
      })
    }
  }

  // Function to generate content using AI
  const handleGenerateContent = () => {
    setIsGenerating(true)

    // Get keywords from the prompt or use campaign details
    const promptElement = document.getElementById("content-prompt") as HTMLTextAreaElement
    const promptText = promptElement?.value || ""

    // Extract keywords from the prompt or use campaign details
    const extractedKeywords = promptText
      ? promptText.split(",").map((keyword) => keyword.trim())
      : [campaignDetails.goal, ...campaignDetails.targetAudience.split(" ")]

    // Filter out empty keywords
    const keywords = extractedKeywords.filter(Boolean)

    // Create personalized content based on campaign details and platform
    setTimeout(() => {
      // Generate platform-specific content
      if (platform === "linkedin") {
        const post = generateLinkedInPost(campaignDetails, keywords)
        const message = generateLinkedInMessage(campaignDetails, keywords)
        setGeneratedContent({ post, message })
      } else {
        const post = generateInstagramPost(campaignDetails, keywords)
        const caption = generateInstagramCaption(campaignDetails, keywords)
        setGeneratedContent({ post, caption })
      }

      setIsGenerating(false)
    }, 2000)
  }

  // Function to copy content to clipboard
  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Add this new function before the handleLaunchCampaign function
  const handlePostToLinkedIn = () => {
    // Set loading state
    setIsPosting((prev) => ({ ...prev, linkedin: true }))

    // Simulate API call to LinkedIn
    setTimeout(() => {
      // Reset loading state and set success
      setIsPosting((prev) => ({ ...prev, linkedin: false }))
      setPostSuccess((prev) => ({ ...prev, linkedin: true }))

      // Reset success state after 3 seconds
      setTimeout(() => {
        setPostSuccess((prev) => ({ ...prev, linkedin: false }))
      }, 3000)

      // In a real implementation, this would:
      // 1. Use LinkedIn API to post content
      // 2. Set up webhooks for engagement tracking
      // 3. Configure automatic lead collection from post engagement
    }, 2000)
  }

  // Add this new function before the handleLaunchCampaign function
  const handlePostToInstagram = () => {
    // Set loading state
    setIsPosting((prev) => ({ ...prev, instagram: true }))

    // Simulate API call to Instagram
    setTimeout(() => {
      // Reset loading state and set success
      setIsPosting((prev) => ({ ...prev, instagram: false }))
      setPostSuccess((prev) => ({ ...prev, instagram: true }))

      // Reset success state after 3 seconds
      setTimeout(() => {
        setPostSuccess((prev) => ({ ...prev, instagram: false }))
      }, 3000)

      // In a real implementation, this would:
      // 1. Use Instagram API to post content
      // 2. Set up webhooks for engagement tracking
      // 3. Configure automatic lead collection from post engagement
    }, 2000)
  }

  // Function to launch campaign
  const handleLaunchCampaign = () => {
    // Set loading state
    setIsGenerating(true)

    // Simulate posting to social media and setting up lead collection
    setTimeout(() => {
      setIsGenerating(false)

      // Show success message with lead collection info
      alert(
        "Campaign launched successfully! Zinni AI will now collect leads from engagement with your posts and add them to your CRM.",
      )

      // Reset campaign creation state
      setCampaignStep(1)
      setActiveTab("manage")

      // In a real implementation, this would:
      // 1. Post content to LinkedIn/Instagram via their APIs
      // 2. Set up webhooks/monitoring for engagement
      // 3. Configure automatic lead collection
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("processing")

          // Simulate processing
          setTimeout(() => {
            setUploadStatus("success")
            setUploadStats({
              total: 42,
              existing: 8,
              connections: 15,
              highValue: 6,
            })
          }, 2000)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const handleAddProcessedLeads = () => {
    // In a real app, this would add the processed leads to the CRM
    // For now, we'll just close the dialog and show a success message
    setShowUploadDialog(false)
    setUploadStatus("idle")
    setUploadProgress(0)
    setUploadStats(null)

    // Add some sample leads to demonstrate
    const newLeads = [
      {
        id: "6",
        name: "Ananya Sharma",
        avatar: "/avatars/01.png",
        position: "Marketing Director",
        platform: "linkedin",
        status: "new",
        commonConnections: 5,
        isHot: true,
        lastActivity: "Just now",
        tags: ["Marketing", "HNI"],
        notes: "Imported from CSV upload",
      },
      {
        id: "7",
        name: "Rohan Mehta",
        avatar: "/avatars/03.png",
        position: "Tech Entrepreneur",
        platform: "linkedin",
        status: "new",
        commonConnections: 3,
        isHot: true,
        lastActivity: "Just now",
        tags: ["Tech", "Business Owner"],
        notes: "Imported from CSV upload. Connected to high-value client.",
      },
    ]

    setLeads([...newLeads, ...leads])
  }

  // Function to view lead details
  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead)
    setShowLeadDetailsDialog(true)
  }

  const handleAddManualLead = () => {
    // Create a new lead object
    const lead: Lead = {
      id: `manual-${Date.now()}`,
      name: newLead.name,
      avatar: "/avatars/01.png", // Default avatar
      position: newLead.position,
      platform: newLead.platform as "linkedin" | "instagram",
      status: "new",
      commonConnections: 0,
      isHot: false,
      lastActivity: "Just now",
      tags: newLead.tags,
      notes: newLead.notes,
      email: newLead.email,
      phone: newLead.phone,
      company: newLead.company,
      location: newLead.location,
    }

    // Add the new lead to the leads array
    setLeads([lead, ...leads])

    // Reset the form and close the dialog
    setNewLead({
      name: "",
      position: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      platform: "linkedin",
      tags: [],
      notes: "",
    })
    setShowAddLeadDialog(false)
  }

  // LinkedIn post generator
  const generateLinkedInPost = (details: typeof campaignDetails, keywords: string[]) => {
    // Create headline based on campaign goal
    let headline = ""
    if (details.goal.includes("Retirement")) {
      headline = `Are you prepared for your retirement? 🤔`
    } else if (details.goal.includes("Tax")) {
      headline = `Struggling with tax planning this year? 📊`
    } else if (details.goal.includes("Wealth")) {
      headline = `Building wealth isn't just for the ultra-rich anymore 💰`
    } else if (details.goal.includes("Portfolio")) {
      headline = `Is your investment portfolio working as hard as you are? 📈`
    } else if (details.goal.includes("SIP")) {
      headline = `Small investments today, big returns tomorrow 🚀`
    } else {
      headline = `Ready to transform your financial future? 💼`
    }

    // Create body based on campaign details and keywords
    let body = `Many ${details.targetAudience.toLowerCase()} focus on their careers but neglect planning for their financial future.\n\n`
    body += `At Zinnimoney, we help you create a personalized ${details.goal.toLowerCase()} roadmap that ensures financial security when you need it most.\n\n`

    // Add benefits with emojis
    body += `✅ Customized ${details.goal.toLowerCase()} plans\n`
    body += `✅ Tax-efficient investment strategies\n`
    body += `✅ Regular portfolio reviews\n\n`

    // Add call to action
    body += `DM me to schedule a free consultation and take the first step toward financial freedom.\n\n`

    // Add hashtags based on keywords and campaign details
    const hashtagBase = [details.goal.replace(/\s+/g, ""), "FinancialFreedom", "MutualFunds", "Investment"]
    const additionalTags = keywords.map((k) => k.replace(/\s+/g, ""))
    const hashtags = [...new Set([...hashtagBase, ...additionalTags])].slice(0, 5)

    body += hashtags.map((tag) => `#${tag}`).join(" ")

    return `${headline}\n\n${body}`
  }

  // LinkedIn message generator
  const generateLinkedInMessage = (details: typeof campaignDetails, keywords: string[]) => {
    // Create personalized greeting
    let message = `Hi {first_name},\n\n`

    // Create introduction based on campaign details
    message += `I noticed we share connections in the ${keywords.includes("finance") ? "finance" : "professional"} industry. `

    // Add value proposition based on campaign goal
    if (details.goal.includes("Retirement")) {
      message += `I specialize in helping professionals like you create personalized retirement plans that maximize returns while minimizing tax implications.\n\n`
    } else if (details.goal.includes("Tax")) {
      message += `I specialize in helping professionals like you optimize your investments for tax efficiency without compromising on returns.\n\n`
    } else if (details.goal.includes("Wealth")) {
      message += `I specialize in helping professionals like you build wealth through strategic investments tailored to your risk profile and goals.\n\n`
    } else if (details.goal.includes("Portfolio")) {
      message += `I specialize in helping professionals like you optimize your investment portfolio for maximum returns with managed risk.\n\n`
    } else if (details.goal.includes("SIP")) {
      message += `I specialize in helping professionals like you build wealth consistently through disciplined SIP investments.\n\n`
    } else {
      message += `I specialize in helping professionals like you achieve financial freedom through personalized investment strategies.\n\n`
    }

    // Add call to action
    message += `Would you be interested in a quick 15-minute call to discuss how I might help you secure your financial future?\n\n`

    // Add signature
    message += `Best regards,\n{your_name}`

    return message
  }

  // Instagram post generator
  const generateInstagramPost = (details: typeof campaignDetails, keywords: string[]) => {
    // Create headline with emoji based on campaign goal
    let post = ""
    if (details.goal.includes("Retirement")) {
      post = `🧓 Retirement planning doesn't have to be complicated!\n\n`
    } else if (details.goal.includes("Tax")) {
      post = `💸 Smart tax planning = More money in YOUR pocket!\n\n`
    } else if (details.goal.includes("Wealth")) {
      post = `💰 Wealth creation starts with smart decisions today!\n\n`
    } else if (details.goal.includes("Portfolio")) {
      post = `📊 Is your portfolio working FOR you or AGAINST you?\n\n`
    } else if (details.goal.includes("SIP")) {
      post = `📈 Small, consistent investments lead to BIG results!\n\n`
    } else {
      post = `📊 Smart investing doesn't have to be complicated!\n\n`
    }

    // Add body text
    post += `Start your ${details.goal.toLowerCase()} journey today with as little as ₹500 per month.\n\n`
    post += `Swipe to learn how systematic investment plans can help you achieve your financial goals! 👉\n\n`

    // Add hashtags based on keywords and campaign details
    const hashtagBase = [details.goal.replace(/\s+/g, ""), "WealthCreation", "SIP", "MutualFunds", "FinancialFreedom"]
    const additionalTags = keywords.map((k) => k.replace(/\s+/g, ""))
    const hashtags = [...new Set([...hashtagBase, ...additionalTags])].slice(0, 5)

    post += hashtags.map((tag) => `#${tag}`).join(" ")

    return post
  }

  // Instagram caption generator
  const generateInstagramCaption = (details: typeof campaignDetails, keywords: string[]) => {
    // Create opening statement based on campaign goal
    let caption = ""
    if (details.goal.includes("Retirement")) {
      caption = `Retirement planning is a marathon, not a sprint. The key is starting early and staying consistent.\n\n`
    } else if (details.goal.includes("Tax")) {
      caption = `Tax planning shouldn't be a year-end scramble. The smartest investors plan their taxes all year round.\n\n`
    } else if (details.goal.includes("Wealth")) {
      caption = `Building wealth is a marathon, not a sprint. The key is consistency and starting early.\n\n`
    } else if (details.goal.includes("Portfolio")) {
      caption = `Your investment portfolio should be as unique as you are. One-size-fits-all approaches rarely deliver optimal results.\n\n`
    } else if (details.goal.includes("SIP")) {
      caption = `The power of compounding works best for those who start early and stay disciplined with their SIPs.\n\n`
    } else {
      caption = `Financial freedom isn't about being rich, it's about having options. Smart investing gives you those options.\n\n`
    }

    // Add personal touch
    caption += `As a financial advisor, I've helped hundreds of ${details.targetAudience.toLowerCase()} transform their financial future through disciplined investing.\n\n`

    // Add call to action
    caption += `DM me to learn how you can start your ${details.goal.toLowerCase()} journey today!\n\n`

    // Add hashtags based on keywords and campaign details
    const hashtagBase = ["InvestmentAdvice", "FinancialPlanning", "MutualFunds", "SIP"]
    const additionalTags = keywords.map((k) => k.replace(/\s+/g, ""))
    const hashtags = [...new Set([...hashtagBase, ...additionalTags])].slice(0, 5)

    caption += hashtags.map((tag) => `#${tag}`).join(" ")

    return caption
  }

  // Render campaign creation steps
  const renderCampaignSteps = () => {
    switch (campaignStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Select Campaign Template</h3>
              <Badge variant="outline">Step 1 of 3</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaignTemplates
                .filter((template) => template.platform === platform)
                .map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${selectedTemplate === template.id ? "ring-2 ring-[#0496ff]" : "hover:bg-muted/50"}`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{template.targetAudience}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {template.goals.map((goal) => (
                            <Badge key={goal} variant="outline" className="bg-[#0496ff]/10 text-[#0496ff]">
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="flex justify-end pb-10">
              <Button onClick={() => setCampaignStep(2)} disabled={!selectedTemplate}>
                Continue
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Campaign Details</h3>
              <Badge variant="outline">Step 2 of 3</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={campaignDetails.name}
                    onChange={(e) => setCampaignDetails({ ...campaignDetails, name: e.target.value })}
                    placeholder="e.g., Retirement Planning Q2 2023"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-goal">Campaign Goal</Label>
                  <Select
                    value={campaignDetails.goal}
                    onValueChange={(value) => setCampaignDetails({ ...campaignDetails, goal: value })}
                  >
                    <SelectTrigger id="campaign-goal">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Retirement Planning">Retirement Planning</SelectItem>
                      <SelectItem value="Tax Planning">Tax Planning</SelectItem>
                      <SelectItem value="Wealth Creation">Wealth Creation</SelectItem>
                      <SelectItem value="Portfolio Management">Portfolio Management</SelectItem>
                      <SelectItem value="SIP">SIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Textarea
                    id="target-audience"
                    value={campaignDetails.targetAudience}
                    onChange={(e) => setCampaignDetails({ ...campaignDetails, targetAudience: e.target.value })}
                    placeholder="Describe your target audience"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Daily Budget (₹)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={campaignDetails.budget}
                    onChange={(e) => setCampaignDetails({ ...campaignDetails, budget: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Campaign Duration</Label>
                  <Select
                    value={campaignDetails.duration}
                    onValueChange={(value) => setCampaignDetails({ ...campaignDetails, duration: value })}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-capture" className="cursor-pointer">
                      Automatically capture leads to CRM
                    </Label>
                    <Switch id="auto-capture" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-message" className="cursor-pointer">
                      Send automated follow-up message
                    </Label>
                    <Switch id="auto-message" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="highlight-connections" className="cursor-pointer">
                      Highlight common connections as hot leads
                    </Label>
                    <Switch id="highlight-connections" defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pb-10">
              <Button variant="outline" onClick={() => setCampaignStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setCampaignStep(3)}
                disabled={!campaignDetails.name || !campaignDetails.goal || !campaignDetails.targetAudience}
              >
                Continue
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">AI-Generated Content</h3>
              <Badge variant="outline">Step 3 of 3</Badge>
            </div>

            {!generatedContent && !isGenerating ? (
              <div className="p-6 border rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                <Sparkles className="h-12 w-12 text-[#0496ff] mb-4" />
                <h3 className="text-lg font-medium mb-2">Generate AI Content</h3>
                <p className="text-center text-muted-foreground mb-6 max-w-md">
                  Let Zinni AI create personalized content for your campaign based on your goals and target audience.
                </p>
                <div className="space-y-4 w-full max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="content-prompt">Customize your prompt (optional)</Label>
                    <Textarea
                      id="content-prompt"
                      placeholder="E.g., Focus on tax benefits, use professional tone, include call-to-action"
                      className="h-24"
                    />
                  </div>
                  <Button onClick={handleGenerateContent} className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" /> Generate Content with Zinni AI
                  </Button>
                </div>
              </div>
            ) : isGenerating ? (
              <div className="p-6 border rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                <RefreshCw className="h-12 w-12 text-[#0496ff] mb-4 animate-spin" />
                <h3 className="text-lg font-medium mb-2">Generating Content</h3>
                <p className="text-center text-muted-foreground mb-6 max-w-md">
                  Zinni AI is creating personalized content for your {platform} campaign...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {platform === "linkedin" ? (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle className="text-base">LinkedIn Post</CardTitle>
                          <CardDescription>Share this post on your LinkedIn profile</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setEditingContent("post")}>
                          <FileText className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 border rounded-lg bg-muted/20 whitespace-pre-line">
                          {generatedContent.post}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={handleGenerateContent}>
                          <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
                        </Button>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleCopyContent(generatedContent.post)}>
                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            {copied ? "Copied" : "Copy"}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#0077B5] hover:bg-[#0077B5]/90"
                            onClick={handlePostToLinkedIn}
                            disabled={isPosting.linkedin}
                          >
                            {isPosting.linkedin ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Posting...
                              </>
                            ) : postSuccess.linkedin ? (
                              <>
                                <Check className="h-4 w-4 mr-2" /> Posted!
                              </>
                            ) : (
                              <>
                                <Linkedin className="h-4 w-4 mr-2" /> Post to LinkedIn
                              </>
                            )}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle className="text-base">Connection Message</CardTitle>
                          <CardDescription>Personalized message for connection requests</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setEditingContent("message")}>
                          <FileText className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 border rounded-lg bg-muted/20 whitespace-pre-line">
                          {generatedContent.message}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={handleGenerateContent}>
                          <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
                        </Button>
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyContent(generatedContent.message)}
                          >
                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            {copied ? "Copied" : "Copy"}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#0077B5] hover:bg-[#0077B5]/90"
                            disabled={isPosting.linkedin}
                          >
                            <Linkedin className="h-4 w-4 mr-2" /> Use in LinkedIn
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </>
                ) : (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle className="text-base">Instagram Post</CardTitle>
                          <CardDescription>Content for your Instagram post</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setEditingContent("post")}>
                          <FileText className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 border rounded-lg bg-muted/20 whitespace-pre-line">
                          {generatedContent.post}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={handleGenerateContent}>
                          <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
                        </Button>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleCopyContent(generatedContent.post)}>
                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            {copied ? "Copied" : "Copy"}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90"
                            onClick={handlePostToInstagram}
                            disabled={isPosting.instagram}
                          >
                            {isPosting.instagram ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Posting...
                              </>
                            ) : postSuccess.instagram ? (
                              <>
                                <Check className="h-4 w-4 mr-2" /> Posted!
                              </>
                            ) : (
                              <>
                                <Instagram className="h-4 w-4 mr-2" /> Post to Instagram
                              </>
                            )}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle className="text-base">Instagram Caption</CardTitle>
                          <CardDescription>Caption for your Instagram post</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setEditingContent("caption")}>
                          <FileText className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 border rounded-lg bg-muted/20 whitespace-pre-line">
                          {generatedContent.caption}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={handleGenerateContent}>
                          <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
                        </Button>
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyContent(generatedContent.caption)}
                          >
                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            {copied ? "Copied" : "Copy"}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90"
                            disabled={isPosting.instagram}
                          >
                            <Instagram className="h-4 w-4 mr-2" /> Use in Instagram
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </>
                )}

                <div className="border rounded-lg p-4 bg-blue-50/50 dark:bg-blue-950/20">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        Automatic Lead Collection
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Zinni AI will automatically collect leads who engage with your posts and add them to your CRM.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Switch id="auto-collect" defaultChecked />
                        <Label htmlFor="auto-collect" className="text-xs cursor-pointer">
                          Enable automatic lead collection
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pb-10">
                  <Button variant="outline" onClick={() => setCampaignStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleLaunchCampaign}>
                    <Send className="h-4 w-4 mr-2" /> Launch Campaign
                  </Button>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  // Render lead management
  const renderLeadManagement = () => {
    const filteredLeads =
      leadFilter === "all"
        ? leads
        : leadFilter === "hot"
          ? leads.filter((lead) => lead.isHot)
          : leads.filter((lead) => lead.platform === leadFilter)

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-medium">Lead Management</h3>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search leads..." className="pl-8 w-[200px] md:w-[250px]" />
            </div>
            <Select value={leadFilter} onValueChange={setLeadFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="hot">Hot Leads</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left">Lead</th>
                <th className="py-3 px-4 text-left">Source</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Last Activity</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className={`border-b ${lead.isHot ? "bg-amber-50/10 dark:bg-amber-900/20" : ""}`}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={lead.avatar} alt={lead.name} />
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {lead.name}
                          {lead.isHot && (
                            <Badge className="ml-1 bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/40">
                              <Fire className="h-3 w-3 mr-1" /> Hot Lead
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{lead.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {lead.platform === "linkedin" ? (
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <Linkedin className="h-3 w-3" /> LinkedIn
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <Instagram className="h-3 w-3" /> Instagram
                      </Badge>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={
                        lead.status === "new"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30 dark:hover:bg-blue-900/40"
                          : lead.status === "contacted"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30 dark:hover:bg-amber-900/40"
                            : "bg-green-100 text-green-800 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30 dark:hover:bg-green-900/40"
                      }
                    >
                      {lead.status === "new" ? "New" : lead.status === "contacted" ? "Contacted" : "Qualified"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{lead.lastActivity}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <UserPlus className="h-4 w-4" />
                        <span className="sr-only">Connect</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Message</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewLead(lead)}>
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowAddLeadDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" /> Add Lead Manually
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowUploadDialog(true)}
              className="flex items-center gap-2 border-dashed hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 transition-colors"
            >
              <Upload className="h-4 w-4" /> Bulk Upload Leads
            </Button>
          </div>
        </div>

        {/* Lead Details Dialog */}
        <Dialog open={showLeadDetailsDialog} onOpenChange={setShowLeadDetailsDialog}>
          <DialogContent className="sm:max-w-2xl">
            {selectedLead && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedLead.avatar} alt={selectedLead.name} />
                        <AvatarFallback>
                          {selectedLead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedLead.name}</span>
                    </div>
                    {selectedLead.isHot && (
                      <Badge className="ml-1 bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/40">
                        <Fire className="h-3 w-3 mr-1" /> Hot Lead
                      </Badge>
                    )}
                  </DialogTitle>
                  <DialogDescription>{selectedLead.position}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lead Details */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Contact Information</h3>

                    <div className="space-y-3">
                      {selectedLead.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedLead.email}</span>
                        </div>
                      )}

                      {selectedLead.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedLead.phone}</span>
                        </div>
                      )}

                      {selectedLead.company && (
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedLead.company}</span>
                        </div>
                      )}

                      {selectedLead.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedLead.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLead.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" /> {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {selectedLead.notes && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Notes</h4>
                        <div className="p-3 bg-muted/30 rounded-md text-sm">
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p>{selectedLead.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Lead Source */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Lead Source</h3>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {selectedLead.platform === "linkedin" ? (
                            <Linkedin className="h-5 w-5 text-[#0077B5]" />
                          ) : (
                            <Instagram className="h-5 w-5 text-[#E1306C]" />
                          )}
                          <span className="font-medium">
                            {selectedLead.platform === "linkedin" ? "LinkedIn" : "Instagram"}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            selectedLead.status === "new"
                              ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30"
                              : selectedLead.status === "contacted"
                                ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30"
                                : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30"
                          }
                        >
                          {selectedLead.status === "new"
                            ? "New"
                            : selectedLead.status === "contacted"
                              ? "Contacted"
                              : "Qualified"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Last activity: {selectedLead.lastActivity}</span>
                      </div>
                      {selectedLead.commonConnections > 0 && (
                        <div className="mt-3 text-sm flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#0496ff]" />
                          <span>{selectedLead.commonConnections} common connections</span>
                        </div>
                      )}
                    </div>

                    {/* Add Common Connections Section */}
                    {selectedLead.connections && selectedLead.connections.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Common Connections</h3>
                        {selectedLead.connections.slice(0, 3).map((connection) => (
                          <div key={connection.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={connection.avatar} alt={connection.name} />
                                  <AvatarFallback>
                                    {connection.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-sm">{connection.name}</div>
                                  <div className="text-xs text-muted-foreground">{connection.position}</div>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {connection.category}
                              </Badge>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="text-xs">
                                  <span className="text-muted-foreground">AUM:</span> {connection.aum}
                                </div>
                                <div className="text-xs">
                                  <span className="text-muted-foreground">Relationship:</span>{" "}
                                  <span
                                    className={
                                      connection.relationship === "Strong"
                                        ? "text-green-600 dark:text-green-400"
                                        : connection.relationship === "Medium"
                                          ? "text-amber-600 dark:text-amber-400"
                                          : "text-red-600 dark:text-red-400"
                                    }
                                  >
                                    {connection.relationship}
                                  </span>
                                </div>
                              </div>

                              {/* Add Ask for Referral button for strong relationships */}
                              {connection.relationship === "Strong" && (
                                <Button size="sm" variant="outline" className="h-7 text-xs">
                                  <UserPlus className="h-3 w-3 mr-1" /> Ask for Referral
                                </Button>
                              )}
                            </div>

                            {/* Add portfolio status */}
                            <div className="mt-2 flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  connection.relationship === "Strong"
                                    ? "bg-green-500"
                                    : connection.relationship === "Medium"
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                }`}
                              />
                              <span className="text-xs">
                                Portfolio Performance:{" "}
                                {connection.relationship === "Strong"
                                  ? "Strong (12.5% YTD)"
                                  : connection.relationship === "Medium"
                                    ? "Moderate (8.2% YTD)"
                                    : "Underperforming (3.1% YTD)"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-4 w-4 mr-2" /> Connect
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" /> Message
                    </Button>
                  </div>
                  <Button onClick={() => setShowLeadDetailsDialog(false)}>Close</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Leads</DialogTitle>
              <DialogDescription>
                Upload a CSV, PDF, or document with lead information. We'll automatically process and identify existing
                clients and connections.
              </DialogDescription>
            </DialogHeader>

            {uploadStatus === "idle" && (
              <div className="grid gap-4">
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center">
                    Drag and drop your file here, or click to browse
                  </p>
                  <label className="cursor-pointer">
                    <Button variant="outline" size="sm">
                      Select File
                    </Button>
                    <input type="file" className="hidden" accept=".csv,.pdf,.xlsx,.docx" onChange={handleFileUpload} />
                  </label>
                  <p className="text-xs text-muted-foreground">Supports CSV, PDF, Excel, and Word documents</p>
                </div>
              </div>
            )}

            {(uploadStatus === "uploading" || uploadStatus === "processing") && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{uploadStatus === "uploading" ? "Uploading..." : "Processing leads..."}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
                {uploadStatus === "processing" && (
                  <p className="text-sm text-muted-foreground">
                    Analyzing leads, finding connections, and identifying high-value opportunities...
                  </p>
                )}
              </div>
            )}

            {uploadStatus === "success" && uploadStats && (
              <div className="space-y-4 py-4">
                <Alert className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/30">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-400">Upload Successful</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-500">
                    Your leads have been processed successfully.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total leads processed:</span>
                    <span className="font-medium">{uploadStats.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Existing clients identified:</span>
                    <span className="font-medium">{uploadStats.existing}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Leads with common connections:</span>
                    <span className="font-medium text-[#0496ff]">{uploadStats.connections}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>High referral probability leads:</span>
                    <span className="font-medium text-amber-600 dark:text-amber-500">{uploadStats.highValue}</span>
                  </div>
                </div>
              </div>
            )}

            {uploadStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>There was an error processing your file. Please try again.</AlertDescription>
              </Alert>
            )}

            <DialogFooter className="sm:justify-between">
              {uploadStatus === "idle" && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Max file size: 10MB
                </div>
              )}

              {uploadStatus === "success" ? (
                <Button onClick={handleAddProcessedLeads} className="w-full sm:w-auto">
                  Add Leads to CRM
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUploadDialog(false)
                    setUploadStatus("idle")
                    setUploadProgress(0)
                  }}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showAddLeadDialog} onOpenChange={setShowAddLeadDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Lead Manually</DialogTitle>
              <DialogDescription>Enter the lead's information to add them to your CRM.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={newLead.platform}
                    onValueChange={(value) => setNewLead({ ...newLead, platform: value })}
                  >
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newLead.position}
                  onChange={(e) => setNewLead({ ...newLead, position: e.target.value })}
                  placeholder="CEO at Company"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newLead.location}
                    onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newLead.tags.join(", ")}
                  onChange={(e) =>
                    setNewLead({
                      ...newLead,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="HNI, Tech, Finance"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="Add any notes about this lead"
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddLeadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddManualLead} disabled={!newLead.name}>
                Add Lead
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingContent} onOpenChange={(open) => !open && setEditingContent(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Edit{" "}
                {editingContent === "post"
                  ? platform === "linkedin"
                    ? "LinkedIn Post"
                    : "Instagram Post"
                  : editingContent === "message"
                    ? "Connection Message"
                    : "Instagram Caption"}
              </DialogTitle>
              <DialogDescription>
                Customize the AI-generated content to better match your brand voice and campaign goals.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Textarea
                className="min-h-[300px] font-mono text-sm"
                value={
                  editingContent === "post"
                    ? editedContent.post || generatedContent?.post || ""
                    : editingContent === "message"
                      ? editedContent.message || generatedContent?.message || ""
                      : editedContent.caption || generatedContent?.caption || ""
                }
                onChange={(e) => {
                  const value = e.target.value
                  setEditedContent((prev) => ({
                    ...prev,
                    [editingContent as string]: value,
                  }))
                }}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingContent(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Update the generated content with edited content
                  if (editingContent && generatedContent) {
                    const updatedContent = { ...generatedContent }
                    if (editingContent === "post") updatedContent.post = editedContent.post || generatedContent.post
                    if (editingContent === "message")
                      updatedContent.message = editedContent.message || generatedContent.message
                    if (editingContent === "caption")
                      updatedContent.caption = editedContent.caption || generatedContent.caption
                    setGeneratedContent(updatedContent)
                    setEditingContent(null)
                  }
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // Render campaign analytics
  const renderCampaignAnalytics = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Campaign Analytics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-green-600 dark:text-green-400">+12 from last campaign</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5%</div>
              <p className="text-xs text-green-600 dark:text-green-400">+2.3% from last campaign</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cost per Lead</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹125</div>
              <p className="text-xs text-green-600 dark:text-green-400">-₹15 from last campaign</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Active campaigns and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left">Campaign</th>
                    <th className="py-3 px-4 text-left">Platform</th>
                    <th className="py-3 px-4 text-right">Leads</th>
                    <th className="py-3 px-4 text-right">Conversion</th>
                    <th className="py-3 px-4 text-right">Budget Spent</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Retirement Planning Q2</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <Linkedin className="h-3 w-3" /> LinkedIn
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">24</td>
                    <td className="py-3 px-4 text-right">16.2%</td>
                    <td className="py-3 px-4 text-right">₹12,500</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/40">
                        Active
                      </Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Wealth Creation for Millennials</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <Instagram className="h-3 w-3" /> Instagram
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">18</td>
                    <td className="py-3 px-4 text-right">22.5%</td>
                    <td className="py-3 px-4 text-right">₹8,200</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/40">
                        Active
                      </Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Tax Planning 2023</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <Linkedin className="h-3 w-3" /> LinkedIn
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">32</td>
                    <td className="py-3 px-4 text-right">14.8%</td>
                    <td className="py-3 px-4 text-right">₹15,800</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/40">
                        Completed
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Lead Generation</h2>
          <p className="text-sm text-muted-foreground">Create campaigns and manage leads</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="manage">Manage Leads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Lead Generation Campaign</CardTitle>
              <CardDescription>Generate leads through social media campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={platform} onValueChange={setPlatform}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> Instagram
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="linkedin" className="pt-6">
                  {renderCampaignSteps()}
                </TabsContent>

                <TabsContent value="instagram" className="pt-6">
                  {renderCampaignSteps()}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>Track and manage your leads</CardDescription>
            </CardHeader>
            <CardContent>{renderLeadManagement()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
              <CardDescription>Track the performance of your campaigns</CardDescription>
            </CardHeader>
            <CardContent>{renderCampaignAnalytics()}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

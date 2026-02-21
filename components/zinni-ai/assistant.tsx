"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  X,
  Maximize2,
  Minimize2,
  Send,
  Paperclip,
  Sparkles,
  FileText,
  Loader2,
  MessageSquare,
  Mic,
  File,
  ImageIcon,
  FileAudio,
  FileVideo,
  Calendar,
  User,
  ChevronRight,
  PieChart,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

// Import the user context
import { useUser } from "@/contexts/user-context"

// Message type
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  attachments?: { name: string; type: string; url: string; size?: number }[]
}

type SuggestionCategory = "compliance" | "marketing" | "client" | "reports"

type Suggestion = {
  id: string
  category: SuggestionCategory
  text: string
}

// Add a type for file upload status
type FileUploadStatus = {
  file: File
  progress: number
  status: "uploading" | "complete" | "error"
  error?: string
}

const INITIAL_SUGGESTIONS: Suggestion[] = [
  { id: "s1", category: "compliance", text: "What is My AUM?" },
  { id: "s2", category: "compliance", text: "Is there any payout mismatch?" },
  { id: "s3", category: "marketing", text: "Which clients are at risk?" },
  { id: "s4", category: "marketing", text: "Which client meetings do I have today?" },
  { id: "s5", category: "client", text: "Show me meeting notes from last meetings" },
  { id: "s6", category: "client", text: "Which clients need rebalancing?" },
  { id: "s7", category: "reports", text: "Which clients have HDFC Midcap fund in their portfolio?" },
  { id: "s8", category: "reports", text: "Any key insights for me?" },
]

// Define SpeechRecognition and SpeechRecognitionEvent interfaces if they don't exist
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    lang: string
    interimResults: boolean
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onend: ((this: SpeechRecognition, ev: Event) => any) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
    start: () => void
    stop: () => void
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult
    length: number
    item(index: number): SpeechRecognitionResult
  }

  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative
    length: number
    item(index: number): SpeechRecognitionAlternative
    isFinal: boolean
  }

  interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string
  }
}

// Custom component for today's meetings
const TodaysMeetings = ({ onClientClick }: { onClientClick: (clientId: string) => void }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
          Today's Client Meetings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
          onClick={() => onClientClick("c1")}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/01.png" alt="Rahul Sharma" />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Rahul Sharma</p>
              <p className="text-sm text-muted-foreground">Portfolio Review</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">2:00 PM</p>
            <p className="text-sm text-muted-foreground">Zoom Call</p>
          </div>
        </div>

        <div
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
          onClick={() => onClientClick("c2")}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/02.png" alt="Priya Patel" />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Priya Patel</p>
              <p className="text-sm text-muted-foreground">Investment Planning</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">7:00 PM</p>
            <p className="text-sm text-muted-foreground">Third Wave Bellandur</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom component for meeting notes
const MeetingNotesSummary = ({ onClientClick }: { onClientClick: (clientId: string) => void }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <FileText className="h-4 w-4 mr-2 text-blue-500" />
          Recent Meeting Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => onClientClick("c1")}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium">Rahul Sharma</span>
            </div>
            <Badge variant="outline">Portfolio Review</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Discussed portfolio performance, market volatility, and rebalancing options.
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>10 Dec 2023</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1">
              View Details <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => onClientClick("c2")}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium">Priya Patel</span>
            </div>
            <Badge variant="outline">Financial Planning</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Reviewed retirement goals, education funding, and tax optimization strategies.
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>15 Nov 2023</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1">
              View Details <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom component for HDFC Midcap Fund clients
const HDFCMidcapClients = ({ onClientClick }: { onClientClick: (clientId: string) => void }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <PieChart className="h-4 w-4 mr-2 text-blue-500" />
          Clients with HDFC Midcap Fund
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left">Client Name</th>
                <th className="py-3 px-4 text-right">HDFC Midcap (% of portfolio)</th>
                <th className="py-3 px-4 text-right">Current Value</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">Rahul Sharma</td>
                <td className="py-3 px-4 text-right">15.2%</td>
                <td className="py-3 px-4 text-right">₹4,50,000</td>
                <td className="py-3 px-4 text-center">
                  <Button variant="outline" size="sm" onClick={() => onClientClick("c1")}>
                    View Portfolio
                  </Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">Amit Singh</td>
                <td className="py-3 px-4 text-right">18.5%</td>
                <td className="py-3 px-4 text-right">₹6,00,000</td>
                <td className="py-3 px-4 text-center">
                  <Button variant="outline" size="sm" onClick={() => onClientClick("c3")}>
                    View Portfolio
                  </Button>
                </td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">Vikram Mehta</td>
                <td className="py-3 px-4 text-right">12.8%</td>
                <td className="py-3 px-4 text-right">₹3,20,000</td>
                <td className="py-3 px-4 text-center">
                  <Button variant="outline" size="sm" onClick={() => onClientClick("c1")}>
                    View Portfolio
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom component for HDFC Midcap Fund alternatives
const HDFCMidcapAlternatives = ({ onViewComparison }: { onViewComparison: () => void }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <RefreshCw className="h-4 w-4 mr-2 text-blue-500" />
          Less Volatile Alternatives to HDFC Midcap Fund
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Parag Parikh Flexi Cap Fund</CardTitle>
              <p className="text-xs text-muted-foreground">Flexi Cap | Lower Volatility</p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">1Y Return</p>
                  <p className="font-medium text-green-600">+17.2%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Volatility</p>
                  <p className="font-medium text-green-600">Low</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk Rating</p>
                  <p className="font-medium">Moderate</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Commission</p>
                  <p className="font-medium text-blue-600">1.65%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">ICICI Balanced Advantage Fund</CardTitle>
              <p className="text-xs text-muted-foreground">Hybrid | Very Low Volatility</p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">1Y Return</p>
                  <p className="font-medium text-green-600">+12.8%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Volatility</p>
                  <p className="font-medium text-green-600">Very Low</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk Rating</p>
                  <p className="font-medium">Low to Moderate</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Commission</p>
                  <p className="font-medium text-blue-600">1.45%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button className="w-full" onClick={onViewComparison}>
          View Detailed Comparison
        </Button>
      </CardContent>
    </Card>
  )
}

export function ZinniAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS)
  const [activeTab, setActiveTab] = useState<"chat" | "tasks">("chat")
  const [attachments, setAttachments] = useState<File[]>([])
  const [fileUploadStatuses, setFileUploadStatuses] = useState<FileUploadStatus[]>([])
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I'm your FinCopilot AI assistant. How can I help you optimize your financial advisory practice today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [customComponent, setCustomComponent] = useState<React.ReactNode | null>(null)

  const router = useRouter()
  const { role } = useUser()

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Add this function to check if a message is allowed for the current role
  const isMessageAllowed = (message: string) => {
    if (role === "admin") return true

    // List of restricted topics for associates
    const restrictedKeywords = [
      "aum",
      "commission",
      "revenue",
      "business metrics",
      "total clients",
      "business insights",
      "performance",
    ]

    return !restrictedKeywords.some((keyword) => message.toLowerCase().includes(keyword))
  }

  // Function to handle file uploads with progress
  const simulateFileUpload = (file: File) => {
    // Create a new file upload status
    const newFileUploadStatus: FileUploadStatus = {
      file,
      progress: 0,
      status: "uploading",
    }

    setFileUploadStatuses((prev) => [...prev, newFileUploadStatus])

    // Simulate upload progress
    const interval = setInterval(() => {
      setFileUploadStatuses((prev) =>
        prev.map((status) => {
          if (status.file === file) {
            const newProgress = Math.min(status.progress + 10, 100)
            return {
              ...status,
              progress: newProgress,
              status: newProgress === 100 ? "complete" : "uploading",
            }
          }
          return status
        }),
      )
    }, 300)

    // Clear interval when upload is complete
    setTimeout(() => {
      clearInterval(interval)
      // Remove the file from upload statuses after a delay
      setTimeout(() => {
        setFileUploadStatuses((prev) => prev.filter((status) => status.file !== file))
      }, 1000)
    }, 3000)
  }

  const handleClientClick = (clientId: string) => {
    router.push(`/dashboard/clients/${clientId}`)
    setIsOpen(false)
  }

  const handleViewComparison = () => {
    router.push("/dashboard/explore-funds")
    setIsOpen(false)
  }

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim() && attachments.length === 0) return

    // Check if the message is allowed for the current role
    if (!isMessageAllowed(inputValue)) {
      // Add a system message explaining the restriction
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "I'm sorry, but you don't have access to that information. As an associate, you have limited access to business metrics and client data. Please contact an administrator for assistance.",
          timestamp: new Date(),
        },
      ])

      setAttachments([])
      return
    }

    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      attachments: attachments.map((file) => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        size: file.size,
      })),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setAttachments([])
    setIsLoading(true)
    setCustomComponent(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a response based on the input
      let responseContent = ""
      const lowerInput = userMessage.content.toLowerCase()

      // Handle hardcoded questions
      if (lowerInput.includes("what is my aum") || lowerInput.includes("show me my aum")) {
        responseContent =
          "Here's your current AUM breakdown. I'll navigate you to the Business Insights page for more details."
        setTimeout(() => {
          router.push("/dashboard")
          setIsOpen(false)
        }, 1500)
      } else if (lowerInput.includes("payout mismatch") || lowerInput.includes("commission mismatch")) {
        responseContent = "I've found some commission discrepancies with several AMCs. Let me show you the details."
        setTimeout(() => {
          router.push("/dashboard/alerts/commission-mismatch")
          setIsOpen(false)
        }, 1500)
      } else if (lowerInput.includes("clients are at risk") || lowerInput.includes("which clients are at risk")) {
        responseContent = "I've identified several clients whose portfolios are at risk. Let me show you the details."
        setTimeout(() => {
          router.push("/dashboard/alerts/rebalancing")
          setIsOpen(false)
        }, 1500)
      } else if (lowerInput.includes("client meetings") || lowerInput.includes("meetings do i have")) {
        responseContent = "You have 2 client meetings scheduled for today:"
        setCustomComponent(
          <TodaysMeetings
            onClientClick={(clientId) => {
              // Show client profile in the right panel instead of navigating
              setActiveComponent("client-profile")
              setActiveComponentProps({ clientId })
            }}
          />,
        )
      } else if (lowerInput.includes("meeting notes") || lowerInput.includes("last meetings")) {
        responseContent = "Here are the meeting notes from your recent client meetings:"
        setCustomComponent(<MeetingNotesSummary onClientClick={handleClientClick} />)
      } else if (lowerInput.includes("need rebalancing") || lowerInput.includes("clients need rebalancing")) {
        responseContent =
          "I've identified several clients whose portfolios need rebalancing. Let me show you the details."
        setTimeout(() => {
          router.push("/dashboard/alerts/rebalancing")
          setIsOpen(false)
        }, 1500)
      } else if (lowerInput.includes("hdfc midcap fund") && lowerInput.includes("portfolio")) {
        responseContent = "Here are the clients who have HDFC Midcap Fund in their portfolio:"
        setCustomComponent(
          <HDFCMidcapClients
            onClientClick={(clientId) => {
              // Show client profile in the right panel instead of navigating
              setActiveComponent("client-profile")
              setActiveComponentProps({ clientId })
            }}
          />,
        )
      } else if (lowerInput.includes("replace hdfc midcap") || lowerInput.includes("less volatile fund")) {
        responseContent = "Here are some less volatile alternatives to HDFC Midcap Fund:"
        setCustomComponent(<HDFCMidcapAlternatives onViewComparison={handleViewComparison} />)
      } else if (lowerInput.includes("portfolio x-ray") && lowerInput.includes("new client")) {
        responseContent = "I'll start the onboarding process for a new client portfolio X-Ray."
        setTimeout(() => {
          router.push("/dashboard/onboard")
          setIsOpen(false)
        }, 1500)
      } else if (lowerInput.includes("portfolio x-ray") && lowerInput.includes("rahul sharma")) {
        responseContent = "Opening portfolio X-Ray for Rahul Sharma."
        setTimeout(() => {
          router.push("/dashboard/clients/c1")
          setIsOpen(false)
        }, 1500)
      } else if (lowerInput.includes("rahul sharma") && lowerInput.includes("goals")) {
        responseContent = "Let me check if Rahul Sharma's goals are on track."
        setTimeout(() => {
          router.push("/dashboard/clients/c1")
          setIsOpen(false)
        }, 1500)
      } else if (lowerInput.includes("key insights") || lowerInput.includes("insights for me")) {
        responseContent = "Here are some key insights to optimize your commission earnings."
        setTimeout(() => {
          router.push("/dashboard/commission-optimization")
          setIsOpen(false)
        }, 1500)
      } else if (lowerInput.includes("kyc") || lowerInput.includes("compliance")) {
        responseContent =
          "I can help you with KYC compliance. Would you like me to check the status of your clients' KYC documents or generate compliance reports?"
      } else if (lowerInput.includes("portfolio") || lowerInput.includes("investment")) {
        responseContent =
          "I can analyze portfolio performance and suggest optimization strategies. Would you like me to review a specific client's portfolio or provide general investment recommendations?"
      } else if (lowerInput.includes("marketing") || lowerInput.includes("campaign")) {
        responseContent =
          "I can help create marketing content for your advisory practice. Would you like me to draft social media posts, email campaigns, or client newsletters?"
      } else if (lowerInput.includes("report") || lowerInput.includes("generate")) {
        responseContent =
          "I can generate various reports for your practice. What type of report would you like me to create? Options include client performance reports, commission reports, or business metrics."
      } else {
        responseContent =
          "I'm here to help with your financial advisory practice. You can ask me about client management, portfolio analysis, compliance requirements, marketing strategies, or report generation."
      }

      // Update suggestions based on context
      if (lowerInput.includes("kyc") || lowerInput.includes("compliance") || lowerInput.includes("regulation")) {
        setSuggestions([
          { id: "cs1", category: "compliance", text: "Generate KYC reminder emails for pending clients" },
          { id: "cs2", category: "compliance", text: "Create a compliance checklist for my practice" },
          { id: "cs3", category: "compliance", text: "Explain the new AMFI certification requirements" },
          { id: "cs4", category: "compliance", text: "Draft a client disclosure document template" },
        ])
      } else if (lowerInput.includes("post") || lowerInput.includes("marketing") || lowerInput.includes("campaign")) {
        setSuggestions([
          { id: "ms1", category: "marketing", text: "Create an Instagram carousel about SIPs" },
          { id: "ms2", category: "marketing", text: "Draft a WhatsApp message for new NFO" },
          { id: "ms3", category: "marketing", text: "Generate a client newsletter template" },
          { id: "ms4", category: "marketing", text: "Design a social media content calendar" },
        ])
      }

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responseContent,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your request. Please try again later.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setAttachments((prev) => [...prev, ...newFiles])

      // Simulate file upload for each file
      newFiles.forEach((file) => {
        simulateFileUpload(file)
      })

      // Close the attachment dialog if it's open
      setShowAttachmentDialog(false)
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.text)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const [isListening, setIsListening] = useState(false)
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.lang = "en-US"
      recognition.interimResults = false
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        setInputValue((prev) => prev + " " + transcript)
      }
      recognition.onend = () => {
        setIsListening(false)
      }
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }
      setSpeechRecognition(recognition)
    } else {
      console.warn("Speech recognition is not supported in this browser.")
    }
  }, [])

  const startListening = () => {
    if (speechRecognition) {
      setIsListening(true)
      speechRecognition.start()
    }
  }

  const stopListening = () => {
    if (speechRecognition) {
      speechRecognition.stop()
      setIsListening(false)
    }
  }

  // Function to get the appropriate icon for a file type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (fileType.startsWith("audio/")) return <FileAudio className="h-4 w-4" />
    if (fileType.startsWith("video/")) return <FileVideo className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  // Function to format file size
  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return "Unknown size"
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  // Function to open attachment dialog
  const openAttachmentDialog = () => {
    setShowAttachmentDialog(true)
  }

  // Define the setActiveComponent and setActiveComponentProps functions
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const [activeComponentProps, setActiveComponentProps] = useState<any>(null)

  // Add a renderActiveComponent function
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "client-profile":
        const clientId = activeComponentProps?.clientId || "c1"
        // const clientData = wealthAdvisorData.clients.find(c => c.id === clientId) || wealthAdvisorData.clients[0];
        // return <PortfolioXray clientId={clientId} clientData={clientData} />;
        return <div>Client Profile</div>
      default:
        return null
    }
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-lg bg-gray-800 hover:bg-gray-700 p-0 z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Assistant panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed z-50 bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden",
              isExpanded
                ? "inset-4 md:inset-10 lg:inset-20"
                : "bottom-6 left-6 w-[380px] h-[600px] max-h-[calc(100vh-4rem)]",
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 p-3 bg-gray-900/90">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Chat Assistant</h3>
                  <p className="text-xs text-muted-foreground">Full conversation history</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={toggleExpand} className="h-8 w-8">
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "chat" | "tasks")}
              className="flex flex-col h-[calc(100%-3.5rem)]"
            >
              <TabsList className="mx-3 mt-2 mb-0 bg-gray-800">
                <TabsTrigger value="chat" className="flex-1 data-[state=active]:bg-gray-700">
                  Chat
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex-1 data-[state=active]:bg-gray-700">
                  AI Tasks
                </TabsTrigger>
              </TabsList>

              {/* Chat Tab */}
              <TabsContent
                value="chat"
                className="flex-1 flex flex-col data-[state=inactive]:hidden m-0 overflow-hidden"
              >
                {/* Messages */}
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex flex-col max-w-[85%] rounded-lg p-3 text-sm",
                          message.role === "user" ? "ml-auto bg-gray-800" : "mr-auto bg-gray-800",
                        )}
                      >
                        {message.content.split("\n").map((line, i) => (
                          <p key={i} className={i > 0 ? "mt-2" : ""}>
                            {line}
                          </p>
                        ))}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 rounded bg-background/20">
                                {getFileIcon(attachment.type)}
                                <div className="flex flex-col flex-1 min-w-0">
                                  <span className="text-xs truncate">{attachment.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatFileSize(attachment.size)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <span className="text-xs opacity-70 mt-1 self-end">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex flex-col max-w-[85%] rounded-lg p-3 text-sm mr-auto bg-gray-800">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>FinCopilot is thinking...</span>
                        </div>
                      </div>
                    )}
                    {customComponent && (
                      <div className="flex flex-col max-w-[100%] rounded-lg mr-auto">{customComponent}</div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* File Upload Status */}
                {fileUploadStatuses.length > 0 && (
                  <div className="p-3 border-t border-gray-800 bg-gray-900/90">
                    <p className="text-xs text-muted-foreground mb-2">Uploading files...</p>
                    <div className="space-y-2">
                      {fileUploadStatuses.map((status, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 truncate max-w-[80%]">
                              {getFileIcon(status.file.type)}
                              <span className="truncate">{status.file.name}</span>
                            </div>
                            <span>{status.progress}%</span>
                          </div>
                          <Progress value={status.progress} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {messages.length < 4 && (
                  <div className="p-3 border-t border-gray-800">
                    <p className="text-xs text-muted-foreground mb-2">Try asking about:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.slice(0, 4).map((suggestion) => (
                        <Button
                          key={suggestion.id}
                          variant="outline"
                          size="sm"
                          className="text-xs h-auto py-1.5 bg-gray-800 border-gray-700 hover:bg-gray-700"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-gray-800">
                  {attachments.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {attachments.map((file, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-gray-800">
                          {getFileIcon(file.type)}
                          <span className="text-xs truncate max-w-[150px]">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 p-0"
                            onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex items-end gap-2">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask your FinCopilot..."
                      className="min-h-[60px] resize-none bg-gray-800 border-gray-700"
                    />
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 bg-gray-800 border-gray-700 hover:bg-gray-700"
                        onClick={openAttachmentDialog}
                      >
                        <Paperclip className="h-4 w-4" />
                        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        disabled={isLoading}
                        className="h-8 w-8"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className={cn(
                          "h-8 w-8 bg-gray-800 border-gray-700 hover:bg-gray-700",
                          isListening ? "bg-green-500/50 text-white" : "",
                        )}
                        onClick={isListening ? stopListening : startListening}
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {isListening && (
                    <div className="mt-2 p-2 bg-green-500/20 border border-green-500/30 rounded text-xs text-center">
                      Listening... Speak now
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Tasks Tab */}
              <TabsContent value="tasks" className="flex-1 data-[state=inactive]:hidden m-0 overflow-hidden">
                <ScrollArea className="h-full p-3">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Active AI Tasks</h3>
                      <div className="space-y-2">
                        <div className="border border-gray-800 rounded-lg p-3 bg-gray-800/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-medium">KYC Compliance Check</span>
                            </div>
                            <Badge variant="outline" className="text-xs bg-gray-700 border-gray-600">
                              In Progress
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Analyzing 47 client records for KYC compliance
                          </p>
                          <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-muted-foreground">65% complete</span>
                            <span className="text-xs text-muted-foreground">Est. 2 min remaining</span>
                          </div>
                        </div>

                        <div className="border border-gray-800 rounded-lg p-3 bg-gray-800/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">Monthly Client Reports</span>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs bg-green-500/10 text-green-500 border-green-500/20"
                            >
                              Complete
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Generated 32 client performance reports</p>
                          <div className="flex justify-end mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs bg-gray-800 border-gray-700 hover:bg-gray-700"
                            >
                              View Reports
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Suggested AI Tasks</h3>
                      <div className="space-y-2">
                        <div className="border border-gray-800 rounded-lg p-3 bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#0496ff]" />
                            <span className="text-sm font-medium">Client Birthday Analysis</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Identify upcoming client birthdays and prepare personalized messages
                          </p>
                          <div className="flex justify-end mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs bg-gray-800 border-gray-700 hover:bg-gray-700"
                            >
                              Run Task
                            </Button>
                          </div>
                        </div>

                        <div className="border border-gray-800 rounded-lg p-3 bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#0496ff]" />
                            <span className="text-sm font-medium">Portfolio Rebalancing Opportunity</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Analyze all client portfolios for rebalancing opportunities based on market shifts
                          </p>
                          <div className="flex justify-end mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs bg-gray-800 border-gray-700 hover:bg-gray-700"
                            >
                              Run Task
                            </Button>
                          </div>
                        </div>

                        <div className="border border-gray-800 rounded-lg p-3 bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#0496ff]" />
                            <span className="text-sm font-medium">Social Media Content Calendar</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Generate a month of social media content based on market events and product updates
                          </p>
                          <div className="flex justify-end mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs bg-gray-800 border-gray-700 hover:bg-gray-700"
                            >
                              Run Task
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attachment Dialog */}
      <Dialog open={showAttachmentDialog} onOpenChange={setShowAttachmentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Attach Files</DialogTitle>
            <DialogDescription>Upload files to share in the conversation</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div
              className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-800/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">Support for documents, images, audio, and video</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <File className="h-3 w-3 mr-1" />
              Max file size: 25MB
            </div>
            <Button type="button" variant="secondary" onClick={() => setShowAttachmentDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {renderActiveComponent()}
    </>
  )
}

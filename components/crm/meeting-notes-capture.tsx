"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Mic, Upload, BrainCircuit, RefreshCw, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ClientSelector } from "./client-selector"

export function MeetingNotesCapture() {
  const [inputMethod, setInputMethod] = useState("text")
  const [meetingType, setMeetingType] = useState("review")
  const [meetingNotes, setMeetingNotes] = useState("")
  const [selectedClient, setSelectedClient] = useState("")
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split("T")[0])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedNotes, setProcessedNotes] = useState<string | null>(null)
  const { toast } = useToast()

  const handleProcessNotes = () => {
    if (!selectedClient) {
      toast({
        title: "Client selection required",
        description: "Please select a client before processing notes",
        variant: "destructive",
      })
      return
    }

    if (!meetingNotes.trim()) {
      toast({
        title: "Meeting notes required",
        description: "Please enter meeting notes before processing",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      // Generate structured meeting minutes based on meeting type
      let formattedNotes = ""

      if (meetingType === "review") {
        formattedNotes = `# Portfolio Review Meeting - ${formatDate(meetingDate)}

## Client: ${selectedClient}

### Discussion Points:
- Reviewed current portfolio performance
- Discussed market volatility and its impact
- Analyzed sector allocation and diversification

### Client Concerns:
- Expressed concern about recent market fluctuations
- Inquired about tax implications of rebalancing

### Action Items:
- Prepare portfolio rebalancing proposal
- Share tax-saving investment options
- Schedule follow-up in 2 weeks

### Next Steps:
- Send portfolio analysis report by ${getNextBusinessDay(meetingDate)}
- Research alternative investment options for tax optimization`
      } else if (meetingType === "planning") {
        formattedNotes = `# Financial Planning Meeting - ${formatDate(meetingDate)}

## Client: ${selectedClient}

### Goals Discussed:
- Retirement planning (primary focus)
- Children's education funding
- Tax optimization strategies

### Current Financial Status:
- Reviewed income sources and expenses
- Analyzed current savings and investment pattern
- Discussed risk tolerance and time horizon

### Recommendations:
- Increase SIP contributions by 15%
- Diversify portfolio with debt instruments
- Consider tax-saving ELSS funds

### Action Items:
- Create comprehensive financial plan
- Research education funding options
- Review insurance coverage

### Follow-up:
- Share financial plan draft by ${getNextBusinessDay(meetingDate)}
- Schedule implementation meeting next month`
      } else {
        formattedNotes = `# General Discussion - ${formatDate(meetingDate)}

## Client: ${selectedClient}

### Topics Discussed:
${extractTopics(meetingNotes)}

### Key Points:
${extractKeyPoints(meetingNotes)}

### Action Items:
- Follow up on discussed matters
- Share relevant information
- Schedule next interaction as needed

### Notes:
${meetingNotes.substring(0, 150)}${meetingNotes.length > 150 ? "..." : ""}`
      }

      setProcessedNotes(formattedNotes)
      setIsProcessing(false)

      toast({
        title: "Meeting notes processed",
        description: "AI has generated structured meeting minutes for your review",
      })
    }, 2000)
  }

  const handleSaveNotes = () => {
    toast({
      title: "Meeting notes saved",
      description: "The meeting minutes have been sent for approval",
    })

    // Reset the form
    setMeetingNotes("")
    setProcessedNotes(null)
    setSelectedClient("")
    setMeetingDate(new Date().toISOString().split("T")[0])
  }

  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getNextBusinessDay = (dateString: string) => {
    const date = new Date(dateString)
    date.setDate(date.getDate() + 2) // Add 2 days to ensure it's a business day
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const extractTopics = (text: string) => {
    // In a real implementation, this would use NLP to extract topics
    // For demo purposes, we'll create some plausible topics
    const topics = [
      "- Market outlook and investment strategy",
      "- Portfolio performance review",
      "- Risk assessment and management",
    ]
    return topics.join("\n")
  }

  const extractKeyPoints = (text: string) => {
    // In a real implementation, this would use NLP to extract key points
    // For demo purposes, we'll create some plausible key points
    const keyPoints = [
      "- Client expressed interest in increasing equity allocation",
      "- Discussed potential for international diversification",
      "- Reviewed recent market developments and their impact",
    ]
    return keyPoints.join("\n")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capture Meeting Notes</CardTitle>
        <CardDescription>Record or enter meeting notes to generate AI-processed minutes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!processedNotes ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="client">Select Client</Label>
              <ClientSelector value={selectedClient} onChange={setSelectedClient} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meeting-date">Meeting Date</Label>
                <Input
                  id="meeting-date"
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meeting-type">Meeting Type</Label>
                <Select value={meetingType} onValueChange={setMeetingType}>
                  <SelectTrigger id="meeting-type">
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="review">Portfolio Review</SelectItem>
                    <SelectItem value="planning">Financial Planning</SelectItem>
                    <SelectItem value="general">General Discussion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs value={inputMethod} onValueChange={setInputMethod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Text
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" /> Voice
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-notes">Meeting Notes</Label>
                  <Textarea
                    id="meeting-notes"
                    placeholder="Enter your meeting notes here..."
                    className="min-h-[200px]"
                    value={meetingNotes}
                    onChange={(e) => setMeetingNotes(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="voice" className="space-y-4 pt-4">
                <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">Record Meeting Notes</h3>
                    <p className="text-sm text-muted-foreground mt-1">Click to start recording your meeting notes</p>
                  </div>
                  <Button className="mt-2">Start Recording</Button>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4 pt-4">
                <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">Upload Recording or Notes</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload an audio recording or text file with meeting notes
                    </p>
                  </div>
                  <Button className="mt-2">Select File</Button>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">AI-Generated Meeting Minutes</h3>
              <Button variant="outline" size="sm" onClick={() => setProcessedNotes(null)}>
                Edit
              </Button>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-line">{processedNotes}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {!processedNotes ? (
          <Button
            onClick={handleProcessNotes}
            disabled={isProcessing || !meetingNotes.trim() || !selectedClient}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <BrainCircuit className="h-4 w-4" />
                Process with AI
              </>
            )}
          </Button>
        ) : (
          <Button onClick={handleSaveNotes} className="gap-2">
            <Check className="h-4 w-4" />
            Save & Send for Approval
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

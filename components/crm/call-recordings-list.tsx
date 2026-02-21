"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Calendar, User, ArrowRight, Eye, Phone, Clock, Play, Pause } from "lucide-react"

// Sample call recordings data
const sampleCallRecordings = [
  {
    id: "cr1",
    clientId: "c1",
    clientName: "Vikram Mehta",
    date: "2023-12-12",
    duration: "18:24",
    type: "Portfolio Review",
    status: "processed",
  },
  {
    id: "cr2",
    clientId: "c4",
    clientName: "Neha Gupta",
    date: "2023-12-11",
    duration: "12:05",
    type: "Financial Planning",
    status: "processed",
  },
  {
    id: "cr3",
    clientId: "c7",
    clientName: "Suresh Menon",
    date: "2023-12-09",
    duration: "09:32",
    type: "General Discussion",
    status: "processed",
  },
  {
    id: "cr4",
    clientId: "c2",
    clientName: "Priya Singh",
    date: "2023-12-07",
    duration: "22:15",
    type: "Portfolio Review",
    status: "processed",
  },
]

// Sample transcript content
const sampleTranscript = `
Distributor: Good morning, Mr. Mehta. How are you doing today?

Client: Good morning. I'm doing well, thank you. A bit concerned about the market volatility we've been seeing lately.

Distributor: Yes, that's understandable. The markets have been quite turbulent in the past few weeks. Let's review your portfolio and see how it's been affected.

Client: That would be great. I'm particularly worried about my equity investments.

Distributor: Looking at your portfolio, I can see that despite the volatility, your diversified approach has helped mitigate some of the risks. Your equity allocation is currently at 65%, which is in line with your risk profile.

Client: That's good to hear. But do you think we should make any adjustments given the current market conditions?

Distributor: Based on your long-term goals and the fact that you're not planning to withdraw these funds in the next 5 years, I wouldn't recommend making significant changes due to short-term volatility. However, we could consider rebalancing some of your sector allocations.

Client: What sectors would you suggest adjusting?

Distributor: Your technology sector exposure is currently at 30% of your equity portfolio, which is a bit high. We could reduce that to about 20% and increase your allocation to defensive sectors like healthcare and consumer staples.

Client: That makes sense. And what about my debt investments?

Distributor: Your debt portfolio is well-structured with a mix of government securities and high-quality corporate bonds. The average duration is moderate, which provides a good balance between returns and interest rate risk.

Client: Are there any tax implications I should be aware of if we make these changes?

Distributor: Yes, that's an important consideration. Since some of your equity investments have been held for less than a year, selling them would attract short-term capital gains tax at your income tax slab rate. We should prioritize rebalancing within your tax-efficient accounts first.

Client: I see. Let's proceed with that approach then.

Distributor: Great. I'll prepare a detailed rebalancing proposal for you by the end of this week. We'll also schedule a follow-up call to discuss implementation.

Client: Thank you. That sounds like a good plan.

Distributor: Is there anything else you'd like to discuss today?

Client: Not at the moment. I think we've covered the main concerns I had.

Distributor: Perfect. I'll send you a summary of our discussion along with the rebalancing proposal. Feel free to reach out if you have any questions in the meantime.

Client: Will do. Thanks for your help.

Distributor: You're welcome, Mr. Mehta. Have a great day.
`

export function CallRecordingsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredRecordings = sampleCallRecordings.filter(
    (recording) =>
      recording.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recording.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const togglePlayback = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Call Recordings</CardTitle>
              <CardDescription>View and manage your client call recordings</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search recordings..."
                className="pl-8 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecordings.length === 0 ? (
              <div className="text-center py-8">
                <Phone className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">No call recordings found</p>
              </div>
            ) : (
              filteredRecordings.map((recording) => (
                <div
                  key={recording.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedRecording(recording.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-medium">{recording.clientName}</span>
                    </div>
                    <Badge variant="outline">{recording.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(recording.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{recording.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={togglePlayback}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" className="gap-1">
              View All Recordings
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedRecording} onOpenChange={(open) => !open && setSelectedRecording(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Call Recording & Transcript</DialogTitle>
            <DialogDescription>
              {selectedRecording &&
                `${sampleCallRecordings.find((r) => r.id === selectedRecording)?.clientName} - 
                ${formatDate(sampleCallRecordings.find((r) => r.id === selectedRecording)?.date || "")}`}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between py-2 px-4 bg-muted/50 rounded-lg my-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <div className="text-sm">
                {selectedRecording &&
                  `Duration: ${sampleCallRecordings.find((r) => r.id === selectedRecording)?.duration}`}
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm">
                Download Recording
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              <h3 className="font-medium">Transcript</h3>
              <div className="whitespace-pre-line text-sm">{sampleTranscript}</div>
            </div>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setSelectedRecording(null)}>
              Close
            </Button>
            <Button>View Meeting Minutes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

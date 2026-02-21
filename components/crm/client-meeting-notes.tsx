"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, FileText, ArrowRight, Eye } from "lucide-react"

interface ClientMeetingNotesProps {
  clientId: string
  clientName: string
}

// Sample meeting notes data for a specific client
const getSampleClientNotes = (clientId: string) => [
  {
    id: "mn1",
    date: "2023-12-10",
    type: "Portfolio Review",
    summary: "Discussed portfolio performance, market volatility, and rebalancing options.",
  },
  {
    id: "mn2",
    date: "2023-11-15",
    type: "Financial Planning",
    summary: "Reviewed retirement goals, education funding, and tax optimization strategies.",
  },
  {
    id: "mn3",
    date: "2023-10-22",
    type: "General Discussion",
    summary: "Addressed client concerns about market conditions and discussed investment opportunities.",
  },
  {
    id: "mn4",
    date: "2023-09-05",
    type: "Portfolio Review",
    summary: "Quarterly portfolio review with performance analysis and strategy adjustments.",
  },
]

// Sample meeting note content
const sampleNoteContent = `# Portfolio Review Meeting - December 10, 2023

## Client: Vikram Mehta

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
- Send portfolio analysis report by December 12, 2023
- Research alternative investment options for tax optimization`

export function ClientMeetingNotes({ clientId, clientName }: ClientMeetingNotesProps) {
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const clientNotes = getSampleClientNotes(clientId)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Meeting Notes</CardTitle>
              <CardDescription>Recent interactions with {clientName}</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <FileText className="h-4 w-4" />
              Add Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientNotes.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">No meeting notes found</p>
              </div>
            ) : (
              clientNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedNote(note.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">{formatDate(note.date)}</span>
                    </div>
                    <Badge variant="outline">{note.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{note.summary}</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {clientNotes.length > 0 && (
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="gap-1">
                View All Notes
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedNote} onOpenChange={(open) => !open && setSelectedNote(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Meeting Notes</DialogTitle>
            <DialogDescription>
              {selectedNote &&
                `${clientName} - 
                ${formatDate(clientNotes.find((n) => n.id === selectedNote)?.date || "")}`}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4 py-4">
            <div className="whitespace-pre-line">{sampleNoteContent}</div>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setSelectedNote(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

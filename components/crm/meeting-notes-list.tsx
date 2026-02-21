"use client"

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
import { Search, FileText, Calendar, User, ArrowRight, Eye } from "lucide-react"

// Sample meeting notes data
const sampleMeetingNotes = [
  {
    id: "mn1",
    clientId: "c1",
    clientName: "Vikram Mehta",
    date: "2023-12-10",
    type: "Portfolio Review",
    status: "approved",
  },
  {
    id: "mn2",
    clientId: "c3",
    clientName: "Amit Patel",
    date: "2023-12-08",
    type: "Financial Planning",
    status: "approved",
  },
  {
    id: "mn3",
    clientId: "c2",
    clientName: "Priya Singh",
    date: "2023-12-05",
    type: "General Discussion",
    status: "approved",
  },
  {
    id: "mn4",
    clientId: "c6",
    clientName: "Ananya Sharma",
    date: "2023-12-01",
    type: "Portfolio Review",
    status: "approved",
  },
  {
    id: "mn5",
    clientId: "c7",
    clientName: "Suresh Menon",
    date: "2023-11-28",
    type: "Financial Planning",
    status: "approved",
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

export function MeetingNotesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNote, setSelectedNote] = useState<string | null>(null)

  const filteredNotes = sampleMeetingNotes.filter(
    (note) =>
      note.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Meeting Notes</CardTitle>
              <CardDescription>View and manage your client meeting notes</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="pl-8 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">No meeting notes found</p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedNote(note.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-medium">{note.clientName}</span>
                    </div>
                    <Badge variant="outline">{note.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(note.date)}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" className="gap-1">
              View All Notes
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedNote} onOpenChange={(open) => !open && setSelectedNote(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Meeting Notes</DialogTitle>
            <DialogDescription>
              {selectedNote &&
                `${sampleMeetingNotes.find((n) => n.id === selectedNote)?.clientName} - 
                ${formatDate(sampleMeetingNotes.find((n) => n.id === selectedNote)?.date || "")}`}
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

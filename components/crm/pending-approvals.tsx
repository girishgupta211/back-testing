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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, User, Clock, Check, X, Edit, FileText, Phone } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Sample pending approvals data
const samplePendingApprovals = [
  {
    id: "pa1",
    clientId: "c5",
    clientName: "Rajesh Kumar",
    date: "2023-12-12",
    type: "Portfolio Review",
    source: "call",
    status: "pending",
  },
  {
    id: "pa2",
    clientId: "c8",
    clientName: "Kavita Reddy",
    date: "2023-12-11",
    type: "Financial Planning",
    source: "meeting",
    status: "pending",
  },
  {
    id: "pa3",
    clientId: "c6",
    clientName: "Ananya Sharma",
    date: "2023-12-10",
    type: "General Discussion",
    source: "call",
    status: "pending",
  },
]

// Sample meeting minutes content
const sampleMinutesContent = `# Portfolio Review Meeting - December 12, 2023

## Client: Rajesh Kumar

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
- Send portfolio analysis report by December 14, 2023
- Research alternative investment options for tax optimization`

export function PendingApprovals() {
  const [selectedApproval, setSelectedApproval] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editedContent, setEditedContent] = useState(sampleMinutesContent)
  const [approvedItems, setApprovedItems] = useState<string[]>([])
  const [rejectedItems, setRejectedItems] = useState<string[]>([])
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleApprove = (id: string) => {
    setApprovedItems([...approvedItems, id])

    toast({
      title: "Minutes approved",
      description: "The meeting minutes have been approved and added to the client profile",
    })

    setSelectedApproval(null)
  }

  const handleReject = (id: string) => {
    setRejectedItems([...rejectedItems, id])

    toast({
      title: "Minutes rejected",
      description: "The meeting minutes have been rejected and sent back for revision",
    })

    setSelectedApproval(null)
  }

  const handleSaveEdit = () => {
    setEditMode(false)

    toast({
      title: "Changes saved",
      description: "Your edits to the meeting minutes have been saved",
    })
  }

  const getPendingApprovals = () => {
    return samplePendingApprovals.filter((item) => !approvedItems.includes(item.id) && !rejectedItems.includes(item.id))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Review and approve AI-generated meeting minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="pending">Pending ({getPendingApprovals().length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedItems.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedItems.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <div className="space-y-4">
                {getPendingApprovals().length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <p className="mt-2 text-muted-foreground">No pending approvals</p>
                  </div>
                ) : (
                  getPendingApprovals().map((approval) => (
                    <div
                      key={approval.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedApproval(approval.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="font-medium">{approval.clientName}</span>
                        </div>
                        <Badge variant="outline">{approval.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(approval.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {approval.source === "call" ? (
                              <Phone className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            <span>{approval.source === "call" ? "Call Recording" : "Meeting Notes"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleReject(approval.id)
                            }}
                          >
                            <X className="h-3.5 w-3.5" />
                            Reject
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleApprove(approval.id)
                            }}
                          >
                            <Check className="h-3.5 w-3.5" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="approved">
              <div className="space-y-4">
                {approvedItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Check className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <p className="mt-2 text-muted-foreground">No approved items</p>
                  </div>
                ) : (
                  samplePendingApprovals
                    .filter((item) => approvedItems.includes(item.id))
                    .map((approval) => (
                      <div key={approval.id} className="p-4 border border-green-200 bg-green-50/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="font-medium">{approval.clientName}</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(approval.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Approved today</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="space-y-4">
                {rejectedItems.length === 0 ? (
                  <div className="text-center py-8">
                    <X className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <p className="mt-2 text-muted-foreground">No rejected items</p>
                  </div>
                ) : (
                  samplePendingApprovals
                    .filter((item) => rejectedItems.includes(item.id))
                    .map((approval) => (
                      <div key={approval.id} className="p-4 border border-red-200 bg-red-50/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="font-medium">{approval.clientName}</span>
                          </div>
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(approval.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Rejected today</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedApproval}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedApproval(null)
            setEditMode(false)
          }
        }}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Review Meeting Minutes</DialogTitle>
            <DialogDescription>
              {selectedApproval &&
                `${samplePendingApprovals.find((a) => a.id === selectedApproval)?.clientName} - 
                ${formatDate(samplePendingApprovals.find((a) => a.id === selectedApproval)?.date || "")}`}
            </DialogDescription>
          </DialogHeader>

          {editMode ? (
            <div className="py-4">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </div>
          ) : (
            <ScrollArea className="flex-1 pr-4 py-4">
              <div className="whitespace-pre-line">{sampleMinutesContent}</div>
            </ScrollArea>
          )}

          <DialogFooter className="mt-4">
            {editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </>
            ) : (
              <>
                <div className="flex-1 flex justify-start">
                  <Button variant="outline" className="gap-1" onClick={() => setEditMode(true)}>
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="gap-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => selectedApproval && handleReject(selectedApproval)}
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
                <Button className="gap-1" onClick={() => selectedApproval && handleApprove(selectedApproval)}>
                  <Check className="h-4 w-4" />
                  Approve & Add to Client Profile
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

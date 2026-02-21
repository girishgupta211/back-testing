"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ShieldCheck,
  AlertCircle,
  Calendar,
  FileCheck,
  ArrowRight,
  X,
  CheckCircle2,
  Download,
  FileText,
  Clock,
  CalendarClock,
  RefreshCw,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type ComplianceItem = {
  id: string
  title: string
  dueDate: string
  status: "urgent" | "upcoming" | "completed"
  type: "gst" | "arn" | "ria" | "amfi" | "sebi" | "rbi"
  details: string
}

const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: "c1",
    title: "Quarterly GST Filing",
    dueDate: "April 20, 2023",
    status: "urgent",
    type: "gst",
    details: "File GSTR-1 and GSTR-3B for the quarter ending March 2023.",
  },
  {
    id: "c2",
    title: "ARN Renewal",
    dueDate: "May 15, 2023",
    status: "upcoming",
    type: "arn",
    details:
      "Your AMFI Registration Number (ARN) is due for renewal. Required documents: PAN card, address proof, and latest certification.",
  },
  {
    id: "c3",
    title: "AMFI Certification Renewal",
    dueDate: "June 30, 2023",
    status: "upcoming",
    type: "amfi",
    details:
      "Your AMFI certification needs to be renewed. Complete the CPE (Continuing Professional Education) credits.",
  },
  {
    id: "c4",
    title: "SEBI Annual Compliance Report",
    dueDate: "July 10, 2023",
    status: "upcoming",
    type: "sebi",
    details: "Submit the annual compliance report as required by SEBI regulations.",
  },
  {
    id: "c5",
    title: "RIA Half-Yearly Compliance",
    dueDate: "October 31, 2023",
    status: "upcoming",
    type: "ria",
    details: "Submit half-yearly compliance report for your Registered Investment Advisor license.",
  },
  {
    id: "c6",
    title: "KYC Audit Completion",
    dueDate: "March 15, 2023",
    status: "completed",
    type: "rbi",
    details: "Complete the KYC audit for all clients as per RBI guidelines.",
  },
]

export function ComplianceCard() {
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null)
  const [actionTaken, setActionTaken] = useState<string | null>(null)
  const [processingAction, setProcessingAction] = useState<string | null>(null)
  const { toast } = useToast()

  const handleItemClick = (item: ComplianceItem) => {
    setSelectedItem(item)
    setActionTaken(null)
  }

  const handleClose = () => {
    setSelectedItem(null)
    setActionTaken(null)
  }

  const handleAction = (action: string) => {
    setProcessingAction(action)

    // Simulate AI processing time
    setTimeout(() => {
      setProcessingAction(null)
      setActionTaken(action)

      // Show success toast
      toast({
        title: "Action completed",
        description: `Zinni AI has ${
          action === "prepare"
            ? "prepared the required documents"
            : action === "schedule"
              ? "scheduled reminders"
              : "automated the compliance process"
        } successfully.`,
        variant: "default",
      })
    }, 1500)
  }

  const getStatusBadge = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "urgent":
        return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-0">Urgent</Badge>
      case "upcoming":
        return <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-0">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0">Completed</Badge>
    }
  }

  const getTypeIcon = (type: ComplianceItem["type"]) => {
    switch (type) {
      case "gst":
        return <FileCheck className="h-4 w-4 text-blue-400" />
      case "arn":
        return <ShieldCheck className="h-4 w-4 text-purple-400" />
      case "ria":
        return <ShieldCheck className="h-4 w-4 text-green-400" />
      case "amfi":
        return <Calendar className="h-4 w-4 text-amber-400" />
      case "sebi":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case "rbi":
        return <AlertCircle className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-400" />
            <CardTitle className="text-base">Compliance Requirements</CardTitle>
          </div>
          <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-0">1 Urgent</Badge>
        </div>
        <CardDescription>AI-powered compliance monitoring and assistance</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedItem ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTypeIcon(selectedItem.type)}
                <h3 className="font-medium">{selectedItem.title}</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Due: {selectedItem.dueDate}</span>
              </div>
              {getStatusBadge(selectedItem.status)}
            </div>

            <div className="text-sm">
              <p>{selectedItem.details}</p>
            </div>

            {actionTaken ? (
              <div className="p-3 bg-green-900/20 border border-green-900/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <h4 className="font-medium text-green-400">Action Taken</h4>
                </div>

                {actionTaken === "prepare" && (
                  <div className="space-y-3">
                    <p className="text-sm">Zinni AI has prepared the following documents for you:</p>
                    <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{selectedItem.title} - Required Documents.pdf</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7 gap-1">
                        <Download className="h-3 w-3" /> Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{selectedItem.title} - Checklist.pdf</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7 gap-1">
                        <Download className="h-3 w-3" /> Download
                      </Button>
                    </div>
                    <Button className="w-full gap-1 mt-2">Continue to Filing Process</Button>
                  </div>
                )}

                {actionTaken === "schedule" && (
                  <div className="space-y-3">
                    <p className="text-sm">Zinni AI has scheduled a reminder for this compliance task:</p>
                    <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                      <div className="flex items-center gap-2">
                        <CalendarClock className="h-4 w-4" />
                        <span className="text-sm">Reminder set for 7 days before due date</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Added to your compliance calendar</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7">
                        View
                      </Button>
                    </div>
                    <Button className="w-full gap-1 mt-2">Set Additional Reminders</Button>
                  </div>
                )}

                {actionTaken === "automate" && (
                  <div className="space-y-3">
                    <p className="text-sm">Zinni AI has set up automation for this compliance task:</p>
                    <div className="p-2 bg-gray-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium">Automated data collection enabled</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Zinni AI will automatically collect required data from your systems
                      </p>
                    </div>
                    <div className="p-2 bg-gray-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium">Document preparation scheduled</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Required documents will be prepared 14 days before deadline
                      </p>
                    </div>
                    <div className="p-2 bg-gray-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium">Compliance alerts configured</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You'll receive alerts at 14, 7, and 3 days before deadline
                      </p>
                    </div>
                    <Button className="w-full gap-1 mt-2">Customize Automation</Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => handleAction("prepare")}
                  className="w-full justify-start gap-2 bg-blue-700 hover:bg-blue-800"
                  disabled={processingAction !== null}
                >
                  {processingAction === "prepare" ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Preparing Documents...
                    </>
                  ) : (
                    <>
                      <FileCheck className="h-4 w-4" />
                      Prepare Required Documents
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => handleAction("schedule")}
                  className="w-full justify-start gap-2 bg-purple-700 hover:bg-purple-800"
                  disabled={processingAction !== null}
                >
                  {processingAction === "schedule" ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Scheduling Reminders...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      Schedule Reminders
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => handleAction("automate")}
                  className="w-full justify-start gap-2 bg-green-700 hover:bg-green-800"
                  disabled={processingAction !== null}
                >
                  {processingAction === "automate" ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Setting Up Automation...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Automate Compliance Process
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <ScrollArea className="h-[220px] pr-4">
              <div className="space-y-2">
                {COMPLIANCE_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`
                      flex items-center justify-between p-2 rounded-md cursor-pointer
                      ${
                        item.status === "urgent"
                          ? "bg-red-900/20 border border-red-900/30"
                          : item.status === "completed"
                            ? "bg-gray-800/50"
                            : "bg-gray-800"
                      }
                      hover:bg-gray-700/50 transition-colors
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">{item.dueDate}</p>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 text-xs gap-1 bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              View all compliance requirements <ArrowRight className="h-3 w-3" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MeetingNotesCapture } from "@/components/crm/meeting-notes-capture"
import { MeetingNotesList } from "@/components/crm/meeting-notes-list"
import { CallRecordingsList } from "@/components/crm/call-recordings-list"
import { CallRecorder } from "@/components/crm/call-recorder"
import { PendingApprovals } from "@/components/crm/pending-approvals"
import { BrainCircuit, FileText, Phone, Clock, Users } from "lucide-react"

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState("meeting-notes")

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-[#0496ff]" /> Intelligent CRM
          </h2>
          <p className="text-sm text-muted-foreground">AI-powered client interaction management</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 h-auto">
          <TabsTrigger value="meeting-notes" className="py-2">
            <FileText className="h-4 w-4 mr-2" />
            Meeting Notes
          </TabsTrigger>
          <TabsTrigger value="call-recordings" className="py-2">
            <Phone className="h-4 w-4 mr-2" />
            Call Recordings
          </TabsTrigger>
          <TabsTrigger value="pending-approvals" className="py-2">
            <Clock className="h-4 w-4 mr-2" />
            Pending Approvals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meeting-notes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MeetingNotesCapture />
            <MeetingNotesList />
          </div>
        </TabsContent>

        <TabsContent value="call-recordings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CallRecorder />
            <CallRecordingsList />
          </div>
        </TabsContent>

        <TabsContent value="pending-approvals" className="space-y-4">
          <PendingApprovals />
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-medium">Client Interaction Intelligence</h3>
              </div>
              <p className="text-gray-400 max-w-2xl">
                Zinni AI automatically processes your client interactions, extracts key information, and creates
                structured meeting minutes. This helps you maintain detailed client records without the manual work.
              </p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <BrainCircuit className="h-4 w-4" />
              View AI Capabilities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ClientMeetingNotes } from "@/components/crm/client-meeting-notes"
import { ArrowLeft, Search, FileText, Calendar, Filter } from "lucide-react"

export default function ClientMeetingNotesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Sample client data - in a real app, this would be fetched based on the ID
  const clientName = "Vikram Mehta"

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header with Back Button and Client Name */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/clients/${params.id}`}>
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{clientName}</h1>
            <p className="text-sm text-muted-foreground">Meeting Notes & Interactions</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-md shadow-md">
          <FileText className="mr-2 h-4 w-4" />
          Add New Note
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Meeting Notes History</CardTitle>
              <CardDescription>Complete history of interactions with {clientName}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search notes..."
                  className="pl-8 w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="all">All Notes</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio Reviews</TabsTrigger>
              <TabsTrigger value="planning">Financial Planning</TabsTrigger>
              <TabsTrigger value="general">General Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <ClientMeetingNotes clientId={params.id} clientName={clientName} />
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4">
              {/* Filtered notes would go here */}
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">No portfolio review notes found</p>
              </div>
            </TabsContent>

            <TabsContent value="planning" className="space-y-4">
              {/* Filtered notes would go here */}
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">No financial planning notes found</p>
              </div>
            </TabsContent>

            <TabsContent value="general" className="space-y-4">
              {/* Filtered notes would go here */}
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">No general discussion notes found</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

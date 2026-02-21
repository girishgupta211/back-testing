"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientSelector } from "./client-selector"
import { Mic, Phone, PhoneOff, BrainCircuit, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export function CallRecorder() {
  const [selectedClient, setSelectedClient] = useState("")
  const [callType, setCallType] = useState("review")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const { toast } = useToast()

  const handleStartRecording = () => {
    if (!selectedClient) {
      toast({
        title: "Client selection required",
        description: "Please select a client before starting the recording",
        variant: "destructive",
      })
      return
    }

    setIsRecording(true)
    setRecordingTime(0)

    // Simulate recording time counter
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    // Store interval ID for cleanup
    return () => clearInterval(interval)
  }

  const handleStopRecording = () => {
    setIsRecording(false)

    toast({
      title: "Recording stopped",
      description: "Your call recording has been saved",
    })
  }

  const handleProcessRecording = () => {
    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsProcessed(true)

      toast({
        title: "Call processed successfully",
        description: "AI has generated meeting minutes from your call recording",
      })
    }, 3000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Client Call</CardTitle>
        <CardDescription>Record and transcribe client calls for automatic meeting minutes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="client">Select Client</Label>
          <ClientSelector value={selectedClient} onChange={setSelectedClient} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="call-type">Call Type</Label>
          <Select value={callType} onValueChange={setCallType}>
            <SelectTrigger id="call-type">
              <SelectValue placeholder="Select call type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="review">Portfolio Review</SelectItem>
              <SelectItem value="planning">Financial Planning</SelectItem>
              <SelectItem value="general">General Discussion</SelectItem>
              <SelectItem value="onboarding">Client Onboarding</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isRecording ? (
          <div className="space-y-4 mt-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-20 w-20 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                <Mic className="h-10 w-10 text-red-500" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-xl">{formatTime(recordingTime)}</h3>
                <p className="text-sm text-muted-foreground mt-1">Recording in progress...</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="destructive" size="lg" className="gap-2 px-8" onClick={handleStopRecording}>
                <PhoneOff className="h-5 w-5" />
                End Call
              </Button>
            </div>
          </div>
        ) : isProcessed ? (
          <div className="space-y-4 mt-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">Call Processed Successfully</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Meeting minutes have been generated and sent for approval
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsProcessed(false)
                  setRecordingTime(0)
                }}
              >
                New Call
              </Button>
              <Button>View Minutes</Button>
            </div>
          </div>
        ) : recordingTime > 0 ? (
          <div className="space-y-4 mt-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <BrainCircuit className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">Call Recording Saved</h3>
                <p className="text-sm text-muted-foreground mt-1">Duration: {formatTime(recordingTime)}</p>
              </div>
            </div>

            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing recording...</span>
                  <span>Please wait</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            ) : (
              <div className="flex justify-center">
                <Button className="gap-2" onClick={handleProcessRecording}>
                  <BrainCircuit className="h-4 w-4" />
                  Process with AI
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-lg mt-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-medium">Start Client Call</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Record your client call for automatic transcription and minutes
              </p>
            </div>
            <Button size="lg" className="mt-2 gap-2" onClick={handleStartRecording} disabled={!selectedClient}>
              <Mic className="h-4 w-4" />
              Start Recording
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

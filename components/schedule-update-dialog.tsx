"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Copy, Edit } from "lucide-react"

interface ScheduleUpdateDialogProps {
  isOpen: boolean
  onClose: () => void
  clientName: string
  clientPhone?: string
}

export function ScheduleUpdateDialog({ isOpen, onClose, clientName, clientPhone }: ScheduleUpdateDialogProps) {
  const [message, setMessage] = useState(
    `Hi ${clientName} - we would like to schedule a portfolio update call with you. Please share convenient date and time.`,
  )
  const [isEditing, setIsEditing] = useState(false)

  const handleSendWhatsApp = () => {
    if (!clientPhone) {
      alert("Client phone number not available")
      return
    }

    // Format phone number (remove spaces, +, etc.)
    const formattedPhone = clientPhone.replace(/\s+/g, "").replace(/\+/g, "")

    // Create WhatsApp URL with encoded message
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")

    // Close the dialog
    onClose()
  }

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message)
    alert("Message copied to clipboard")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Portfolio Update</DialogTitle>
          <DialogDescription>Send a message to schedule a portfolio update call with {clientName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Message Preview</h4>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)} className="h-8 px-2">
              <Edit className="h-4 w-4 mr-1" />
              {isEditing ? "Preview" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter your message here..."
            />
          ) : (
            <div className="rounded-md border p-4 text-sm">{message}</div>
          )}
        </div>

        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" size="sm" onClick={handleCopyMessage}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button onClick={handleSendWhatsApp}>
            <Send className="h-4 w-4 mr-2" />
            Send via WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

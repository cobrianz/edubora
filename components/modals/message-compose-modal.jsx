"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Send, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function MessageComposeModal({ onClose, userRole = "student" }) {
  const { toast } = useToast()
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [isSending, setIsSending] = useState(false)

  const recipientsOptions = {
    student: [
      { value: "teacher", label: "Teacher" },
      { value: "admin", label: "Admin" },
      { value: "librarian", label: "Librarian" },
    ],
    teacher: [
      { value: "student", label: "Student" },
      { value: "parent", label: "Parent" },
      { value: "admin", label: "Admin" },
    ],
    // Add more roles as needed
  }

  const handleSendMessage = () => {
    if (!recipient || !subject || !messageContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Recipient, Subject, Message).",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)
    toast({
      title: "Sending Message",
      description: "Your message is being sent...",
    })

    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      toast({
        title: "Message Sent!",
        description: `Your message to ${recipient} has been sent successfully.`,
      })
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-xl animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Compose New Message
            </CardTitle>
            <CardDescription>Send a message to school staff or other users.</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Type</Label>
            <Select value={recipient} onValueChange={setRecipient} disabled={isSending}>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select recipient type" />
              </SelectTrigger>
              <SelectContent>
                {recipientsOptions[userRole]?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {recipient && (
            <div className="space-y-2">
              <Label htmlFor="specific-recipient">Specific Recipient (Optional)</Label>
              <Input
                id="specific-recipient"
                placeholder={`e.g., Mr. John Kamau (for ${recipient})`}
                disabled={isSending}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to send to all {recipient}s or specify a name.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g., Inquiry about assignment"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-content">Message</Label>
            <Textarea
              id="message-content"
              placeholder="Type your message here..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows={6}
              disabled={isSending}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSending}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage} disabled={isSending}>
              {isSending ? (
                <>
                  <Send className="mr-2 h-4 w-4 animate-pulse" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

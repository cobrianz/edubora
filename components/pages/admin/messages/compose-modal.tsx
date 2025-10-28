"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, Send, Clock } from "lucide-react"

const RECIPIENT_GROUPS = [
  { id: "all-parents", label: "All Parents", count: 245 },
  { id: "all-teachers", label: "All Teachers", count: 32 },
  { id: "all-students", label: "All Students", count: 450 },
  { id: "form-4", label: "Form 4 Students", count: 120 },
  { id: "form-3", label: "Form 3 Students", count: 135 },
  { id: "form-2", label: "Form 2 Students", count: 125 },
  { id: "form-1", label: "Form 1 Students", count: 140 },
  { id: "grade-6", label: "Grade 6 Students", count: 85 },
  { id: "grade-5", label: "Grade 5 Students", count: 90 },
  { id: "grade-4", label: "Grade 4 Students", count: 88 },
]

const MESSAGE_TEMPLATES = [
  {
    id: "term-dates",
    name: "Term Dates Announcement",
    subject: "Term {TERM} {YEAR} - Important Dates",
    message:
      "Dear Parents/Guardians,\n\nWe are pleased to share the important dates for Term {TERM} {YEAR}:\n\n- School opens: {OPEN_DATE}\n- Mid-term break: {MIDTERM_DATE}\n- Term ends: {END_DATE}\n\nPlease ensure your child is back on time.\n\nBest regards,\nSchool Administration",
  },
  {
    id: "fee-reminder",
    name: "Fee Payment Reminder",
    subject: "School Fees Payment Reminder",
    message:
      "Dear Parents/Guardians,\n\nThis is a friendly reminder that school fees for the current term are now due. Please ensure payment is made within the stipulated time to avoid any inconvenience.\n\nFor payment plans or queries, please contact the office.\n\nThank you,\nSchool Administration",
  },
  {
    id: "exam-schedule",
    name: "Examination Schedule",
    subject: "Examination Schedule - {TERM}",
    message:
      "Dear Students,\n\nThe examination schedule for {TERM} has been released. Please collect your copy from the office and ensure you are well-prepared.\n\nFollow all examination rules and regulations.\n\nBest wishes,\nSchool Administration",
  },
  {
    id: "staff-meeting",
    name: "Staff Meeting Notice",
    subject: "Staff Meeting - {DATE}",
    message:
      "Dear Staff,\n\nPlease note that there will be a staff meeting on {DATE} at {TIME} in the staff room.\n\nYour attendance is mandatory.\n\nRegards,\nAdministration",
  },
]

export default function ComposeModal({ onClose, onSend, replyTo }) {
  const [activeTab, setActiveTab] = useState("compose")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [composeData, setComposeData] = useState({
    recipients: replyTo ? [replyTo.from] : [],
    subject: replyTo ? `Re: ${replyTo.subject}` : "",
    message: replyTo
      ? `\n\n---\nOn ${new Date(replyTo.timestamp).toLocaleString()}, ${replyTo.from.name} wrote:\n${replyTo.message}`
      : "",
    type: "email",
    priority: "normal",
    scheduledDate: "",
    attachments: [],
  })

  const handleAddRecipientGroup = (group) => {
    setComposeData((prev) => ({
      ...prev,
      recipients: [...prev.recipients, group],
    }))
  }

  const handleRemoveRecipient = (index) => {
    setComposeData((prev) => ({
      ...prev,
      recipients: prev.recipients.filter((_, i) => i !== index),
    }))
  }

  const handleApplyTemplate = (template) => {
    setComposeData((prev) => ({
      ...prev,
      subject: template.subject,
      message: template.message,
    }))
    setSelectedTemplate(template.id)
  }

  const handleSend = () => {
    if (!composeData.subject.trim() || !composeData.message.trim() || composeData.recipients.length === 0) {
      alert("Please fill in all required fields and add at least one recipient")
      return
    }
    onSend(composeData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compose Message</DialogTitle>
          <DialogDescription>Send messages to parents, teachers, and students</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="recipients">Recipients</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-4 mt-4">
            {/* Recipients */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Recipients *</label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/50 min-h-10">
                {composeData.recipients.length === 0 ? (
                  <span className="text-sm text-muted-foreground">No recipients selected</span>
                ) : (
                  composeData.recipients.map((recipient, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      {recipient.label || recipient.name}
                      <button onClick={() => handleRemoveRecipient(idx)} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </div>

            {/* Message Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message Type</label>
                <Select
                  value={composeData.type}
                  onValueChange={(value) => setComposeData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">📧 Email</SelectItem>
                    <SelectItem value="sms">💬 SMS</SelectItem>
                    <SelectItem value="notification">🔔 In-App Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                <Select
                  value={composeData.priority}
                  onValueChange={(value) => setComposeData((prev) => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🟢 Low</SelectItem>
                    <SelectItem value="normal">🔵 Normal</SelectItem>
                    <SelectItem value="high">🟠 High</SelectItem>
                    <SelectItem value="urgent">🔴 Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Subject *</label>
              <Input
                placeholder="Enter message subject"
                value={composeData.subject}
                onChange={(e) => setComposeData((prev) => ({ ...prev, subject: e.target.value }))}
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Message *</label>
              <Textarea
                placeholder="Enter your message here..."
                value={composeData.message}
                onChange={(e) => setComposeData((prev) => ({ ...prev, message: e.target.value }))}
                rows={8}
              />
            </div>

            {/* Schedule */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Schedule (Optional)</label>
              <Input
                type="datetime-local"
                value={composeData.scheduledDate}
                onChange={(e) => setComposeData((prev) => ({ ...prev, scheduledDate: e.target.value }))}
              />
              {composeData.scheduledDate && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Message will be sent on {new Date(composeData.scheduledDate).toLocaleString()}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSend} className="gap-2">
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4 mt-4">
            <div className="grid gap-3">
              {MESSAGE_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleApplyTemplate(template)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{template.subject}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-4 mt-4">
            <div className="grid gap-2">
              {RECIPIENT_GROUPS.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleAddRecipientGroup(group)}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors text-left"
                >
                  <div>
                    <p className="font-medium text-foreground">{group.label}</p>
                    <p className="text-xs text-muted-foreground">{group.count} recipients</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Add
                  </Button>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

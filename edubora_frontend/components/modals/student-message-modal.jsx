"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Mail, Phone, MessageSquare, Calendar, Clock, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StudentMessageModal({ student, onClose, onSend }) {
  const { toast } = useToast()
  const [messageType, setMessageType] = useState("individual")
  const [recipients, setRecipients] = useState([])
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("normal")
  const [sendMethod, setSendMethod] = useState("email")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [useTemplate, setUseTemplate] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const messageTemplates = [
    {
      id: "academic_concern",
      name: "Academic Concern",
      subject: "Academic Performance Discussion",
      content:
        "Dear Parent/Guardian,\n\nI would like to discuss your child's recent academic performance. Please let me know when would be a convenient time for a meeting.\n\nBest regards,\n[Teacher Name]",
    },
    {
      id: "attendance_issue",
      name: "Attendance Issue",
      subject: "Attendance Concern",
      content:
        "Dear Parent/Guardian,\n\nI wanted to bring to your attention that your child has been absent from school. Please contact us to discuss this matter.\n\nBest regards,\n[Teacher Name]",
    },
    {
      id: "positive_feedback",
      name: "Positive Feedback",
      subject: "Excellent Performance",
      content:
        "Dear Parent/Guardian,\n\nI'm pleased to inform you that your child has shown excellent performance in class. Keep up the great work!\n\nBest regards,\n[Teacher Name]",
    },
    {
      id: "assignment_reminder",
      name: "Assignment Reminder",
      subject: "Assignment Due Reminder",
      content:
        "Dear Parent/Guardian,\n\nThis is a reminder that your child has an assignment due soon. Please ensure they complete it on time.\n\nBest regards,\n[Teacher Name]",
    },
  ]

  const recipientOptions = [
    { id: "student", label: "Student", value: student?.name || "Student" },
    { id: "father", label: "Father", value: "John Mwangi" },
    { id: "mother", label: "Mother", value: "Grace Mwangi" },
    { id: "guardian", label: "Guardian", value: "Guardian" },
    { id: "both_parents", label: "Both Parents", value: "Both Parents" },
  ]

  const handleRecipientChange = (recipientId, checked) => {
    if (checked) {
      const recipient = recipientOptions.find((r) => r.id === recipientId)
      if (recipient && !recipients.find((r) => r.id === recipientId)) {
        setRecipients([...recipients, recipient])
      }
    } else {
      setRecipients(recipients.filter((r) => r.id !== recipientId))
    }
  }

  const handleTemplateSelect = (templateId) => {
    const template = messageTemplates.find((t) => t.id === templateId)
    if (template) {
      setSubject(template.subject)
      setMessage(template.content)
      setSelectedTemplate(templateId)
    }
  }

  const handleSendMessage = () => {
    if (!subject.trim() || !message.trim() || recipients.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select at least one recipient",
        variant: "destructive",
      })
      return
    }

    const messageData = {
      type: messageType,
      recipients,
      subject,
      message,
      priority,
      sendMethod,
      scheduleDate: scheduleDate || null,
      scheduleTime: scheduleTime || null,
      student: student,
    }

    if (onSend) {
      onSend(messageData)
    }

    toast({
      title: "Message Sent",
      description: `Message sent to ${recipients.length} recipient(s)`,
    })

    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send Message
          </DialogTitle>
          <DialogDescription>
            Send a message to student or parents regarding {student?.name || "the student"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="messageType">Message Type</Label>
                  <Select value={messageType} onValueChange={setMessageType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Message</SelectItem>
                      <SelectItem value="bulk">Bulk Message</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Recipients</Label>
                  <div className="space-y-2 mt-2">
                    {recipientOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={recipients.some((r) => r.id === option.id)}
                          onCheckedChange={(checked) => handleRecipientChange(option.id, checked)}
                        />
                        <Label htmlFor={option.id} className="text-sm">
                          {option.label} ({option.value})
                        </Label>
                      </div>
                    ))}
                  </div>
                  {recipients.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {recipients.map((recipient) => (
                        <Badge key={recipient.id} variant="secondary" className="text-xs">
                          {recipient.label}
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={() => setRecipients(recipients.filter((r) => r.id !== recipient.id))}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sendMethod">Send Method</Label>
                  <Select value={sendMethod} onValueChange={setSendMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select send method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="both">Email & SMS</SelectItem>
                      <SelectItem value="portal">Portal Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Student Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Name:</span>
                      <span className="text-sm">{student?.name || "Sarah Mwangi"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Class:</span>
                      <span className="text-sm">{student?.class || "Grade 7A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Admission No:</span>
                      <span className="text-sm">{student?.admissionNo || "ADM001"}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">john.mwangi@email.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">+254 712 345 678</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">grace.mwangi@email.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">+254 723 456 789</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter message subject"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={8}
                />
                <p className="text-xs text-muted-foreground mt-1">{message.length}/1000 characters</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {messageTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                    <CardDescription className="text-xs">{template.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 bg-transparent"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedTemplate && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-sm text-blue-800">Template Applied</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-700">
                    The template has been applied to your message. You can edit it in the Compose tab.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule Message
                </CardTitle>
                <CardDescription>Schedule your message to be sent at a specific date and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="scheduleDate">Date</Label>
                    <Input
                      id="scheduleDate"
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="scheduleTime">Time</Label>
                    <Input
                      id="scheduleTime"
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>

                {scheduleDate && scheduleTime && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">
                        Message scheduled for {scheduleDate} at {scheduleTime}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Quick Schedule Options</h4>
                  <div className="grid gap-2 md:grid-cols-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        setScheduleDate(tomorrow.toISOString().split("T")[0])
                        setScheduleTime("08:00")
                      }}
                    >
                      Tomorrow 8:00 AM
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const nextWeek = new Date()
                        nextWeek.setDate(nextWeek.getDate() + 7)
                        setScheduleDate(nextWeek.toISOString().split("T")[0])
                        setScheduleTime("09:00")
                      }}
                    >
                      Next Week 9:00 AM
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setScheduleDate("")
                        setScheduleTime("")
                      }}
                    >
                      Send Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSendMessage}>
            <Send className="mr-2 h-4 w-4" />
            {scheduleDate ? "Schedule Message" : "Send Message"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

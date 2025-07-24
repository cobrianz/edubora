"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  CalendarIcon,
  Clock,
  User,
  Bell,
  ImageIcon,
  Paperclip,
  Smile,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function ParentMessageModal({ parent, onClose, onSend }) {
  const { toast } = useToast()
  const [messageType, setMessageType] = useState("individual")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("normal")
  const [sendVia, setSendVia] = useState({
    email: true,
    sms: false,
    portal: true,
  })
  const [scheduleMessage, setScheduleMessage] = useState(false)
  const [scheduleDate, setScheduleDate] = useState(null)
  const [scheduleTime, setScheduleTime] = useState("")
  const [attachments, setAttachments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock parent data
  const parentData = {
    id: parent?.id || "P001",
    name: parent?.name || "John Mwangi",
    email: parent?.email || "john.mwangi@email.com",
    phone: parent?.phone || "+254 712 345 678",
    children: parent?.children || [
      { name: "Sarah Mwangi", grade: "Grade 7A" },
      { name: "David Mwangi", grade: "Grade 5B" },
    ],
    preferredLanguage: parent?.preferredLanguage || "English",
    communicationMethod: parent?.communicationMethod || "Email",
    lastContact: parent?.lastContact || "2024-07-10",
    responseRate: parent?.responseRate || 80,
  }

  // Message templates
  const messageTemplates = [
    {
      id: "fee_reminder",
      title: "Fee Payment Reminder",
      subject: "School Fee Payment Reminder - {child_name}",
      content:
        "Dear {parent_name},\n\nThis is a friendly reminder that the school fees for {child_name} in {class} are due on {due_date}. Please make the payment at your earliest convenience to avoid any late fees.\n\nAmount Due: KSh {amount}\nDue Date: {due_date}\n\nYou can make payments via:\n- M-Pesa: Paybill 123456\n- Bank Transfer: Account 987654321\n- Cash at the school office\n\nThank you for your cooperation.\n\nBest regards,\nSchool Administration",
      category: "financial",
    },
    {
      id: "academic_update",
      title: "Academic Progress Update",
      subject: "Academic Progress Report for {child_name}",
      content:
        "Dear {parent_name},\n\nI hope this message finds you well. I wanted to update you on {child_name}'s academic progress in {class}.\n\n{child_name} has been performing well in most subjects with an overall average of {average}%. Here are some highlights:\n\n• Mathematics: {math_grade}%\n• English: {english_grade}%\n• Science: {science_grade}%\n\nAreas for improvement:\n• {improvement_area}\n\nI recommend {recommendation}.\n\nPlease feel free to schedule a meeting if you'd like to discuss this further.\n\nBest regards,\n{teacher_name}",
      category: "academic",
    },
    {
      id: "meeting_invitation",
      title: "Parent-Teacher Meeting",
      subject: "Invitation to Parent-Teacher Meeting - {child_name}",
      content:
        "Dear {parent_name},\n\nYou are cordially invited to attend a parent-teacher meeting scheduled for {meeting_date} at {meeting_time}.\n\nMeeting Details:\n• Date: {meeting_date}\n• Time: {meeting_time}\n• Venue: {venue}\n• Purpose: Discuss {child_name}'s progress and address any concerns\n\nTopics to be discussed:\n• Academic performance\n• Behavioral observations\n• Areas for improvement\n• Home support strategies\n\nPlease confirm your attendance by replying to this message or calling the school office.\n\nLooking forward to meeting with you.\n\nBest regards,\n{teacher_name}",
      category: "meeting",
    },
    {
      id: "event_notification",
      title: "School Event Notification",
      subject: "Upcoming School Event - {event_name}",
      content:
        "Dear {parent_name},\n\nWe are excited to inform you about our upcoming {event_name} scheduled for {event_date}.\n\nEvent Details:\n• Event: {event_name}\n• Date: {event_date}\n• Time: {event_time}\n• Venue: {venue}\n• Dress Code: {dress_code}\n\n{event_description}\n\nWe encourage {child_name} to participate in this event as it will be both educational and fun.\n\nFor more information or to volunteer, please contact the school office.\n\nBest regards,\nSchool Administration",
      category: "event",
    },
    {
      id: "attendance_concern",
      title: "Attendance Concern",
      subject: "Attendance Concern - {child_name}",
      content:
        "Dear {parent_name},\n\nI hope you are well. I am writing to discuss {child_name}'s recent attendance pattern.\n\nAttendance Summary:\n• Days Present: {days_present}\n• Days Absent: {days_absent}\n• Attendance Rate: {attendance_rate}%\n\nRegular attendance is crucial for {child_name}'s academic success. Frequent absences can impact:\n• Learning continuity\n• Social interactions\n• Academic performance\n\nIf there are any challenges affecting attendance, please let us know so we can work together to find solutions.\n\nPlease contact me to discuss this matter further.\n\nBest regards,\n{teacher_name}",
      category: "attendance",
    },
    {
      id: "congratulations",
      title: "Congratulations Message",
      subject: "Congratulations - {child_name}'s Achievement",
      content:
        "Dear {parent_name},\n\nI am delighted to share some wonderful news about {child_name}!\n\n{child_name} has achieved {achievement} and we are very proud of this accomplishment.\n\nDetails:\n• Achievement: {achievement}\n• Date: {achievement_date}\n• Recognition: {recognition}\n\nThis success reflects {child_name}'s hard work, dedication, and your support at home. Please join us in celebrating this milestone.\n\n{child_name} should be very proud of this achievement, and so should you!\n\nCongratulations once again!\n\nBest regards,\n{teacher_name}",
      category: "positive",
    },
  ]

  const handleTemplateSelect = (templateId) => {
    const template = messageTemplates.find((t) => t.id === templateId)
    if (template) {
      setSubject(template.subject)
      setMessage(template.content)
      toast({
        title: "Template Applied",
        description: "Message template has been applied. You can customize it as needed.",
      })
    }
  }

  const handleSendMessage = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both subject and message",
        variant: "destructive",
      })
      return
    }

    if (!sendVia.email && !sendVia.sms && !sendVia.portal) {
      toast({
        title: "Validation Error",
        description: "Please select at least one communication method",
        variant: "destructive",
      })
      return
    }

    if (scheduleMessage && (!scheduleDate || !scheduleTime)) {
      toast({
        title: "Validation Error",
        description: "Please set both date and time for scheduled message",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const messageData = {
        recipient: parentData,
        subject,
        message,
        priority,
        sendVia,
        scheduled: scheduleMessage,
        scheduleDate: scheduleMessage ? scheduleDate : null,
        scheduleTime: scheduleMessage ? scheduleTime : null,
        attachments,
        timestamp: new Date().toISOString(),
      }

      onSend?.(messageData)

      toast({
        title: scheduleMessage ? "Message Scheduled" : "Message Sent",
        description: scheduleMessage
          ? `Message scheduled for ${format(scheduleDate, "PPP")} at ${scheduleTime}`
          : `Message sent to ${parentData.name} successfully`,
      })

      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileAttachment = (event) => {
    const files = Array.from(event.target.files)
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024) // 5MB limit

    if (validFiles.length !== files.length) {
      toast({
        title: "File Size Warning",
        description: "Some files were too large (max 5MB) and were not attached.",
        variant: "destructive",
      })
    }

    setAttachments((prev) => [...prev, ...validFiles])

    if (validFiles.length > 0) {
      toast({
        title: "Files Attached",
        description: `${validFiles.length} file(s) attached to the message`,
      })
    }
  }

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const insertPlaceholder = (placeholder) => {
    const textarea = document.getElementById("message")
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newMessage = message.substring(0, start) + placeholder + message.substring(end)
    setMessage(newMessage)

    // Set cursor position after the inserted placeholder
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + placeholder.length, start + placeholder.length)
    }, 0)
  }

  const placeholders = [
    "{parent_name}",
    "{child_name}",
    "{class}",
    "{teacher_name}",
    "{school_name}",
    "{date}",
    "{time}",
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send Message to Parent
          </DialogTitle>
          <DialogDescription>Compose and send a message to {parentData.name}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Parent Information */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Parent Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {parentData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{parentData.name}</p>
                  <p className="text-sm text-muted-foreground">Parent ID: {parentData.id}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{parentData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{parentData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last contact: {parentData.lastContact}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Children</h4>
                {parentData.children.map((child, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{child.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {child.grade}
                    </Badge>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Preferred Language:</span>
                  <span>{parentData.preferredLanguage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Preferred Method:</span>
                  <span>{parentData.communicationMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Response Rate:</span>
                  <span className="font-medium">{parentData.responseRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Composition */}
          <div className="md:col-span-2 space-y-4">
            {/* Message Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Templates</CardTitle>
                <CardDescription>Select a template to get started quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2">
                  {messageTemplates.map((template) => (
                    <Button
                      key={template.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateSelect(template.id)}
                      className="justify-start h-auto p-3"
                    >
                      <div className="text-left">
                        <p className="font-medium text-sm">{template.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{template.subject}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {template.category}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Message Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compose Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="messageType">Message Type</Label>
                    <Select value={messageType} onValueChange={setMessageType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="broadcast">Broadcast</SelectItem>
                        <SelectItem value="class">Class Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter message subject"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message">Message *</Label>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => document.getElementById("file-input").click()}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={8}
                    className="resize-none"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-xs text-muted-foreground mr-2">Quick placeholders:</span>
                    {placeholders.map((placeholder) => (
                      <Button
                        key={placeholder}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => insertPlaceholder(placeholder)}
                      >
                        {placeholder}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* File Attachments */}
                <input
                  id="file-input"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileAttachment}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                />

                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label>Attachments ({attachments.length})</Label>
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Paperclip className="h-4 w-4" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Send Options */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Send Via</Label>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="email"
                          checked={sendVia.email}
                          onCheckedChange={(checked) => setSendVia((prev) => ({ ...prev, email: checked }))}
                        />
                        <Label htmlFor="email" className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="sms"
                          checked={sendVia.sms}
                          onCheckedChange={(checked) => setSendVia((prev) => ({ ...prev, sms: checked }))}
                        />
                        <Label htmlFor="sms" className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          SMS
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="portal"
                          checked={sendVia.portal}
                          onCheckedChange={(checked) => setSendVia((prev) => ({ ...prev, portal: checked }))}
                        />
                        <Label htmlFor="portal" className="flex items-center gap-1">
                          <Bell className="h-4 w-4" />
                          Portal
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="schedule" checked={scheduleMessage} onCheckedChange={setScheduleMessage} />
                    <Label htmlFor="schedule">Schedule message for later</Label>
                  </div>

                  {scheduleMessage && (
                    <div className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg bg-muted/50">
                      <div className="space-y-2">
                        <Label>Schedule Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !scheduleDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={scheduleDate}
                              onSelect={setScheduleDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scheduleTime">Schedule Time</Label>
                        <Input
                          id="scheduleTime"
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                {scheduleMessage ? "Scheduling..." : "Sending..."}
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {scheduleMessage ? "Schedule Message" : "Send Message"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
